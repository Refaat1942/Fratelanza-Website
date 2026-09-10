import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { SEO } from '@/components/SEO'
import { caseStudies } from '@/data/caseStudies'
import { useTranslation } from '@/i18n/useTranslation'
import { Button } from '@/components/ui/Button'
import { trackEvent } from '@/lib/analytics'

export default function CaseStudyDetailPage() {
  const { id } = useParams()
  const { ui, locale } = useTranslation()
  const cs = caseStudies.find((c) => c.id === id)
  const t = (o: { en: string; ar: string }) => o[locale]
  const tList = (o: { en: string[]; ar: string[] }) => o[locale]

  useEffect(() => {
    if (id) trackEvent('case_study_viewed', { id })
  }, [id])

  if (!cs) {
    return <div className="py-24 text-center">{ui('notFound', 'message')}</div>
  }

  return (
    <>
      <SEO title={t(cs.title)} description={t(cs.problem)} path={`/case-studies/${cs.id}`} />
      <article className="max-w-4xl mx-auto px-4 py-16 pb-24">
        <span className="text-xs font-bold text-brand-600 uppercase">{t(cs.industry)}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-6 font-display">{t(cs.title)}</h1>

        <div className="space-y-8">
          <section><h2 className="font-bold text-lg mb-2">{ui('caseStudies', 'problem')}</h2><p className="text-body-muted">{t(cs.problem)}</p></section>
          <section><h2 className="font-bold text-lg mb-2">{ui('caseStudies', 'challenge')}</h2><p className="text-body-muted">{t(cs.challenge)}</p></section>
          <section><h2 className="font-bold text-lg mb-2">{ui('caseStudies', 'solution')}</h2><p className="text-body-muted">{t(cs.solution)}</p></section>
          <section><h2 className="font-bold text-lg mb-2">{ui('caseStudies', 'technology')}</h2><p className="text-body-muted">{t(cs.technology)}</p></section>
          <section>
            <h2 className="font-bold text-lg mb-2">{ui('caseStudies', 'features')}</h2>
            <ul className="list-disc ps-5 text-body-muted space-y-1">{tList(cs.features).map((f) => <li key={f}>{f}</li>)}</ul>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cs.screenshots.map((src) => (
              <img key={src} src={src} alt="" className="rounded-xl border border-slate-200 shadow-sm w-full" loading="lazy" />
            ))}
          </section>
          <section><h2 className="font-bold text-lg mb-2">{ui('caseStudies', 'result')}</h2><p className="text-body-muted italic">{t(cs.result)}</p></section>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/start-project">{ui('home', 'startProject')}</Button>
          <Button href={`/products/${cs.productId}`} variant="outline">{ui('common', 'learnMore')}</Button>
        </div>
      </article>
    </>
  )
}
