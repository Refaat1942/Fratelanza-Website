import { useI18n } from '@/i18n/context'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n()

  return (
    <div className={cn('flex items-center rounded-lg glass p-0.5', className)}>
      {(['en', 'ar'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          className={cn(
            'px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200',
            locale === lang
              ? 'bg-gold-500/20 text-gold-300 shadow-sm'
              : 'text-white/50 hover:text-white/80',
          )}
        >
          {lang === 'en' ? 'EN' : 'عربي'}
        </button>
      ))}
    </div>
  )
}
