import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

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
  light = false,
}: {
  badge?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}) {
  return (
    <div className={cn('mb-12', centered && 'text-center')}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            'inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4',
            light ? 'bg-white/15 text-white border border-white/20' : 'bg-brand-50 text-brand-700 border border-brand-200/80',
          )}
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight font-display',
          light ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cn(
            'mt-4 text-lg max-w-2xl mx-auto leading-relaxed',
            light ? 'text-brand-100' : 'text-body-muted',
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export function PageHero({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-hero pt-36 pb-20 text-white">
      <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-bold uppercase tracking-[0.16em] text-goldx-300 rtl:tracking-normal">
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight !text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
