import { z } from 'zod'
import { products, industries } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'

const demoSchema = z.object({
  website: z.string().max(0).optional(),
  companyName: z.string().min(2),
  industry: z.string().min(1),
  phone: z.string().min(5),
  whatsapp: z.string().optional(),
  email: z.string().email(),
  expectedUsers: z.string().min(1),
  preferredContactTime: z.string().optional(),
  currentSystem: z.string().optional(),
  interestedProduct: z.string().min(1),
  message: z.string().min(10),
  contactPerson: z.string().optional(),
})

export default function RequestDemoPage() {
  const { t, ui, locale } = useTranslation()

  const fields = [
    { name: 'companyName', label: locale === 'en' ? 'Company Name' : 'اسم الشركة', required: true },
    { name: 'industry', label: locale === 'en' ? 'Industry' : 'القطاع', type: 'select' as const, required: true, options: industries.map((i) => ({ value: i.id, label: t(i.name) })) },
    { name: 'phone', label: locale === 'en' ? 'Phone' : 'الهاتف', type: 'tel' as const, required: true },
    { name: 'whatsapp', label: 'WhatsApp', type: 'tel' as const },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'expectedUsers', label: locale === 'en' ? 'Number of Employees' : 'عدد الموظفين', required: true },
    { name: 'preferredContactTime', label: locale === 'en' ? 'Number of Branches' : 'عدد الفروع' },
    { name: 'currentSystem', label: locale === 'en' ? 'Current Software' : 'البرنامج الحالي' },
    { name: 'interestedProduct', label: locale === 'en' ? 'Interested Product' : 'المنتج المطلوب', type: 'select' as const, required: true, options: products.map((p) => ({ value: p.id, label: t(p.name) })) },
    { name: 'message', label: locale === 'en' ? 'Message' : 'الرسالة', type: 'textarea' as const, required: true, colSpan: 2 as const },
  ]

  return (
    <>
      <SEO title={ui('requestDemo', 'title')} description={ui('requestDemo', 'seoDesc')} path="/request-demo" />
      <PageHero title={ui('requestDemo', 'pageTitle')} subtitle={ui('requestDemo', 'subtitle')} />
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card premium glow>
            <DynamicForm
              fields={fields}
              schema={demoSchema}
              endpoint="/leads"
              submitLabel={ui('common', 'requestDemo')}
              successMessage={ui('requestDemo', 'success')}
              transform={(data) => ({
                ...data,
                contactPerson: data.companyName as string,
                businessType: 'General',
                country: '-',
                city: '-',
              })}
            />
          </Card>
        </div>
      </section>
    </>
  )
}
