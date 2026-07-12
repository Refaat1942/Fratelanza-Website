import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { services } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

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
                <Card className="h-full">
                  <DynamicIcon name={svc.icon} className="w-8 h-8 text-gold-400 mb-4" />
                  <h3 className="text-lg font-semibold">{t(svc.name)}</h3>
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
