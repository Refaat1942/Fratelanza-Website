import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricingPlans, pricingMatrices, tList } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type PlanItem = {
  id: string
  name: { en: string; ar: string }
  description: { en: string; ar: string }
  priceHint?: { en: string; ar: string }
  featured?: boolean
  features: { en: string[]; ar: string[] }
  cta: { en: string; ar: string }
}

function getPlansForMatrix(matrixId: string): PlanItem[] {
  const matrix = pricingMatrices.find((m) => m.id === matrixId)
  if (!matrix) return pricingPlans
  if (matrix.plans === 'pricingPlans') return pricingPlans
  return matrix.plans as unknown as PlanItem[]
}

export default function PricingPage() {
  const { t, ui, locale } = useTranslation()
  const [activeMatrix, setActiveMatrix] = useState<string>(pricingMatrices[0].id)
  const matrix = pricingMatrices.find((m) => m.id === activeMatrix) ?? pricingMatrices[0]
  const plans = getPlansForMatrix(activeMatrix)

  return (
    <>
      <SEO title={ui('pricing', 'title')} description={ui('pricing', 'seoDesc')} path="/pricing" />
      <PageHero title={ui('pricing', 'pageTitle')} subtitle={ui('pricing', 'subtitle')} />

      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Matrix tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {pricingMatrices.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMatrix(m.id)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-semibold transition-all',
                  activeMatrix === m.id
                    ? 'bg-brand-700 text-white shadow-md shadow-brand-700/25'
                    : 'bg-white text-brand-800 border border-slate-200 hover:bg-brand-50',
                )}
              >
                {t(m.name)}
              </button>
            ))}
          </div>

          <SectionHeader
            title={t(matrix.name)}
            subtitle={t(matrix.description)}
            centered
          />

          <div className={cn(
            'grid gap-8',
            plans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4',
          )}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className={cn('h-full flex flex-col', plan.featured && 'border-gold-500/50 glow-gold ring-2 ring-gold-400/20')}>
                  {plan.featured && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-700 mb-2">
                      {ui('common', 'mostPopular')}
                    </span>
                  )}
                  <h3 className="text-xl font-bold font-display">{t(plan.name)}</h3>
                  <p className="text-sm text-body-subtle mt-2 mb-4">{t(plan.description)}</p>
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-gold-700">{ui('common', 'customQuote')}</div>
                    {plan.priceHint && (
                      <p className="text-xs text-brand-700 mt-1 font-medium">{t(plan.priceHint)}</p>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tList(plan.features, locale).map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-body-muted">
                        <Check className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-3xl mx-auto text-center glass-premium rounded-2xl p-8 border border-brand-200/60"
          >
            <h3 className="text-lg font-bold font-display text-brand-800 mb-2">{ui('pricing', 'fairNote')}</h3>
            <p className="text-sm text-body-muted leading-relaxed">{ui('pricing', 'fairNoteSub')}</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button href="/request-demo">{ui('common', 'requestDemo')}</Button>
              <Button href="/contact" variant="outline">{ui('common', 'getInTouch')}</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
