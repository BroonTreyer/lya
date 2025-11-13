import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

// Mapeamento dos price IDs
const PRICE_IDS = {
  price_weekly: 'price_1ST38ZLYcZqHrP6J0iCz66m7',
  price_monthly: 'price_1ST39DLYcZqHrP6JwihCw6X5',
  price_lifetime: 'price_1ST39qLYcZqHrP6JqygJ4AT4',
}

// Mapeamento dos tipos de plano
const PLAN_TYPES = {
  price_weekly: 'semanal',
  price_monthly: 'mensal',
  price_lifetime: 'vitalicio',
}

export async function POST(req: NextRequest) {
  try {
    const { priceId, userId } = await req.json()

    if (!priceId || !userId) {
      return NextResponse.json(
        { error: 'priceId e userId são obrigatórios' },
        { status: 400 }
      )
    }

    // Obter o price ID real do Stripe
    const stripePriceId = PRICE_IDS[priceId as keyof typeof PRICE_IDS] || priceId
    const planType = PLAN_TYPES[priceId as keyof typeof PLAN_TYPES] || 'mensal'

    // Determinar o mode baseado no tipo de plano
    const mode = planType === 'vitalicio' ? 'payment' : 'subscription'

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://b88899f5-novo-app-alpha.lasy.pro'}/membros?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://b88899f5-novo-app-alpha.lasy.pro'}/checkout?canceled=true`,
      client_reference_id: userId,
      metadata: {
        plan_type: planType,
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })
  } catch (error: any) {
    console.error('Erro ao criar checkout session:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao criar sessão de checkout' },
      { status: 500 }
    )
  }
}
