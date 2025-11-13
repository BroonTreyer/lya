"use client"

import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const languages = [
  { code: 'pt-br', name: 'Português (BR)', flag: '🇧🇷' },
  { code: 'pt-pt', name: 'Português (PT)', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as any)
    setIsOpen(false)
  }

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F7F3F1]/5 hover:bg-[#F7F3F1]/10 border border-[#9A8F88]/20 hover:border-[#C69A5B]/30 transition-all duration-300 group"
        aria-label="Selecionar idioma"
      >
        <span className="text-xl">{currentLanguage?.flag}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-56 bg-[#121214] border border-[#9A8F88]/20 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-fade-in-up"
          style={{
            animation: 'fade-in-up 0.2s ease-out forwards'
          }}
        >
          <div className="py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
                  language === lang.code
                    ? 'bg-[#C69A5B]/10 text-[#C69A5B] font-medium'
                    : 'text-[#CFC8C4] hover:bg-[#F7F3F1]/5 hover:text-[#F7F3F1]'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {language === lang.code && (
                  <span className="ml-auto text-[#C69A5B]">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
