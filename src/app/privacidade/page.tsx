import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0D] px-4 py-12">
      <div className="container mx-auto max-w-4xl">
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
          <h1 className="text-4xl font-serif font-bold text-[#F7F3F1] mb-4">
            Política de Privacidade
          </h1>
          <p className="text-[#9A8F88]">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Conteúdo */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-[#121214] border border-[#9A8F88]/20 rounded-2xl p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                1. Informações que Coletamos
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Coletamos informações que você nos fornece diretamente ao criar uma conta, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Nome completo e endereço de email</li>
                  <li>Informações de pagamento (processadas via Stripe)</li>
                  <li>Histórico de assinaturas e transações</li>
                  <li>Preferências de comunicação</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                2. Como Usamos Suas Informações
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Fornecer, manter e melhorar nossos serviços</li>
                  <li>Processar pagamentos e gerenciar assinaturas</li>
                  <li>Enviar notificações importantes sobre sua conta</li>
                  <li>Responder a solicitações de suporte</li>
                  <li>Prevenir fraudes e garantir segurança</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                3. Compartilhamento de Informações
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Não vendemos suas informações pessoais. Compartilhamos informações apenas com:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Processadores de pagamento (Stripe) para transações</li>
                  <li>Provedores de serviços que nos ajudam a operar a plataforma</li>
                  <li>Autoridades legais quando exigido por lei</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                4. Segurança dos Dados
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Implementamos medidas de segurança robustas para proteger suas informações:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Criptografia de ponta em todas as transmissões de dados</li>
                  <li>Armazenamento seguro em servidores protegidos</li>
                  <li>Acesso restrito apenas a pessoal autorizado</li>
                  <li>Monitoramento contínuo de atividades suspeitas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                5. Seus Direitos
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Você tem direito a:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos ou incompletos</li>
                  <li>Solicitar exclusão de sua conta e dados</li>
                  <li>Optar por não receber comunicações de marketing</li>
                  <li>Exportar seus dados em formato legível</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                6. Cookies e Tecnologias Similares
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Utilizamos cookies para melhorar sua experiência, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Cookies essenciais para funcionamento do site</li>
                  <li>Cookies de preferências para lembrar suas escolhas</li>
                  <li>Cookies analíticos para entender como você usa o site</li>
                </ul>
                <p className="mt-3">
                  Você pode gerenciar suas preferências de cookies através do banner que aparece ao acessar o site.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                7. Retenção de Dados
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Mantemos suas informações pelo tempo necessário para fornecer nossos serviços e cumprir obrigações legais. 
                  Após o cancelamento da conta, seus dados são mantidos por até 90 dias antes da exclusão permanente.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                8. Menores de Idade
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Nosso serviço é destinado exclusivamente a maiores de 18 anos. Não coletamos intencionalmente 
                  informações de menores de idade. Se tomarmos conhecimento de que coletamos dados de um menor, 
                  tomaremos medidas imediatas para excluir essas informações.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                9. Alterações nesta Política
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças significativas 
                  por email ou através de um aviso em nosso site. Recomendamos revisar esta página regularmente.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                10. Contato
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Para questões sobre privacidade ou para exercer seus direitos, entre em contato:
                </p>
                <p className="text-[#C69A5B] font-medium">
                  Email: suporte@lyamonteiro.com.br
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Botão voltar */}
        <div className="text-center mt-8">
          <Link href="/">
            <Button
              variant="outline"
              className="border-[#9A8F88]/20 text-[#CFC8C4] hover:bg-[#F7F3F1]/5 hover:text-[#F7F3F1]"
            >
              ← Voltar para página inicial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
