"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient as createClient } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, File } from "lucide-react";

export default function MateriaisPage() {
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

  const materiais = [
    {
      id: 1,
      title: "Guia Completo - Fundamentos",
      description: "PDF com todos os conceitos fundamentais explicados detalhadamente",
      type: "PDF",
      size: "2.5 MB",
      pages: 45,
      icon: "📄"
    },
    {
      id: 2,
      title: "Apostila Prática",
      description: "Exercícios práticos e exemplos reais para aplicação imediata",
      type: "PDF",
      size: "3.8 MB",
      pages: 68,
      icon: "📚"
    },
    {
      id: 3,
      title: "Checklist de Implementação",
      description: "Lista completa de verificação para implementar corretamente",
      type: "PDF",
      size: "1.2 MB",
      pages: 12,
      icon: "✅"
    },
    {
      id: 4,
      title: "Templates Prontos",
      description: "Modelos editáveis para você usar em seus projetos",
      type: "DOCX",
      size: "890 KB",
      pages: 25,
      icon: "📝"
    },
    {
      id: 5,
      title: "Planilhas de Cálculo",
      description: "Planilhas Excel com fórmulas prontas para análise",
      type: "XLSX",
      size: "1.5 MB",
      pages: 8,
      icon: "📊"
    },
    {
      id: 6,
      title: "Infográficos Exclusivos",
      description: "Visualizações gráficas dos conceitos principais",
      type: "PDF",
      size: "4.2 MB",
      pages: 15,
      icon: "🎨"
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
              <h1 className="text-2xl font-bold text-white">Materiais Didáticos</h1>
              <p className="text-sm text-gray-400">
                {materiais.length} materiais disponíveis para download
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {materiais.map((material) => (
            <Card
              key={material.id}
              className="bg-gray-800/50 border-gray-700 hover:border-[#D4AF37]/50 transition-all p-6 group"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/20 rounded-lg flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {material.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {material.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <File className="w-3 h-3" />
                      {material.type}
                    </span>
                    <span>{material.size}</span>
                    <span>{material.pages} páginas</span>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-semibold hover:opacity-90">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar Material
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Box */}
        <Card className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Dica Importante</h3>
              <p className="text-gray-300">
                Todos os materiais são atualizados regularmente. Volte sempre para conferir novos conteúdos e versões atualizadas dos materiais existentes.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
