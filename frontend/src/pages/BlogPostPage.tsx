import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { blogPosts } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { cn } from '@/lib/utils'
import NotFoundPage from './NotFoundPage'

export default function BlogPostPage() {
  const { id } = useParams()
  const { t, ui, isAr } = useTranslation()
  const post = blogPosts.find((p) => p.id === id)

  if (!post) return <NotFoundPage />

  return (
    <>
      <SEO title={t(post.title)} description={t(post.excerpt)} path={`/blog/${id}`} type="article" />
      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-body-subtle hover:text-gold-600 mb-8 transition-colors">
            <ArrowLeft className={cn('w-4 h-4', isAr && 'rotate-180')} />
            {ui('common', 'backToBlog')}
          </Link>
          <span className="text-xs text-gold-600 font-semibold uppercase tracking-wider">{t(post.category)}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-6">{t(post.title)}</h1>
          <div className="flex items-center gap-4 text-sm text-body-subtle mb-12">
            <span>{post.date}</span>
            <span>{post.author}</span>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-body-muted leading-relaxed mb-6">{t(post.excerpt)}</p>
            <p className="text-body-muted leading-relaxed">
              {ui('blog', 'comingSoon')}
            </p>
          </div>
        </div>
      </article>
    </>
  )
}
