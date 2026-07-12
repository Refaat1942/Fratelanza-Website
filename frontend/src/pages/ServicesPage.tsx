import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { services, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ServicesPage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO title={locale === 'en' ? 'Services' : 'الخدمات'} description={locale === 'en' ? 'Software development, ERP, AI, cloud, DevOps, consulting, and more.' : 'تطوير البرمجيات وERP والذكاء الاصطناعي والسحابة وDevOps والاستشارات والمزيد.'} path="/services" />
      <PageHero title={locale === 'en' ? 'Our Services' : 'خدماتنا'} subtitle={locale === 'en' ? 'End-to-end technology services for enterprise transformation.' : 'خدمات تقنية شاملة للتحول المؤسسي.'} />
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
              <motion.div key={svc.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full">
                  <DynamicIcon name={svc.icon} className="w-8 h-8 text-gold-400 mb-4" />
                  <h3 className="text-lg font-semibold">{t(svc.name, locale)}</h3>
                </Card>
              </motion.div>
            ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/contact" size="lg">{locale === 'en' ? 'Get in Touch' : 'تواصل معنا'}</Button>
        </div>
      </section>
    </>
  )
}
