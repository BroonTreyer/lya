"use client";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Fallback simples para evitar erro de Provider
const t = (text: string) => text;

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full bg-[#121214] border-[#9A8F88]/20">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 rounded-full bg-[#9A8F88]/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-[#9A8F88]" />
          </div>
          <CardTitle className="text-3xl sm:text-4xl font-serif font-bold text-[#F7F3F1] mb-3">
            Pagamento Cancelado
          </CardTitle>
          <CardDescription className="text-lg text-[#CFC8C4]">
            Sua assinatura não foi processada
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="p-6 bg-[#9A8F88]/5 border border-[#9A8F88]/20 rounded-lg">
            <p className="text-[#CFC8C4] text-sm leading-relaxed text-center">
              Você cancelou o processo de pagamento. Nenhuma cobrança foi realizada.
              Se você teve algum problema ou dúvida, nossa equipe está pronta para ajudar.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#F7F3F1] text-center">
              Precisa de ajuda?
            </h4>
            <p className="text-sm text-[#CFC8C4] text-center">
              Entre em contato conosco:{' '}
              <a href="mailto:suporte@lyamonteiro.com.br" className="text-[#C69A5B] hover:underline">
                suporte@lyamonteiro.com.br
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link href="/#planos" className="flex-1">
              <Button className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] h-12 font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos Planos
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
              Ainda tem dúvidas sobre nossos planos? Confira nossa{' '}
              <Link href="/#faq" className="text-[#C69A5B] hover:underline">
                seção de perguntas frequentes
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
