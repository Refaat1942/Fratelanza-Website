import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { deliveryFlowSteps, homeT } from '@/data/homepage'
import { useTranslation } from '@/i18n/useTranslation'
import { SectionHeader } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export function DeliveryPartnerSection() {
  const { ui, locale, isAr } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white via-brand-50/40 to-white">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={ui('home', 'partnerBadge')}
          title={ui('home', 'partnerTitle')}
          subtitle={ui('home', 'partnerSub')}
        />

        {/* Desktop: horizontal flow */}
        <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-6 mt-12">
          {deliveryFlowSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {i > 0 && (
                <div
                  className={cn(
                    'absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-brand-200 flex items-center justify-center shadow-sm',
                    isAr ? '-right-4 lg:-right-5' : '-left-4 lg:-left-5',
                  )}
                >
                  <DynamicIcon
                    name="ChevronRight"
                    className={cn('w-4 h-4 text-brand-600', isAr && 'rotate-180')}
                  />
                </div>
              )}
              <div
                className={cn(
                  'h-full rounded-2xl p-5 lg:p-6 border transition-all duration-300',
                  step.highlight
                    ? 'bg-gradient-to-br from-brand-700 to-brand-800 border-brand-600 text-white shadow-xl shadow-brand-900/20 scale-[1.02]'
                    : 'glass-premium border-slate-200/80 hover:border-brand-300/60 hover:shadow-lg',
                )}
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                    step.highlight
                      ? 'bg-white/15 text-white'
                      : 'bg-brand-50 text-brand-700',
                  )}
                >
                  <DynamicIcon name={step.icon} className="w-6 h-6" />
                </div>
                <h3
                  className={cn(
                    'text-lg font-bold font-display mb-1',
                    step.highlight ? 'text-white' : 'text-ink',
                  )}
                >
                  {homeT(step.label, locale)}
                </h3>
                {step.sublabel && (
                  <p
                    className={cn(
                      'text-sm leading-relaxed',
                      step.highlight ? 'text-brand-100' : 'text-body-subtle',
                    )}
                  >
                    {homeT(step.sublabel, locale)}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: vertical flow */}
        <div className="md:hidden mt-10 space-y-3">
          {deliveryFlowSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={reduceMotion ? false : { opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className={cn(
                  'rounded-2xl p-5 border flex items-start gap-4',
                  step.highlight
                    ? 'bg-gradient-to-br from-brand-700 to-brand-800 border-brand-600 text-white shadow-lg'
                    : 'bg-white border-slate-200 shadow-sm',
                )}
              >
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
                    step.highlight ? 'bg-white/15' : 'bg-brand-50 text-brand-700',
                  )}
                >
                  <DynamicIcon name={step.icon} className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold font-display text-base">{homeT(step.label, locale)}</h3>
                  {step.sublabel && (
                    <p className={cn('text-sm mt-0.5', step.highlight ? 'text-brand-100' : 'text-body-subtle')}>
                      {homeT(step.sublabel, locale)}
                    </p>
                  )}
                </div>
              </div>
              {i < deliveryFlowSteps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown className="w-4 h-4 text-brand-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-body-muted max-w-2xl mx-auto leading-relaxed"
        >
          {ui('home', 'partnerFootnote')}
        </motion.p>
      </div>
    </section>
  )
}
