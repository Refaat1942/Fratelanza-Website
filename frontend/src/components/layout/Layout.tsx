import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Header } from './Header'
import { Footer } from './Footer'
import { LoadingScreen } from './LoadingScreen'
import { OrganizationSchema } from '@/components/SEO'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { PageTransition } from '@/components/ui/PageTransition'
import { trackPageView } from '@/lib/analytics'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <>
      <LoadingScreen />
      <OrganizationSchema />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <WhatsAppButton />
      <ScrollRestoration />
    </>
  )
}
