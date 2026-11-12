import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { useTranslation } from '@/i18n/useTranslation'
import { Pillars, Solutions, Audiences } from '@/components/site/HomeSections'

export default function ServicesPage() {
  const { isAr } = useTranslation()
  const title = isAr ? 'خدماتنا' : 'Our services'
  const sub = isAr
    ? 'بنحلل أعمالك، ونصمم معمارية النظام، ونبني أنظمة مخصصة للشركات الكبرى والصغيرة والمتوسطة، ونسلّمها بالكود المصدري.'
    : 'We analyze your business, design the system architecture, and build customizable systems for corporates and SMEs — delivered with their source code.'
  return (
    <>
      <SEO title={title} description={sub} path="/services" />
      <PageHero eyebrow={isAr ? 'شريكك التقني' : 'Your technology partner'} title={title} subtitle={sub} />
      <Pillars />
      <Audiences />
      <Solutions />
    </>
  )
}
