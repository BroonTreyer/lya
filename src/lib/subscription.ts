import { createClient } from '@/lib/supabase/server'

export async function checkSubscription() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { hasAccess: false, subscription: null }
  }

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!subscription) {
    return { hasAccess: false, subscription: null }
  }

  // Verifica se a assinatura está ativa e não expirou
  const hasAccess = 
    subscription.status === 'active' && 
    new Date(subscription.current_period_end) > new Date()

  return { hasAccess, subscription }
}

export async function getSubscription(userId: string) {
  const supabase = await createClient()
  
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Erro ao buscar assinatura:', error)
    return null
  }

  return subscription
}

export async function updateSubscription(
  userId: string,
  data: {
    stripe_customer_id?: string
    stripe_subscription_id?: string
    stripe_price_id?: string
    status?: 'active' | 'canceled' | 'past_due' | 'incomplete'
    current_period_start?: string
    current_period_end?: string
    cancel_at_period_end?: boolean
  }
) {
  const supabase = await createClient()
  
  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      ...data,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar assinatura:', error)
    throw error
  }

  return subscription
}
