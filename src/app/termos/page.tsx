import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"

export default function TermosPage() {
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
            Termos de Uso
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
                1. Aceitação dos Termos
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Ao acessar e usar este serviço, você aceita e concorda em cumprir estes Termos de Uso. 
                  Se você não concorda com qualquer parte destes termos, não deve usar nosso serviço.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                2. Requisitos de Idade
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Você deve ter pelo menos 18 anos de idade para usar este serviço. Ao criar uma conta, 
                  você declara e garante que tem 18 anos ou mais.
                </p>
                <p className="text-[#9A8F88]">
                  Este é um serviço de conteúdo adulto e é estritamente proibido para menores de idade.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                3. Conta de Usuário
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Para acessar o conteúdo exclusivo, você deve:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Criar uma conta com informações verdadeiras e precisas</li>
                  <li>Manter a segurança de sua senha</li>
                  <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                  <li>Ser responsável por todas as atividades em sua conta</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                4. Assinaturas e Pagamentos
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  <strong className="text-[#F7F3F1]">4.1 Planos de Assinatura:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Semanal: Renovação automática a cada 7 dias</li>
                  <li>Mensal: Renovação automática a cada 30 dias</li>
                  <li>Vitalício: Pagamento único, acesso permanente</li>
                </ul>
                
                <p className="mt-4">
                  <strong className="text-[#F7F3F1]">4.2 Pagamento:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Todos os pagamentos são processados via Stripe</li>
                  <li>Você deve fornecer informações de pagamento válidas</li>
                  <li>Preços estão sujeitos a alterações com aviso prévio</li>
                  <li>Não oferecemos reembolsos após o acesso ao conteúdo</li>
                </ul>

                <p className="mt-4">
                  <strong className="text-[#F7F3F1]">4.3 Renovação Automática:</strong>
                </p>
                <p className="text-[#9A8F88]">
                  Assinaturas semanais e mensais são renovadas automaticamente. Você pode cancelar 
                  a qualquer momento através do painel de membros.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                5. Cancelamento
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Você pode cancelar sua assinatura a qualquer momento:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Acesse o painel de membros e clique em "Cancelar assinatura"</li>
                  <li>Você manterá acesso até o fim do período pago</li>
                  <li>Não há multas ou taxas de cancelamento</li>
                  <li>Após o cancelamento, não haverá mais cobranças</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                6. Uso Aceitável
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Você concorda em NÃO:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Compartilhar sua conta ou credenciais de acesso</li>
                  <li>Copiar, distribuir ou reproduzir o conteúdo</li>
                  <li>Fazer download ou captura de tela do conteúdo</li>
                  <li>Usar o serviço para fins ilegais ou não autorizados</li>
                  <li>Tentar acessar áreas restritas do sistema</li>
                  <li>Fazer engenharia reversa ou descompilar o serviço</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                7. Propriedade Intelectual
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Todo o conteúdo disponível no serviço, incluindo textos, imagens, vídeos, logotipos e design, 
                  é propriedade exclusiva e protegido por leis de direitos autorais.
                </p>
                <p className="text-[#9A8F88]">
                  Sua assinatura concede apenas uma licença limitada, não exclusiva e intransferível para 
                  visualizar o conteúdo para uso pessoal.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                8. Privacidade e Discrição
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Levamos sua privacidade a sério:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Cobranças aparecem como "Serviço Digital MP" na fatura</li>
                  <li>Não compartilhamos suas informações com terceiros</li>
                  <li>Todos os dados são criptografados</li>
                  <li>Consulte nossa Política de Privacidade para mais detalhes</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                9. Suspensão e Encerramento
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Reservamos o direito de suspender ou encerrar sua conta se:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>Você violar estes Termos de Uso</li>
                  <li>Houver atividade fraudulenta ou suspeita</li>
                  <li>Você compartilhar conteúdo ou credenciais</li>
                  <li>Houver falha no pagamento</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                10. Isenção de Garantias
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  O serviço é fornecido "como está" e "conforme disponível". Não garantimos que:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#9A8F88]">
                  <li>O serviço será ininterrupto ou livre de erros</li>
                  <li>Defeitos serão corrigidos imediatamente</li>
                  <li>O serviço atenderá suas expectativas específicas</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                11. Limitação de Responsabilidade
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Não seremos responsáveis por quaisquer danos indiretos, incidentais, especiais ou 
                  consequenciais resultantes do uso ou incapacidade de usar o serviço.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                12. Alterações nos Termos
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Podemos modificar estes termos a qualquer momento. Alterações significativas serão 
                  notificadas por email ou através do site. O uso continuado do serviço após as alterações 
                  constitui aceitação dos novos termos.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                13. Lei Aplicável
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Estes termos são regidos pelas leis brasileiras. Quaisquer disputas serão resolvidas 
                  nos tribunais competentes do Brasil.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-[#F7F3F1] mb-4">
                14. Contato
              </h2>
              <div className="text-[#CFC8C4] space-y-3">
                <p>
                  Para questões sobre estes termos, entre em contato:
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
