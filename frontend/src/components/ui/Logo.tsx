import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { company } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  showSlogan?: boolean
  showName?: boolean
  animated?: boolean
  className?: string
}

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-28 w-28',
  hero: 'h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52',
}

export function Logo({ size = 'md', showSlogan = false, showName = false, animated = false, className }: LogoProps) {
  const { t } = useTranslation()
  const slogan = t(company.slogan)

  const framedLogo = (
    <div
      className={cn(
        'relative rounded-full bg-gradient-to-br from-brand-400/70 via-mint-400/40 to-gold-400/60 p-[2px] shadow-lg shadow-brand-500/15',
        sizes[size],
      )}
    >
      <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center overflow-hidden">
        <img
          src="/logo.png"
          alt={company.name}
          className={cn('w-[88%] h-[88%] object-contain', className)}
        />
      </div>
    </div>
  )

  const content = (
    <div className={cn('flex items-center gap-3', showName && 'flex-row')}>
      {framedLogo}
      {showName && (
        <div className="hidden sm:block">
          <p className="text-base font-bold tracking-wide text-gradient-premium">{company.name}</p>
          <p className="text-[9px] font-medium tracking-[0.15em] uppercase text-mint-400/70 max-w-[170px] leading-tight whitespace-nowrap">
            {slogan}
          </p>
        </div>
      )}
    </div>
  )

  if (!animated) {
    return (
      <div className="flex flex-col items-center">
        {showName ? content : framedLogo}
        {showSlogan && <Slogan text={slogan} className="mt-4" />}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-400/25 to-mint-400/20 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -inset-3 rounded-full border border-brand-400/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          whileHover={{ scale: 1.03 }}
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
      <p className={cn('text-sm sm:text-base font-semibold tracking-[0.15em] uppercase text-brand-300/90', className)}>
        {text}
      </p>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
      <motion.p
        className={cn('text-sm sm:text-base md:text-lg font-semibold tracking-[0.12em] uppercase text-gradient-brand', className)}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}
