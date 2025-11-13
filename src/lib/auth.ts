import { supabase } from './supabase'

// Emails VIP com acesso direto (sem necessidade de assinatura)
export const VIP_EMAILS = [
  'matheuscarneiro004@gmail.com',
  'lucas@monteiroads.com.br'
]

export function isVipUser(email: string | null | undefined): boolean {
  if (!email) return false
  return VIP_EMAILS.includes(email.toLowerCase())
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    // Traduzir erros comuns para português
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

  // Criar perfil usando API route (bypassa RLS)
  if (data.user) {
    try {
      const response = await fetch('/api/auth/create-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          fullName: fullName,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Erro ao criar perfil via API:', errorData)
      }
    } catch (err) {
      console.error('Erro ao chamar API create-profile:', err)
    }
  }

  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Traduzir erros comuns para português
    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Email ou senha incorretos')
    }
    if (error.message.includes('Email not confirmed')) {
      throw new Error('Por favor, confirme seu email antes de fazer login')
    }
    throw new Error('Erro ao fazer login. Tente novamente.')
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error('Erro ao fazer logout')
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) {
    // Traduzir erros comuns para português
    if (error.message.includes('not found')) {
      throw new Error('Email não encontrado')
    }
    throw new Error('Erro ao enviar email de recuperação. Tente novamente.')
  }
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    if (error.message.includes('same as the old password')) {
      throw new Error('A nova senha não pode ser igual à senha atual')
    }
    if (error.message.includes('password')) {
      throw new Error('Senha deve ter pelo menos 6 caracteres')
    }
    throw new Error('Erro ao atualizar senha. Tente novamente.')
  }
}

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

export async function checkSubscriptionStatus(userId: string, userEmail?: string) {
  // Verificar se é usuário VIP primeiro
  if (userEmail && isVipUser(userEmail)) {
    return { 
      hasAccess: true, 
      status: 'vip',
      isVip: true
    }
  }

  // Buscar perfil do usuário
  const profile = await getUserProfile(userId)
  
  if (!profile) {
    return { hasAccess: false, status: 'no_profile', isVip: false }
  }

  // Verificar status da assinatura no perfil
  const subscriptionStatus = profile.subscription_status
  const planType = profile.plan_type

  // Permitir acesso se:
  // 1. Plano vitalício com status "lifetime"
  // 2. Plano recorrente (semanal/mensal) com status "active" ou "trialing"
  if (planType === 'vitalicio' && subscriptionStatus === 'lifetime') {
    return { hasAccess: true, status: 'lifetime', profile, isVip: false }
  }

  if ((planType === 'semanal' || planType === 'mensal') && 
      (subscriptionStatus === 'active' || subscriptionStatus === 'trialing')) {
    return { hasAccess: true, status: subscriptionStatus, profile, isVip: false }
  }
  
  return { 
    hasAccess: false, 
    status: subscriptionStatus || 'no_subscription', 
    profile, 
    isVip: false 
  }
}
