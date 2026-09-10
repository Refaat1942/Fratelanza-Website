import { SEO, FAQSchema } from '@/components/SEO'
import { homeFaq } from '@/data/homepage'
import { HeroSection } from '@/components/home/HeroSection'
import { DeliveryPartnerSection } from '@/components/home/DeliveryPartnerSection'
import {
  VerifiedStatsSection, SolutionsGridSection, BeforeAfterSection,
  ProcessTimelineSection, FratelanzaProductsSection, NetworkIndustriesSection,
  AISection, CaseStudiesPreview, WhyPillarsSection, AudienceCardsSection,
  HomeFAQSection, FinalCTASection,
} from '@/components/home/HomeSections'
import { useTranslation } from '@/i18n/useTranslation'

export default function HomePage() {
  const { ui, locale } = useTranslation()

  return (
    <>
      <SEO title={ui('home', 'seoTitle')} description={ui('home', 'heroSub')} path="/" />
      <FAQSchema items={homeFaq.map((f) => ({ question: f.q[locale], answer: f.a[locale] }))} />
      <HeroSection />
      <DeliveryPartnerSection />
      <VerifiedStatsSection />
      <SolutionsGridSection />
      <BeforeAfterSection />
      <ProcessTimelineSection />
      <FratelanzaProductsSection />
      <NetworkIndustriesSection />
      <AISection />
      <CaseStudiesPreview />
      <WhyPillarsSection />
      <AudienceCardsSection />
      <HomeFAQSection />
      <FinalCTASection />
    </>
  )
}
