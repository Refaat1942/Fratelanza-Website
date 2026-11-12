import { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { RouteError } from '@/components/RouteError'
import { lazyWithRetry } from '@/lib/lazyWithRetry'

const HomePage = lazyWithRetry(() => import('@/pages/HomePage'))
const AboutPage = lazyWithRetry(() => import('@/pages/AboutPage'))
const ServicesPage = lazyWithRetry(() => import('@/pages/ServicesPage'))
const HowWeWorkPage = lazyWithRetry(() => import('@/pages/HowWeWorkPage'))
const PricingPage = lazyWithRetry(() => import('@/pages/PricingPage'))
const CareersPage = lazyWithRetry(() => import('@/pages/CareersPage'))
const FreelancerPage = lazyWithRetry(() => import('@/pages/FreelancerPage'))
const StartProjectPage = lazyWithRetry(() => import('@/pages/StartProjectPage'))
const ContactPage = lazyWithRetry(() => import('@/pages/ContactPage'))
const FAQPage = lazyWithRetry(() => import('@/pages/FAQPage'))
const LinksPage = lazyWithRetry(() => import('@/pages/LinksPage'))
const RegisterPage = lazyWithRetry(() => import('@/pages/RegisterPage'))
const AdminPage = lazyWithRetry(() => import('@/pages/AdminPage'))
const NotFoundPage = lazyWithRetry(() => import('@/pages/NotFoundPage'))
const PrivacyPage = lazyWithRetry(() => import('@/pages/LegalPage').then((m) => ({ default: m.PrivacyPage })))
const TermsPage = lazyWithRetry(() => import('@/pages/LegalPage').then((m) => ({ default: m.TermsPage })))

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/admin',
    errorElement: <RouteError />,
    element: withSuspense(AdminPage),
  },
  {
    path: '/links',
    errorElement: <RouteError />,
    element: withSuspense(LinksPage),
  },
  {
    path: '/',
    errorElement: <RouteError />,
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'services', element: withSuspense(ServicesPage) },
      { path: 'how-we-work', element: withSuspense(HowWeWorkPage) },
      { path: 'pricing', element: withSuspense(PricingPage) },
      { path: 'register', element: withSuspense(RegisterPage) },
      { path: 'start-project', element: withSuspense(StartProjectPage) },
      { path: 'careers', element: withSuspense(CareersPage) },
      { path: 'freelancer', element: withSuspense(FreelancerPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: 'faq', element: withSuspense(FAQPage) },
      // Old addresses (products, sectors, case studies, blog) now point to the closest current page
      { path: 'products', element: <Navigate to="/services" replace /> },
      { path: 'products/:id', element: <Navigate to="/services" replace /> },
      { path: 'industries', element: <Navigate to="/services" replace /> },
      { path: 'integrations', element: <Navigate to="/services" replace /> },
      { path: 'case-studies', element: <Navigate to="/#clients" replace /> },
      { path: 'case-studies/:id', element: <Navigate to="/#clients" replace /> },
      { path: 'success-stories', element: <Navigate to="/#clients" replace /> },
      { path: 'our-work', element: <Navigate to="/#clients" replace /> },
      { path: 'why-fratelanza', element: <Navigate to="/how-we-work" replace /> },
      { path: 'delivery-process', element: <Navigate to="/how-we-work" replace /> },
      { path: 'packages', element: <Navigate to="/pricing" replace /> },
      { path: 'request-demo', element: <Navigate to="/register" replace /> },
      { path: 'blog', element: <Navigate to="/" replace /> },
      { path: 'blog/:id', element: <Navigate to="/" replace /> },
      { path: 'privacy', element: withSuspense(PrivacyPage) },
      { path: 'terms', element: withSuspense(TermsPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
])
