import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { Button } from '@/components/ui/Button'
import { Card, SectionHeader } from '@/components/ui/Card'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import {
  verifiedStats, solutionCards, beforeItems, afterItems, processSteps,
  fratelanzaProducts, deliveryExperience, networkIndustries, aiCapabilities, whyPillars,
  audienceCards, homeFaq, homeT,
} from '@/data/homepage'
import { caseStudies } from '@/data/caseStudies'
import { useTranslation } from '@/i18n/useTranslation'
import { company } from '@/data/content'
import { cn } from '@/lib/utils'
import { trackStartProjectClick } from '@/lib/analytics'

export function VerifiedStatsSection() {
  const { locale } = useTranslation()
  return (
    <section className="py-12 border-y border-brand-100/80 bg-gradient-to-r from-brand-50/80 via-white to-mint-50/60">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 sm:gap-16">
        {verifiedStats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <AnimatedCounter value={stat.value} className="text-3xl sm:text-4xl font-bold text-gradient-brand block" />
            <div className="mt-1 text-sm text-body-muted">{homeT(stat.label, locale)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function SolutionsGridSection() {
  const { ui, locale, isAr } = useTranslation()
  const reduce = useReducedMotion()
  return (
    <section id="solutions" className="py-20 sm:py-24 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={ui('home', 'solutionsBadge')} title={ui('home', 'solutionsTitle')} subtitle={ui('home', 'solutionsSub')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10">
          {solutionCards.map((card, i) => (
            <motion.div key={card.title.en} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card premium className="h-full p-5 hover:border-brand-300/50 hover:shadow-lg transition-all group">
                <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-3 group-hover:bg-brand-100 transition-colors">
                  <DynamicIcon name={card.icon} className="w-5 h-5 text-brand-700" />
                </div>
                <h3 className="font-bold text-ink mb-2">{homeT(card.title, locale)}</h3>
                <p className="text-sm text-body-subtle leading-relaxed">{homeT(card.desc, locale)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/start-project" variant="outline" onClick={() => trackStartProjectClick('solutions')}>
            {ui('home', 'somethingElse')}
            <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export function BeforeAfterSection() {
  const { ui, locale } = useTranslation()
  const [showAfter, setShowAfter] = useState(false)
  const reduce = useReducedMotion()
  const items = showAfter ? afterItems : beforeItems
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-900 to-brand-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.25),transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={ui('home', 'transformBadge')} title={ui('home', 'transformTitle')} subtitle={ui('home', 'transformSub')} light />
        <div className="flex justify-center gap-2 mb-10">
          <button type="button" onClick={() => setShowAfter(false)} className={cn('px-5 py-2 rounded-full text-sm font-bold transition-all', !showAfter ? 'bg-white text-brand-900' : 'bg-white/10 text-white/80')}>{ui('home', 'before')}</button>
          <button type="button" onClick={() => setShowAfter(true)} className={cn('px-5 py-2 rounded-full text-sm font-bold transition-all', showAfter ? 'bg-mint-400 text-ink' : 'bg-white/10 text-white/80')}>{ui('home', 'after')}</button>
        </div>
        <motion.ul key={showAfter ? 'after' : 'before'} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.li key={item.en} initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 border border-white/10 backdrop-blur-sm">
              <span className={cn('w-2 h-2 rounded-full shrink-0', showAfter ? 'bg-mint-400' : 'bg-amber-400')} />
              <span className="text-sm font-medium">{homeT(item, locale)}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export function ProcessTimelineSection() {
  const { ui, locale } = useTranslation()
  const reduce = useReducedMotion()
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={ui('home', 'processBadge')} title={ui('home', 'processTitle')} subtitle={ui('home', 'processSub')} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, i) => (
            <motion.div key={step.step} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
              <Card premium className="p-6 h-full border-l-4 border-l-brand-500">
                <span className="text-xs font-bold text-brand-600 tracking-widest">{step.step}</span>
                <h3 className="text-lg font-bold mt-2 mb-2 font-display">{homeT(step.title, locale)}</h3>
                <p className="text-sm text-body-subtle">{homeT(step.desc, locale)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/delivery-process" variant="ghost">{ui('common', 'learnMore')}</Button>
        </div>
      </div>
    </section>
  )
}

export function FratelanzaProductsSection() {
  const { ui, locale, isAr } = useTranslation()
  return (
    <section id="products" className="py-20 sm:py-24 bg-gradient-to-b from-brand-50/40 to-white scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={ui('home', 'productsBadge')} title={ui('home', 'productsTitle')} subtitle={ui('home', 'productsSub')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {fratelanzaProducts.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="group">
              <Card premium className="overflow-hidden h-full p-0">
                <div className="aspect-video overflow-hidden bg-slate-900">
                  <img src={p.image} alt={homeT(p.name, locale)} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{homeT(p.name, locale)}</h3>
                  <p className="text-sm text-body-subtle mb-3">{homeT(p.desc, locale)}</p>
                  <span className="text-sm text-brand-700 font-semibold flex items-center gap-1">{ui('common', 'learnMore')}<ChevronRight className={cn('w-4 h-4', isAr && 'rotate-180')} /></span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DeliveryExperienceSection() {
  const { ui, locale } = useTranslation()
  return (
    <section id="clients" className="relative py-20 sm:py-28 overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(251,191,36,0.08),transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader light badge={ui('home', 'partnersBadge')} title={ui('home', 'partnersTitle')} subtitle={ui('home', 'partnersSub')} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10">
          {deliveryExperience.map((partner, i) => (
            <motion.article
              key={partner.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/25 border border-slate-100 h-full hover:-translate-y-1 hover:shadow-brand-900/30 transition-all duration-300"
            >
              <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-600 via-mint-500 to-gold-400" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-700 to-mint-600 flex items-center justify-center mb-5 shadow-lg shadow-brand-900/20">
                <DynamicIcon name={partner.icon} className="w-7 h-7 text-white" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-2">{homeT(partner.sector, locale)}</p>
              <h3 className="font-bold text-xl text-ink mb-3 font-display leading-snug">{homeT(partner.name, locale)}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{homeT(partner.desc, locale)}</p>
            </motion.article>
          ))}
        </div>

        <p className="text-center text-sm text-brand-100/90 mt-10 max-w-2xl mx-auto leading-relaxed">{ui('home', 'partnersDisclaimer')}</p>
      </div>
    </section>
  )
}

export function NetworkIndustriesSection() {
  const { ui, locale } = useTranslation()
  return (
    <section className="py-16 sm:py-20 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <SectionHeader badge={ui('home', 'networkBadge')} title={ui('home', 'networkTitle')} subtitle={ui('home', 'networkSub')} />
        <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-3xl mx-auto">
          {networkIndustries.map((ind) => (
            <span key={ind.en} className="px-4 py-2 rounded-full text-sm font-semibold bg-white border border-slate-200 text-ink-muted">{homeT(ind, locale)}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AISection() {
  const { ui, locale, isAr } = useTranslation()
  return (
    <section id="ai" className="py-20 sm:py-24 relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <SectionHeader badge={ui('home', 'aiBadge')} title={ui('home', 'aiTitle')} subtitle={ui('home', 'aiSub')} light />
        <p className="text-center text-lg text-brand-100 max-w-2xl mx-auto -mt-4 mb-10 font-display font-semibold">{ui('home', 'aiOutcomes')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {aiCapabilities.map((cap) => (
            <div key={cap.title.en} className="p-4 rounded-xl bg-white/10 border border-white/10 text-center hover:bg-white/15 transition-colors">
              <DynamicIcon name={cap.icon} className="w-6 h-6 mx-auto mb-2 text-mint-300" />
              <span className="text-xs sm:text-sm font-semibold">{homeT(cap.title, locale)}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/start-project?type=ai" size="lg" onClick={() => trackStartProjectClick('ai-section')}>
            {ui('home', 'startProject')}
            <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
          </Button>
        </div>
      </div>
    </section>
  )
}

export function CaseStudiesPreview() {
  const { ui, locale, isAr } = useTranslation()
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={ui('home', 'casesBadge')} title={ui('home', 'casesTitle')} subtitle={ui('home', 'casesSub')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {caseStudies.map((cs) => (
            <Link key={cs.id} to={`/case-studies/${cs.id}`}>
              <Card premium className="h-full overflow-hidden p-0 group">
                <img src={cs.screenshots[0]} alt={homeT(cs.title, locale)} className="w-full h-40 object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="p-5">
                  <span className="text-xs font-bold text-brand-600 uppercase">{homeT(cs.industry, locale)}</span>
                  <h3 className="font-bold mt-1 mb-2">{homeT(cs.title, locale)}</h3>
                  <p className="text-sm text-body-subtle line-clamp-2">{homeT(cs.problem, locale)}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button href="/case-studies" variant="outline">{ui('home', 'viewAllCases')}<ChevronRight className={cn('w-4 h-4', isAr && 'rotate-180')} /></Button>
        </div>
      </div>
    </section>
  )
}

export function WhyPillarsSection() {
  const { ui, locale } = useTranslation()
  return (
    <section className="py-20 sm:py-24 bg-brand-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={ui('home', 'whyBadge')} title={ui('home', 'whyPillarsTitle')} subtitle={ui('home', 'whyPillarsSub')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {whyPillars.map((p) => (
            <Card key={p.title.en} premium className="p-5">
              <DynamicIcon name={p.icon} className="w-5 h-5 text-brand-600 mb-3" />
              <h3 className="font-bold mb-1">{homeT(p.title, locale)}</h3>
              <p className="text-sm text-body-subtle">{homeT(p.desc, locale)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AudienceCardsSection() {
  const { locale, isAr } = useTranslation()
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {audienceCards.map((card) => (
          <Card key={card.title.en} glow premium className="p-8 flex flex-col h-full">
            <DynamicIcon name={card.icon} className="w-8 h-8 text-brand-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 font-display">{homeT(card.title, locale)}</h3>
            <p className="text-body-subtle mb-6 flex-1">{homeT(card.desc, locale)}</p>
            <Button href={card.href} className="w-full" onClick={() => trackStartProjectClick(`audience-${card.icon}`)}>
              {homeT(card.cta, locale)}
              <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}

export function HomeFAQSection() {
  const { ui, locale } = useTranslation()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="py-20 sm:py-24 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeader title={ui('home', 'faqTitle')} subtitle={ui('home', 'faqSub')} />
        <div className="mt-8 space-y-2">
          {homeFaq.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button type="button" className="w-full text-start px-5 py-4 font-semibold text-ink flex justify-between items-center" onClick={() => setOpen(open === i ? null : i)}>
                {homeT(item.q, locale)}
                <ChevronRight className={cn('w-4 h-4 transition-transform text-brand-600', open === i && 'rotate-90')} />
              </button>
              {open === i && <p className="px-5 pb-4 text-sm text-body-subtle leading-relaxed">{homeT(item.a, locale)}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCTASection() {
  const { ui, isAr } = useTranslation()
  return (
    <section id="start-project" className="py-24 scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Card glow premium className="p-10 sm:p-14 bg-gradient-to-br from-white via-brand-50/50 to-mint-50/30">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gradient-brand font-display mb-4">{ui('home', 'ctaTitle')}</h2>
          <p className="text-body-muted mb-8 max-w-xl mx-auto">{ui('home', 'ctaSub')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/start-project" size="lg" onClick={() => trackStartProjectClick('final-cta')}>
              {ui('home', 'startProject')}
              <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
            </Button>
            <Button href={`https://wa.me/${company.whatsapp}`} size="lg" variant="brand">{ui('home', 'talkToFratelanza')}</Button>
          </div>
        </Card>
      </div>
    </section>
  )
}
