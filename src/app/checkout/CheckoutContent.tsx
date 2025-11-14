"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Check, CreditCard, Shield, Sparkles, Crown, Zap } from "lucide-react";
import { createBrowserClient as createClient } from "@/lib/supabase";

export default function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");

  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(planParam || "price_monthly");

  const plans = {
    price_weekly: {
      name: "Semanal",
      price: "9,90",
      period: "semana",
      icon: Zap,
      description: "Experimente por uma semana",
      features: [
        "Acesso total ilimitado",
        "Conteúdo novo toda semana",
        "Suporte VIP 24/7",
        "Cancele quando quiser",
      ],
    },
    price_monthly: {
      name: "Mensal",
      price: "25,90",
      period: "mês",
      icon: Sparkles,
      description: "Mais popular entre os membros",
      features: [
        "Acesso total ilimitado",
        "Conteúdo novo toda semana",
        "Suporte VIP 24/7",
        "Sets exclusivos mensais",
        "Cancele quando quiser",
      ],
      savings: "Economize 62%",
      popular: true,
    },
    price_lifetime: {
      name: "Vitalício",
      price: "98,90",
      period: "único",
      icon: Crown,
      description: "Melhor investimento - acesso para sempre",
      features: [
        "Acesso total ilimitado",
        "Conteúdo novo toda semana",
        "Suporte VIP 24/7",
        "Sets exclusivos mensais",
        "Acesso vitalício garantido",
        "Conteúdo de arquivo completo",
        "Prioridade em novos conteúdos",
      ],
      savings: "Melhor custo-benefício",
    },
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (error || !currentUser) {
        router.push("/cadastro");
        return;
      }

      setUser(currentUser);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      router.push("/cadastro");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push("/cadastro");
      return;
    }

    setProcessingPayment(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: selectedPlan }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Erro ao criar checkout");

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não recebida");
      }
    } catch (error: any) {
      alert(error.message);
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="text-[#CFC8C4]">Carregando...</div>
      </div>
    );
  }

  const currentPlan = plans[selectedPlan as keyof typeof plans];

  if (!currentPlan) {
    return (
      <div className="text-center text-white">
        Plano inválido. Redirecionando...
      </div>
    );
  }

  const PlanIcon = currentPlan.icon;

  return (
    <div className="min-h-screen bg-[#0B0B0D] px-4 py-12">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#F7F3F1]" />
            </div>
            <span className="text-xl font-serif font-bold text-[#F7F3F1]">
              Acesso Exclusivo
            </span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F7F3F1] mb-4">
            Escolha seu plano
          </h1>

          <p className="text-[#9A8F88] text-lg font-light max-w-2xl mx-auto">
            Você está a um passo de ter acesso total ao conteúdo mais exclusivo e íntimo
          </p>
        </div>

        {/* Grid de planos */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {Object.entries(plans).map(([key, plan]) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === key;

            return (
              <Card
                key={key}
                className={`relative bg-[#121214] transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#C69A5B] shadow-[#C69A5B]/20 shadow-lg scale-105"
                    : "border-[#9A8F88]/20 hover:border-[#C69A5B]/50"
                }`}
                onClick={() => setSelectedPlan(key)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C69A5B]/20 to-[#9E4C65]/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#C69A5B]" />
                  </div>

                  <CardTitle className="text-[#F7F3F1] text-2xl mb-2">
                    {plan.name}
                  </CardTitle>

                  <CardDescription className="text-[#9A8F88] text-sm">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-[#9A8F88] text-sm">R$</span>
                      <span className="text-4xl font-bold text-[#F7F3F1]">
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-[#9A8F88] text-sm">por {plan.period}</span>
                  </div>

                  {"savings" in plan && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs mt-2">
                      {plan.savings}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C69A5B]" />
                        <span className="text-sm text-[#CFC8C4]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      isSelected
                        ? "bg-[#C69A5B] text-black"
                        : "bg-[#0B0B0D] text-[#CFC8C4] border border-[#9A8F88]/20"
                    }`}
                  >
                    {isSelected ? "Plano selecionado" : "Selecionar plano"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CARD FINALIZAÇÃO */}
        <Card className="bg-[#121214] border-[#9A8F88]/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-[#F7F3F1] text-center text-2xl">
              Finalizar assinatura
            </CardTitle>
            <CardDescription className="text-[#9A8F88] text-center">
              Pagamento 100% seguro via Stripe
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* RESUMO */}
            <div className="bg-[#0B0B0D] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C69A5B]/20 to-[#9E4C65]/20 flex items-center justify-center">
                    <PlanIcon className="w-5 h-5 text-[#C69A5B]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Plano {currentPlan.name}
                    </h3>
                    <p className="text-sm text-[#9A8F88]">
                      {currentPlan.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#9A8F88] text-sm">R$</span>
                    <span className="text-3xl font-bold text-white">
                      {currentPlan.price}
                    </span>
                  </div>
                  <span className="text-[#9A8F88] text-sm">
                    por {currentPlan.period}
                  </span>
                </div>
              </div>
            </div>

            {/* Segurança */}
            <div className="bg-[#C69A5B]/10 border border-[#C69A5B]/20 rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#C69A5B]" />
              <p className="text-sm text-[#CFC8C4]">
                Pagamento seguro via Stripe com criptografia de ponta.
              </p>
            </div>

            {/* BOTÃO */}
            <Button
              onClick={handleCheckout}
              disabled={processingPayment}
              className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] h-14 text-lg font-semibold"
            >
              {processingPayment ? "Processando..." : `Finalizar pagamento • R$ ${currentPlan.price}`}
            </Button>

            <p className="text-xs text-[#9A8F88] text-center">
              Ao continuar, você concorda com nossos{" "}
              <Link href="/termos" className="text-[#C69A5B] underline">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="/privacidade" className="text-[#C69A5B] underline">
                Política de Privacidade
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Shield className="w-5 h-5 text-[#C69A5B] inline-block mr-2" />
          <span className="text-sm text-[#CFC8C4]">
            Garantia de segurança • Suporte 24/7
          </span>
        </div>
      </div>
    </div>
  );
}
