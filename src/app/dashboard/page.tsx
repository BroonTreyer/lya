"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, AlertCircle, CheckCircle2, LogOut, User } from "lucide-react"
import { getUser, signOut, checkSubscriptionStatus } from "@/lib/auth"
import type { Subscription } from "@/lib/supabase"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const currentUser = await getUser()
      
      if (!currentUser) {
        router.push("/login")
        return
      }

      setUser(currentUser)

      // Verificar status da assinatura
      const { hasAccess: access, subscription: sub } = await checkSubscriptionStatus(currentUser.id)
      setHasAccess(access)
      setSubscription(sub || null)
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error)
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="text-[#CFC8C4]">Carregando...</div>
      </div>
    )
  }

  // Se não tem acesso, mostrar mensagem de alerta
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#F7F3F1]" />
              </div>
              <span className="text-xl font-serif font-bold text-[#F7F3F1]">
                Acesso Exclusivo
              </span>
            </div>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-[#9A8F88] hover:text-[#F7F3F1]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>

          {/* Alerta de assinatura */}
          <Card className="bg-[#121214] border-red-500/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-8 h-8 text-red-500" />
                <CardTitle className="text-[#F7F3F1] text-2xl">
                  Assinatura necessária
                </CardTitle>
              </div>
              <CardDescription className="text-[#CFC8C4] text-base">
                {subscription?.status === 'expired' 
                  ? "Sua assinatura expirou. Renove para continuar acessando o conteúdo exclusivo."
                  : subscription?.status === 'cancelled'
                  ? "Sua assinatura foi cancelada. Assine novamente para ter acesso."
                  : "Você precisa de uma assinatura ativa para acessar o conteúdo exclusivo."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscription && (
                <div className="bg-[#0B0B0D] rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9A8F88]">Plano:</span>
                    <span className="text-[#F7F3F1] font-medium">
                      {subscription.plan_type === 'weekly' ? 'Semanal' : 
                       subscription.plan_type === 'monthly' ? 'Mensal' : 'Vitalício'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9A8F88]">Status:</span>
                    <Badge variant="destructive">
                      {subscription.status === 'expired' ? 'Expirado' :
                       subscription.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                    </Badge>
                  </div>
                  {subscription.current_period_end && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#9A8F88]">Expirou em:</span>
                      <span className="text-[#F7F3F1]">
                        {new Date(subscription.current_period_end).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <Button
                onClick={() => router.push("/#planos")}
                className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] font-semibold"
              >
                {subscription ? 'Renovar assinatura' : 'Escolher plano'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Se tem acesso, mostrar dashboard
  return (
    <div className="min-h-screen bg-[#0B0B0D] px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#F7F3F1]" />
            </div>
            <span className="text-xl font-serif font-bold text-[#F7F3F1]">
              Acesso Exclusivo
            </span>
          </div>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="text-[#9A8F88] hover:text-[#F7F3F1]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        {/* Bem-vindo */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F7F3F1] mb-2">
            Bem-vindo de volta! 🔥
          </h1>
          <p className="text-[#9A8F88] text-lg">
            Seu conteúdo exclusivo está esperando por você
          </p>
        </div>

        {/* Status da assinatura */}
        <Card className="bg-[#121214] border-[#C69A5B]/20 mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#C69A5B]" />
              <CardTitle className="text-[#F7F3F1]">Assinatura ativa</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-[#0B0B0D] rounded-lg p-4">
                <p className="text-[#9A8F88] text-sm mb-1">Plano</p>
                <p className="text-[#F7F3F1] font-semibold">
                  {subscription?.plan_type === 'weekly' ? 'Semanal' : 
                   subscription?.plan_type === 'monthly' ? 'Mensal' : 'Vitalício'}
                </p>
              </div>
              <div className="bg-[#0B0B0D] rounded-lg p-4">
                <p className="text-[#9A8F88] text-sm mb-1">Status</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Ativo
                </Badge>
              </div>
              {subscription?.current_period_end && subscription.plan_type !== 'lifetime' && (
                <div className="bg-[#0B0B0D] rounded-lg p-4">
                  <p className="text-[#9A8F88] text-sm mb-1">Próxima renovação</p>
                  <p className="text-[#F7F3F1] font-semibold">
                    {new Date(subscription.current_period_end).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo exclusivo */}
        <div className="text-center py-16">
          <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
            🔥 Conteúdo exclusivo em breve
          </h2>
          <p className="text-[#9A8F88] mb-8">
            Estamos preparando algo especial para você...
          </p>
        </div>
      </div>
    </div>
  )
}
