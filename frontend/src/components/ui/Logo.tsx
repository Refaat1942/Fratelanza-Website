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
  sm: 'h-11 w-11',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
  xl: 'h-32 w-32',
  hero: 'h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56',
}

export function Logo({ size = 'md', showSlogan = false, showName = false, animated = false, className }: LogoProps) {
  const { t } = useTranslation()
  const slogan = t(company.slogan)

  const image = (
    <img
      src="/logo.png"
      alt={company.name}
      className={cn('object-contain w-full h-full', className)}
    />
  )

  const framedLogo = (
    <div
      className={cn(
        'relative rounded-full p-1 bg-gradient-to-br from-cyan-400/80 via-cyan-500/40 to-gold-400/70 shadow-lg shadow-cyan-500/20',
        sizes[size],
      )}
    >
      <div className="w-full h-full rounded-full bg-dark-950/90 p-1.5 flex items-center justify-center overflow-hidden">
        {image}
      </div>
    </div>
  )

  const content = (
    <div className={cn('flex items-center gap-3', showName && 'flex-row')}>
      {framedLogo}
      {showName && (
        <div className="hidden sm:block">
          <p className="text-lg font-bold tracking-wide text-gradient-brand">{company.name}</p>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-cyan-300/80 max-w-[180px] leading-tight">
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
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-gold-400/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -inset-4 rounded-full border border-cyan-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
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
      <p className={cn('text-sm sm:text-base font-semibold tracking-[0.2em] uppercase text-cyan-300/90', className)}>
        {text}
      </p>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
      <motion.p
        className={cn('text-sm sm:text-base md:text-lg font-semibold tracking-[0.15em] uppercase text-gradient-brand', className)}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}
