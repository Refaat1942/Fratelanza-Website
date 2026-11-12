import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { useTranslation } from '@/i18n/useTranslation'
import { Pillars, Process, Ownership, Faq } from '@/components/site/HomeSections'

export default function HowWeWorkPage() {
  const { isAr } = useTranslation()
  const title = isAr ? 'منهجية عملنا' : 'How we work'
  const sub = isAr
    ? 'تحليل أعمال، ثم معمارية النظام، ثم تطوير مخصص على مراحل، ثم تسليم الكود المصدري — وبعدها شراكة تقنية مستمرة.'
    : 'Business analysis, then system architecture, then custom development in stages, then source-code handover — followed by an ongoing technology partnership.'
  return (
    <>
      <SEO title={title} description={sub} path="/how-we-work" />
      <PageHero eyebrow={isAr ? 'الشراكة التقنية' : 'Technology partnership'} title={title} subtitle={sub} />
      <Process id="method" />
      <Pillars />
      <Ownership />
      <Faq tone="white" />
    </>
  )
}
