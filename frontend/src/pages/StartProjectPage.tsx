import { useEffect } from 'react'
import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { StartProjectForm } from '@/components/forms/StartProjectForm'
import { useTranslation } from '@/i18n/useTranslation'
import { trackStartProjectClick } from '@/lib/analytics'

export default function StartProjectPage() {
  const { ui } = useTranslation()

  useEffect(() => {
    trackStartProjectClick('start-project-page')
  }, [])

  return (
    <>
      <SEO title={ui('startProject', 'seoTitle')} description={ui('startProject', 'seoDesc')} path="/start-project" />
      <PageHero title={ui('startProject', 'title')} subtitle={ui('startProject', 'subtitle')} />
      <section className="pb-24 px-4">
        <StartProjectForm />
      </section>
    </>
  )
}
