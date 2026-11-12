import { SEO, FAQSchema } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { faq } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { Faq } from '@/components/site/HomeSections'

export default function FAQPage() {
  const { isAr, locale } = useTranslation()
  const title = isAr ? 'الأسئلة الشائعة' : 'Frequently asked questions'
  return (
    <>
      <SEO title={title} description={faq[0].a[locale]} path="/faq" />
      <FAQSchema items={faq.map((f) => ({ question: f.q[locale], answer: f.a[locale] }))} />
      <PageHero title={title} />
      <Faq tone="white" />
    </>
  )
}
