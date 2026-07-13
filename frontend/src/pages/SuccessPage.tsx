import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { caseStudies, testimonials } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'

export default function SuccessPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO title={ui('success', 'title')} description={ui('success', 'seoDesc')} path="/success-stories" />
      <PageHero title={ui('success', 'title')} subtitle={ui('success', 'subtitle')} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={ui('success', 'caseStudies')} />
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card>
                  <span className="text-xs text-gold-600 font-semibold uppercase">{t(cs.industry)}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{t(cs.title)}</h3>
                  <p className="text-sm text-body-subtle">{t(cs.summary)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={ui('success', 'testimonials')} />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t_, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <Quote className="w-8 h-8 text-gold-600/50 mb-4" />
                  <p className="text-sm text-body-muted italic mb-6">"{t(t_.quote)}"</p>
                  <div>
                    <p className="font-semibold text-sm">{t_.author}</p>
                    <p className="text-xs text-body-subtle">{t_.company}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16">
            <SectionHeader title={ui('success', 'partners')} subtitle={ui('success', 'partnersSub')} />
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
