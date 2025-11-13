"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'pt-br' | 'pt-pt' | 'en' | 'es' | 'fr' | 'it' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt-br')
  const [isClient, setIsClient] = useState(false)

  // Detectar idioma do navegador
  const detectBrowserLanguage = (): Language => {
    if (typeof window === 'undefined') return 'pt-br'
    
    const browserLang = navigator.language.toLowerCase()
    
    // Mapeamento de idiomas do navegador para nossos idiomas suportados
    if (browserLang.startsWith('pt-pt') || browserLang === 'pt') return 'pt-pt'
    if (browserLang.startsWith('pt-br')) return 'pt-br'
    if (browserLang.startsWith('en')) return 'en'
    if (browserLang.startsWith('es')) return 'es'
    if (browserLang.startsWith('fr')) return 'fr'
    if (browserLang.startsWith('it')) return 'it'
    if (browserLang.startsWith('de')) return 'de'
    
    // Fallback para português do Brasil
    return 'pt-br'
  }

  // Inicializar idioma
  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language
    
    if (savedLanguage && ['pt-br', 'pt-pt', 'en', 'es', 'fr', 'it', 'de'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      const detectedLang = detectBrowserLanguage()
      setLanguageState(detectedLang)
      localStorage.setItem('preferredLanguage', detectedLang)
    }
  }, [])

  // Atualizar idioma e salvar preferência
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang)
    }
  }

  // Função de tradução
  const t = (key: string): string => {
    if (!isClient) return key
    
    // Import dinâmico das traduções
    const translations = require('../lib/translations').translations
    
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback para português do Brasil se a chave não existir
        value = translations['pt-br']
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
