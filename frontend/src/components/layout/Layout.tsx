import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { LoadingScreen } from './LoadingScreen'
import { OrganizationSchema } from '@/components/SEO'

export function Layout() {
  return (
    <>
      <LoadingScreen />
      <OrganizationSchema />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </>
  )
}
