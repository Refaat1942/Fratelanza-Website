import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { useTranslation } from '@/i18n/useTranslation'

export function PrivacyPage() {
  const { ui } = useTranslation()
  return (
    <>
      <SEO title={ui('legal', 'privacyTitle')} description={ui('legal', 'privacyDesc')} path="/privacy" />
      <PageHero title={ui('legal', 'privacyTitle')} subtitle={ui('legal', 'placeholder')} />
      <section className="max-w-3xl mx-auto px-4 pb-24 prose prose-slate">
        <p className="text-body-muted">{ui('legal', 'privacyPlaceholder')}</p>
      </section>
    </>
  )
}

export function TermsPage() {
  const { ui } = useTranslation()
  return (
    <>
      <SEO title={ui('legal', 'termsTitle')} description={ui('legal', 'termsDesc')} path="/terms" />
      <PageHero title={ui('legal', 'termsTitle')} subtitle={ui('legal', 'placeholder')} />
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <p className="text-body-muted">{ui('legal', 'termsPlaceholder')}</p>
      </section>
    </>
  )
}
