import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n()

  return (
    <div className={cn('flex items-center rounded-xl glass p-0.5', className)}>
      {(['en', 'ar'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={cn(
            'px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 font-display',
            locale === lang
              ? 'bg-brand-100 text-brand-700 shadow-sm border border-brand-200/60'
              : 'text-ink-subtle hover:text-brand-700 hover:bg-brand-50/80',
          )}
        >
          {lang === 'en' ? 'EN' : 'عربي'}
        </button>
      ))}
    </div>
  )
}
