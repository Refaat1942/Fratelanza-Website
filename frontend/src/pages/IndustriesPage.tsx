import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { industries } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function IndustriesPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO title={ui('industries', 'title')} description={ui('industries', 'seoDesc')} path="/industries" />
      <PageHero title={ui('industries', 'pageTitle')} subtitle={ui('industries', 'subtitle')} />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
                <motion.div key={ind.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <Card className="text-center">
                    <DynamicIcon name={ind.icon} className="w-10 h-10 text-gold-400 mx-auto mb-4" />
                    <h3 className="font-semibold">{t(ind.name)}</h3>
                  </Card>
                </motion.div>
              ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/request-demo" size="lg">{ui('common', 'discussIndustry')}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
