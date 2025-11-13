"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Lock } from "lucide-react"
import Link from "next/link"

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Acesso Exclusivo
            </span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-24 sm:py-32 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Sobre mim
          </h1>
          <p className="text-white/50 text-lg">
            Conheça um pouco mais da minha história
          </p>
        </div>

        <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm mb-8">
          <CardHeader>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-16 h-16 text-white fill-white" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              Olá! Tenho 24 anos e criei esse espaço pra te mostrar meu lado mais íntimo e provocante. 
            </p>
            <p>
              Adoro atenção, presentes e novas experiências. Tudo aqui é exclusivo e feito pra quem realmente quer me conhecer de verdade.
            </p>
            <p>
              Aqui você vai encontrar conteúdos que não posto em nenhum outro lugar - fotos, vídeos e momentos especiais que guardo só para meus assinantes.
            </p>
            <p>
              Valorizo muito a privacidade e discrição, tanto a minha quanto a sua. Por isso, tudo aqui é 100% seguro e confidencial.
            </p>
            <p className="text-rose-400 font-semibold">
              Se você chegou até aqui, é porque está pronto para entrar no meu mundo proibido. Te espero lá dentro 💋
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm text-center">
            <CardHeader>
              <CardTitle className="text-rose-400">500+</CardTitle>
              <CardDescription className="text-white/50">Conteúdos exclusivos</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm text-center">
            <CardHeader>
              <CardTitle className="text-rose-400">2x/semana</CardTitle>
              <CardDescription className="text-white/50">Novos posts</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/[0.02] border-white/5 backdrop-blur-sm text-center">
            <CardHeader>
              <CardTitle className="text-rose-400">24/7</CardTitle>
              <CardDescription className="text-white/50">Acesso ilimitado</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/#planos"
            className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg shadow-rose-500/20"
          >
            Ver planos de assinatura
          </Link>
        </div>
      </div>
    </div>
  )
}
