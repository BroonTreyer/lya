import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // Obrigatório para Webhook Stripe

// Inicializa Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

// Supabase usando SERVICE ROLE (permite bypass do RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Erro de verificação do Webhook:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  console.log(`⚡ Evento Stripe recebido: ${event.type}`);

  // ---------------------------------------------------------------
  // CHECKOUT SESSION COMPLETED
  // ---------------------------------------------------------------
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_details?.email ?? null;
    const customerId = session.customer as string | null;
    const subscriptionId = session.subscription as string | null;

    console.log("📨 Email no checkout:", email);

    if (!email) {
      console.error("❌ checkout.session.completed SEM email");
      return new Response("NO EMAIL", { status: 400 });
    }

    // Buscar perfil pelo email
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (profileError) {
      console.error("❌ Erro ao buscar perfil:", profileError);
      return new Response("PROFILE ERROR", { status: 500 });
    }

    if (!profile) {
      console.error("❌ Nenhum perfil encontrado para:", email);
      return new Response("NO PROFILE", { status: 404 });
    }

    console.log("👤 Perfil encontrado:", profile.id);

    // Detectar tipo de plano
    let planType =
      session.mode === "payment"
        ? "vitalicio"
        : (session.metadata?.plan_type as string) ?? null;

    const subscriptionStatus =
      planType === "vitalicio" ? "lifetime" : "active";

    // Atualizar perfil
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
      console.error("❌ Erro ao atualizar perfil no checkout:", updateError);
    } else {
      console.log("✅ Perfil atualizado com sucesso:", {
        profileId: profile.id,
        customerId,
        subscriptionId,
        subscriptionStatus,
        planType,
      });
    }
  }

  // ---------------------------------------------------------------
  // SUBSCRIPTION CREATED
  // ---------------------------------------------------------------
  if (event.type === "customer.subscription.created") {
    const sub = event.data.object as Stripe.Subscription;

    const { error } = await supabase
      .from("profiles")
      .update({
        stripe_subscription_id: sub.id,
        subscription_status: sub.status,
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_customer_id", sub.customer as string);

    if (error) console.error("❌ Erro ao salvar nova subscription:", error);
    else console.log("🆕 Subscription registrada:", sub.id);
  }

  // ---------------------------------------------------------------
  // SUBSCRIPTION UPDATED
  // ---------------------------------------------------------------
  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_status: sub.status,
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_subscription_id", sub.id);

    if (error)
      console.error("❌ Erro ao atualizar subscription:", error);
    else
      console.log("🔄 Subscription atualizada:", {
        id: sub.id,
        status: sub.status,
      });
  }

  // ---------------------------------------------------------------
  // SUBSCRIPTION CANCELED
  // ---------------------------------------------------------------
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;

    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("stripe_subscription_id", sub.id);

    if (error)
      console.error("❌ Erro ao cancelar subscription:", error);
    else
      console.log("🛑 Subscription cancelada:", sub.id);
  }

  // Eventos ignorados
  else {
    console.log("ℹ️ Evento ignorado:", event.type);
  }

  return new Response("OK", { status: 200 });
}
