import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

// Mapeamento dos Price IDs reais do Stripe
const PRICE_IDS = {
  price_weekly: "price_1ST38ZLYcZqHrP6J0iCz66m7",
  price_monthly: "price_1ST39DLYcZqHrP6JwihCw6X5",
  price_lifetime: "price_1ST39qLYcZqHrP6JqygJ4AT4",
};

// Mapeamento dos tipos de plano para salvar no webhook
const PLAN_TYPES = {
  price_weekly: "semanal",
  price_monthly: "mensal",
  price_lifetime: "vitalicio",
};

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "priceId é obrigatório" },
        { status: 400 }
      );
    }

    // Inicializa Supabase Server-side
    const supabase = createServerClient();

    // Descobre o usuário REAL (seguro)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    // Price ID real do Stripe
    const stripePriceId =
      PRICE_IDS[priceId as keyof typeof PRICE_IDS] || priceId;

    const planType =
      PLAN_TYPES[priceId as keyof typeof PLAN_TYPES] || "mensal";

    // Vitalício = pagamento único
    const mode = planType === "vitalicio" ? "payment" : "subscription";

    // Sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ["card"],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/membros?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?canceled=true`,
      
      // O webhook irá atualizar o Supabase
      metadata: {
        user_id: user.id,
        plan_type: planType,
        price_id: priceId,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("Erro ao criar checkout session:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao criar sessão de checkout" },
      { status: 500 }
    );
  }
}
