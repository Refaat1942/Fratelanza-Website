import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { blogPosts, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import NotFoundPage from './NotFoundPage'

export default function BlogPostPage() {
  const { id } = useParams()
  const { locale } = useI18n()
  const post = blogPosts.find((p) => p.id === id)

  if (!post) return <NotFoundPage />

  return (
    <>
      <SEO title={t(post.title, locale)} description={t(post.excerpt, locale)} path={`/blog/${id}`} type="article" />
      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-gold-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {locale === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
          </Link>
          <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider">{t(post.category, locale)}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t(post.title, locale)}</h1>
          <div className="flex items-center gap-4 text-sm text-white/40 mb-12">
            <span>{post.date}</span>
            <span>{post.author}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-white/70 leading-relaxed mb-6">{t(post.excerpt, locale)}</p>
            <p className="text-white/60 leading-relaxed">
              {locale === 'en'
                ? 'This article is part of the Fratelanza knowledge base. Full content will be available soon. Subscribe to our newsletter or request a demo to stay updated on the latest insights in enterprise technology, ERP systems, and digital transformation.'
                : 'هذا المقال جزء من قاعدة معرفة فراتيلانزا. المحتوى الكامل سيكون متاحاً قريباً. اشترك في نشرتنا أو اطلب عرضاً للبقاء على اطلاع بأحدث الرؤى في التكنولوجيا المؤسسية وأنظمة ERP والتحول الرقمي.'}
            </p>
          </div>
        </div>
      </article>
    </>
  )
}
