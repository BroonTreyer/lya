"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, CreditCard } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

export function UserProfileMenu() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      // Buscar perfil do usuário
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      } else {
        // Criar perfil básico se não existir
        const newProfile: UserProfile = {
          id: user.id,
          email: user.email || '',
          first_name: user.user_metadata?.first_name || null,
          last_name: user.user_metadata?.last_name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
        };

        // Tentar criar perfil (pode falhar se tabela não existir)
        try {
          await supabase.from("user_profiles").insert(newProfile);
        } catch (insertError) {
          console.log("Tabela user_profiles não existe ainda");
        }
        
        setProfile(newProfile);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading || !profile) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
    );
  }

  // Garantir que sempre temos valores válidos
  const firstName = profile.first_name || '';
  const lastName = profile.last_name || '';
  const email = profile.email || '';
  
  const initials = firstName && lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : firstName
      ? firstName[0].toUpperCase()
      : email
        ? email[0].toUpperCase()
        : 'U';
  
  const displayName = firstName && lastName
    ? `${firstName} ${lastName}`
    : firstName
      ? firstName
      : email.split('@')[0] || 'Usuário';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex items-center gap-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all hover:opacity-80">
          <Avatar className="h-10 w-10 border-2 border-[#D4AF37]">
            <AvatarImage src={profile.avatar_url || undefined} alt={displayName} />
            <AvatarFallback className="bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] text-black font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{displayName}</p>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
        <DropdownMenuLabel className="text-gray-300">
          Minha Conta
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={() => router.push("/perfil")}
          className="text-gray-300 focus:bg-gray-700 focus:text-white cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          Meu Perfil
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push("/assinatura")}
          className="text-gray-300 focus:bg-gray-700 focus:text-white cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Assinatura
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => router.push("/configuracoes")}
          className="text-gray-300 focus:bg-gray-700 focus:text-white cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-red-400 focus:bg-gray-700 focus:text-red-300 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
