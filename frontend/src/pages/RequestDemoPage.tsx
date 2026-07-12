import { z } from 'zod'
import { products, industries } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'

const demoSchema = z.object({
  website: z.string().max(0).optional(),
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  businessType: z.string().min(1),
  industry: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(5),
  whatsapp: z.string().optional(),
  email: z.string().email(),
  expectedUsers: z.string().min(1),
  interestedProduct: z.string().min(1),
  currentSystem: z.string().optional(),
  message: z.string().min(10),
  preferredContactTime: z.string().optional(),
})

export default function RequestDemoPage() {
  const { t, ui, locale } = useTranslation()

  const fields = [
    { name: 'companyName', label: locale === 'en' ? 'Company Name' : 'اسم الشركة', required: true },
    { name: 'contactPerson', label: locale === 'en' ? 'Contact Person' : 'الشخص المسؤول', required: true },
    { name: 'businessType', label: locale === 'en' ? 'Business Type' : 'نوع النشاط', type: 'select' as const, required: true, options: ['SME', 'Enterprise', 'Startup', 'Government', 'Non-Profit'].map((v) => ({ value: v, label: v })) },
    { name: 'industry', label: locale === 'en' ? 'Industry' : 'القطاع', type: 'select' as const, required: true, options: industries.map((i) => ({ value: i.id, label: t(i.name) })) },
    { name: 'country', label: locale === 'en' ? 'Country' : 'الدولة', required: true },
    { name: 'city', label: locale === 'en' ? 'City' : 'المدينة', required: true },
    { name: 'phone', label: locale === 'en' ? 'Phone' : 'الهاتف', type: 'tel' as const, required: true },
    { name: 'whatsapp', label: 'WhatsApp', type: 'tel' as const },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'expectedUsers', label: locale === 'en' ? 'Expected Users' : 'عدد المستخدمين المتوقع', required: true },
    { name: 'interestedProduct', label: locale === 'en' ? 'Interested Product' : 'المنتج المطلوب', type: 'select' as const, required: true, options: products.map((p) => ({ value: p.id, label: t(p.name) })) },
    { name: 'currentSystem', label: locale === 'en' ? 'Current System' : 'النظام الحالي' },
    { name: 'preferredContactTime', label: locale === 'en' ? 'Preferred Contact Time' : 'وقت التواصل المفضل' },
    { name: 'message', label: locale === 'en' ? 'Message' : 'الرسالة', type: 'textarea' as const, required: true, colSpan: 2 as const },
  ]

  return (
    <>
      <SEO title={ui('requestDemo', 'title')} description={ui('requestDemo', 'seoDesc')} path="/request-demo" />
      <PageHero title={ui('requestDemo', 'pageTitle')} subtitle={ui('requestDemo', 'subtitle')} />
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <DynamicForm
              fields={fields}
              schema={demoSchema}
              endpoint="/leads"
              submitLabel={ui('common', 'requestDemo')}
              successMessage={ui('requestDemo', 'success')}
            />
          </Card>
        </div>
      </section>
    </>
  )
}
