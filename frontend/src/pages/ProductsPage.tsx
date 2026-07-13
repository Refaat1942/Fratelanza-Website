import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { products, productDetails } from '@/data/content'
import { getProductPreview } from '@/data/productShowcases'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function ProductsPage() {
  const { t, ui } = useTranslation()

  return (
    <>
      <SEO
        title={ui('products', 'title')}
        description={ui('products', 'seoDesc')}
        path="/products"
      />
      <PageHero
        title={ui('products', 'pageTitle')}
        subtitle={ui('products', 'subtitle')}
      />

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => {
              const details = productDetails[product.id]
              const preview = getProductPreview(product.id)
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
                      <DynamicIcon name={product.icon} className="w-7 h-7 text-gold-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{t(product.name)}</h3>
                    {details && (
                      <p className="text-sm text-body-subtle mb-4 flex-1">{t(details.description)}</p>
                    )}
                    <div className="aspect-video rounded-xl overflow-hidden bg-brand-50/50 border border-slate-200/80 mb-4">
                      {preview ? (
                        <img
                          src={preview}
                          alt={t(product.name)}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xs text-white/30 uppercase tracking-wider">
                            {ui('common', 'screenshotPreview')}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button href={`/products/${product.id}`} variant="secondary" size="sm" className="flex-1">
                        {ui('common', 'details')}
                      </Button>
                      <Button href="/request-demo" size="sm" className="flex-1">
                        {ui('common', 'demo')}
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
