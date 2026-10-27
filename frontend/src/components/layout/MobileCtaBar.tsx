import { Link, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { company } from '@/data/content'
import { hero } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { trackEvent } from '@/lib/analytics'

/** Sticky call-to-action bar on phones: register + WhatsApp, always one tap away. */
export function MobileCtaBar() {
  const { t, isAr } = useTranslation()
  const { pathname } = useLocation()
  if (pathname === '/register' || pathname === '/start-project') return null
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(10,31,58,0.08)]">
      <div className="flex gap-2">
        <Link to="/register" onClick={() => trackEvent('cta_click', { label: 'mobile_bar_register' })} className="flex-1 inline-flex items-center justify-center rounded-xl bg-goldx-500 py-3 text-[15px] font-extrabold text-navy-950">
          {t(hero.ctaPrimary)}
        </Link>
        <a
          href={`https://wa.me/${company.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { from: 'mobile_bar' })}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-3 text-[15px] font-bold text-white"
        >
          <MessageCircle className="w-5 h-5" /> {isAr ? 'واتساب' : 'WhatsApp'}
        </a>
      </div>
    </div>
  )
}
