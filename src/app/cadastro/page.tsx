"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, Eye, EyeOff, AlertCircle, User, CheckCircle2 } from "lucide-react"
import { signUp } from "@/lib/auth"

export default function CadastroPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validações
    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, fullName)
      // Redirecionar para página de checkout/pagamento
      router.push("/checkout?plan=monthly")
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta. Tente novamente.")
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
            Criar sua conta
          </h1>
          <p className="text-[#9A8F88] font-light">
            Preencha os dados para começar
          </p>
        </div>

        {/* Card de Cadastro */}
        <Card className="bg-[#121214] border-[#9A8F88]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#F7F3F1]">Cadastro</CardTitle>
            <CardDescription className="text-[#9A8F88]">
              Após criar sua conta, você será direcionado para o pagamento
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

              {/* Nome completo */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#CFC8C4]">
                  Nome completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A8F88]" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Seu nome"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="pl-10 bg-[#0B0B0D] border-[#9A8F88]/20 text-[#F7F3F1] placeholder:text-[#9A8F88]/50 focus:border-[#C69A5B]/50"
                  />
                </div>
              </div>

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
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
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

              {/* Confirmar senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#CFC8C4]">
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A8F88]" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 bg-[#0B0B0D] border-[#9A8F88]/20 text-[#F7F3F1] placeholder:text-[#9A8F88]/50 focus:border-[#C69A5B]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8F88] hover:text-[#CFC8C4] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Informação importante */}
              <div className="bg-[#C69A5B]/10 border border-[#C69A5B]/20 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C69A5B] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#CFC8C4]">
                  Após criar sua conta, você será direcionado para escolher seu plano e realizar o pagamento
                </p>
              </div>

              {/* Botão de cadastro */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] font-semibold shadow-lg shadow-[#C69A5B]/20 hover:shadow-[#C69A5B]/40 transition-all duration-300 hover:scale-105"
              >
                {loading ? "Criando conta..." : "Criar conta e continuar"}
              </Button>
            </form>

            {/* Link para login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#9A8F88]">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-[#C69A5B] hover:text-[#C69A5B]/80 transition-colors font-medium"
                >
                  Entrar
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
