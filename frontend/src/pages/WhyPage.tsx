import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { whyFratelanza, overview, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function WhyPage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO title={locale === 'en' ? 'Why Fratelanza' : 'لماذا فراتيلانزا'} description={t(overview.philosophy, locale)} path="/why-fratelanza" />
      <PageHero
        title={locale === 'en' ? 'Why Fratelanza?' : 'لماذا فراتيلانزا؟'}
        subtitle={locale === 'en' ? 'Fratelanza is NOT just software. It is a continuously evolving platform.' : 'فراتيلانزا ليست مجرد برنامج. إنها منصة متطورة باستمرار.'}
      />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader subtitle={t(overview.philosophy, locale)} title="" centered />
          <div className="grid md:grid-cols-2 gap-6">
            {whyFratelanza.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Card className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                      <DynamicIcon name={item.icon} className="w-6 h-6 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t(item.title, locale)}</h3>
                      <p className="text-sm text-white/50">{t(item.description, locale)}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/request-demo" size="lg">{locale === 'en' ? 'Start Your Journey' : 'ابدأ رحلتك'}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
