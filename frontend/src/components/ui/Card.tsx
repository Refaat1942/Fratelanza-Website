import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { AnimatedBackground } from './AnimatedBackground'

type CardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  premium?: boolean
}

export function Card({ children, className, hover = true, glow = false, premium = false }: CardProps) {
  return (
    <motion.div
      className={cn(
        premium ? 'glass-premium' : 'glass',
        'rounded-2xl p-6 card-3d transition-all duration-500',
        hover && 'hover:border-brand-200/80 hover:shadow-lg hover:shadow-brand-500/10',
        glow && 'glow-brand',
        className,
      )}
      whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
}: {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
}) {
  return (
    <div className={cn('mb-12', centered && 'text-center')}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-50 text-brand-700 border border-brand-200/80 mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink font-display"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-body-muted max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      <AnimatedBackground variant="subtle" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display"
        >
          <span className="text-gradient-brand">{title}</span>
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-body-muted max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
