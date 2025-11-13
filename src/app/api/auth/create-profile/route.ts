import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    // Validar variáveis de ambiente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Variáveis de ambiente do Supabase não configuradas')
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta. Entre em contato com o suporte.' },
        { status: 500 }
      )
    }

    // Cliente Supabase com service role (bypassa RLS)
    const supabaseAdmin = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const { userId, email, fullName } = await req.json()

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'userId e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o perfil já existe
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle()

    if (existingProfile) {
      return NextResponse.json({ 
        success: true, 
        message: 'Perfil já existe' 
      })
    }

    // Criar perfil usando service role (bypassa RLS)
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        full_name: fullName || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Erro ao criar perfil:', error)
      return NextResponse.json(
        { error: 'Erro ao criar perfil', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      profile: data 
    })

  } catch (error) {
    console.error('Erro na API create-profile:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
