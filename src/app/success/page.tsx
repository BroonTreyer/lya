"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Sparkles, Lock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SuccessPage() {
  const { t } = useLanguage()

  useEffect(() => {
    // Aqui você pode adicionar lógica para registrar a conversão
    // Analytics, Facebook Pixel, etc.
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full bg-[#121214] border-[#9A8F88]/20">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 rounded-full bg-[#C69A5B]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-[#C69A5B]" />
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F3F1] mb-3">
            Pagamento Confirmado!
          </CardTitle>
          <CardDescription className="text-lg text-[#CFC8C4]">
            Bem-vindo ao conteúdo exclusivo da Lya Monteiro
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="p-6 bg-[#C69A5B]/5 border border-[#C69A5B]/20 rounded-lg">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-[#C69A5B] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-[#F7F3F1] mb-2">
                  Seu acesso está ativo!
                </h3>
                <p className="text-[#CFC8C4] text-sm leading-relaxed">
                  Você receberá um email com suas credenciais de acesso em alguns minutos. 
                  Verifique também sua caixa de spam.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#F7F3F1]">Próximos passos:</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C69A5B] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#CFC8C4]">
                  Verifique seu email para acessar o conteúdo exclusivo
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C69A5B] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#CFC8C4]">
                  Faça login na área de membros
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C69A5B] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#CFC8C4]">
                  Aproveite todo o conteúdo exclusivo disponível
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] h-12 font-semibold">
                <Lock className="w-4 h-4 mr-2" />
                Acessar Área de Membros
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-[#9A8F88]/20 text-[#CFC8C4] hover:bg-[#F7F3F1]/5 h-12">
                Voltar ao Início
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t border-[#9A8F88]/10">
            <p className="text-xs text-center text-[#9A8F88]">
              Precisa de ajuda? Entre em contato:{' '}
              <a href="mailto:suporte@lyamonteiro.com.br" className="text-[#C69A5B] hover:underline">
                suporte@lyamonteiro.com.br
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
