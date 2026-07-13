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

const sizes = {
  sm: 'h-11 w-11',
  md: 'h-16 w-16',
  lg: 'h-24 w-24',
  xl: 'h-32 w-32',
  hero: 'h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56',
}

const headerSizes = {
  sm: 'h-14 w-14',
  md: 'h-16 w-16',
  lg: 'h-16 w-16',
  xl: 'h-16 w-16',
  hero: 'h-14 w-14',
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
  const sizeClass = isHeader ? headerSizes[size] : sizes[size]

  const logoImage = (
    <img
      src="/logo.png"
      alt={company.name}
      className={cn('object-contain shrink-0', sizeClass, className)}
    />
  )

  const content = (
    <div className={cn('flex items-center', showName ? 'gap-3' : '')}>
      {logoImage}
      {showName && !isHeader && (
        <div className="hidden sm:block min-w-0">
          <p className="font-display font-extrabold text-xl tracking-tight text-gradient-premium">{company.name}</p>
          <p className="text-[10px] font-bold tracking-wide uppercase text-mint-600 mt-1">{slogan}</p>
        </div>
      )}
    </div>
  )

  if (!animated) {
    return (
      <div className={cn('flex flex-col', isHeader ? 'items-start' : 'items-center')}>
        {showName && !isHeader ? content : logoImage}
        {showSlogan && !isHeader && <Slogan text={slogan} className="mt-5" />}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
        className="drop-shadow-lg drop-shadow-brand-500/15"
      >
        {showName ? content : logoImage}
      </motion.div>
      {showSlogan && <Slogan text={slogan} className="mt-8" animated />}
    </div>
  )
}

function Slogan({ text, className, animated = false }: { text: string; className?: string; animated?: boolean }) {
  if (!animated) {
    return (
      <p className={cn('text-sm sm:text-base font-bold tracking-wide uppercase text-brand-700 font-display', className)}>
        {text}
      </p>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}>
      <motion.p
        className={cn('text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-gradient-brand font-display', className)}
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}
