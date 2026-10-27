import { SEO, FAQSchema } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { faq } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { Packages, Ownership, Process, Faq } from '@/components/site/HomeSections'

export default function PricingPage() {
  const { isAr, locale } = useTranslation()
  const title = isAr ? 'باقات مرنة… وملكية ١٠٠٪' : 'Flexible packages. 100% ownership.'
  const sub = isAr
    ? 'اختار الموديولات اللي تحتاجها، وادفع على مشروعك مرة واحدة، واستلم السيستم بالكود المصدري — من غير اشتراكات ولا رخص.'
    : 'Choose the modules you need, pay for your project once, and receive the system with its source code — no subscriptions, no licenses.'
  return (
    <>
      <SEO title={isAr ? 'الباقات' : 'Packages'} description={sub} path="/pricing" />
      <FAQSchema items={faq.map((f) => ({ question: f.q[locale], answer: f.a[locale] }))} />
      <PageHero eyebrow={isAr ? 'الباقات' : 'Packages'} title={title} subtitle={sub} />
      <Packages showHeading={false} />
      <Ownership />
      <Process />
      <Faq />
    </>
  )
}
