import { Link } from 'react-router-dom'
import { company, navLinks, products, overview, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { Mail, Phone, MessageCircle, MapPin, Share2 } from 'lucide-react'

export function Footer() {
  const { locale } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <img src="/logo.svg" alt={company.name} className="h-10 mb-6" />
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              {t(overview.mission, locale)}
            </p>
            <p className="text-xs text-white/40 italic">
              {t(overview.vision, locale)}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              {locale === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/50 hover:text-gold-400 transition-colors">
                    {t(link.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              {locale === 'en' ? 'Products' : 'المنتجات'}
            </h4>
            <ul className="space-y-2">
              {products.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`} className="text-sm text-white/50 hover:text-gold-400 transition-colors">
                    {t(p.name, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold-400 mb-4">
              {locale === 'en' ? 'Contact' : 'تواصل'}
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
                {t(company.address, locale)}
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-6">
              {[
                { label: 'LinkedIn', href: company.social.linkedin },
                { label: 'Facebook', href: company.social.facebook },
                { label: 'Instagram', href: company.social.instagram },
                { label: 'GitHub', href: company.social.github },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" title={social.label} className="p-2 rounded-lg glass hover:bg-white/10 text-white/50 hover:text-gold-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {year} {company.name}. {locale === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <Link to="/careers" className="hover:text-gold-400 transition-colors">
              {locale === 'en' ? 'Careers' : 'الوظائف'}
            </Link>
            <Link to="/freelancer" className="hover:text-gold-400 transition-colors">
              {locale === 'en' ? 'Freelancer Portal' : 'بوابة المستقلين'}
            </Link>
            <Link to="/faq" className="hover:text-gold-400 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
