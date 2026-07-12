import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { company, overview, t, products, whyFratelanza } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'
import { Card, SectionHeader } from '@/components/ui/Card'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO
        title={locale === 'en' ? 'Enterprise Technology Solutions' : 'حلول تقنية مؤسسية'}
        description={t(overview.profile, locale)}
        path="/"
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-600/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0d0e10_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <img src="/logo.svg" alt={company.name} className="h-14 mx-auto mb-8 opacity-90" />
            <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4">
              {company.tagline}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              {locale === 'en' ? (
                <>Engineering the <span className="text-gradient-gold">Future</span> of Enterprise</>
              ) : (
                <>نبني <span className="text-gradient-gold">مستقبل</span> المؤسسات</>
              )}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {t(overview.profile, locale)}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/request-demo" size="lg">
                {locale === 'en' ? 'Request a Demo' : 'اطلب عرضاً'}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/products" variant="outline" size="lg">
                {locale === 'en' ? 'Explore Products' : 'استكشف المنتجات'}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {company.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold">{stat.value}</div>
                <div className="mt-2 text-sm text-white/50">{t(stat.label, locale)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={locale === 'en' ? 'Our Ecosystem' : 'منظومتنا'}
            title={locale === 'en' ? 'Enterprise Products' : 'منتجات مؤسسية'}
            subtitle={locale === 'en' ? 'A unified platform spanning healthcare, retail, real estate, and beyond.' : 'منصة موحدة تشمل الرعاية الصحية والتجزئة والعقارات وأكثر.'}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={`/products/${product.id}`}>
                    <Card className="h-full group">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                        <DynamicIcon name={product.icon} className="w-6 h-6 text-gold-400" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{t(product.name, locale)}</h3>
                      <p className="text-sm text-white/50 flex items-center gap-1 group-hover:text-gold-400 transition-colors">
                        {locale === 'en' ? 'Learn more' : 'اعرف المزيد'}
                        <ChevronRight className="w-4 h-4" />
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Why Fratelanza */}
      <section className="py-24 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={locale === 'en' ? 'Why Fratelanza' : 'لماذا فراتيلانزا'}
            title={locale === 'en' ? 'Not Just Software — A Living Platform' : 'ليس مجرد برنامج — منصة حية'}
            subtitle={t(overview.philosophy, locale)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyFratelanza.slice(0, 6).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card>
                    <DynamicIcon name={item.icon} className="w-8 h-8 text-gold-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t(item.title, locale)}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{t(item.description, locale)}</p>
                  </Card>
                </motion.div>
              ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/why-fratelanza" variant="outline">
              {locale === 'en' ? 'Learn More' : 'اعرف المزيد'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card glow className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {locale === 'en' ? 'Ready to Transform Your Business?' : 'مستعد لتحويل أعمالك؟'}
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              {locale === 'en'
                ? 'Schedule a personalized demo and discover how Fratelanza can power your digital transformation.'
                : 'احجز عرضاً مخصصاً واكتشف كيف يمكن لفراتيلانزا أن تدعم تحولك الرقمي.'}
            </p>
            <Button href="/request-demo" size="lg">
              {locale === 'en' ? 'Request Demo' : 'اطلب عرضاً'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Card>
        </div>
      </section>
    </>
  )
}
