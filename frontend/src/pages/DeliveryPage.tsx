import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { deliveryProcess } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'

export default function DeliveryPage() {
  const { t, ui } = useTranslation()
  const [active, setActive] = useState(0)

  return (
    <>
      <SEO title={ui('delivery', 'title')} description={ui('delivery', 'seoDesc')} path="/delivery-process" />
      <PageHero title={ui('delivery', 'title')} subtitle={ui('delivery', 'subtitle')} />

      <section className="py-16 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {deliveryProcess.map((step, i) => (
              <button
                key={step.key}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === i
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                    : 'bg-brand-50/50 text-body-subtle border border-slate-200/80 hover:bg-white/10'
                }`}
              >
                {step.step}. {t(step.title)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card glow className="text-center p-12">
                <span className="text-6xl font-bold text-gold-600/30">{deliveryProcess[active].step}</span>
                <h3 className="text-2xl font-bold mt-4 mb-4">{t(deliveryProcess[active].title)}</h3>
                <p className="text-body-muted max-w-lg mx-auto">{t(deliveryProcess[active].description)}</p>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {deliveryProcess.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? 'w-8 bg-gold-400' : 'w-1.5 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
