import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n()

  return (
    <div className={cn('flex items-center rounded-xl bg-slate-100 p-1', className)}>
      {(['en', 'ar'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={cn(
            'px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 font-display',
            locale === lang
              ? 'bg-white text-navy-900 shadow-sm'
              : 'text-slate-500 hover:text-navy-900',
          )}
        >
          {lang === 'en' ? 'EN' : 'عربي'}
        </button>
      ))}
    </div>
  )
}
