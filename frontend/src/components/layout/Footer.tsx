import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Mail, MessageCircle, MapPin, Clock, Download } from 'lucide-react'
import { company, navLinks, products } from '@/data/content'
import { finalCta, hero, pillars } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from '@/components/ui/SocialLinks'
import { cn } from '@/lib/utils'

const socials = [
  { href: company.social.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: company.social.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: company.social.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: company.social.tiktok, label: 'TikTok', Icon: TikTokIcon },
]

export function Footer() {
  const { t, ui, isAr } = useTranslation()
  const year = new Date().getFullYear()
  const L = (en: string, ar: string) => (isAr ? ar : en)
  const { pathname } = useLocation()
  const showCta = !['/register', '/start-project'].includes(pathname)

  return (
    <footer className="bg-navy-hero text-slate-300">
      {showCta && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="shine relative overflow-hidden rounded-3xl bg-gradient-to-br from-goldx-300 via-goldx-400 to-goldx-500 px-6 py-10 sm:px-12 sm:py-12 text-navy-950 shadow-2xl shadow-black/30">
            <div className="absolute -top-16 -end-16 h-56 w-56 rounded-full bg-white/20 blur-2xl" />
            <div className="relative z-[2] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl font-extrabold !text-navy-950 leading-tight">{t(finalCta.title)}</h2>
                <p className="mt-2 text-navy-900/80 font-medium">{t(finalCta.sub)}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy-900 px-7 py-4 font-extrabold text-white hover:bg-navy-800 transition">
                  {t(hero.ctaPrimary)}
                  <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
                </Link>
                <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-7 py-4 font-bold text-navy-900 hover:bg-white transition">
                  <MessageCircle className="w-5 h-5" /> {L('WhatsApp', 'واتساب')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="" className="h-12 w-12 rounded-full object-cover" style={{ clipPath: 'circle(41.5% at 49% 48.5%)', transform: 'scale(1.16)' }} />
              <div>
                <p className="text-lg font-extrabold text-white tracking-wide">{isAr ? 'فراتيلانزا' : 'FRATELANZA'}</p>
                <p className="text-xs font-semibold text-goldx-300">{t(company.slogan)}</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-sm">{t(hero.sub)}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {pillars.map((p) => (
                <li key={p.title.en} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-goldx-300">{t(p.title)}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 text-slate-300 hover:bg-goldx-500 hover:text-navy-950 transition">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider !text-white mb-4 rtl:tracking-normal">{L('Company', 'الشركة')}</h3>
            <ul className="space-y-2.5 text-sm">
              {[...navLinks.slice(1), { path: '/register', label: hero.ctaPrimary }, { path: '/careers', label: { en: 'Careers', ar: 'الوظائف' } }].map((l) => (
                <li key={l.path}><Link to={l.path} className="hover:text-goldx-300 transition-colors">{t(l.label)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider !text-white mb-4 rtl:tracking-normal">{L('Systems we build', 'أنظمة بنعملها')}</h3>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {products.slice(0, 8).map((p) => (
                <li key={p.id}><Link to={`/products/${p.id}`} className="hover:text-goldx-300 transition-colors">{t(p.name)}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider !text-white mb-4 rtl:tracking-normal">{L('Contact', 'تواصل معنا')}</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-3"><MessageCircle className="w-5 h-5 shrink-0 text-goldx-400" /><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-goldx-300" dir="ltr">{company.whatsappDisplay}</a></li>
              <li className="flex gap-3"><Mail className="w-5 h-5 shrink-0 text-goldx-400" /><a href={`mailto:${company.email}`} className="hover:text-goldx-300">{company.email}</a></li>
              <li className="flex gap-3"><MapPin className="w-5 h-5 shrink-0 text-goldx-400" /><span>{t(company.address)}</span></li>
              <li className="flex gap-3"><Clock className="w-5 h-5 shrink-0 text-goldx-400" /><span>{t(company.workingHours)}</span></li>
              <li className="flex gap-3"><Download className="w-5 h-5 shrink-0 text-goldx-400" /><a href="/downloads/Fratelanza-Company-Profile.pdf" target="_blank" rel="noopener" className="font-semibold text-goldx-300 hover:underline">{L('Company Profile (PDF)', 'الملف التعريفي (PDF)')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {year} {company.name}. {ui('common', 'allRights')}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/faq" className="hover:text-slate-300">{ui('faq', 'title')}</Link>
            <Link to="/privacy" className="hover:text-slate-300">{ui('legal', 'privacyTitle')}</Link>
            <Link to="/terms" className="hover:text-slate-300">{ui('legal', 'termsTitle')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
