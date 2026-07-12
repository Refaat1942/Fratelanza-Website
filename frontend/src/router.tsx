import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { RouteError } from '@/components/RouteError'
import { lazyWithRetry } from '@/lib/lazyWithRetry'

const HomePage = lazyWithRetry(() => import('@/pages/HomePage'))
const AboutPage = lazyWithRetry(() => import('@/pages/AboutPage'))
const ProductsPage = lazyWithRetry(() => import('@/pages/ProductsPage'))
const ProductDetailPage = lazyWithRetry(() => import('@/pages/ProductDetailPage'))
const IndustriesPage = lazyWithRetry(() => import('@/pages/IndustriesPage'))
const ServicesPage = lazyWithRetry(() => import('@/pages/ServicesPage'))
const IntegrationsPage = lazyWithRetry(() => import('@/pages/IntegrationsPage'))
const WhyPage = lazyWithRetry(() => import('@/pages/WhyPage'))
const DeliveryPage = lazyWithRetry(() => import('@/pages/DeliveryPage'))
const PricingPage = lazyWithRetry(() => import('@/pages/PricingPage'))
const SuccessPage = lazyWithRetry(() => import('@/pages/SuccessPage'))
const CareersPage = lazyWithRetry(() => import('@/pages/CareersPage'))
const FreelancerPage = lazyWithRetry(() => import('@/pages/FreelancerPage'))
const RequestDemoPage = lazyWithRetry(() => import('@/pages/RequestDemoPage'))
const ContactPage = lazyWithRetry(() => import('@/pages/ContactPage'))
const FAQPage = lazyWithRetry(() => import('@/pages/FAQPage'))
const BlogPage = lazyWithRetry(() => import('@/pages/BlogPage'))
const BlogPostPage = lazyWithRetry(() => import('@/pages/BlogPostPage'))
const AdminPage = lazyWithRetry(() => import('@/pages/AdminPage'))
const NotFoundPage = lazyWithRetry(() => import('@/pages/NotFoundPage'))

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
    path: '/',
    errorElement: <RouteError />,
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
