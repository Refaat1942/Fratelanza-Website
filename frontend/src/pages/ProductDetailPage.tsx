import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { products, productDetails, tList } from '@/data/content'
import { productShowcases } from '@/data/productShowcases'
import { ProductScreenshotGallery } from '@/components/products/ProductScreenshotGallery'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import NotFoundPage from './NotFoundPage'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { t, ui, locale, isAr } = useTranslation()
  const product = products.find((p) => p.id === id)
  const details = id ? productDetails[id] : null
  const screenshots = id ? productShowcases[id] : undefined

  if (!product || !details) return <NotFoundPage />

  return (
    <>
      <SEO
        title={t(product.name)}
        description={t(details.description)}
        path={`/products/${id}`}
      />
      <PageHero title={t(product.name)} subtitle={t(details.description)} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-body-subtle hover:text-gold-600 mb-8 transition-colors">
            <ArrowLeft className={cn('w-4 h-4', isAr && 'rotate-180')} />
            {ui('common', 'allProducts')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              {screenshots ? (
                <ProductScreenshotGallery shots={screenshots} />
              ) : (
                <div className="aspect-video rounded-2xl bg-brand-50/50 border border-slate-200/80 flex items-center justify-center">
                  <DynamicIcon name={product.icon} className="w-24 h-24 text-gold-600/30" />
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <Card>
                <h3 className="text-lg font-semibold text-gold-600 mb-4">
                  {ui('products', 'features')}
                </h3>
                <ul className="space-y-3">
                  {tList(details.features, locale).map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-body-muted">
                      <Check className="w-4 h-4 text-gold-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gold-600 mb-4">
                  {ui('products', 'benefits')}
                </h3>
                <ul className="space-y-3">
                  {tList(details.benefits, locale).map((b, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-body-muted">
                      <Check className="w-4 h-4 text-gold-600 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>

              <Button href="/request-demo" size="lg" className="w-full">
                {ui('common', 'requestDemo')}
              </Button>
            </motion.div>
          </div>

          {screenshots && screenshots.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold mb-8 text-gradient-brand">
                {ui('products', 'screenshots')}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {screenshots.map((shot) => (
                  <Card key={shot.src} className="overflow-hidden p-0">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={shot.src}
                        alt={t(shot.title)}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-brand-700">{t(shot.title)}</h3>
                      <p className="text-xs text-body-subtle mt-1">{t(shot.description)}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
