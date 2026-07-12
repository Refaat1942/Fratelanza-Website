import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { industries, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function IndustriesPage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO title={locale === 'en' ? 'Industries' : 'القطاعات'} description={locale === 'en' ? 'Fratelanza serves healthcare, retail, government, education, and more.' : 'فراتيلانزا تخدم الرعاية الصحية والتجزئة والحكومة والتعليم والمزيد.'} path="/industries" />
      <PageHero title={locale === 'en' ? 'Industries We Serve' : 'القطاعات التي نخدمها'} subtitle={locale === 'en' ? 'Tailored solutions for every sector.' : 'حلول مخصصة لكل قطاع.'} />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
                <motion.div key={ind.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <Card className="text-center">
                    <DynamicIcon name={ind.icon} className="w-10 h-10 text-gold-400 mx-auto mb-4" />
                    <h3 className="font-semibold">{t(ind.name, locale)}</h3>
                  </Card>
                </motion.div>
              ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/request-demo" size="lg">{locale === 'en' ? 'Discuss Your Industry' : 'ناقش قطاعك'}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
