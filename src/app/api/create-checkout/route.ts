import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    // Valida se Stripe está configurado
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe não está configurado. Configure STRIPE_SECRET_KEY nas variáveis de ambiente.' },
        { status: 503 }
      )
    }

    const { priceId } = await request.json()

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID é obrigatório' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
      )
    }

    // Busca ou cria customer na Stripe
    let customerId: string

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single()

    if (subscription?.stripe_customer_id) {
      customerId = subscription.stripe_customer_id
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      customerId = customer.id
    }

    // Cria sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?canceled=true`,
      metadata: {
        user_id: user.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    return NextResponse.json(
      { error: 'Erro ao criar sessão de checkout' },
      { status: 500 }
    )
  }
}
