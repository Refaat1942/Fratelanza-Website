import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { products, productDetails, t, tList } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import NotFoundPage from './NotFoundPage'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { locale } = useI18n()
  const product = products.find((p) => p.id === id)
  const details = id ? productDetails[id] : null

  if (!product || !details) return <NotFoundPage />

  return (
    <>
      <SEO
        title={t(product.name, locale)}
        description={t(details.description, locale)}
        path={`/products/${id}`}
      />
      <PageHero title={t(product.name, locale)} subtitle={t(details.description, locale)} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-gold-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {locale === 'en' ? 'All Products' : 'جميع المنتجات'}
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <DynamicIcon name={product.icon} className="w-24 h-24 text-gold-400/30" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <Card>
                <h3 className="text-lg font-semibold text-gold-400 mb-4">
                  {locale === 'en' ? 'Key Features' : 'الميزات الرئيسية'}
                </h3>
                <ul className="space-y-3">
                  {tList(details.features, locale).map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gold-400 mb-4">
                  {locale === 'en' ? 'Benefits' : 'الفوائد'}
                </h3>
                <ul className="space-y-3">
                  {tList(details.benefits, locale).map((b, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <Check className="w-4 h-4 text-gold-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>

              <Button href="/request-demo" size="lg" className="w-full">
                {locale === 'en' ? 'Request Demo' : 'اطلب عرضاً'}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
