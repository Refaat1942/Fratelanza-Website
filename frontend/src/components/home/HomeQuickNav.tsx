import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '@/i18n/useTranslation'
import { trackStartProjectClick } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const LINKS = [
  { id: 'solutions', key: 'quickNavSolutions' as const },
  { id: 'products', key: 'quickNavProducts' as const },
  { id: 'clients', key: 'quickNavClients' as const },
  { id: 'ai', key: 'quickNavAi' as const },
]

export function HomeQuickNav() {
  const { ui, isAr } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      aria-label="Quick navigation"
      className={cn(
        'fixed inset-x-0 z-40 transition-all duration-300 top-[4.25rem] lg:top-[4.75rem]',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none',
      )}
    >
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold text-ink-muted hover:text-brand-800 hover:bg-brand-50 border border-transparent hover:border-brand-200 transition-colors"
            >
              {ui('home', link.key)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              trackStartProjectClick('quick-nav')
              scrollTo('start-project')
            }}
            className="shrink-0 ms-auto inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-700 to-mint-600 shadow-md"
          >
            {ui('home', 'startProject')}
            <ArrowRight className={cn('w-3.5 h-3.5', isAr && 'rotate-180')} />
          </button>
        </div>
      </div>
    </nav>
  )
}
