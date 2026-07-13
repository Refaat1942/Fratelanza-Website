import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { blogPosts } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'

export default function BlogPage() {
  const { t, ui, locale } = useTranslation()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const categories = ['all', ...new Set(blogPosts.map((p) => p.category.en))]

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat = category === 'all' || post.category.en === category
      const q = search.toLowerCase()
      const matchSearch = !q || t(post.title).toLowerCase().includes(q) || t(post.excerpt).toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [search, category, locale, t])

  return (
    <>
      <SEO title={ui('blog', 'title')} description={ui('blog', 'seoDesc')} path="/blog" />
      <PageHero title={ui('blog', 'title')} subtitle={ui('blog', 'subtitle')} />

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="search"
                placeholder={ui('common', 'searchArticles')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass bg-brand-50/50 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40' : 'bg-brand-50/50 text-body-subtle border border-slate-200/80'}`}>
                  {cat === 'all' ? ui('common', 'all') : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filtered.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="h-full">
                  <span className="text-xs text-gold-600 font-semibold">{t(post.category)}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{t(post.title)}</h3>
                  <p className="text-sm text-body-subtle mb-4">{t(post.excerpt)}</p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
