import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { serviceCategories } from '@/data/serviceCategories'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const colorMap = {
  brand: 'from-brand-500/20 to-brand-600/5 border-brand-400/20 text-brand-700',
  mint: 'from-mint-500/20 to-mint-600/5 border-mint-400/20 text-mint-300',
  gold: 'from-gold-500/20 to-gold-600/5 border-gold-400/20 text-gold-300',
}

export default function ServicesPage() {
  const { t, ui, locale } = useTranslation()
  const [active, setActive] = useState(serviceCategories[0].id)
  const current = serviceCategories.find((c) => c.id === active) || serviceCategories[0]

  return (
    <>
      <SEO title={ui('services', 'title')} description={ui('services', 'seoDesc')} path="/services" />
      <PageHero title={ui('services', 'pageTitle')} subtitle={ui('services', 'subtitle')} />

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap',
                  active === cat.id
                    ? 'bg-gradient-to-r from-brand-500/20 to-mint-500/10 text-brand-700 border border-brand-400/30 shadow-lg shadow-brand-500/10'
                    : 'glass text-body-subtle border border-slate-200/80 hover:text-white/80 hover:border-white/20',
                )}
              >
                {t(cat.name)}
              </button>
            ))}
          </div>

          {/* Active category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card premium glow className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center border', colorMap[current.color as keyof typeof colorMap])}>
                    <DynamicIcon name={current.icon} className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{t(current.name)}</h2>
                    <p className="text-sm text-body-subtle mt-1">{current.items.length} {ui('services', 'offerings')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {current.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl glass-premium hover:bg-white/[0.06] transition-colors group"
                    >
                      <div className="w-2 h-2 rounded-full bg-mint-400/60 group-hover:bg-brand-400 transition-colors shrink-0" />
                      <span className="text-sm text-ink">{locale === 'en' ? item.en : item.ar}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* All categories overview */}
          <h3 className="text-xl font-bold text-center mb-8 mt-16">{ui('services', 'allCategories')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {serviceCategories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                onClick={() => { setActive(cat.id); window.scrollTo({ top: 400, behavior: 'smooth' }) }}
                className={cn(
                  'glass-premium rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer',
                  active === cat.id && 'ring-2 ring-brand-400/30',
                )}
              >
                <DynamicIcon name={cat.icon} className={cn('w-6 h-6 mx-auto mb-2', colorMap[cat.color as keyof typeof colorMap].split(' ').pop())} />
                <span className="text-xs font-medium text-body-muted">{t(cat.name)}</span>
              </motion.button>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/request-demo" size="lg">{ui('common', 'requestDemo')}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
