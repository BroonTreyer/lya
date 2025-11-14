'use client'

import { createBrowserClient as createClient } from '@/lib/supabase'

// Sempre usar createClient() para evitar erros no Next.js 15
const supabase = createClient()

// Emails VIP com acesso liberado independente da assinatura
export const VIP_EMAILS = [
  'matheuscarneiro004@gmail.com',
  'lucas@monteiroads.com.br',
]

export function isVipUser(email: string | null | undefined): boolean {
  if (!email) return false
  return VIP_EMAILS.includes(email.toLowerCase())
}

// ===========================
// AUTH: SIGN UP
// ===========================
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  })

  if (error) {
    if (error.message.includes('already registered')) {
      throw new Error('Este email já está cadastrado')
    }
    if (error.message.includes('invalid email')) {
      throw new Error('Email inválido')
    }
    if (error.message.includes('password')) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }
    throw new Error(error.message)
  }

  // Criação do perfil via API Route (bypass RLS – correto)
  if (data.user) {
    try {
      await fetch('/api/auth/create-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          fullName,
        }),
      })
    } catch (err) {
      console.error('Erro ao criar perfil via API:', err)
    }
  }

  return data
}

// ===========================
// AUTH: SIGN IN
// ===========================
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Email ou senha incorretos')
    }
    if (error.message.includes('Email not confirmed')) {
      throw new Error('Confirme seu email antes de fazer login')
    }
    throw new Error('Erro ao fazer login. Tente novamente.')
  }

  return data
}

// ===========================
// AUTH: SIGN OUT
// ===========================
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error('Erro ao fazer logout')
}

// ===========================
// AUTH: RESET PASSWORD
// ===========================
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    if (error.message.includes('not found')) {
      throw new Error('Email não encontrado')
    }
    throw new Error('Erro ao enviar recuperação. Tente novamente.')
  }
}

// ===========================
// AUTH: UPDATE PASSWORD
// ===========================
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword })

  if (error) {
    if (error.message.includes('same as the old password')) {
      throw new Error('A nova senha não pode ser igual à anterior')
    }
    if (error.message.includes('password')) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }
    throw new Error('Erro ao atualizar senha')
  }
}

// ===========================
// GET USER
// ===========================
export async function getUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Erro ao buscar usuário:', error)
      return null
    }
    return user
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    return null
  }
}

// ===========================
// GET USER PROFILE
// ===========================
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao buscar perfil:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return null
  }
}

// ===========================
// GET USER SUBSCRIPTION
// ===========================
export async function getUserSubscription(userId: string) {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Erro ao buscar assinatura:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error)
    return null
  }
}

// ===========================
// CHECK SUBSCRIPTION STATUS
// ===========================
export async function checkSubscriptionStatus(userId: string, userEmail?: string) {
  // 1. VIP => acesso liberado
  if (userEmail && isVipUser(userEmail)) {
    return {
      hasAccess: true,
      status: 'vip',
      isVip: true,
      profile: null,
    }
  }

  // 2. Buscar perfil
  const profile = await getUserProfile(userId)

  if (!profile) {
    return {
      hasAccess: false,
      status: 'no_profile',
      isVip: false,
      profile: null,
    }
  }

  const subscriptionStatus = profile.subscription_status
  const planType = profile.plan_type

  // 3. Vitalício
  if (planType === 'vitalicio' && subscriptionStatus === 'lifetime') {
    return {
      hasAccess: true,
      status: 'lifetime',
      profile,
      isVip: false,
    }
  }

  // 4. Semanal / mensal
  if (
    ['semanal', 'mensal'].includes(planType) &&
    ['active', 'trialing'].includes(subscriptionStatus)
  ) {
    return {
      hasAccess: true,
      status: subscriptionStatus,
      profile,
      isVip: false,
    }
  }

  // 5. Caso contrário, sem acesso
  return {
    hasAccess: false,
    status: subscriptionStatus || 'no_subscription',
    profile,
    isVip: false,
  }
}
