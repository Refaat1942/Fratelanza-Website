import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricingPlans, tList } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function PricingPage() {
  const { t, ui, locale } = useTranslation()

  return (
    <>
      <SEO title={ui('pricing', 'title')} description={ui('pricing', 'seoDesc')} path="/pricing" />
      <PageHero
        title={ui('pricing', 'pageTitle')}
        subtitle={ui('pricing', 'subtitle')}
      />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`h-full flex flex-col ${plan.featured ? 'border-gold-500/40 glow-gold' : ''}`}>
                {plan.featured && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
                    {ui('common', 'mostPopular')}
                  </span>
                )}
                <h3 className="text-2xl font-bold">{t(plan.name)}</h3>
                <p className="text-sm text-white/50 mt-2 mb-6">{t(plan.description)}</p>
                <div className="text-3xl font-bold text-gold-400 mb-6">
                  {ui('common', 'customQuote')}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {tList(plan.features, locale).map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href="/request-demo" variant={plan.featured ? 'primary' : 'outline'} className="w-full">
                  {t(plan.cta)}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
