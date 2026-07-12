import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { whyFratelanza, overview } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function WhyPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO title={ui('why', 'title')} description={t(overview.philosophy)} path="/why-fratelanza" />
      <PageHero
        title={ui('why', 'pageTitle')}
        subtitle={ui('why', 'subtitle')}
      />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle={t(overview.philosophy)} title="" centered />
          <div className="grid md:grid-cols-2 gap-6">
            {whyFratelanza.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Card className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                      <DynamicIcon name={item.icon} className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t(item.title)}</h3>
                      <p className="text-sm text-white/50">{t(item.description)}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/request-demo" size="lg">{ui('common', 'startJourney')}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
