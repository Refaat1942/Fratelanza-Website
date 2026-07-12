import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { pricingPlans, t, tList } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function PricingPage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO title={locale === 'en' ? 'Pricing' : 'الأسعار'} description={locale === 'en' ? 'Flexible pricing plans — Starter, Professional, and Enterprise. Request a custom quote.' : 'خطط أسعار مرنة — البداية والاحترافي والمؤسسي. اطلب عرض سعر مخصص.'} path="/pricing" />
      <PageHero
        title={locale === 'en' ? 'Pricing Plans' : 'خطط الأسعار'}
        subtitle={locale === 'en' ? 'Flexible packages tailored to your business size. Contact us for a custom quotation.' : 'باقات مرنة مصممة لحجم أعمالك. تواصل معنا للحصول على عرض سعر مخصص.'}
      />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className={`h-full flex flex-col ${plan.featured ? 'border-gold-500/40 glow-gold' : ''}`}>
                {plan.featured && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 mb-2">
                    {locale === 'en' ? 'Most Popular' : 'الأكثر شعبية'}
                  </span>
                )}
                <h3 className="text-2xl font-bold">{t(plan.name, locale)}</h3>
                <p className="text-sm text-white/50 mt-2 mb-6">{t(plan.description, locale)}</p>
                <div className="text-3xl font-bold text-gold-400 mb-6">
                  {locale === 'en' ? 'Custom Quote' : 'عرض مخصص'}
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
                  {t(plan.cta, locale)}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
