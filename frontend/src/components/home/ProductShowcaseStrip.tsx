import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { solutionShowcases, aboutInsights } from '@/data/content'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { useTranslation } from '@/i18n/useTranslation'
import { SectionHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function ProductShowcaseStrip() {
  const { t, ui, isAr } = useTranslation()

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={ui('home', 'showcaseBadge')}
          title={ui('home', 'showcaseTitle')}
          subtitle={ui('home', 'showcaseSub')}
        />
        <div className="grid md:grid-cols-2 gap-8">
          {solutionShowcases.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group glass-premium rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg shadow-brand-500/5 hover:shadow-xl hover:shadow-brand-500/10 transition-shadow duration-500"
            >
              <div className="aspect-video overflow-hidden bg-brand-50/50">
                <motion.img
                  src={item.image}
                  alt={t(item.title)}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700">{t(item.industry)}</span>
                <h3 className="text-xl font-bold mt-2 mb-2 font-display">{t(item.title)}</h3>
                <p className="text-sm text-body-muted leading-relaxed">{t(item.summary)}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/products" variant="outline" size="lg">
            {ui('common', 'exploreProducts')}
            <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export function AboutInsightSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 bg-gradient-to-br from-gold-50/80 via-white to-brand-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t(aboutInsights.headline)} subtitle={t(aboutInsights.intro)} />
        <div className="grid sm:grid-cols-2 gap-6">
          {aboutInsights.pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass-premium rounded-2xl p-6 border-l-4 border-brand-500"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                  <DynamicIcon name={pillar.icon} className="w-5 h-5 text-brand-700" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 font-display text-brand-800">{t(pillar.title)}</h3>
                  <p className="text-sm text-body-muted leading-relaxed">{t(pillar.description)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
