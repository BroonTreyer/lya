"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient as createClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Clock, Calendar } from "lucide-react";

export default function VideosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/login");
      return;
    }

    // Verificar assinatura ativa
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single();

    if (!subData) {
      router.push("/membros");
      return;
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  const videos = [
    {
      id: 1,
      title: "Introdução ao Curso",
      description: "Aprenda os fundamentos básicos e prepare-se para o conteúdo avançado",
      duration: "15:30",
      date: "2024-01-15",
      thumbnail: "🎬"
    },
    {
      id: 2,
      title: "Módulo 1 - Conceitos Fundamentais",
      description: "Entenda os conceitos essenciais que você precisa dominar",
      duration: "28:45",
      date: "2024-01-16",
      thumbnail: "📚"
    },
    {
      id: 3,
      title: "Módulo 2 - Prática Avançada",
      description: "Coloque em prática tudo que você aprendeu até agora",
      duration: "42:20",
      date: "2024-01-17",
      thumbnail: "🚀"
    },
    {
      id: 4,
      title: "Módulo 3 - Casos Reais",
      description: "Análise de casos reais e aplicações práticas",
      duration: "35:15",
      date: "2024-01-18",
      thumbnail: "💼"
    },
    {
      id: 5,
      title: "Módulo 4 - Estratégias Avançadas",
      description: "Técnicas avançadas para maximizar seus resultados",
      duration: "38:50",
      date: "2024-01-19",
      thumbnail: "🎯"
    },
    {
      id: 6,
      title: "Bônus - Dicas Exclusivas",
      description: "Conteúdo bônus com dicas e truques dos especialistas",
      duration: "22:30",
      date: "2024-01-20",
      thumbnail: "⭐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/membros")}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Vídeos Exclusivos</h1>
              <p className="text-sm text-gray-400">
                {videos.length} vídeos disponíveis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="bg-gray-800/50 border-gray-700 hover:border-[#D4AF37]/50 transition-all overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {video.thumbnail}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(video.date).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-semibold hover:opacity-90">
                  <Play className="w-4 h-4 mr-2" />
                  Assistir Agora
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
