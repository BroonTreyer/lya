import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export type Profile = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  user_id: string
  plan_type: 'weekly' | 'monthly' | 'lifetime'
  status: 'active' | 'expired' | 'cancelled' | 'pending'
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export type Payment = {
  id: string
  user_id: string
  subscription_id: string | null
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  stripe_payment_intent_id: string | null
  payment_method: string | null
  created_at: string
}
