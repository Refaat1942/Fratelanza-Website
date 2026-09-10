import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { Button } from '@/components/ui/Button'
import { HERO_SCREENSHOT, heroProofPoints, homeT } from '@/data/homepage'
import { useTranslation } from '@/i18n/useTranslation'
import { IdeaPipelineVisual } from '@/components/home/IdeaPipelineVisual'
import { cn } from '@/lib/utils'
import { trackStartProjectClick } from '@/lib/analytics'

export function HeroSection() {
  const { ui, locale, isAr } = useTranslation()
  const reduceMotion = useReducedMotion()

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: 'easeOut' as const },
        }

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <AnimatedBackground variant="hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.12),transparent)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 xl:gap-14 items-center">
          {/* Copy */}
          <div className="text-center lg:text-start order-2 lg:order-1">
            <motion.div {...fadeUp(0.05)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-brand-200/70 text-xs font-bold uppercase tracking-wider text-brand-800 shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
              {ui('home', 'heroBadge')}
            </motion.div>

            <motion.h1
              {...fadeUp(0.12)}
              className="text-[1.75rem] sm:text-4xl md:text-[2.65rem] lg:text-5xl xl:text-[3.25rem] font-extrabold tracking-tight leading-[1.1] font-display text-ink"
            >
              {ui('home', 'heroHeadline1')}
              <span className="block mt-1 sm:mt-2 text-gradient-premium">
                {ui('home', 'heroHeadline2')}
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.22)}
              className="mt-5 sm:mt-6 text-base sm:text-lg text-body-muted max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {ui('home', 'heroSub')}
            </motion.p>

            <motion.div
              {...fadeUp(0.32)}
              className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2"
            >
              {heroProofPoints.map((point) => (
                <span
                  key={point.text.en}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/85 border border-slate-200/80 text-ink-muted"
                >
                  {homeT(point.text, locale)}
                </span>
              ))}
            </motion.div>

            <motion.div
              {...fadeUp(0.4)}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <Button href="/start-project" size="lg" className="w-full sm:w-auto shadow-xl shadow-brand-700/20" onClick={() => trackStartProjectClick('hero')}>
                {ui('home', 'startProject')}
                <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
              </Button>
              <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
                {ui('home', 'exploreSolutions')}
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="mt-10 lg:hidden">
              <p className="text-[10px] uppercase tracking-widest font-bold text-body-subtle mb-3 text-center">
                {ui('home', 'pipelineLabel')}
              </p>
              <IdeaPipelineVisual compact />
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            {...fadeUp(0.18)}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-br from-brand-400/20 via-mint-400/15 to-gold-300/20 blur-2xl" />

              <div className="relative rounded-2xl sm:rounded-3xl border border-white/70 bg-white/40 backdrop-blur-md p-3 sm:p-4 shadow-2xl shadow-brand-900/10">
                <div className="hidden lg:block mb-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand-700 mb-3">
                    {ui('home', 'pipelineLabel')}
                  </p>
                  <IdeaPipelineVisual />
                </div>

                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900 shadow-inner">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/90 border-b border-slate-700/80">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono truncate flex-1 text-center">
                      fratelanza.com — product engineering
                    </span>
                  </div>
                  <motion.img
                    src={HERO_SCREENSHOT}
                    alt={ui('home', 'heroScreenshotAlt')}
                    className="w-full h-auto object-cover object-top max-h-[220px] sm:max-h-[280px] lg:max-h-[320px]"
                    loading="eager"
                    fetchPriority="high"
                    animate={reduceMotion ? undefined : { scale: [1, 1.02, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-white/90 bg-black/30 backdrop-blur px-2 py-1 rounded-lg">
                      {ui('home', 'heroScreenshotCaption')}
                    </span>
                    <span className="hidden sm:flex items-center gap-1 text-[10px] text-white/70">
                      <Play className="w-3 h-3" />
                      {ui('home', 'liveProductUi')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
