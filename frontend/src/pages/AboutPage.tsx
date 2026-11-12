import { Crown, UserRound } from 'lucide-react'
import { leadership } from '@/data/content'
import { about } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { Section, Heading, Reveal } from '@/components/site/ui'
import { SiteIcon } from '@/components/site/icons'
import { accent } from '@/components/site/accents'
import { Pillars } from '@/components/site/HomeSections'
import { cn } from '@/lib/utils'

export default function AboutPage() {
  const { t, isAr } = useTranslation()
  const leaderName = (en: string, founder?: boolean) => (isAr ? (founder ? 'د. أحمد رفعت' : 'م. أفنان فتحي') : en)

  return (
    <>
      <SEO title={t(about.title)} description={t(about.intro)} path="/about" />
      <PageHero eyebrow={isAr ? 'شريكك التقني' : 'Your technology partner'} title={t(about.title)} subtitle={t(about.intro)} />

      <Section>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <Reveal>
            <Heading center={false} className="!mb-6" eyebrow={isAr ? 'قصتنا' : 'Our story'} title={isAr ? 'بنبدأ من طريقة شغلك… مش من برنامج جاهز' : 'We start from how you work — not from a ready-made program'} />
            <p className="text-lg leading-relaxed text-slate-600">{t(about.story)}</p>
          </Reveal>
          <div className="grid gap-5">
            {[{ k: isAr ? 'رؤيتنا' : 'Vision', v: about.vision, i: 0 }, { k: isAr ? 'رسالتنا' : 'Mission', v: about.mission, i: 1 }].map(({ k, v, i }) => (
              <Reveal key={k} delay={i * 0.08}>
                <div className={cn('rounded-3xl p-7 text-white shadow-xl', i === 0 ? 'bg-gradient-to-br from-navy-800 to-navy-950' : 'bg-gradient-to-br from-sky-600 to-indigo-700')}>
                  <p className="text-sm font-bold uppercase tracking-wider text-goldx-300 rtl:tracking-normal">{k}</p>
                  <p className="mt-3 text-lg leading-relaxed">{t(v)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Pillars />

      <Section>
        <Heading eyebrow={isAr ? 'قيمنا' : 'Our values'} title={isAr ? 'المبادئ اللي بنشتغل بيها' : 'The principles we work by'} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {about.values.map((v, i) => (
            <Reveal key={v.title.en} delay={(i % 3) * 0.06}>
              <div className={cn('h-full rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition duration-300 hover:-translate-y-2 hover:shadow-2xl', accent(i).hover)}>
                <div className={cn('grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg', accent(i).tile)}><SiteIcon name={v.icon} className="w-6 h-6" /></div>
                <h3 className="mt-5 text-lg font-extrabold !text-navy-900">{t(v.title)}</h3>
                <p className="mt-2 text-slate-600">{t(v.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="soft">
        <Heading eyebrow={isAr ? 'القيادة' : 'Leadership'} title={isAr ? 'الفريق اللي بيقود فراتيلانزا' : 'The team leading Fratelanza'} />
        <div className="grid md:grid-cols-2 gap-6">
          {leadership.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="h-full rounded-3xl bg-white p-8 ring-1 ring-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={cn('grid h-16 w-16 place-items-center rounded-full text-white shadow-lg', p.isFounder ? 'bg-gradient-to-br from-goldx-300 to-goldx-500 !text-navy-950' : accent(5).tile)}>
                    {p.isFounder ? <Crown className="w-7 h-7" /> : <UserRound className="w-7 h-7" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold !text-navy-900">{leaderName(p.name, p.isFounder)}</h3>
                    <p className="text-sm font-bold text-goldx-600">{t(p.role)}</p>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-slate-600">{t(p.bio)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
