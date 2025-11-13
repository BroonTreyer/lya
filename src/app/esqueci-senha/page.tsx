"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react"
import { resetPassword } from "@/lib/auth"

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Erro ao enviar email de recuperação. Tente novamente.")
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
            Recuperar senha
          </h1>
          <p className="text-[#9A8F88] font-light">
            Digite seu email para receber o link de recuperação
          </p>
        </div>

        {/* Card de Recuperação */}
        <Card className="bg-[#121214] border-[#9A8F88]/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#F7F3F1]">Esqueceu sua senha?</CardTitle>
            <CardDescription className="text-[#9A8F88]">
              Enviaremos um link para redefinir sua senha
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!success ? (
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

                {/* Botão de enviar */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] font-semibold shadow-lg shadow-[#C69A5B]/20 hover:shadow-[#C69A5B]/40 transition-all duration-300 hover:scale-105"
                >
                  {loading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                {/* Mensagem de sucesso */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-500 font-medium mb-1">
                      Email enviado com sucesso!
                    </p>
                    <p className="text-sm text-[#CFC8C4]">
                      Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  className="w-full border-[#9A8F88]/20 text-[#CFC8C4] hover:bg-[#F7F3F1]/5 hover:text-[#F7F3F1]"
                >
                  Enviar novamente
                </Button>
              </div>
            )}

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
