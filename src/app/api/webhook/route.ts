import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('Erro na verificação do webhook:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    // Processar eventos do Stripe
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId || session.client_reference_id
        const priceId = session.metadata?.priceId

        if (!userId) {
          console.error('User ID não encontrado no webhook')
          break
        }

        // Determinar tipo de plano
        let planType = 'monthly'
        let currentPeriodEnd = null

        if (priceId === 'price_weekly') {
          planType = 'weekly'
          currentPeriodEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        } else if (priceId === 'price_monthly') {
          planType = 'monthly'
          currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        } else if (priceId === 'price_lifetime') {
          planType = 'lifetime'
          currentPeriodEnd = null // Vitalício não expira
        }

        // Criar ou atualizar assinatura no Supabase
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .upsert({
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string || null,
            status: 'active',
            plan_type: planType,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          })

        if (error) {
          console.error('Erro ao criar assinatura:', error)
        }

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (!userId) break

        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('Erro ao atualizar assinatura:', error)
        }

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({
            status: 'canceled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          console.error('Erro ao cancelar assinatura:', error)
        }

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: error.message || 'Erro no webhook' },
      { status: 500 }
    )
  }
}
