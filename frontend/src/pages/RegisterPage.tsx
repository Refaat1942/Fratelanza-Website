import { SEO } from '@/components/SEO'
import { registerCopy } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { RegisterSection } from '@/components/site/HomeSections'

export default function RegisterPage() {
  const { t } = useTranslation()
  return (
    <>
      <SEO title={t(registerCopy.title)} description={t(registerCopy.sub)} path="/register" />
      <div className="pt-[4.5rem] bg-navy-950">
        <RegisterSection />
      </div>
    </>
  )
}
