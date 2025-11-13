import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Emails VIP com acesso direto
const VIP_EMAILS = [
  'matheuscarneiro004@gmail.com',
  'lucas@monteiroads.com.br'
]

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Proteger rotas /membros
  if (request.nextUrl.pathname.startsWith('/membros')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Verificar se é usuário VIP
    const isVip = VIP_EMAILS.includes(user.email?.toLowerCase() || '')
    
    if (isVip) {
      // Usuário VIP tem acesso direto - não verifica assinatura
      return response
    }

    // Para outros usuários, verificar se tem assinatura ativa
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    // Se não tem assinatura, redirecionar para checkout
    if (!subscription) {
      return NextResponse.redirect(new URL('/checkout?plan=price_monthly', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/membros/:path*'],
}
