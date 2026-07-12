import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { products, productDetails, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ProductsPage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO
        title={locale === 'en' ? 'Products' : 'المنتجات'}
        description={locale === 'en' ? 'Explore Fratelanza enterprise products — ERP, Pharmacy, Clinic, AI, and more.' : 'استكشف منتجات فراتيلانزا المؤسسية — ERP والصيدليات والعيادات والذكاء الاصطناعي والمزيد.'}
        path="/products"
      />
      <PageHero
        title={locale === 'en' ? 'Our Products' : 'منتجاتنا'}
        subtitle={locale === 'en' ? 'A comprehensive ecosystem of enterprise-grade solutions.' : 'منظومة شاملة من الحلول المؤسسية.'}
      />

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => {
              const details = productDetails[product.id]
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-5">
                      <DynamicIcon name={product.icon} className="w-7 h-7 text-gold-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t(product.name, locale)}</h3>
                    {details && (
                      <p className="text-sm text-white/50 mb-4 flex-1">{t(details.description, locale)}</p>
                    )}
                    <div className="aspect-video rounded-xl bg-white/5 border border-white/10 mb-4 flex items-center justify-center">
                      <span className="text-xs text-white/30 uppercase tracking-wider">
                        {locale === 'en' ? 'Screenshot Preview' : 'معاينة الشاشة'}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <Button href={`/products/${product.id}`} variant="secondary" size="sm" className="flex-1">
                        {locale === 'en' ? 'Details' : 'التفاصيل'}
                      </Button>
                      <Button href="/request-demo" size="sm" className="flex-1">
                        {locale === 'en' ? 'Demo' : 'عرض'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
