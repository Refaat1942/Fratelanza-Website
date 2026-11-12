import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, X, ChevronDown, MessageCircle, Mail, BadgeCheck, KeyRound, Wallet, Headphones, Globe, Smartphone, Server, Database, Plug } from 'lucide-react'
import { company } from '@/data/content'
import {
  hero, proofStats, capabilities, pillars, audiences, solutions, steps, deliverables, packages, packagesCommon,
  pricingNote, compareRows, clientsCopy, clients, faq, registerCopy,
} from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { Reveal, Section, Heading } from './ui'
import { SiteIcon } from './icons'
import { RegisterForm } from './RegisterForm'
import { accent } from './accents'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { cn } from '@/lib/utils'

const arrow = (isAr: boolean, cls = 'w-5 h-5') => <ArrowRight className={cn(cls, isAr && 'rotate-180')} />

/* ---------------- HERO ---------------- */
function PartnershipVisual() {
  const { t, isAr } = useTranslation()
  const reduce = useReducedMotion()
  const stage = (i: number) => (reduce ? {} : { initial: { opacity: 0, x: isAr ? 24 : -24 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.5 + i * 0.35, duration: 0.5 } })
  const node = 'flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs sm:text-sm font-bold text-white ring-1 ring-white/15'
  return (
    <div className="relative rounded-3xl bg-white/[0.06] p-5 sm:p-7 ring-1 ring-white/15 backdrop-blur-md shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between gap-3">
        <p className="text-base sm:text-lg font-extrabold text-white">{isAr ? 'مشروعك مع فراتيلانزا' : 'Your project with Fratelanza'}</p>
        <span className="rounded-full bg-goldx-500/15 px-3 py-1 text-xs font-bold text-goldx-300 ring-1 ring-goldx-400/30">{t(hero.eyebrow)}</span>
      </div>
      <ol className="relative mt-5 space-y-3">
        <span className="absolute top-3 bottom-3 start-[1.15rem] w-px bg-gradient-to-b from-cyan-400 via-violet-400 to-goldx-400 opacity-60" />
        {pillars.map((p, i) => (
          <motion.li key={p.title.en} {...stage(i)} className="relative flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10">
            <span className={cn('relative grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white shadow-lg', i === 3 ? 'bg-gradient-to-br from-goldx-300 to-goldx-500 !text-navy-950' : accent(i * 2).tile)}>
              <SiteIcon name={p.icon} className="w-4.5 h-4.5" />
            </span>
            <span className="min-w-0 flex-1 text-sm sm:text-[15px] font-bold text-white">{t(p.title)}</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/90 text-navy-950"><Check className="w-3.5 h-3.5" strokeWidth={3} /></span>
          </motion.li>
        ))}
      </ol>
      <div className="mt-5 rounded-2xl bg-navy-950/60 p-4 ring-1 ring-white/10">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 rtl:tracking-normal">{isAr ? 'معمارية النظام' : 'System architecture'}</p>
        <div className="grid grid-cols-2 gap-2">
          <span className={node}><Globe className="w-4 h-4 text-cyan-300" />{isAr ? 'تطبيق ويب' : 'Web app'}</span>
          <span className={node}><Smartphone className="w-4 h-4 text-violet-300" />{isAr ? 'تطبيق موبايل' : 'Mobile app'}</span>
        </div>
        <div className="my-1.5 flex justify-center"><span className="h-5 w-px bg-gradient-to-b from-cyan-300 to-goldx-300 anim-pulse-line" /></div>
        <div className={cn(node, 'justify-center')}><Server className="w-4 h-4 text-goldx-300" />{isAr ? 'منطق الأعمال والصلاحيات (API)' : 'Business logic & permissions (API)'}</div>
        <div className="my-1.5 flex justify-center"><span className="h-5 w-px bg-gradient-to-b from-goldx-300 to-emerald-300 anim-pulse-line" /></div>
        <div className="grid grid-cols-2 gap-2">
          <span className={node}><Database className="w-4 h-4 text-emerald-300" />{isAr ? 'قاعدة البيانات' : 'Database'}</span>
          <span className={node}><Plug className="w-4 h-4 text-rose-300" />{isAr ? 'الربط والتكامل' : 'Integrations'}</span>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const { t, isAr } = useTranslation()
  const reduce = useReducedMotion()
  const fade = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: 'easeOut' as const } })

  return (
    <section className="relative overflow-hidden bg-navy-hero text-white pt-28 sm:pt-32 pb-20 lg:pb-28">
      <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" />
      <div className="blob anim-drift h-96 w-96 -top-20 end-[8%] bg-cyan-500/25" />
      <div className="blob anim-drift h-80 w-80 bottom-0 start-[5%] bg-violet-500/25" style={{ animationDelay: '-7s' }} />
      <div className="blob anim-drift h-72 w-72 top-1/3 start-1/3 bg-goldx-500/20" style={{ animationDelay: '-12s' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <div>
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-goldx-400/40 bg-goldx-400/10 px-4 py-1.5 text-sm font-bold text-goldx-300">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" /></span>
            <BadgeCheck className="w-4 h-4" /> {t(hero.eyebrow)}
          </motion.div>
          <motion.h1 {...fade(0.08)} className="mt-6 text-[2.1rem] sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.15] !text-white">
            {t(hero.title1)}
            <span className="block mt-2 text-goldx-300 drop-shadow-[0_2px_18px_rgba(212,160,58,0.35)]">{t(hero.title2)}</span>
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 text-lg leading-relaxed text-slate-300 max-w-2xl">{t(hero.sub)}</motion.p>
          <motion.ul {...fade(0.24)} className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {hero.bullets.map((b) => (
              <li key={b.en} className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-goldx-300 to-goldx-500 text-navy-950 shadow-md shadow-goldx-500/30"><Check className="w-3.5 h-3.5" strokeWidth={3} /></span>
                {t(b)}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.32)} className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/register" className="shine anim-pulse-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-goldx-500 px-8 py-4 text-base font-extrabold text-navy-950 shadow-xl shadow-goldx-500/25 hover:bg-goldx-400 transition">
              <span className="relative z-[2] inline-flex items-center gap-2">{t(hero.ctaPrimary)} {arrow(isAr)}</span>
            </Link>
            <Link to="/how-we-work" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 px-8 py-4 text-base font-bold text-white hover:bg-white/10 transition">
              {t(hero.ctaSecondary)}
            </Link>
          </motion.div>
        </div>

        <motion.div {...fade(0.2)} className="relative">
          <PartnershipVisual />
          <div className="anim-float absolute -top-5 -end-3 z-30 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-navy-900 shadow-xl" style={{ animationDelay: '-1s' }}>
            <KeyRound className="w-5 h-5 text-goldx-500" /> {t(hero.chips.code)}
          </div>
          <div className="anim-float hidden sm:flex absolute top-1/2 -start-8 z-30 items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-navy-900 shadow-xl" style={{ animationDelay: '-3s' }}>
            <Wallet className="w-5 h-5 text-emerald-500" /> {t(hero.chips.fees)}
          </div>
          <div className="anim-float absolute -bottom-6 end-4 z-30 flex items-center gap-2 rounded-2xl bg-goldx-500 px-4 py-3 text-sm font-extrabold text-navy-950 shadow-xl" style={{ animationDelay: '-4.5s' }}>
            <Headphones className="w-5 h-5" /> {t(hero.chips.support)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------- PROOF BAR + capabilities ticker ---------------- */
export function ProofBar() {
  const { t, isAr } = useTranslation()
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {proofStats.map((s, i) => (
            <Reveal key={s.label.en} delay={i * 0.06} className="text-center">
              <p className="text-4xl sm:text-5xl font-extrabold" dir="ltr">
                <AnimatedCounter value={s.value} className={cn('bg-gradient-to-br bg-clip-text text-transparent', accent(i * 2).bar)} />
              </p>
              <span className={cn('mx-auto mt-2 block h-1 w-10 rounded-full bg-gradient-to-r', accent(i * 2).bar)} />
              <p className="mt-2 text-sm font-semibold text-slate-500">{t(s.label)}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="marquee overflow-hidden border-t border-slate-200 bg-navy-900 py-4" dir="ltr" aria-hidden="true">
        <div className="marquee-track gap-10 pe-10">
          {[...capabilities, ...capabilities, ...capabilities].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap text-base font-bold text-white" dir={isAr ? 'rtl' : 'ltr'}>
              <span className={cn('h-2.5 w-2.5 rounded-full bg-gradient-to-br', accent(i).bar)} />
              {t(c)}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- CORE: what a technology partner does ---------------- */
export function Pillars() {
  const { t, isAr } = useTranslation()
  return (
    <Section id="why" tone="soft">
      <Heading
        eyebrow={isAr ? 'إحنا مين' : 'Who we are'}
        title={isAr ? 'شريكك التقني من الفكرة لحد الكود المصدري' : 'Your technology partner — from the idea to the source code'}
        sub={isAr ? 'مش بنبيع برامج جاهزة. بنحلل شغلك، ونصمم المعمارية، ونبني السيستم المخصص ليك، ونسلّمك الكود المصدري.' : 'We do not sell ready-made software. We analyze your business, design the architecture, build your custom system and hand over the source code.'}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => {
          const featured = i === 3
          return (
            <Reveal key={p.title.en} delay={i * 0.07}>
              <article className={cn('relative h-full rounded-3xl p-7 ring-1 transition duration-300 hover:-translate-y-2', featured ? 'border-glow bg-navy-900 text-white ring-transparent shadow-2xl shadow-navy-900/25' : cn('bg-white ring-slate-200 shadow-sm hover:shadow-2xl', accent(i * 2).hover))}>
                <span className={cn('absolute top-5 end-6 text-4xl font-extrabold', featured ? 'text-white/10' : 'text-slate-100')} dir="ltr">0{i + 1}</span>
                <div className={cn('relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-lg', featured ? 'bg-gradient-to-br from-goldx-300 to-goldx-500 !text-navy-950' : accent(i * 2).tile)}>
                  <SiteIcon name={p.icon} className="w-7 h-7" />
                </div>
                <h3 className={cn('relative mt-6 text-xl font-extrabold', featured ? '!text-white' : '!text-navy-900')}>{t(p.title)}</h3>
                <p className={cn('relative mt-3 text-[15px] leading-relaxed', featured ? 'text-slate-300' : 'text-slate-600')}>{t(p.text)}</p>
                <ul className="relative mt-5 space-y-2">
                  {p.points[isAr ? 'ar' : 'en'].map((pt) => (
                    <li key={pt} className={cn('flex gap-2 text-sm font-semibold', featured ? 'text-white' : 'text-navy-900')}>
                      <Check className={cn('w-4.5 h-4.5 shrink-0 mt-0.5', featured ? 'text-goldx-300' : accent(i * 2).text)} strokeWidth={2.8} /> {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

/* ---------------- CORPORATES & SMEs ---------------- */
export function Audiences() {
  const { t, isAr } = useTranslation()
  return (
    <Section>
      <Heading eyebrow={isAr ? 'بنخدم مين' : 'Who we serve'} title={isAr ? 'للشركات الكبرى والصغيرة والمتوسطة' : 'For corporates and SMEs'} sub={isAr ? 'نفس المنهجية، ونطاق مناسب لحجم كل شركة.' : 'The same method, with a scope that fits each company’s size.'} />
      <div className="grid md:grid-cols-2 gap-6">
        {audiences.map((a, i) => (
          <Reveal key={a.title.en} delay={i * 0.08}>
            <article className={cn('relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-8 sm:p-10 ring-1 ring-slate-200 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl', accent(i ? 2 : 5).hover)}>
              <span className={cn('absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l', accent(i ? 2 : 5).bar)} />
              <div className="flex items-center gap-4">
                <div className={cn('grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg', accent(i ? 2 : 5).tile)}><SiteIcon name={a.icon} className="w-8 h-8" /></div>
                <h3 className="text-2xl font-extrabold !text-navy-900">{t(a.title)}</h3>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">{t(a.text)}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 flex-1">
                {a.points[isAr ? 'ar' : 'en'].map((pt) => (
                  <li key={pt} className="flex gap-2.5 font-semibold text-navy-900"><Check className={cn('w-5 h-5 shrink-0', accent(i ? 2 : 5).text)} strokeWidth={2.8} /> {pt}</li>
                ))}
              </ul>
              <Link to="/register" className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 font-extrabold text-white hover:bg-navy-800 transition">
                {t(a.cta)} {arrow(isAr, 'w-4 h-4')}
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- SYSTEMS WE CUSTOMIZE ---------------- */
export function Solutions() {
  const { t, isAr } = useTranslation()
  return (
    <Section id="solutions" tone="soft">
      <Heading
        eyebrow={isAr ? 'أنظمة بنخصصها' : 'Systems we customize'}
        title={isAr ? 'كل الأنظمة اللي تدير بيها شركتك — مبنية على مقاسك' : 'Every system you need to run your company — built for you'}
        sub={isAr ? 'نظام واحد مترابط أو موديول بموديول، حسب احتياج شركتك.' : 'One connected system, or module by module — as your company needs.'}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {solutions.map((so, i) => (
          <Reveal key={so.title.en} delay={(i % 4) * 0.05}>
            <Link to={`/register?type=${so.type}`} className={cn('group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-2 hover:shadow-2xl', accent(i).hover)}>
              <span className={cn('absolute -top-10 -end-10 h-28 w-28 rounded-full bg-gradient-to-br opacity-10 transition duration-500 group-hover:scale-150 group-hover:opacity-20', accent(i).bar)} />
              <div className={cn('relative grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-3', accent(i).tile)}>
                <SiteIcon name={so.icon} className="w-6 h-6" />
              </div>
              <h3 className="relative mt-5 text-lg font-extrabold !text-navy-900">{t(so.title)}</h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t(so.text)}</p>
              <span className={cn('relative mt-4 inline-flex items-center gap-1.5 text-sm font-bold', accent(i).text)}>
                {isAr ? 'اطلبه مخصص ليك' : 'Get it built for you'} {arrow(isAr, 'w-4 h-4')}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* ---------------- METHOD ---------------- */
export function Process({ id = 'how' }: { id?: string }) {
  const { t, isAr } = useTranslation()
  return (
    <Section id={id}>
      <Heading eyebrow={isAr ? 'منهجية العمل' : 'Our method'} title={isAr ? 'إزاي بنشتغل معاك كشريك تقني' : 'How we work with you as a technology partner'} />
      <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {steps.map((s, i) => (
          <Reveal key={s.title.en} delay={i * 0.07}>
            <li className={cn('relative h-full rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-2 hover:shadow-2xl', accent(i * 2 + 1).hover)}>
              <span className="absolute top-5 end-5 text-4xl font-extrabold text-slate-100" dir="ltr">0{i + 1}</span>
              <div className={cn('relative grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg', accent(i * 2 + 1).tile)}><SiteIcon name={s.icon} className="w-6 h-6" /></div>
              <h3 className="relative mt-5 text-base font-extrabold !text-navy-900">{t(s.title)}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{t(s.text)}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

/* ---------------- WHAT YOU RECEIVE + OWNERSHIP ---------------- */
export function Ownership() {
  const { t, isAr } = useTranslation()
  const cell = (v: boolean | { en: string; ar: string }, good: boolean) =>
    typeof v === 'boolean' ? (
      v ? <Check className="mx-auto w-6 h-6 text-emerald-400" strokeWidth={3} /> : <X className="mx-auto w-6 h-6 text-rose-400" strokeWidth={3} />
    ) : (
      <span className={cn('font-bold', good ? 'text-emerald-300' : 'text-rose-300')}>{t(v)}</span>
    )
  return (
    <Section tone="navy">
      <div className="absolute inset-0 bg-grid-faint opacity-60" />
      <div className="relative">
        <Heading light eyebrow={isAr ? 'ملكية ١٠٠٪' : '100% ownership'} title={isAr ? 'هتستلم إيه في آخر المشروع' : 'What you receive at the end of the project'} sub={isAr ? 'كل حاجة تخص السيستم بتبقى ملكك — من التحليل والمعمارية لحد الكود المصدري.' : 'Everything about your system becomes yours — from the analysis and architecture to the source code.'} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliverables.map((d, i) => (
            <Reveal key={d.title.en} delay={(i % 3) * 0.06}>
              <div className="flex h-full items-center gap-4 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/15 transition hover:bg-white/[0.1]">
                <span className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-lg', i === 3 ? 'bg-gradient-to-br from-goldx-300 to-goldx-500 !text-navy-950' : accent(i * 2).tile)}><SiteIcon name={d.icon} className="w-6 h-6" /></span>
                <span className="font-bold text-white">{t(d.title)}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold !text-white">{isAr ? 'شريك تقني… مش اشتراك على طول' : 'A technology partner — not a subscription forever'}</h3>
            <p className="mt-3 text-slate-300 leading-relaxed">{isAr ? 'مع البرامج الجاهزة بتفضل تدفع اشتراك ومش بتملك حاجة. معانا بتدفع على مشروعك وبتستلم الكود المصدري كامل.' : 'With ready-made software you keep paying and own nothing. With us you pay for your project and receive the full source code.'}</p>
            <Link to="/register" className="shine mt-6 inline-flex items-center gap-2 rounded-2xl bg-goldx-500 px-7 py-4 font-extrabold text-navy-950 hover:bg-goldx-400 transition">
              <span className="relative z-[2] inline-flex items-center gap-2">{t(hero.ctaPrimary)} {arrow(isAr)}</span>
            </Link>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/15 backdrop-blur">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-4" />
                    <th className="p-4 text-center"><span className="inline-block rounded-full bg-goldx-500 px-3 py-1 text-xs sm:text-sm font-extrabold text-navy-950">{isAr ? 'فراتيلانزا' : 'Fratelanza'}</span></th>
                    <th className="p-4 text-center text-xs sm:text-sm font-bold text-slate-400">{isAr ? 'برامج جاهزة بالاشتراك' : 'Ready-made subscription software'}</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r) => (
                    <tr key={r.label.en} className="border-b border-white/5 last:border-0">
                      <td className="p-4 font-semibold text-white">{t(r.label)}</td>
                      <td className="p-4 text-center bg-white/[0.03]">{cell(r.us, true)}</td>
                      <td className="p-4 text-center">{cell(r.them, false)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* ---------------- PACKAGES ---------------- */
export function Packages({ showHeading = true }: { showHeading?: boolean }) {
  const { t, isAr } = useTranslation()
  return (
    <Section id="packages" tone="soft">
      {showHeading && (
        <Heading
          eyebrow={isAr ? 'باقات مرنة' : 'Flexible packages'}
          title={isAr ? 'نطاق مناسب لحجم شركتك' : 'A scope that fits your company'}
          sub={isAr ? 'ابدأ باللي تحتاجه وزوّد بعدين. كل الباقات ملكية كاملة ومن غير اشتراكات.' : 'Start with what you need and grow later. Every package is fully owned — no subscriptions.'}
        />
      )}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {packages.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <article className={cn('relative flex h-full flex-col rounded-3xl p-7 ring-1 transition duration-300 hover:-translate-y-2', p.featured ? 'border-glow bg-navy-900 text-white ring-transparent shadow-2xl shadow-navy-900/30 xl:-translate-y-3' : cn('bg-white ring-slate-200 shadow-sm hover:shadow-2xl', accent(i * 2).hover))}>
              {p.featured && <span className="absolute -top-3 start-7 rounded-full bg-goldx-500 px-3 py-1 text-xs font-extrabold text-navy-950">{isAr ? 'الأكثر طلباً' : 'Most popular'}</span>}
              <div className={cn('grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg', p.featured ? 'bg-gradient-to-br from-goldx-300 to-goldx-500 !text-navy-950' : accent(i * 2).tile)}>
                <SiteIcon name={p.icon} className="w-6 h-6" />
              </div>
              <h3 className={cn('mt-5 text-2xl font-extrabold', p.featured ? '!text-white' : '!text-navy-900')}>{t(p.name)}</h3>
              <p className={cn('mt-2 text-sm', p.featured ? 'text-slate-300' : 'text-slate-600')}>{t(p.for)}</p>
              <ul className="mt-6 space-y-3 flex-1">
                {p.items[isAr ? 'ar' : 'en'].map((it) => (
                  <li key={it} className={cn('flex gap-2.5 text-sm font-medium', p.featured ? 'text-slate-100' : 'text-slate-700')}>
                    <Check className={cn('w-5 h-5 shrink-0', p.featured ? 'text-goldx-300' : 'text-emerald-500')} strokeWidth={2.6} /> {it}
                  </li>
                ))}
              </ul>
              <Link
                to={`/register?package=${p.id}`}
                className={cn('mt-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 font-extrabold transition', p.featured ? 'bg-goldx-500 text-navy-950 hover:bg-goldx-400' : 'bg-navy-900 text-white hover:bg-navy-800')}
              >
                {t(p.cta)}
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <div className="rounded-3xl bg-white p-6 sm:p-8 ring-1 ring-slate-200">
          <p className="text-center text-sm font-bold uppercase tracking-[0.14em] text-goldx-600 rtl:tracking-normal">{isAr ? 'في كل الباقات' : 'Included in every package'}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {packagesCommon.map((c) => (
              <li key={c.en} className="flex items-center gap-2 font-bold text-navy-900"><BadgeCheck className="w-5 h-5 text-goldx-500" /> {t(c)}</li>
            ))}
          </ul>
          <p className="mt-5 text-center text-sm text-slate-500 max-w-3xl mx-auto">{t(pricingNote)}</p>
        </div>
      </Reveal>
    </Section>
  )
}

/* ---------------- CLIENTS (names only, no categories) ---------------- */
export function Clients() {
  const { t } = useTranslation()
  return (
    <Section id="clients">
      <Heading eyebrow={t(clientsCopy.eyebrow)} title={t(clientsCopy.title)} />
      <div className="grid md:grid-cols-3 gap-6">
        {clients.map((c, i) => (
          <Reveal key={c.name.en} delay={i * 0.08}>
            <article className={cn('relative h-full overflow-hidden rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl', accent(i * 2 + 1).hover)}>
              <span className={cn('absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l', accent(i * 2 + 1).bar)} />
              <div className={cn('mx-auto grid h-20 w-20 place-items-center rounded-full text-3xl font-extrabold text-white shadow-lg', accent(i * 2 + 1).tile)}>
                {t(c.name).replace(/^ال/, '').trim().charAt(0)}
              </div>
              <h3 className="mt-6 text-2xl font-extrabold leading-snug !text-navy-900">{t(c.name)}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{t(c.text)}</p>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-slate-500">{t(clientsCopy.note)}</p>
    </Section>
  )
}

/* ---------------- REGISTER ---------------- */
export function RegisterSection() {
  const { t, isAr } = useTranslation()
  return (
    <Section id="register" tone="navy">
      <div className="absolute inset-0 bg-grid-faint opacity-50" />
      <div className="relative grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <Heading light center={false} className="!mb-8" eyebrow={t(registerCopy.eyebrow)} title={t(registerCopy.title)} sub={t(registerCopy.sub)} />
          <ul className="space-y-4">
            {registerCopy.perks.map((p) => (
              <li key={p.en} className="flex items-center gap-3 text-lg font-bold text-white">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-goldx-500 text-navy-950"><Check className="w-4 h-4" strokeWidth={3} /></span>
                {t(p)}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/15 hover:bg-white/10 transition">
              <MessageCircle className="w-6 h-6 text-emerald-400" />
              <span><span className="block text-xs text-slate-400">{isAr ? 'واتساب' : 'WhatsApp'}</span><span className="font-bold text-white" dir="ltr">{company.whatsappDisplay}</span></span>
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/15 hover:bg-white/10 transition">
              <Mail className="w-6 h-6 text-goldx-300" />
              <span><span className="block text-xs text-slate-400">{isAr ? 'إيميل' : 'Email'}</span><span className="font-bold text-white">{company.email}</span></span>
            </a>
          </div>
        </div>
        <Reveal><RegisterForm source="home" /></Reveal>
      </div>
    </Section>
  )
}

/* ---------------- FAQ ---------------- */
export function Faq({ tone = 'soft' }: { tone?: 'white' | 'soft' }) {
  const { t, isAr } = useTranslation()
  const [open, setOpen] = useState<number | null>(0)
  return (
    <Section tone={tone}>
      <Heading eyebrow={isAr ? 'أسئلة شائعة' : 'FAQ'} title={isAr ? 'عندك سؤال؟' : 'Questions, answered'} />
      <div className="max-w-3xl mx-auto space-y-3">
        {faq.map((f, i) => (
          <div key={f.q.en} className="rounded-2xl bg-white ring-1 ring-slate-200">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-start" aria-expanded={open === i}>
              <span className="text-base sm:text-lg font-bold text-navy-900">{t(f.q)}</span>
              <ChevronDown className={cn('w-5 h-5 shrink-0 text-slate-500 transition-transform', open === i && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 leading-relaxed text-slate-600">{t(f.a)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  )
}
