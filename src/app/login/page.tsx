"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, Eye, EyeOff, AlertCircle } from "lucide-react"
import { signIn, checkSubscriptionStatus } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { user } = await signIn(email, password)
      
      if (user) {
        // Verificar se tem acesso (VIP ou assinatura ativa)
        const { hasAccess } = await checkSubscriptionStatus(user.id, user.email || undefined)
        
        if (hasAccess) {
          // Tem acesso - vai para área de membros
          router.push("/membros")
        } else {
          // Não tem acesso - vai para página de planos
          router.push("/checkout?plan=price_monthly")
        }
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login. Verifique suas credenciais.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#F7F3F1]" />
            </div>
            <span className="text-xl font-serif font-bold text-[#F7F3F1]">
              Acesso Exclusivo
            </span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#F7F3F1] mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-[#9A8F88] font-light">
            Entre para acessar seu conteúdo exclusivo
          </p>
        </div>

        {/* Card de Login */}
        <Card className="bg-[#121214] border-[#9A8F88]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#F7F3F1]">Entrar na conta</CardTitle>
            <CardDescription className="text-[#9A8F88]">
              Digite suas credenciais para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Mensagem de erro */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#CFC8C4]">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A8F88]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-[#0B0B0D] border-[#9A8F88]/20 text-[#F7F3F1] placeholder:text-[#9A8F88]/50 focus:border-[#C69A5B]/50"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#CFC8C4]">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A8F88]" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 bg-[#0B0B0D] border-[#9A8F88]/20 text-[#F7F3F1] placeholder:text-[#9A8F88]/50 focus:border-[#C69A5B]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8F88] hover:text-[#CFC8C4] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Esqueceu a senha */}
              <div className="text-right">
                <Link
                  href="/esqueci-senha"
                  className="text-sm text-[#C69A5B] hover:text-[#C69A5B]/80 transition-colors"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              {/* Botão de login */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] font-semibold shadow-lg shadow-[#C69A5B]/20 hover:shadow-[#C69A5B]/40 transition-all duration-300 hover:scale-105"
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            {/* Link para cadastro */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#9A8F88]">
                Ainda não tem conta?{" "}
                <Link
                  href="/cadastro"
                  className="text-[#C69A5B] hover:text-[#C69A5B]/80 transition-colors font-medium"
                >
                  Criar conta
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Link para voltar */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-[#9A8F88] hover:text-[#CFC8C4] transition-colors"
          >
            ← Voltar para página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
