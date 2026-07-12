import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { company } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'

type LogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  showSlogan?: boolean
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

export function Logo({ size = 'md', showSlogan = false, animated = false, className }: LogoProps) {
  const { t } = useTranslation()
  const slogan = t(company.slogan)

  const img = (
    <img
      src="/logo.png"
      alt={company.name}
      className={cn('object-contain drop-shadow-2xl', sizes[size], className)}
    />
  )

  if (!animated) {
    return (
      <div className="flex flex-col items-center">
        {img}
        {showSlogan && <Slogan text={slogan} className="mt-4" />}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -inset-3 rounded-full border border-cyan-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
        >
          {img}
        </motion.div>
      </div>
      {showSlogan && <Slogan text={slogan} className="mt-6" animated />}
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <motion.p
        className={cn(
          'text-sm sm:text-base md:text-lg font-semibold tracking-[0.15em] uppercase text-gradient-gold',
          className,
        )}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}
