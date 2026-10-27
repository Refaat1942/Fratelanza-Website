import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { navLinks, company } from '@/data/content'
import { hero } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, dir, isAr } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const active = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path))

  return (
    <header
      dir={dir}
      className={cn(
        'fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300 border-b',
        scrolled ? 'shadow-[0_6px_24px_rgba(10,31,58,0.08)] border-slate-200' : 'border-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-[4.5rem]">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={company.name}>
            <img src="/logo.png" alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-goldx-400/70" style={{ clipPath: 'circle(41.5% at 49% 48.5%)', transform: 'scale(1.16)' }} />
            <span className="leading-tight">
              <span className="block text-lg font-extrabold tracking-wide text-navy-900">{isAr ? 'فراتيلانزا' : 'FRATELANZA'}</span>
              <span className="block text-[11px] font-semibold text-goldx-600">{t(company.slogan)}</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative px-3.5 py-2 text-[15px] font-semibold transition-colors',
                  active(link.path) ? 'text-navy-900' : 'text-slate-600 hover:text-navy-900',
                )}
              >
                {t(link.label)}
                {active(link.path) && <span className="absolute inset-x-3.5 -bottom-[1.05rem] h-0.5 rounded-full bg-goldx-500" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              to="/register"
              className="hidden md:inline-flex items-center gap-2 rounded-xl bg-goldx-500 px-5 py-2.5 text-sm font-extrabold text-navy-950 shadow-md shadow-goldx-500/25 transition hover:bg-goldx-400"
            >
              {t(hero.ctaPrimary)}
              <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2.5 rounded-xl text-navy-900 hover:bg-slate-100"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-4 py-3 rounded-xl text-base font-semibold',
                    active(link.path) ? 'bg-slate-100 text-navy-900' : 'text-slate-700 hover:bg-slate-50',
                  )}
                >
                  {t(link.label)}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-3">
                <LanguageSwitcher className="w-full justify-center" />
                <Link to="/register" className="inline-flex justify-center items-center gap-2 rounded-xl bg-goldx-500 px-5 py-3.5 font-extrabold text-navy-950">
                  {t(hero.ctaPrimary)}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
