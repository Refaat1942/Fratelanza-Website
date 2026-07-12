import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { Logo } from '@/components/ui/Logo'
import { company, overview, products, whyFratelanza } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Button } from '@/components/ui/Button'
import { Card, SectionHeader } from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const { t, ui, isAr } = useTranslation()

  return (
    <>
      <SEO
        title={ui('home', 'seoTitle')}
        description={t(overview.profile)}
        path="/"
      />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0d0e10_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Logo size="hero" animated showSlogan />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm font-semibold tracking-widest uppercase mb-6 mt-8 text-gradient-brand"
            >
              {t(company.tagline)}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
            >
              {isAr ? (
                <>{ui('home', 'heroTitle1')} <span className="text-gradient-gold">{ui('home', 'heroTitle2')}</span> {ui('home', 'heroTitle3')}</>
              ) : (
                <>{ui('home', 'heroTitle1')} <span className="text-gradient-gold">{ui('home', 'heroTitle2')}</span> {ui('home', 'heroTitle3')}</>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              {t(overview.profile)}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button href="/request-demo" size="lg">
                {ui('common', 'requestADemo')}
                <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
              </Button>
              <Button href={`https://wa.me/${company.whatsapp}`} variant="outline" size="lg">
                {ui('common', 'whatsappUs')}
              </Button>
              <Button href="/products" variant="secondary" size="lg">
                {ui('common', 'exploreProducts')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                <div className="mt-2 text-sm text-white/50">{t(stat.label)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={ui('home', 'ecosystem')}
            title={ui('home', 'enterpriseProducts')}
            subtitle={ui('home', 'ecosystemSub')}
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
                    <h3 className="text-lg font-semibold mb-2">{t(product.name)}</h3>
                    <p className="text-sm text-white/50 flex items-center gap-1 group-hover:text-gold-400 transition-colors">
                      {ui('common', 'learnMore')}
                      <ChevronRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
                    </p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={ui('home', 'whyBadge')}
            title={ui('home', 'whyTitle')}
            subtitle={t(overview.philosophy)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {whyFratelanza.slice(0, 6).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="flex items-start gap-3 h-full p-4 border-cyan-500/10 hover:border-cyan-400/25 transition-colors">
                  <DynamicIcon name={item.icon} className="w-6 h-6 text-cyan-300 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold mb-1">{t(item.title)}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{t(item.description)}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/why-fratelanza" variant="outline">
              {ui('common', 'learnMore')}
              <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card glow className="p-12">
            <Logo size="lg" animated className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{t(company.slogan)}</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto mt-4">{ui('home', 'ctaSub')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/request-demo" size="lg">
                {ui('common', 'requestDemo')}
                <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
              </Button>
              <Button href={`https://wa.me/${company.whatsapp}`} size="lg" variant="outline">
                {company.phone}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}
