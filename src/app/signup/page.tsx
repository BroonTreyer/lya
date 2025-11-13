'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      // Redireciona para home para escolher plano
      router.push('/?signup=success')
      router.refresh()
    } catch (error: any) {
      setError(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0D] p-4">
      <Card className="w-full max-w-md bg-[#121214] border-[#9A8F88]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-serif text-[#F7F3F1]">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-[#CFC8C4]">
            Preencha os dados para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#F7F3F1]">
                Nome Completo
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-[#0B0B0D] border-[#9A8F88] text-[#F7F3F1] placeholder:text-[#9A8F88]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#F7F3F1]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0B0B0D] border-[#9A8F88] text-[#F7F3F1] placeholder:text-[#9A8F88]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#F7F3F1]">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="bg-[#0B0B0D] border-[#9A8F88] text-[#F7F3F1] placeholder:text-[#9A8F88] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8F88] hover:text-[#C69A5B] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-[#9A8F88]">Mínimo de 6 caracteres</p>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C69A5B] hover:bg-[#B88A4B] text-[#0B0B0D] font-semibold"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>

            <p className="text-center text-sm text-[#CFC8C4]">
              Já tem uma conta?{' '}
              <a href="/login" className="text-[#C69A5B] hover:underline">
                Entrar
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
