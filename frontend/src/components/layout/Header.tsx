import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, ui, dir } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-strong shadow-md shadow-slate-200/80'
          : 'bg-white/70 backdrop-blur-md border-b border-slate-200/60',
      )}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-6 h-[4.25rem] lg:h-[4.75rem]">
          <Link
            to="/"
            className="flex items-center shrink-0 pe-4 lg:pe-6 border-e border-slate-200/80 min-w-[9rem] lg:min-w-[11rem]"
          >
            <Logo size="sm" variant="header" showName />
          </Link>

          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-3 py-2 text-[13px] font-semibold rounded-xl transition-all whitespace-nowrap font-display',
                  location.pathname === link.path
                    ? 'text-brand-700 bg-brand-50 border border-brand-200/80 shadow-sm'
                    : 'text-ink-muted hover:text-brand-700 hover:bg-brand-50/60',
                )}
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher />

            <Button href="/request-demo" size="sm" className="hidden md:inline-flex">
              {ui('common', 'requestDemo')}
            </Button>

            <button
              onClick={() => setOpen(!open)}
              className="xl:hidden p-2.5 rounded-xl text-ink-muted hover:text-brand-700 hover:bg-brand-50 border border-transparent hover:border-brand-100"
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="xl:hidden glass-strong border-t border-slate-200"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-4 py-3 text-sm font-semibold rounded-xl transition-colors font-display',
                    location.pathname === link.path
                      ? 'text-brand-700 bg-brand-50 border border-brand-200'
                      : 'text-ink-muted hover:bg-slate-50',
                  )}
                >
                  {t(link.label)}
                </Link>
              ))}
              <div className="col-span-2 pt-2 flex flex-col gap-3">
                <LanguageSwitcher className="w-full justify-center" />
                <Button href="/request-demo" className="w-full">
                  {ui('common', 'requestDemo')}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
