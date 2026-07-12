import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { Locale } from '@/data/content'

type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
  dir: 'ltr' | 'rtl'
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem('fratelanza-locale')
    return (saved === 'ar' ? 'ar' : 'en') as Locale
  })

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('fratelanza-locale', newLocale)
  }, [])

  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale, dir])

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export function useT() {
  const { locale } = useI18n()
  return <T extends { en: string; ar: string }>(obj: T) => obj[locale]
}
