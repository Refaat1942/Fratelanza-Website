import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { caseStudies, testimonials, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'

export default function SuccessPage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO title={locale === 'en' ? 'Success Stories' : 'قصص النجاح'} description={locale === 'en' ? 'Case studies and testimonials from Fratelanza clients.' : 'دراسات حالة وشهادات من عملاء فراتيلانزا.'} path="/success-stories" />
      <PageHero title={locale === 'en' ? 'Success Stories' : 'قصص النجاح'} subtitle={locale === 'en' ? 'Real results from real businesses.' : 'نتائج حقيقية من أعمال حقيقية.'} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={locale === 'en' ? 'Case Studies' : 'دراسات الحالة'} />
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card>
                  <span className="text-xs text-gold-400 font-semibold uppercase">{t(cs.industry, locale)}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{t(cs.title, locale)}</h3>
                  <p className="text-sm text-white/50">{t(cs.summary, locale)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={locale === 'en' ? 'Testimonials' : 'شهادات العملاء'} />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t_, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <Quote className="w-8 h-8 text-gold-400/50 mb-4" />
                  <p className="text-sm text-white/70 italic mb-6">"{t(t_.quote, locale)}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t_.author}</p>
                    <p className="text-xs text-white/40">{t_.company}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <SectionHeader title={locale === 'en' ? 'Trusted Partners' : 'شركاء موثوقون'} subtitle={locale === 'en' ? 'Logos of future partners will appear here.' : 'شعارات الشركاء المستقبليين ستظهر هنا.'} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-20 rounded-xl glass flex items-center justify-center">
                  <span className="text-xs text-white/20 uppercase tracking-widest">Partner {n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
