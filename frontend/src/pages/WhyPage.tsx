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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {whyFratelanza.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <Card className="flex items-start gap-3 h-full p-4 border-cyan-500/10 hover:border-cyan-400/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-gold-500/10 flex items-center justify-center shrink-0">
                    <DynamicIcon name={item.icon} className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{t(item.title)}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{t(item.description)}</p>
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
