import { Link } from 'react-router-dom'
import { company, navLinks, products, overview } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { SocialLinks } from '@/components/ui/SocialLinks'

export function Footer() {
  const { t, ui } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-500/10 bg-dark-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Logo size="md" className="mb-4" />
            <p className="text-sm font-semibold tracking-wider uppercase text-gradient-brand mb-4">
              {t(company.slogan)}
            </p>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              {t(overview.mission)}
            </p>
            <p className="text-xs text-white/40 italic">
              {t(overview.vision)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4">
              {ui('footer', 'quickLinks')}
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/50 hover:text-gold-400 transition-colors">
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4">
              {ui('products', 'title')}
            </h4>
            <ul className="space-y-2">
              {products.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`} className="text-sm text-white/50 hover:text-gold-400 transition-colors">
                    {t(p.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-300 mb-4">
              {ui('footer', 'contact')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-gold-400 transition-colors">{company.email}</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`tel:${company.phone}`} className="hover:text-gold-400 transition-colors">{company.phone}</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/50">
                <MessageCircle className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`https://wa.me/${company.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">WhatsApp</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                {t(company.address)}
              </li>
            </ul>

            <SocialLinks className="mt-6" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {year} {company.name}. {ui('common', 'allRights')}
          </p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <Link to="/careers" className="hover:text-gold-400 transition-colors">
              {ui('footer', 'careers')}
            </Link>
            <Link to="/freelancer" className="hover:text-gold-400 transition-colors">
              {ui('footer', 'freelancer')}
            </Link>
            <Link to="/faq" className="hover:text-gold-400 transition-colors">{ui('faq', 'title')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
