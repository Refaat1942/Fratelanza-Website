import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ProductsPage = lazy(() => import('@/pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'))
const IndustriesPage = lazy(() => import('@/pages/IndustriesPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const IntegrationsPage = lazy(() => import('@/pages/IntegrationsPage'))
const WhyPage = lazy(() => import('@/pages/WhyPage'))
const DeliveryPage = lazy(() => import('@/pages/DeliveryPage'))
const PricingPage = lazy(() => import('@/pages/PricingPage'))
const SuccessPage = lazy(() => import('@/pages/SuccessPage'))
const CareersPage = lazy(() => import('@/pages/CareersPage'))
const FreelancerPage = lazy(() => import('@/pages/FreelancerPage'))
const RequestDemoPage = lazy(() => import('@/pages/RequestDemoPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const FAQPage = lazy(() => import('@/pages/FAQPage'))
const BlogPage = lazy(() => import('@/pages/BlogPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

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
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 'about', element: withSuspense(AboutPage) },
      { path: 'products', element: withSuspense(ProductsPage) },
      { path: 'products/:id', element: withSuspense(ProductDetailPage) },
      { path: 'industries', element: withSuspense(IndustriesPage) },
      { path: 'services', element: withSuspense(ServicesPage) },
      { path: 'integrations', element: withSuspense(IntegrationsPage) },
      { path: 'why-fratelanza', element: withSuspense(WhyPage) },
      { path: 'delivery-process', element: withSuspense(DeliveryPage) },
      { path: 'pricing', element: withSuspense(PricingPage) },
      { path: 'success-stories', element: withSuspense(SuccessPage) },
      { path: 'careers', element: withSuspense(CareersPage) },
      { path: 'freelancer', element: withSuspense(FreelancerPage) },
      { path: 'request-demo', element: withSuspense(RequestDemoPage) },
      { path: 'contact', element: withSuspense(ContactPage) },
      { path: 'faq', element: withSuspense(FAQPage) },
      { path: 'blog', element: withSuspense(BlogPage) },
      { path: 'blog/:id', element: withSuspense(BlogPostPage) },
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
])
