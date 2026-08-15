import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { solutionShowcases, valuePropositions } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function SuccessPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO title={ui('success', 'title')} description={ui('success', 'seoDesc')} path="/success-stories" />
      <PageHero title={ui('success', 'title')} subtitle={ui('success', 'subtitle')} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={ui('success', 'caseStudies')} subtitle={ui('success', 'caseStudiesSub')} />
          <div className="grid md:grid-cols-2 gap-8">
            {solutionShowcases.map((cs, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card premium className="overflow-hidden p-0">
                  <div className="aspect-video overflow-hidden">
                    <img src={cs.image} alt={t(cs.title)} className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-gold-700 font-semibold uppercase">{t(cs.industry)}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3 font-display">{t(cs.title)}</h3>
                    <p className="text-sm text-body-muted">{t(cs.summary)}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={ui('success', 'testimonials')} subtitle={ui('success', 'testimonialsSub')} />
          <div className="grid md:grid-cols-3 gap-8">
            {valuePropositions.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full border-l-4 border-brand-500">
                  <Quote className="w-8 h-8 text-brand-500/40 mb-4" />
                  <p className="text-sm text-body-muted mb-6 leading-relaxed">{t(item.quote)}</p>
                  <p className="font-semibold text-sm text-brand-800">{t(item.author)}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-body-muted mb-6 max-w-2xl mx-auto">{ui('success', 'demoNote')}</p>
            <Button href="/request-demo" size="lg">{ui('common', 'requestDemo')}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
