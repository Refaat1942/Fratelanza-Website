import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { whyFratelanza, overview } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'

export default function WhyPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO title={ui('why', 'title')} description={ui('why', 'ecosystemDesc')} path="/why-fratelanza" />
      <PageHero title={ui('why', 'pageTitle')} subtitle={ui('why', 'subtitle')} />

      <section className="py-16 relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={ui('why', 'ecosystemBadge')}
            title={ui('why', 'ecosystemTitle')}
            subtitle={ui('why', 'ecosystemDesc')}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-premium rounded-2xl p-8 mb-12 text-center max-w-3xl mx-auto glow-brand"
          >
            <p className="text-lg text-white/70 leading-relaxed">{t(overview.philosophy)}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {whyFratelanza.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Card premium className="flex items-start gap-3 h-full p-5 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/15 to-mint-500/10 flex items-center justify-center shrink-0 group-hover:from-brand-500/25 transition-all">
                    <DynamicIcon name={item.icon} className="w-5 h-5 text-brand-300" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm mb-1.5">{t(item.title)}</h3>
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
