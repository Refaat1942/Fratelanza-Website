import { z } from 'zod'
import { company, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'
import { Mail, Phone, MessageCircle, MapPin, Clock } from 'lucide-react'

const contactSchema = z.object({
  website: z.string().max(0).optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
})

export default function ContactPage() {
  const { locale } = useI18n()

  const fields = [
    { name: 'name', label: locale === 'en' ? 'Name' : 'الاسم', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: locale === 'en' ? 'Phone' : 'الهاتف', type: 'tel' as const },
    { name: 'subject', label: locale === 'en' ? 'Subject' : 'الموضوع', required: true },
    { name: 'message', label: locale === 'en' ? 'Message' : 'الرسالة', type: 'textarea' as const, required: true, colSpan: 2 as const },
  ]

  return (
    <>
      <SEO title={locale === 'en' ? 'Contact' : 'تواصل'} description={locale === 'en' ? 'Get in touch with Fratelanza.' : 'تواصل مع فراتيلانزا.'} path="/contact" />
      <PageHero title={locale === 'en' ? 'Contact Us' : 'تواصل معنا'} subtitle={locale === 'en' ? 'We would love to hear from you.' : 'يسعدنا سماعك.'} />

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
              { icon: Phone, label: locale === 'en' ? 'Phone' : 'الهاتف', value: company.phone, href: `tel:${company.phone}` },
              { icon: MessageCircle, label: 'WhatsApp', value: company.whatsapp, href: `https://wa.me/${company.whatsapp.replace(/\D/g, '')}` },
              { icon: MapPin, label: locale === 'en' ? 'Address' : 'العنوان', value: t(company.address, locale) },
              { icon: Clock, label: locale === 'en' ? 'Working Hours' : 'ساعات العمل', value: t(company.workingHours, locale) },
            ].map((item, i) => (
              <Card key={i} className="flex items-center gap-4">
                <item.icon className="w-6 h-6 text-gold-400 shrink-0" />
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm hover:text-gold-400 transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-sm">{item.value}</p>
                  )}
                </div>
              </Card>
            ))}

            <div className="rounded-2xl overflow-hidden glass aspect-video">
              <iframe
                title="Fratelanza Location"
                src="https://maps.google.com/maps?q=Cairo,Egypt&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <Card>
            <h2 className="text-xl font-bold mb-6">{locale === 'en' ? 'Send a Message' : 'أرسل رسالة'}</h2>
            <DynamicForm
              fields={fields}
              schema={contactSchema}
              endpoint="/contact"
              submitLabel={locale === 'en' ? 'Send Message' : 'إرسال'}
              successMessage={locale === 'en' ? 'Your message has been sent. We will respond shortly.' : 'تم إرسال رسالتك. سنرد عليك قريباً.'}
            />
          </Card>
        </div>
      </section>
    </>
  )
}
