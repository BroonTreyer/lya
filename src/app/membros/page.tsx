"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // ✔ CORRIGIDO
import { checkSubscriptionStatus, getUser, signOut } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  Lock,
  LogOut,
  User,
  Crown,
  Zap,
  Sparkles,
  Settings,
} from "lucide-react";
import Link from "next/link";

export default function MembrosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const currentUser = await getUser();

      if (!currentUser) {
        router.push("/cadastro");
        return;
      }

      setUser(currentUser);

      // Verificar status da assinatura
      const subStatus = await checkSubscriptionStatus(
        currentUser.id,
        currentUser.email
      );

      if (!subStatus.hasAccess) {
        router.push("/checkout");
        return;
      }

      setSubscriptionInfo(subStatus);
      setProfile(subStatus.profile);
    } catch (error) {
      console.error("Erro ao verificar acesso:", error);
      router.push("/cadastro");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case "semanal":
        return Zap;
      case "mensal":
        return Sparkles;
      case "vitalicio":
        return Crown;
      default:
        return Lock;
    }
  };

  const getPlanName = (planType: string) => {
    switch (planType) {
      case "semanal":
        return "Semanal";
      case "mensal":
        return "Mensal";
      case "vitalicio":
        return "Vitalício";
      default:
        return "Plano";
    }
  };

  const getStatusBadge = (status: string, isVip: boolean) => {
    if (isVip) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
          VIP
        </Badge>
      );
    }

    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Ativo
          </Badge>
        );
      case "lifetime":
        return (
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            Vitalício
          </Badge>
        );
      case "trialing":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Período de teste
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            {status}
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="text-[#CFC8C4]">Verificando acesso...</div>
      </div>
    );
  }

  const PlanIcon = profile?.plan_type
    ? getPlanIcon(profile.plan_type)
    : Lock;

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#0B0B0D]">
      {/* Header */}
      <header className="border-b border-[#9A8F88]/20 bg-[#121214]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#F7F3F1]" />
              </div>
              <span className="text-xl font-serif font-bold text-[#F7F3F1]">
                Área de Membros
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/perfil">
                <Button
                  variant="ghost"
                  className="text-[#CFC8C4] hover:text-[#F7F3F1] hover:bg-[#F7F3F1]/5"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Perfil
                </Button>
              </Link>

              <Button
                onClick={handleSignOut}
                variant="ghost"
                className="text-[#CFC8C4] hover:text-[#F7F3F1] hover:bg-[#F7F3F1]/5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>

              <Link href="/perfil">
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#C69A5B] transition-all">
                  <AvatarImage
                    src={profile?.avatar_url}
                    alt={profile?.full_name || user?.email}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] text-[#F7F3F1]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-12">
        {/* Card de boas-vindas */}
        <Card className="bg-gradient-to-br from-[#C69A5B]/10 to-[#9E4C65]/10 border-[#C69A5B]/20 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl text-[#F7F3F1] mb-2">
                  Bem-vindo(a),{" "}
                  {profile?.full_name || user?.email?.split("@")[0]}! 👋
                </CardTitle>
                <CardDescription className="text-[#CFC8C4] text-lg">
                  Você tem acesso total ao conteúdo exclusivo
                </CardDescription>
              </div>
              <div className="text-right">
                {getStatusBadge(
                  subscriptionInfo?.status,
                  subscriptionInfo?.isVip
                )}

                {profile?.plan_type && (
                  <div className="flex items-center gap-2 mt-2 text-[#CFC8C4]">
                    <PlanIcon className="w-4 h-4" />
                    <span className="text-sm">
                      Plano {getPlanName(profile.plan_type)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Conteúdo exclusivo */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card
              key={item}
              className="bg-[#121214] border-[#9A8F88]/20 hover:border-[#C69A5B]/50 transition-all cursor-pointer group"
            >
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-[#C69A5B]/20 to-[#9E4C65]/20 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Lock className="w-12 h-12 text-[#C69A5B]" />
                </div>
                <CardTitle className="text-[#F7F3F1]">
                  Conteúdo Exclusivo #{item}
                </CardTitle>
                <CardDescription className="text-[#9A8F88]">
                  Acesso liberado para membros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D]">
                  Acessar conteúdo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
