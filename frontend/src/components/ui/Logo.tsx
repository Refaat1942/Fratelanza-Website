import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { company } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  variant?: 'default' | 'header'
  showSlogan?: boolean
  showName?: boolean
  animated?: boolean
  className?: string
}

const iconSizes = {
  sm: 'h-9 w-9',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
  hero: 'h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48',
}

const headerIconSizes = {
  sm: 'h-10 w-10',
  md: 'h-11 w-11',
  lg: 'h-12 w-12',
  xl: 'h-14 w-14',
  hero: 'h-10 w-10',
}

export function Logo({
  size = 'md',
  variant = 'default',
  showSlogan = false,
  showName = false,
  animated = false,
  className,
}: LogoProps) {
  const { t } = useTranslation()
  const slogan = t(company.slogan)
  const isHeader = variant === 'header'

  const framedLogo = isHeader ? (
    <div
      className={cn(
        'relative shrink-0 rounded-2xl bg-white p-1 shadow-md shadow-brand-500/10 ring-1 ring-slate-200/80',
        headerIconSizes[size],
      )}
    >
      <div className="w-full h-full rounded-xl bg-gradient-to-br from-brand-50 via-white to-mint-50 flex items-center justify-center overflow-hidden">
        <img
          src="/logo.png"
          alt={company.name}
          className={cn('w-[82%] h-[82%] object-contain', className)}
        />
      </div>
    </div>
  ) : (
    <div
      className={cn(
        'relative rounded-3xl bg-white p-1.5 shadow-lg shadow-brand-500/15 ring-2 ring-brand-200/60',
        iconSizes[size],
      )}
    >
      <div className="w-full h-full rounded-[1.25rem] bg-gradient-to-br from-brand-50 via-white to-gold-50 flex items-center justify-center overflow-hidden">
        <img
          src="/logo.png"
          alt={company.name}
          className={cn('w-[88%] h-[88%] object-contain', className)}
        />
      </div>
    </div>
  )

  const content = (
    <div className={cn('flex items-center', isHeader ? 'gap-3' : 'gap-4', showName && 'flex-row')}>
      {framedLogo}
      {showName && (
        <div className={cn(isHeader ? 'hidden md:block min-w-0' : 'hidden sm:block')}>
          <p
            className={cn(
              'font-display font-extrabold leading-none text-ink',
              isHeader ? 'text-lg tracking-tight' : 'text-xl sm:text-2xl tracking-tight',
            )}
          >
            <span className="text-gradient-premium">{company.name}</span>
          </p>
          {!isHeader && (
            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-mint-600 mt-1 max-w-[180px] leading-snug">
              {slogan}
            </p>
          )}
        </div>
      )}
    </div>
  )

  if (!animated) {
    return (
      <div className={cn('flex flex-col', isHeader ? 'items-start' : 'items-center')}>
        {showName || isHeader ? content : framedLogo}
        {showSlogan && !isHeader && <Slogan text={slogan} className="mt-5" />}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-300/30 to-mint-300/25 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          whileHover={{ scale: 1.02 }}
        >
          {showName ? content : framedLogo}
        </motion.div>
      </div>
      {showSlogan && <Slogan text={slogan} className="mt-8" animated />}
    </div>
  )
}

function Slogan({ text, className, animated = false }: { text: string; className?: string; animated?: boolean }) {
  if (!animated) {
    return (
      <p className={cn('text-sm sm:text-base font-bold tracking-wide uppercase text-brand-700', className)}>
        {text}
      </p>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
      <motion.p
        className={cn('text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-gradient-brand', className)}
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}
