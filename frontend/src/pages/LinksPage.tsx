import { useEffect, type ComponentType } from 'react'
import { Helmet } from 'react-helmet-async'
import { Download, Globe, LayoutGrid, Mail, MapPin, MessageCircle, Rocket } from 'lucide-react'
import { company } from '@/data/content'
import { Logo } from '@/components/ui/Logo'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon } from '@/components/ui/SocialLinks'
import { useTranslation } from '@/i18n/useTranslation'
import { initAttribution } from '@/lib/attribution'
import { trackEvent, trackPageView } from '@/lib/analytics'

type LinkItem = {
  key: string
  href: string
  Icon: ComponentType<{ className?: string }>
  label: { en: string; ar: string }
  hint?: { en: string; ar: string }
  primary?: boolean
  external?: boolean
}

const SITE = 'https://www.fratelanza.com'

const mainLinks: LinkItem[] = [
  { key: 'website', href: SITE, Icon: Globe, label: { en: 'Visit Our Website', ar: 'زوروا موقعنا' }, hint: { en: 'www.fratelanza.com', ar: 'www.fratelanza.com' }, primary: true },
  { key: 'start', href: `${SITE}/start-project`, Icon: Rocket, label: { en: 'Start Your Project', ar: 'ابدأ مشروعك' }, hint: { en: 'Tell us your idea', ar: 'أخبرنا بفكرتك' } },
  { key: 'products', href: `${SITE}/products`, Icon: LayoutGrid, label: { en: 'Our Products', ar: 'منتجاتنا' }, hint: { en: 'ERP · CRM · AI · Pharmacy · Labs', ar: 'أنظمة ERP وCRM والذكاء الاصطناعي' } },
  { key: 'whatsapp', href: `https://wa.me/${company.whatsapp}`, Icon: MessageCircle, label: { en: 'Chat on WhatsApp', ar: 'تواصل عبر واتساب' }, hint: { en: company.whatsappDisplay, ar: company.whatsappDisplay }, external: true },
  { key: 'email', href: `mailto:${company.email}`, Icon: Mail, label: { en: 'Email Us', ar: 'راسلنا' }, hint: { en: company.email, ar: company.email } },
  { key: 'profile', href: '/downloads/Fratelanza-Company-Profile.pdf', Icon: Download, label: { en: 'Download Company Profile', ar: 'حمّل الملف التعريفي' }, hint: { en: 'PDF · English & العربية', ar: 'PDF · العربية & English' }, external: true },
]

const socialLinks: LinkItem[] = [
  { key: 'facebook', href: company.social.facebook, Icon: FacebookIcon, label: { en: 'Facebook', ar: 'فيسبوك' }, external: true },
  { key: 'instagram', href: company.social.instagram, Icon: InstagramIcon, label: { en: 'Instagram', ar: 'إنستجرام' }, external: true },
  { key: 'linkedin', href: company.social.linkedin, Icon: LinkedInIcon, label: { en: 'LinkedIn', ar: 'لينكدإن' }, external: true },
  { key: 'tiktok', href: company.social.tiktok, Icon: TikTokIcon, label: { en: 'TikTok', ar: 'تيك توك' }, external: true },
]

export default function LinksPage() {
  const { t, isAr } = useTranslation()

  useEffect(() => {
    initAttribution()
    trackPageView('/links')
  }, [])

  const onClick = (key: string) => trackEvent('links_click', { link: key })

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-brand-900 to-dark-900 text-white relative overflow-hidden">
      <Helmet>
        <title>{`${company.name} — ${isAr ? 'روابطنا' : 'Links'}`}</title>
        <meta name="description" content={isAr ? 'كل روابط فراتيلانزا في مكان واحد' : 'All Fratelanza links in one place'} />
        <meta name="robots" content="noindex" />
        <meta name="theme-color" content="#0a1f3a" />
      </Helmet>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_45%_at_80%_0%,rgba(34,211,238,0.22),transparent),radial-gradient(ellipse_60%_40%_at_0%_100%,rgba(251,191,36,0.16),transparent)]" />

      <div className="relative max-w-md mx-auto px-5 pt-6 pb-12">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>

        <header className="mt-4 flex flex-col items-center text-center">
          <Logo size="xl" className="drop-shadow-2xl" />
          <h1 className="mt-4 text-2xl font-extrabold tracking-wide !text-white">{isAr ? 'فراتيلانزا' : 'FRATELANZA'}</h1>
          <p className="mt-1 text-sm font-bold tracking-wide text-gold-300">{t(company.slogan)}</p>
          <p className="mt-3 text-sm text-brand-100/90 max-w-xs leading-relaxed">{t(company.tagline)}</p>
        </header>

        <nav className="mt-8 flex flex-col gap-3" aria-label={isAr ? 'روابط' : 'Links'}>
          {mainLinks.map(({ key, href, Icon, label, hint, primary, external }) => (
            <a
              key={key}
              href={href}
              onClick={() => onClick(key)}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={
                primary
                  ? 'group flex items-center gap-4 rounded-2xl px-5 py-4 bg-gradient-to-r from-gold-400 to-gold-500 text-dark-950 shadow-lg shadow-gold-500/25 transition hover:-translate-y-0.5'
                  : 'group flex items-center gap-4 rounded-2xl px-5 py-4 bg-white/[0.07] border border-white/15 backdrop-blur transition hover:bg-white/[0.12] hover:-translate-y-0.5'
              }
            >
              <span className={primary ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dark-950/10' : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300'}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1 text-start">
                <span className="block font-bold leading-tight">{t(label)}</span>
                {hint && <span className={primary ? 'block text-xs opacity-75 mt-0.5' : 'block text-xs text-brand-100/70 mt-0.5'} dir="auto">{t(hint)}</span>}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-8">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-gold-300">{isAr ? 'تابعنا' : 'Follow us'}</p>
          <div className="grid grid-cols-4 gap-3">
            {socialLinks.map(({ key, href, Icon, label }) => (
              <a
                key={key}
                href={href}
                onClick={() => onClick(key)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(label)}
                className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.07] border border-white/15 py-4 transition hover:bg-white/[0.14] hover:-translate-y-0.5"
              >
                <Icon className="h-6 w-6 text-white" />
                <span className="text-[11px] font-semibold text-brand-100/90">{t(label)}</span>
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-brand-100/70 space-y-1">
          <p className="flex items-center justify-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{t(company.address)}</p>
          <p>{t(company.workingHours)}</p>
          <p className="pt-2">&copy; {new Date().getFullYear()} {company.name}</p>
        </footer>
      </div>
    </div>
  )
}
