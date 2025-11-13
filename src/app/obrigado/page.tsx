"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold text-white">
            Acesso Exclusivo
          </span>
        </Link>

        <Card className="bg-white/[0.02] border-white/5 backdrop-blur-xl">
          <CardHeader className="space-y-4 pt-12">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl text-white">
              Bem-vindo ao meu mundo proibido 💋
            </CardTitle>
            <CardDescription className="text-white/60 text-lg">
              Você já pode acessar todo o conteúdo exclusivo!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pb-12">
            <div className="bg-white/[0.02] rounded-xl p-6 space-y-3 text-left border border-white/5">
              <h3 className="font-semibold text-white">O que fazer agora:</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">1.</span>
                  <span>Verifique seu email para confirmar o cadastro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">2.</span>
                  <span>Faça login na área de membros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">3.</span>
                  <span>Aproveite todo o conteúdo exclusivo disponível</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/membros">
                <Button 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-500/20"
                  size="lg"
                >
                  Entrar no meu mundo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-white/40">
                Seu pagamento foi processado com sucesso. Um email de confirmação foi enviado para você.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6">
              <p className="text-sm text-white/40 mb-3">
                Precisa de ajuda? Entre em contato:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="mailto:suporte@acesso.vip">
                  <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white">
                    suporte@acesso.vip
                  </Button>
                </a>
                <a href="https://t.me/acessovip" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white">
                    Telegram: @acessovip
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-white/30 text-sm mt-6">
          Obrigada por fazer parte do meu mundo exclusivo ✨
        </p>
      </div>
    </div>
  )
}
