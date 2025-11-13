"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getUser, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Camera, Save, LogOut } from "lucide-react"
import Link from "next/link"

export default function PerfilPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    full_name: '',
    avatar_url: '',
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const currentUser = await getUser()
      
      if (!currentUser) {
        router.push("/cadastro")
        return
      }

      setUser(currentUser)

      // Buscar perfil
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single()

      if (profileData) {
        setProfile(profileData)
        setFormData({
          full_name: profileData.full_name || '',
          avatar_url: profileData.avatar_url || '',
        })
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      alert('Perfil atualizado com sucesso!')
      loadProfile()
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error)
      alert('Erro ao salvar perfil: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center">
        <div className="text-[#CFC8C4]">Carregando perfil...</div>
      </div>
    )
  }

  const initials = formData.full_name 
    ? formData.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <div className="min-h-screen bg-[#0B0B0D] px-4 py-12">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/membros">
            <Button variant="ghost" className="text-[#CFC8C4] hover:text-[#F7F3F1] hover:bg-[#F7F3F1]/5 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para área de membros
            </Button>
          </Link>
          <h1 className="text-4xl font-serif font-bold text-[#F7F3F1] mb-2">
            Meu Perfil
          </h1>
          <p className="text-[#9A8F88]">
            Gerencie suas informações pessoais
          </p>
        </div>

        {/* Card do perfil */}
        <Card className="bg-[#121214] border-[#9A8F88]/20">
          <CardHeader>
            <CardTitle className="text-[#F7F3F1]">Informações pessoais</CardTitle>
            <CardDescription className="text-[#9A8F88]">
              Atualize sua foto e nome de exibição
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={formData.avatar_url} alt={formData.full_name || user?.email} />
                <AvatarFallback className="bg-gradient-to-br from-[#C69A5B] to-[#9E4C65] text-[#F7F3F1] text-3xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="w-full space-y-2">
                <Label htmlFor="avatar_url" className="text-[#CFC8C4]">
                  URL da foto de perfil
                </Label>
                <Input
                  id="avatar_url"
                  type="url"
                  placeholder="https://exemplo.com/foto.jpg"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  className="bg-[#0B0B0D] border-[#9A8F88]/20 text-[#F7F3F1] placeholder:text-[#9A8F88]"
                />
                <p className="text-xs text-[#9A8F88]">
                  Cole a URL de uma imagem pública
                </p>
              </div>
            </div>

            {/* Nome completo */}
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-[#CFC8C4]">
                Nome completo
              </Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-[#0B0B0D] border-[#9A8F88]/20 text-[#F7F3F1] placeholder:text-[#9A8F88]"
              />
            </div>

            {/* Email (somente leitura) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#CFC8C4]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-[#0B0B0D]/50 border-[#9A8F88]/20 text-[#9A8F88] cursor-not-allowed"
              />
              <p className="text-xs text-[#9A8F88]">
                O email não pode ser alterado
              </p>
            </div>

            {/* Botões de ação */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#C69A5B] hover:bg-[#C69A5B]/90 text-[#0B0B0D] disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Salvando...' : 'Salvar alterações'}
              </Button>
              
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="border-[#9A8F88]/20 text-[#CFC8C4] hover:bg-[#F7F3F1]/5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informações da assinatura */}
        {profile && (
          <Card className="bg-[#121214] border-[#9A8F88]/20 mt-6">
            <CardHeader>
              <CardTitle className="text-[#F7F3F1]">Assinatura</CardTitle>
              <CardDescription className="text-[#9A8F88]">
                Informações sobre seu plano
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b border-[#9A8F88]/10">
                <span className="text-[#9A8F88]">Plano:</span>
                <span className="text-[#F7F3F1] font-medium">
                  {profile.plan_type === 'semanal' && 'Semanal'}
                  {profile.plan_type === 'mensal' && 'Mensal'}
                  {profile.plan_type === 'vitalicio' && 'Vitalício'}
                  {!profile.plan_type && 'Nenhum'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#9A8F88]/10">
                <span className="text-[#9A8F88]">Status:</span>
                <span className="text-[#F7F3F1] font-medium">
                  {profile.subscription_status === 'active' && 'Ativo'}
                  {profile.subscription_status === 'lifetime' && 'Vitalício'}
                  {profile.subscription_status === 'canceled' && 'Cancelado'}
                  {!profile.subscription_status && 'Inativo'}
                </span>
              </div>
              {profile.stripe_customer_id && (
                <div className="flex justify-between py-2">
                  <span className="text-[#9A8F88]">ID do cliente:</span>
                  <span className="text-[#F7F3F1] font-mono text-xs">
                    {profile.stripe_customer_id.slice(0, 20)}...
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
