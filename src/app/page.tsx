"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Lock, Sparkles, Shield, Clock, Zap, Eye, Crown, Star, Infinity, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setShowCookieBanner(true)
    }
  }, [])

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieBanner(false)
  }

  const handleRejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected')
    setShowCookieBanner(false)
  }

  const plans = [
    {
      name: "Semanal",
      price: "9,90",
      period: "semana",
      description: "Prove meu mundo",
      features: [
        "Acesso total ilimitado",
        "Conteúdo novo toda semana",
        "Suporte VIP 24/7",
        "Cancele quando quiser"
      ],
      highlight: false,
      priceId: "price_weekly",
      icon: <Clock className="w-5 h-5" />
    },
    {
      name: "Mensal",
      price: "25,90",
      period: "mês",
      description: "Mais escolhido",
      features: [
        "Acesso total ilimitado",
        "Conteúdo novo toda semana",
        "Suporte VIP 24/7",
        "Sets exclusivos mensais",
        "Cancele quando quiser"
      ],
      highlight: true,
      priceId: "price_monthly",
      savings: "Economize 62%",
      icon: <Star className="w-5 h-5" />
    },
    {
      name: "Vitalício",
      price: "98,90",
      period: "único",
      description: "Acesso eterno",
      features: [
        "Acesso total ilimitado",
        "Conteúdo novo toda semana",
        "Suporte VIP 24/7",
        "Sets exclusivos mensais",
        "Acesso vitalício garantido",
        "Conteúdo de arquivo completo"
      ],
      highlight: false,
      priceId: "price_lifetime",
      savings: "Melhor custo-benefício",
      icon: <Infinity className="w-5 h-5" />
    }
  ]

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Acesso instantâneo",
      description: "Em segundos você já vê tudo que eu faço quando estou nua, molhada e entregue."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Conteúdo proibido",
      description: "Fotos e vídeos que só faço quando estou completamente solta… Coisas que eu nunca mostraria em rede social."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Discrição total",
      description: "Nome genérico na fatura. Ninguém nunca descobre que você me tem aqui."
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Atualizações quentes toda semana",
      description: "Sempre algo novo pra você bater olhando pra mim."
    }
  ]

  const galleryImages = [
    {
      url: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/5a3269ec-1b2f-4448-bfd7-7b0291065f85.jpg",
      alt: "Preview exclusivo 1",
      date: "há 2 dias"
    },
    {
      url: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/96df314b-302e-4e3c-a86d-ec570d3d2c74.jpg",
      alt: "Preview exclusivo 2",
      date: "há 3 dias"
    },
    {
      url: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/fdbe677a-401c-4c77-a92b-b74dae8f4726.jpg",
      alt: "Preview exclusivo 3",
      date: "há 5 dias"
    },
    {
      url: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/70299bd8-9d94-4253-bbde-c914413560eb.jpg",
      alt: "Preview exclusivo 4",
      date: "há 1 semana"
    },
    {
      url: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/9aa6e3de-19d9-45ee-a550-c7d563305bf7.jpg",
      alt: "Preview exclusivo 5",
      date: "há 1 semana"
    },
    {
      url: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/10393873-6374-4404-bd8f-28c77a2bf167.jpg",
      alt: "Preview exclusivo 6",
      date: "há 2 semanas"
    }
  ]

  const testimonials = [
    {
      name: "Ricardo M.",
      text: "Melhor investimento que fiz. Ela é ainda mais incrível do que imaginei.",
      rating: 5
    },
    {
      name: "Felipe S.",
      text: "Vale cada centavo. Conteúdo de altíssima qualidade e sempre surpreendente.",
      rating: 5
    },
    {
      name: "Carlos A.",
      text: "Totalmente discreto e seguro. Ninguém descobre. Recomendo demais.",
      rating: 5
    },
    {
      name: "Bruno L.",
      text: "Não imaginei que seria tão bom. Ela é perfeita e o conteúdo é incrível.",
      rating: 5
    },
    {
      name: "Thiago R.",
      text: "Assinei faz 3 meses e não me arrependo. Sempre tem coisa nova.",
      rating: 5
    },
    {
      name: "André P.",
      text: "Melhor que qualquer outra plataforma. Conteúdo exclusivo de verdade.",
      rating: 5
    }
  ]

  const faqs = [
    {
      question: "Alguém vai descobrir que assinei?",
      answer: "Jamais. O pagamento aparece na fatura como 'Serviço Digital MP' - totalmente genérico. Ninguém saberá. Sua privacidade é nossa prioridade máxima."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, sem pegadinhas. Cancele quando quiser pelo painel de membros. Sem multas, sem taxas extras, sem perguntas. Você está no controle total."
    },
    {
      question: "Quando vou ter acesso?",
      answer: "Imediatamente após o pagamento ser aprovado. Em menos de 1 minuto você já está dentro. Você receberá email com login e senha na hora."
    },
    {
      question: "O conteúdo é realmente exclusivo?",
      answer: "Absolutamente. Tudo que você vai ver aqui não existe em nenhuma rede social, nenhum site, nenhum lugar. É material feito especialmente para meus assinantes VIP."
    },
    {
      question: "É seguro colocar meus dados?",
      answer: "Totalmente seguro. Usamos criptografia bancária de nível militar. Seus dados nunca são compartilhados. Processamento via Stripe, a mesma tecnologia usada por Apple, Amazon e Google."
    },
    {
      question: "Tem conteúdo novo com frequência?",
      answer: "Sim! Posto conteúdo novo toda semana. Você nunca fica sem novidades. Sempre tem algo novo esperando por você."
    }
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0D] font-sans">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(198, 154, 91, 0.3); }
          50% { box-shadow: 0 0 30px rgba(198, 154, 91, 0.5); }
        }

        .animate-pulse-subtle {
          animation: subtle-pulse 2s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .hover-zoom {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-zoom:hover {
          transform: scale(1.02);
        }

        .section-divider {
          position: relative;
          height: 60px;
          overflow: hidden;
        }

        .section-divider svg {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121214] border-t border-[#9A8F88]/20 backdrop-blur-xl shadow-2xl">
          <div className="container mx-auto px-4 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Shield className="w-5 h-5 text-[#C69A5B] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#CFC8C4]">
                  <p className="font-medium text-[#F7F3F1] mb-1">Este site usa cookies</p>
                  <p className="text-[#9A8F88] font-light">
                    Usamos cookies para melhorar sua experiência, personalizar conteúdo e analisar nosso tráfego. 
                    Ao continuar navegando, você concorda com nossa{" "}
                    <Link href="/privacidade" className="text-[#C69A5B] hover:underline">
                      Política de Privacidade
                    </Link>.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  onClick={handleRejectCookies}
                  variant="outline"
                  className="flex-1 sm:flex-none border-[#9A8F88]/20 text-[#CFC8C4] hover:bg-[#F7F3F1]/5 hover:text-[#F7F3F1]"
                >
                  Rejeitar
                </Button>
                <Button
                  onClick={handleAcceptCookies}
                  className="flex-1 sm:flex-none bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D]"
                >
                  Aceitar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Premium - SEM "Acesso Exclusivo" */}
      <header className="fixed top-0 w-full bg-[#0B0B0D]/95 backdrop-blur-xl border-b border-[#9A8F88]/10 z-50">
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-end">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-[#CFC8C4] hover:text-[#F7F3F1] hover:bg-[#F7F3F1]/5 transition-all duration-300 text-sm sm:text-base px-3 sm:px-4">
                Entrar
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] shadow-lg shadow-[#C69A5B]/20 hover:shadow-[#C69A5B]/40 transition-all duration-300 hover:scale-105 text-sm sm:text-base px-4 sm:px-6 font-semibold">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Premium com microinterações */}
      <section className="relative pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 overflow-hidden">
        {/* Background Image com blur suave */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/b2c72e4e-c267-4b0c-bf2d-c1a063fcb179.jpg"
            alt="Hero background"
            fill
            className="object-cover object-center"
            style={{ filter: 'blur(2px)' }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/85 via-[#0B0B0D]/70 to-[#0B0B0D]" />
        </div>

        {/* Conteúdo */}
        <div className="container mx-auto max-w-5xl text-center relative z-10 pt-8 sm:pt-16">
          {/* Selo de credibilidade */}
          <div className="mb-6 sm:mb-8 animate-fade-in-up">
            <Badge className="bg-[#C69A5B]/10 text-[#C69A5B] border-[#C69A5B]/30 hover:bg-[#C69A5B]/20 px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 text-xs sm:text-sm backdrop-blur-sm shadow-lg">
              <Shield className="w-3.5 h-3.5 mr-2" />
              Apenas para maiores de 18 anos
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 sm:mb-8 leading-[1.1] animate-fade-in-up stagger-1">
            <span className="block text-[#F7F3F1] mb-3">Quer ver o meu lado que eu só mostro</span>
            <span className="block text-[#C69A5B] drop-shadow-[0_0_20px_rgba(198,154,91,0.3)]">
              para quem me deixa molhada?
            </span>
          </h1>
          
          <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12 max-w-3xl mx-auto animate-fade-in-up stagger-2">
            <p className="text-base sm:text-lg md:text-xl text-[#CFC8C4] leading-relaxed px-4 font-light">
              Aqui não tem filtro nem pose.<br />
              Só eu… excitada de verdade, do jeitinho que você imagina.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-[#CFC8C4] leading-relaxed px-4 pt-2 font-light">
              Discrição total. Nenhuma informação aparece para ninguém.<br />
              Só você… e sua boa garota.
            </p>
            
            <p className="text-lg sm:text-xl md:text-2xl text-[#F7F3F1] font-semibold leading-relaxed px-4 pt-4">
              Pronto para entrar no meu mundo proibido e me ter do jeito que você quiser?
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-4 animate-fade-in-up stagger-3">
            <a href="#planos" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] text-base sm:text-lg px-10 sm:px-12 py-6 sm:py-7 shadow-2xl shadow-[#C69A5B]/40 hover:shadow-[#C69A5B]/60 transition-all duration-300 hover:scale-105 font-semibold animate-pulse-subtle hover:animate-none"
              >
                Quero ver você agora
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <p className="text-xs sm:text-sm text-[#9A8F88] font-light">
              <span className="text-[#C69A5B] font-semibold">3.284</span> homens já estão dentro
            </p>
          </div>

          {/* Badges de autenticidade */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 animate-fade-in-up stagger-4">
            <Badge className="bg-[#F7F3F1]/5 text-[#CFC8C4] border-[#9A8F88]/20 px-3 sm:px-4 py-2 text-xs backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-[#C69A5B]" />
              Criadora verificada
            </Badge>
            <Badge className="bg-[#F7F3F1]/5 text-[#CFC8C4] border-[#9A8F88]/20 px-3 sm:px-4 py-2 text-xs backdrop-blur-sm">
              <Lock className="w-3.5 h-3.5 mr-1.5 text-[#C69A5B]" />
              Conteúdo original
            </Badge>
            <Badge className="bg-[#F7F3F1]/5 text-[#CFC8C4] border-[#9A8F88]/20 px-3 sm:px-4 py-2 text-xs backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 mr-1.5 text-[#C69A5B]" />
              Ambiente seguro
            </Badge>
          </div>
        </div>
      </section>

      {/* Divisor suave */}
      <div className="section-divider">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q300,80 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(18, 18, 20, 0.3)" />
        </svg>
      </div>

      {/* Gallery Preview Section - Com microinterações */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <Badge className="mb-6 bg-[#C69A5B]/10 text-[#C69A5B] border-[#C69A5B]/20 px-4 py-2 text-sm animate-fade-in-up">
              <Eye className="w-4 h-4 mr-2" />
              Preview exclusivo
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-[#F7F3F1] px-4 animate-fade-in-up stagger-1">
              Eu sei o que passa na sua cabeça quando olha pra mim
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto px-4 animate-fade-in-up stagger-2">
              <p className="text-base sm:text-lg md:text-xl text-[#CFC8C4] leading-relaxed font-light">
                E aqui dentro…<br />
                eu deixo você ver exatamente o que você imagina.
              </p>
              <p className="text-base sm:text-lg text-[#C69A5B] font-semibold leading-relaxed pt-2">
                Isso aqui é só a prévia…<br />
                o resto eu só entrego pra quem me assina.
              </p>
            </div>
            
            {/* Indicador de conteúdo */}
            <div className="mt-6 animate-fade-in-up stagger-3">
              <Badge className="bg-[#F7F3F1]/5 text-[#CFC8C4] border-[#9A8F88]/20 px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2 text-[#C69A5B]" />
                +650 conteúdos exclusivos disponíveis
              </Badge>
            </div>
          </div>

          {/* Grid de Galeria com microinterações */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-12">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className={`relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer hover-lift animate-fade-in-up stagger-${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                />
                {/* Overlay com blur */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/90 via-[#0B0B0D]/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                
                {/* Lock icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#C69A5B]/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-[#C69A5B]/40 group-hover:scale-110 transition-transform duration-300 animate-glow">
                    <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-[#0B0B0D]" />
                  </div>
                </div>

                {/* Data atualização - micro legenda */}
                <div className="absolute bottom-3 left-3 right-3">
                  <Badge className="bg-[#0B0B0D]/80 backdrop-blur-sm text-[#CFC8C4] border-[#9A8F88]/20 px-2 py-1 text-xs">
                    Atualizado {image.date}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Microtexto de continuidade */}
          <div className="text-center mb-8 animate-fade-in-up">
            <p className="text-[#9A8F88] text-sm font-light italic mb-6">
              Continue descendo… quero te mostrar mais
            </p>
          </div>

          {/* CTA após galeria */}
          <div className="text-center px-4 animate-fade-in-up">
            <p className="text-[#CFC8C4] text-base sm:text-lg mb-6 font-light">
              Quer ver tudo sem censura? Conteúdo completo esperando por você.
            </p>
            <a href="#planos" className="inline-block w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] text-base sm:text-lg px-10 py-6 shadow-2xl shadow-[#C69A5B]/30 hover:shadow-[#C69A5B]/50 transition-all duration-300 hover:scale-105 font-semibold"
              >
                Desbloquear acesso completo
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Divisor suave */}
      <div className="section-divider">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(18, 18, 20, 0.3)" />
        </svg>
      </div>

      {/* Quem Sou Eu Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-10 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-[#F7F3F1] px-4">
              Quem sou eu
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-8 sm:mb-10">
            {/* Foto */}
            <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden order-1 md:order-1 hover-zoom animate-fade-in-up stagger-1">
              <Image
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/bcfb70a3-72a3-4f56-a1dc-4c8798f15935.jpg"
                alt="Sobre mim"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/40 to-transparent" />
            </div>

            {/* Texto */}
            <div className="space-y-5 order-2 md:order-2 px-4 md:px-0 animate-fade-in-up stagger-2">
              <p className="text-lg sm:text-xl md:text-2xl text-[#F7F3F1] leading-relaxed font-light">
                Tenho 24 anos e um lado safado que quase ninguém conhece.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-[#CFC8C4] leading-relaxed font-light">
                Eu adoro provocar…<br />
                adoro ser desejada…<br />
                adoro saber que tem um homem olhando pra mim e imaginando o que faria comigo.
              </p>
            </div>
          </div>

          {/* Foto de baixo unificada */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Copy persuasivo */}
            <div className="space-y-5 sm:space-y-6 px-4 md:px-0 order-2 md:order-1 animate-fade-in-up stagger-3">
              <Badge className="bg-[#C69A5B]/10 text-[#C69A5B] border-[#C69A5B]/20 px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Conteúdo VIP
              </Badge>
              <div className="space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl text-[#F7F3F1] leading-relaxed font-light">
                  Sou sua boa garota quando você quer carinho.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl text-[#C69A5B] leading-relaxed font-medium">
                  E sua cachorrinha obediente quando você quer me usar.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-[#CFC8C4] leading-relaxed font-light">
                  Gosto de atenção, presentes e homens que sabem exatamente o que querem.<br />
                  Isso me deixa acesa, entregue, pronta.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-[#CFC8C4] leading-relaxed font-light">
                  Aqui dentro você vê tudo o que eu escondo do mundo.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-[#F7F3F1] font-semibold leading-relaxed pt-2">
                  Se você gosta de uma mulher quente, ousada, safada e viciada em provocar…<br />
                  você vai perder o controle comigo.
                </p>
              </div>
            </div>

            {/* Foto */}
            <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden order-1 md:order-2 group hover-zoom animate-fade-in-up stagger-4">
              <Image
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/7552c3b8-181d-41c1-8b63-e1dcf527fad6.jpg"
                alt="Conteúdo exclusivo"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-102"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Divisor suave */}
      <div className="section-divider">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q300,80 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(18, 18, 20, 0.3)" />
        </svg>
      </div>

      {/* Benefits Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-center mb-10 sm:mb-12 text-[#F7F3F1] px-4 animate-fade-in-up">
            Por que você deveria assinar
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className={`bg-[#121214] border-[#9A8F88]/10 hover:bg-[#121214]/80 hover:border-[#C69A5B]/30 transition-all duration-300 backdrop-blur-sm group hover-lift animate-fade-in-up stagger-${index + 1}`}>
                <CardHeader className="p-5 sm:p-6 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#C69A5B]/10 flex items-center justify-center mb-4 text-[#C69A5B] border border-[#C69A5B]/20 group-hover:bg-[#C69A5B]/20 group-hover:scale-110 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-[#F7F3F1] text-lg sm:text-xl font-semibold mb-2 text-center">{benefit.title}</CardTitle>
                  <CardDescription className="text-[#9A8F88] text-sm sm:text-base leading-relaxed font-light text-center">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divisor suave */}
      <div className="section-divider">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q300,20 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(18, 18, 20, 0.3)" />
        </svg>
      </div>

      {/* Pricing Section - Premium minimalista */}
      <section className="py-8 sm:py-12 md:py-16 px-4" id="planos">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-12 px-4 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 text-[#F7F3F1]">
              Escolhe seu plano e vem me ter
            </h2>
            <p className="text-[#C69A5B] text-lg sm:text-xl md:text-2xl font-semibold mb-3">
              Quero deixar você duro hoje.
            </p>
            <p className="text-[#9A8F88] text-base sm:text-lg font-light">
              Entre em segundos. Cancele quando quiser. Sem pegadinhas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 px-4">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative group transition-all duration-500 hover-lift animate-fade-in-up stagger-${index + 1} ${
                  plan.name === 'Vitalício'
                    ? 'bg-gradient-to-br from-[#C69A5B]/5 via-[#0B0B0D] to-[#9E4C65]/5 border-2 border-[#C69A5B]/40 shadow-2xl shadow-[#C69A5B]/20'
                    : plan.highlight 
                    ? 'bg-[#0B0B0D] border-2 border-[#C69A5B]/30 shadow-xl shadow-[#C69A5B]/10 md:scale-105' 
                    : 'bg-[#0B0B0D] border-2 border-[#9A8F88]/20 hover:border-[#C69A5B]/30'
                } backdrop-blur-sm`}
              >
                {/* Badge "Mais popular" */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-[#C69A5B] text-[#0B0B0D] px-4 py-1.5 shadow-lg text-sm font-semibold whitespace-nowrap">
                      <Star className="w-3.5 h-3.5 mr-1.5" />
                      Mais escolhido
                    </Badge>
                  </div>
                )}
                
                {/* Badge "Melhor custo-benefício" com fundo MAIS OPACO */}
                {plan.savings && plan.name === 'Vitalício' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-[#C69A5B]/95 text-[#0B0B0D] border-[#C69A5B] px-4 py-1.5 shadow-lg text-sm font-semibold whitespace-nowrap backdrop-blur-sm">
                      {plan.savings}
                    </Badge>
                  </div>
                )}
                
                {/* Badge "Economize" para Mensal */}
                {plan.savings && plan.name === 'Mensal' && (
                  <div className="absolute -top-4 right-4 z-10">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1.5 text-xs font-semibold whitespace-nowrap">
                      {plan.savings}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-8 p-6 pt-8">
                  {/* Ícone do plano */}
                  <div className="w-12 h-12 rounded-xl bg-[#C69A5B]/10 text-[#C69A5B] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
                    {plan.icon}
                  </div>
                  
                  <CardTitle className="text-2xl text-[#F7F3F1] mb-2 font-serif font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-[#9A8F88] text-base font-light">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#9A8F88] text-lg font-light">R$</span>
                      <span className="text-5xl font-bold text-[#F7F3F1]">{plan.price}</span>
                    </div>
                    <span className="text-[#9A8F88] text-sm font-light">por {plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6 p-6 pt-0">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#CFC8C4]">
                        <Check className="w-5 h-5 text-[#C69A5B] flex-shrink-0 mt-0.5" />
                        <span className="text-base font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/checkout?plan=${plan.priceId}`}>
                    <Button 
                      className={`w-full transition-all duration-300 h-12 text-base font-semibold ${
                        plan.name === 'Vitalício'
                          ? 'bg-[#C69A5B] hover:bg-[#C69A5B]/90 shadow-lg shadow-[#C69A5B]/30 hover:shadow-[#C69A5B]/50 hover:scale-105 text-[#0B0B0D]'
                          : plan.highlight
                          ? 'bg-[#C69A5B] hover:bg-[#C69A5B]/90 shadow-lg shadow-[#C69A5B]/30 hover:shadow-[#C69A5B]/50 hover:scale-105 text-[#0B0B0D]'
                          : 'bg-[#F7F3F1]/5 hover:bg-[#C69A5B]/10 border border-[#9A8F88]/20 hover:border-[#C69A5B]/30 text-[#F7F3F1]'
                      }`}
                    >
                      Assinar agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-center text-[#9A8F88] text-sm mt-8 px-4 font-light">
            <Shield className="w-4 h-4 inline mr-1.5 text-[#C69A5B]" />
            Pagamento seguro via Stripe • Cancele quando quiser • Acesso imediato
          </p>
        </div>
      </section>

      {/* Divisor suave */}
      <div className="section-divider">
        <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q300,80 600,50 T1200,50 L1200,100 L0,100 Z" fill="rgba(18, 18, 20, 0.3)" />
        </svg>
      </div>

      {/* Social Proof */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-center mb-10 sm:mb-12 text-[#F7F3F1] px-4 animate-fade-in-up">
            O que eles dizem
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`bg-[#121214] border-[#9A8F88]/10 backdrop-blur-sm hover:bg-[#121214]/80 hover:border-[#C69A5B]/20 transition-all duration-300 hover-lift animate-fade-in-up stagger-${index + 1}`}>
                <CardHeader className="p-5 sm:p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C69A5B] text-[#C69A5B]" />
                    ))}
                  </div>
                  <CardDescription className="text-[#CFC8C4] text-base leading-relaxed font-light">
                    "{testimonial.text}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 sm:p-6 pt-0">
                  <p className="text-sm text-[#9A8F88] font-light">— {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-center mb-10 sm:mb-12 text-[#F7F3F1] px-4 animate-fade-in-up">
            Dúvidas frequentes
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className={`bg-[#121214] border border-[#9A8F88]/10 rounded-xl px-6 backdrop-blur-sm hover:bg-[#121214]/80 hover:border-[#C69A5B]/20 transition-all duration-300 animate-fade-in-up stagger-${index + 1}`}
              >
                <AccordionTrigger className="text-[#F7F3F1] hover:text-[#C69A5B] text-left text-base md:text-lg py-5 transition-colors duration-300 font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#CFC8C4] text-base leading-relaxed pb-5 font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-8 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-[#F7F3F1] px-4 animate-fade-in-up">
            Pronto para me ter?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-[#CFC8C4] mb-10 sm:mb-12 max-w-2xl mx-auto px-4 font-light animate-fade-in-up stagger-1">
            Mais de 3.200 homens já estão dentro. Não fique de fora.
          </p>
          <a href="#planos" className="inline-block w-full sm:w-auto px-4 animate-fade-in-up stagger-2">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] text-lg px-12 py-7 shadow-2xl shadow-[#C69A5B]/40 hover:shadow-[#C69A5B]/60 transition-all duration-300 hover:scale-105 font-semibold animate-pulse-subtle hover:animate-none"
            >
              Entrar agora
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* Footer Premium */}
      <footer className="py-10 sm:py-12 px-4 border-t border-[#9A8F88]/10">
        <div className="container mx-auto max-w-6xl">
          {/* Badges de segurança */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Badge className="bg-[#F7F3F1]/5 text-[#CFC8C4] border-[#9A8F88]/20 px-4 py-2 text-sm">
              <Shield className="w-4 h-4 mr-2 text-[#C69A5B]" />
              +18 Conteúdo adulto
            </Badge>
            <Badge className="bg-[#F7F3F1]/5 text-[#CFC8C4] border-[#9A8F88]/20 px-4 py-2 text-sm">
              <Lock className="w-4 h-4 mr-2 text-[#C69A5B]" />
              100% Confidencial
            </Badge>
            <Badge className="bg-[#F7F3F1]/5 text-[#CFC8C4] border-[#9A8F88]/20 px-4 py-2 text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-[#C69A5B]" />
              Pagamento seguro
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] flex items-center justify-center">
                  <Lock className="w-4 h-4 text-[#F7F3F1]" />
                </div>
                <span className="font-bold text-[#F7F3F1] text-base">Acesso Exclusivo</span>
              </div>
              <p className="text-sm text-[#9A8F88] font-light">
                Conteúdo premium +18
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#F7F3F1] text-base">Links</h3>
              <ul className="space-y-2 text-sm text-[#9A8F88] font-light">
                <li><Link href="/sobre" className="hover:text-[#C69A5B] transition-colors duration-300">Sobre</Link></li>
                <li><Link href="/#planos" className="hover:text-[#C69A5B] transition-colors duration-300">Planos</Link></li>
                <li><Link href="/login" className="hover:text-[#C69A5B] transition-colors duration-300">Entrar</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#F7F3F1] text-base">Legal</h3>
              <ul className="space-y-2 text-sm text-[#9A8F88] font-light">
                <li><Link href="/suporte" className="hover:text-[#C69A5B] transition-colors duration-300">Suporte</Link></li>
                <li><Link href="/privacidade" className="hover:text-[#C69A5B] transition-colors duration-300">Privacidade</Link></li>
                <li><Link href="/termos" className="hover:text-[#C69A5B] transition-colors duration-300">Termos de Uso</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#F7F3F1] text-base">Contato</h3>
              <ul className="space-y-2 text-sm text-[#9A8F88] font-light">
                <li>suporte@lyamonteiro.com.br</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#9A8F88]/10 text-center">
            <p className="text-sm text-[#9A8F88] mb-3 font-light">
              © 2024 Acesso Exclusivo. Todos os direitos reservados.
            </p>
            <p className="text-xs text-[#9A8F88]/70 font-light">
              Ambiente seguro e discreto. Seus dados são protegidos com criptografia de ponta.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
