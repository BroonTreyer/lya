"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"
import { updatePassword } from "@/lib/auth"

export default function ResetPasswordPage() {
  const router = useRouter()
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
      await updatePassword(password)
      router.push("/login?message=Senha alterada com sucesso!")
    } catch (err: any) {
      setError(err.message || "Erro ao redefinir senha. Tente novamente.")
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
            Nova senha
          </h1>
          <p className="text-[#9A8F88] font-light">
            Digite sua nova senha
          </p>
        </div>

        {/* Card de Reset */}
        <Card className="bg-[#121214] border-[#9A8F88]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#F7F3F1]">Redefinir senha</CardTitle>
            <CardDescription className="text-[#9A8F88]">
              Escolha uma senha forte e segura
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

              {/* Nova senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#CFC8C4]">
                  Nova senha
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

              {/* Confirmar nova senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#CFC8C4]">
                  Confirmar nova senha
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

              {/* Dica de segurança */}
              <div className="bg-[#C69A5B]/10 border border-[#C69A5B]/20 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#C69A5B] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#CFC8C4]">
                  Use uma senha forte com letras, números e caracteres especiais
                </p>
              </div>

              {/* Botão de redefinir */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] font-semibold shadow-lg shadow-[#C69A5B]/20 hover:shadow-[#C69A5B]/40 transition-all duration-300 hover:scale-105"
              >
                {loading ? "Redefinindo..." : "Redefinir senha"}
              </Button>
            </form>

            {/* Link para login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-[#9A8F88]">
                Lembrou sua senha?{" "}
                <Link
                  href="/login"
                  className="text-[#C69A5B] hover:text-[#C69A5B]/80 transition-colors font-medium"
                >
                  Fazer login
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
