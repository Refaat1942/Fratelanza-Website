import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { integrations } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'

export default function IntegrationsPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO title={ui('integrations', 'title')} description={ui('integrations', 'seoDesc')} path="/integrations" />
      <PageHero title={ui('integrations', 'title')} subtitle={ui('integrations', 'subtitle')} />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {integrations.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="text-center py-8">
                  <DynamicIcon name={item.icon} className="w-10 h-10 text-gold-400 mx-auto mb-3" />
                  <h3 className="text-sm font-semibold">{t(item.name)}</h3>
                </Card>
              </motion.div>
            ))}
        </div>
      </section>
    </>
  )
}
