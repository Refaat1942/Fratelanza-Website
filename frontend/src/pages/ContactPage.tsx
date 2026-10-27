import { z } from 'zod'
import { company } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'
import { Link } from 'react-router-dom'
import { Mail, MessageCircle, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react'
import { hero, registerCopy } from '@/data/site'

const MAP_QUERY = encodeURIComponent('4th District, 6th of October City, Giza, Egypt')

const contactSchema = z.object({
  website: z.string().max(0).optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
})

export default function ContactPage() {
  const { t, ui, locale, isAr } = useTranslation()

  const fields = [
    { name: 'name', label: locale === 'en' ? 'Name' : 'الاسم', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: 'WhatsApp', type: 'tel' as const },
    { name: 'subject', label: locale === 'en' ? 'Subject' : 'الموضوع', required: true },
    { name: 'message', label: locale === 'en' ? 'Message' : 'الرسالة', type: 'textarea' as const, required: true, colSpan: 2 as const },
  ]

  return (
    <>
      <SEO title={ui('contact', 'title')} description={ui('contact', 'seoDesc')} path="/contact" />
      <PageHero title={ui('contact', 'pageTitle')} subtitle={ui('contact', 'subtitle')} />

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
              { icon: MessageCircle, label: 'WhatsApp', value: company.whatsappDisplay, href: `https://wa.me/${company.whatsapp.replace(/\D/g, '')}` },
              { icon: MapPin, label: ui('contact', 'address'), value: t(company.address) },
              { icon: Clock, label: ui('contact', 'hours'), value: t(company.workingHours) },
            ].map((item, i) => (
              <Card key={i} className="flex items-center gap-4">
                <item.icon className="w-6 h-6 text-gold-600 shrink-0" />
                <div>
                  <p className="text-xs text-body-subtle uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm hover:text-gold-600 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm">{item.value}</p>
                  )}
                </div>
              </Card>
            ))}

            <div className="rounded-2xl overflow-hidden glass aspect-video">
              <iframe
                title="Fratelanza Location"
                src={`https://maps.google.com/maps?q=${MAP_QUERY}&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 hover:text-goldx-600">
              <ExternalLink className="w-4 h-4" /> {isAr ? 'افتح الموقع على خرائط جوجل' : 'Open in Google Maps'}
            </a>

            <div className="rounded-3xl bg-navy-hero p-7 text-white">
              <p className="text-xl font-extrabold">{t(registerCopy.title)}</p>
              <p className="mt-2 text-sm text-slate-300">{t(registerCopy.sub)}</p>
              <Link to="/register" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-goldx-500 px-6 py-3 font-extrabold text-navy-950 hover:bg-goldx-400">
                {t(hero.ctaPrimary)} <ArrowRight className={isAr ? 'w-4 h-4 rotate-180' : 'w-4 h-4'} />
              </Link>
            </div>
          </div>

          <Card>
            <h2 className="text-xl font-bold mb-6">{ui('common', 'sendAMessage')}</h2>
            <DynamicForm
              fields={fields}
              schema={contactSchema}
              endpoint="/contact"
              submitLabel={ui('common', 'sendMessage')}
              successMessage={ui('contact', 'success')}
            />
          </Card>
        </div>
      </section>
    </>
  )
}
