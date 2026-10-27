import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { caseStudies } from '@/data/caseStudies'
import { portfolio, sectors, deliveredFor, proofStats } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { Section, Heading, Reveal, BrowserFrame } from '@/components/site/ui'
import { WorkCard } from '@/components/site/HomeSections'
import { SiteIcon } from '@/components/site/icons'
import { cn } from '@/lib/utils'

export default function CaseStudiesPage() {
  const { t, isAr } = useTranslation()
  const [sector, setSector] = useState('all')
  const items = sector === 'all' ? portfolio : portfolio.filter((w) => w.sector === sector)
  const title = isAr ? 'أعمالنا وخبراتنا' : 'Our work & experience'
  const sub = isAr
    ? 'أنظمة حقيقية بنيناها لقطاعات مختلفة — صيدليات ومعامل وعيادات وعقارات ومحلات وشركات ومصانع وجهات حكومية.'
    : 'Real systems we have built across sectors — pharmacies, labs, clinics, real estate, retail, companies, factories and government.'

  return (
    <>
      <SEO title={title} description={sub} path="/case-studies" />
      <PageHero eyebrow={isAr ? 'أعمالنا' : 'Our work'} title={title} subtitle={sub} />

      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {proofStats.map((s) => (
            <div key={s.label.en} className="text-center">
              <p className="text-4xl font-extrabold text-navy-900" dir="ltr">{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{t(s.label)}</p>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <Heading eyebrow={isAr ? 'الأنظمة' : 'Systems'} title={isAr ? 'أنظمة بنيناها حسب القطاع' : 'Systems we built, by sector'} />
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {sectors.map((s) => (
            <button
              key={s.id}
              onClick={() => setSector(s.id)}
              className={cn('rounded-full px-5 py-2.5 text-sm font-bold transition', sector === s.id ? 'bg-navy-900 text-white shadow-lg shadow-navy-900/20' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-navy-700')}
            >
              {t(s.label)}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((w) => <WorkCard key={w.id} w={w} />)}
        </div>
      </Section>

      <Section tone="soft">
        <Heading eyebrow={isAr ? 'جهات اشتغلنا معاها' : 'Organizations'} title={isAr ? 'جهات سلّمنالها أنظمة' : 'Organizations we have delivered for'} />
        <div className="grid md:grid-cols-3 gap-6">
          {deliveredFor.map((d, i) => (
            <Reveal key={d.name.en} delay={i * 0.06}>
              <div className="h-full rounded-3xl bg-white p-8 ring-1 ring-slate-200 border-t-4 border-goldx-500">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-goldx-300"><SiteIcon name={d.icon} className="w-7 h-7" /></div>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-goldx-600 rtl:tracking-normal">{t(d.sector)}</p>
                <h3 className="mt-1 text-xl font-extrabold !text-navy-900">{t(d.name)}</h3>
                <p className="mt-2 text-slate-600">{t(d.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Heading eyebrow={isAr ? 'دراسات حالة' : 'Case studies'} title={isAr ? 'من المشكلة للحل' : 'From problem to solution'} />
        <div className="space-y-8">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.id}>
              <Link to={`/case-studies/${cs.id}`} className="group grid lg:grid-cols-2 gap-8 items-center rounded-3xl bg-surface p-6 sm:p-8 ring-1 ring-slate-200 hover:ring-navy-700 transition">
                <div className={cn(i % 2 === 1 && 'lg:order-2')}>
                  <BrowserFrame src={cs.screenshots[0]} alt={t(cs.title)} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-goldx-600 rtl:tracking-normal">{t(cs.industry)}</p>
                  <h3 className="mt-1 text-2xl font-extrabold !text-navy-900">{t(cs.title)}</h3>
                  <dl className="mt-5 space-y-4 text-slate-600">
                    <div><dt className="font-bold text-navy-900">{isAr ? 'المشكلة' : 'The problem'}</dt><dd className="mt-1">{t(cs.challenge)}</dd></div>
                    <div><dt className="font-bold text-navy-900">{isAr ? 'الحل' : 'The solution'}</dt><dd className="mt-1">{t(cs.solution)}</dd></div>
                  </dl>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {cs.features[isAr ? 'ar' : 'en'].map((f) => <li key={f} className="rounded-lg bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">{f}</li>)}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-bold text-navy-700 group-hover:text-goldx-600">
                    {isAr ? 'اقرأ دراسة الحالة' : 'Read the case study'} <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
