import { useCallback } from 'react'
import { useI18n } from './context'
import { getUi, type UiKey } from './translations'
import { t as contentT, type Locale } from '@/data/content'

export function useTranslation() {
  const { locale, setLocale, dir } = useI18n()

  const ui = useCallback(
    <K extends UiKey, S extends keyof (typeof import('./translations'))['ui'][K]>(
      section: K,
      key: S,
    ) => getUi(section, key, locale),
    [locale],
  )

  const t = useCallback(
    <T extends { en: string; ar: string }>(obj: T) => contentT(obj, locale),
    [locale],
  )

  return {
    locale,
    setLocale,
    dir,
    isAr: locale === 'ar',
    ui,
    t,
  }
}

export type { Locale }
