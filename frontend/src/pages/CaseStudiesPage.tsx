import { Link } from 'react-router-dom'
import { SEO } from '@/components/SEO'
import { PageHero, Card } from '@/components/ui/Card'
import { caseStudies } from '@/data/caseStudies'
import { useTranslation } from '@/i18n/useTranslation'

export default function CaseStudiesPage() {
  const { ui, locale } = useTranslation()
  const t = (o: { en: string; ar: string }) => o[locale]

  return (
    <>
      <SEO title={ui('caseStudies', 'title')} description={ui('caseStudies', 'subtitle')} path="/case-studies" />
      <PageHero title={ui('caseStudies', 'title')} subtitle={ui('caseStudies', 'subtitle')} />
      <section className="max-w-7xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((cs) => (
          <Link key={cs.id} to={`/case-studies/${cs.id}`}>
            <Card premium className="h-full overflow-hidden p-0 hover:shadow-xl transition-shadow">
              <img src={cs.screenshots[0]} alt={t(cs.title)} className="w-full h-44 object-cover object-top" loading="lazy" />
              <div className="p-5">
                <span className="text-xs font-bold text-brand-600 uppercase">{t(cs.industry)}</span>
                <h2 className="font-bold text-lg mt-1 mb-2">{t(cs.title)}</h2>
                <p className="text-sm text-body-subtle line-clamp-3">{t(cs.problem)}</p>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </>
  )
}
