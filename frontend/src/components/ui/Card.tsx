import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl p-6',
        hover && 'hover:bg-white/8 hover:border-white/20 transition-all duration-300',
        glow && 'glow-gold',
        className,
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
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
          className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-500/10 text-gold-400 border border-gold-500/20 mb-4"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-white/60 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
