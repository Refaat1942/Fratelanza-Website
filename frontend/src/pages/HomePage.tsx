import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { Logo } from '@/components/ui/Logo'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { company, overview, products, whyFratelanza } from '@/data/content'
import { customerHook } from '@/data/serviceCategories'
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
      <SEO title={ui('home', 'seoTitle')} description={t(overview.profile)} path="/" />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <AnimatedBackground variant="hero" />
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
              transition={{ delay: 0.6 }}
              className="text-sm font-semibold tracking-widest uppercase mb-6 mt-8 text-gradient-brand"
            >
              {t(company.tagline)}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              {ui('home', 'heroTitle1')}{' '}
              <span className="text-gradient-premium">{ui('home', 'heroTitle2')}</span>{' '}
              {ui('home', 'heroTitle3')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
            >
              {t(overview.profile)}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button href="/request-demo" size="lg">
                {ui('common', 'requestADemo')}
                <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
              </Button>
              <Button href={`https://wa.me/${company.whatsapp}`} variant="outline" size="lg">
                {ui('common', 'whatsappUs')}
              </Button>
              <Button href="/products" variant="brand" size="lg">
                {ui('common', 'exploreProducts')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5 bg-gradient-to-r from-brand-500/5 via-transparent to-mint-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {company.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center glass-premium rounded-2xl p-6"
              >
                <AnimatedCounter value={stat.value} className="text-3xl md:text-4xl font-bold text-gradient-brand block" />
                <div className="mt-2 text-sm text-white/50">{t(stat.label)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Hook */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge={t(customerHook.badge)}
            title={t(customerHook.title)}
            subtitle={t(customerHook.subtitle)}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerHook.points.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card premium className="h-full flex items-start gap-3 p-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-mint-500/10 flex items-center justify-center shrink-0">
                    <DynamicIcon name={point.icon} className="w-5 h-5 text-brand-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{t(point.title)}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{t(point.description)}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/freelancer" variant="brand" size="lg">
              <Sparkles className="w-4 h-4" />
              {ui('home', 'hookCta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={ui('home', 'ecosystem')} title={ui('home', 'enterpriseProducts')} subtitle={ui('home', 'ecosystemSub')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/products/${product.id}`}>
                  <Card premium className="h-full group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/15 to-gold-500/10 flex items-center justify-center mb-4 group-hover:from-brand-500/25 transition-all duration-500">
                      <DynamicIcon name={product.icon} className="w-6 h-6 text-brand-300 group-hover:text-mint-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{t(product.name)}</h3>
                    <p className="text-sm text-white/50 flex items-center gap-1 group-hover:text-brand-300 transition-colors">
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

      {/* Why Fratelanza */}
      <section className="py-24 relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={ui('home', 'whyBadge')} title={ui('home', 'whyTitle')} subtitle={ui('why', 'ecosystemDesc')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {whyFratelanza.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Card premium className="flex items-start gap-3 h-full p-4 hover:border-mint-400/20">
                  <DynamicIcon name={item.icon} className="w-5 h-5 text-mint-400 shrink-0 mt-0.5" />
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

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card glow premium className="p-12">
            <Logo size="lg" animated className="mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient-brand">{t(company.slogan)}</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto mt-4">{ui('home', 'ctaSub')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/request-demo" size="lg">
                {ui('common', 'requestDemo')}
                <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
              </Button>
              <Button href={`https://wa.me/${company.whatsapp}`} size="lg" variant="brand">
                {company.phone}
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  )
}
