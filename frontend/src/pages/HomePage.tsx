import { SEO, FAQSchema } from '@/components/SEO'
import { homeFaq } from '@/data/homepage'
import { HeroSection } from '@/components/home/HeroSection'
import { HomeQuickNav } from '@/components/home/HomeQuickNav'
import { DeliveryPartnerSection } from '@/components/home/DeliveryPartnerSection'
import {
  VerifiedStatsSection, SolutionsGridSection, BeforeAfterSection,
  ProcessTimelineSection, FratelanzaProductsSection, DeliveryExperienceSection, NetworkIndustriesSection,
  AISection, CaseStudiesPreview, WhyPillarsSection, AudienceCardsSection,
  HomeFAQSection, FinalCTASection,
} from '@/components/home/HomeSections'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from '@/i18n/useTranslation'

export default function HomePage() {
  const { ui, locale } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <>
      <SEO title={ui('home', 'seoTitle')} description={ui('home', 'heroSub')} path="/" />
      <FAQSchema items={homeFaq.map((f) => ({ question: f.q[locale], answer: f.a[locale] }))} />
      <HeroSection />
      <HomeQuickNav />
      <DeliveryPartnerSection />
      <VerifiedStatsSection />
      <DeliveryExperienceSection />
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
