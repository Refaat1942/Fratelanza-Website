import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { services } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export default function ServicesPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO title={ui('services', 'title')} description={ui('services', 'seoDesc')} path="/services" />
      <PageHero title={ui('services', 'pageTitle')} subtitle={ui('services', 'subtitle')} />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div key={svc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className={cn('h-full', svc.id === 'training' && 'border-cyan-400/40 bg-gradient-to-br from-cyan-500/10 to-gold-500/5')}>
                <DynamicIcon name={svc.icon} className={cn('w-8 h-8 mb-4', svc.id === 'training' ? 'text-cyan-300' : 'text-gold-400')} />
                <h3 className="text-lg font-semibold">{t(svc.name)}</h3>
                {'description' in svc && svc.description && (
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">{t(svc.description)}</p>
                )}
                {svc.id === 'training' && (
                  <span className="inline-block mt-3 text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
                    {ui('services', 'trainingBadge')}
                  </span>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/contact" size="lg">{ui('common', 'getInTouch')}</Button>
        </div>
      </section>
    </>
  )
}
