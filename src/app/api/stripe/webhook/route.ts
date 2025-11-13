import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Stripe webhook signature error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(`✅ Webhook recebido: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerId = session.customer as string | null;
      const subscriptionId = session.subscription as string | null;
      const email = session.customer_details?.email ?? null;

      console.log(`📧 Checkout completado para email: ${email}`);

      if (!email) {
        console.error("❌ checkout.session.completed sem email");
        break;
      }

      // Buscar perfil pelo email
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (error) {
        console.error("❌ Erro ao buscar profile:", error);
        break;
      }
      if (!profile) {
        console.error(`❌ Profile não encontrado para email: ${email}`);
        break;
      }

      console.log(`👤 Profile encontrado: ${profile.id}`);

      // Definir plan_type (vitalício ou assinatura)
      let planType: string | null = null;

      if (session.mode === "payment") {
        planType = "vitalicio";
        console.log("💎 Plano vitalício detectado");
      } else if (session.mode === "subscription") {
        // pegar do metadata
        planType = (session.metadata?.plan_type as string) ?? null;
        console.log(`📅 Plano recorrente detectado: ${planType}`);
      }

      const subscriptionStatus = planType === "vitalicio" ? "lifetime" : "active";

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          subscription_status: subscriptionStatus,
          plan_type: planType,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile.id);

      if (updateError) {
        console.error("❌ Erro ao atualizar profile após checkout:", updateError);
      } else {
        console.log(`✅ Profile atualizado com sucesso:`, {
          profileId: profile.id,
          planType,
          subscriptionStatus,
          customerId,
          subscriptionId,
        });
      }

      break;
    }

    case "customer.subscription.created": {
      const sub = event.data.object as Stripe.Subscription;

      console.log(`🆕 Subscription criada: ${sub.id} para customer: ${sub.customer}`);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          stripe_subscription_id: sub.id,
          subscription_status: sub.status,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", sub.customer as string);

      if (updateError) {
        console.error("❌ Erro ao atualizar subscription criada:", updateError);
      } else {
        console.log(`✅ Subscription ${sub.id} vinculada ao profile`);
      }

      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;

      console.log(`🔄 Subscription atualizada: ${sub.id} - novo status: ${sub.status}`);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          subscription_status: sub.status,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);

      if (updateError) {
        console.error("❌ Erro ao atualizar subscription:", updateError);
      } else {
        console.log(`✅ Status da subscription atualizado para: ${sub.status}`);
      }

      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;

      console.log(`🗑️ Subscription deletada: ${sub.id}`);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          subscription_status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id);

      if (updateError) {
        console.error("❌ Erro ao cancelar subscription:", updateError);
      } else {
        console.log(`✅ Subscription ${sub.id} cancelada com sucesso`);
      }

      break;
    }

    default:
      // Apenas logar eventos não tratados
      console.log(`ℹ️ Evento Stripe ignorado: ${event.type}`);
  }

  return new Response("OK", { status: 200 });
}
