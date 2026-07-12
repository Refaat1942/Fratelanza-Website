import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, Sun, Moon } from 'lucide-react'
import { company, navLinks, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(true)
  const { locale, setLocale } = useI18n()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/logo.svg" alt={company.name} className="h-8 lg:h-10" />
          </Link>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  location.pathname === link.path
                    ? 'text-gold-400 bg-gold-500/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5',
                )}
              >
                {t(link.label, locale)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-5 h-5" />
              <span className="sr-only">{locale === 'en' ? 'AR' : 'EN'}</span>
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors hidden sm:block"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Button href="/request-demo" size="sm" className="hidden md:inline-flex">
              {locale === 'en' ? 'Request Demo' : 'اطلب عرضاً'}
            </Button>

            <button
              onClick={() => setOpen(!open)}
              className="xl:hidden p-2 rounded-lg text-white/70 hover:text-white"
              aria-label="Menu"
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
            className="xl:hidden glass-strong border-t border-white/10"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                    location.pathname === link.path
                      ? 'text-gold-400 bg-gold-500/10'
                      : 'text-white/70 hover:bg-white/5',
                  )}
                >
                  {t(link.label, locale)}
                </Link>
              ))}
              <div className="col-span-2 pt-2">
                <Button href="/request-demo" className="w-full">
                  {locale === 'en' ? 'Request Demo' : 'اطلب عرضاً'}
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
