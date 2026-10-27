import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, children, className, tone = 'white' }: { id?: string; children: ReactNode; className?: string; tone?: 'white' | 'soft' | 'navy' }) {
  return (
    <section
      id={id}
      className={cn(
        'relative py-20 sm:py-24 scroll-mt-24',
        tone === 'soft' && 'bg-surface',
        tone === 'navy' && 'bg-navy-hero text-white overflow-hidden',
        className,
      )}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

export function Heading({ eyebrow, title, sub, light, center = true, className }: { eyebrow?: string; title: ReactNode; sub?: string; light?: boolean; center?: boolean; className?: string }) {
  return (
    <Reveal className={cn('mb-12 max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && (
        <div className={cn('inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] mb-4 rtl:tracking-normal', light ? 'text-goldx-300' : 'text-goldx-600')}>
          <span className="h-px w-6 bg-current opacity-70" />
          {eyebrow}
          {center && <span className="h-px w-6 bg-current opacity-70" />}
        </div>
      )}
      <h2 className={cn('text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight', light ? '!text-white' : '!text-navy-900')}>{title}</h2>
      {sub && <p className={cn('mt-4 text-base sm:text-lg leading-relaxed', light ? 'text-slate-300' : 'text-slate-600')}>{sub}</p>}
    </Reveal>
  )
}

export function BrowserFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn('rounded-2xl overflow-hidden bg-navy-950 ring-1 ring-white/10 shadow-2xl shadow-navy-950/40', className)}>
      <div className="flex items-center gap-1.5 px-3 py-2 bg-navy-900 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-goldx-400/90" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <img src={src} alt={alt} loading="lazy" className="block w-full aspect-[3/2] object-cover object-top" />
    </div>
  )
}
