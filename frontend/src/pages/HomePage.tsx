import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO, FAQSchema } from '@/components/SEO'
import { faq, hero } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { Hero, ProofBar, Pillars, WorkPreview, Packages, Ownership, Process, RegisterSection, Faq } from '@/components/site/HomeSections'

export default function HomePage() {
  const { t, locale } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <>
      <SEO title={`${t(hero.title1)} ${t(hero.title2)}`} description={t(hero.sub)} path="/" />
      <FAQSchema items={faq.map((f) => ({ question: f.q[locale], answer: f.a[locale] }))} />
      <Hero />
      <ProofBar />
      <Pillars />
      <WorkPreview />
      <Packages />
      <Ownership />
      <Process />
      <RegisterSection />
      <Faq />
    </>
  )
}
