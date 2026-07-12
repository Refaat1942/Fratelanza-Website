import { z } from 'zod'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'

const freelancerSchema = z.object({
  website: z.string().max(0).optional(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  country: z.string().min(1),
  specialization: z.string().min(2),
  yearsExperience: z.string().min(1),
  portfolio: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  hourlyRate: z.string().min(1),
  monthlyAvailability: z.string().min(1),
  technologies: z.string().min(2),
  englishLevel: z.string().min(1),
  arabicLevel: z.string().min(1),
  notes: z.string().optional(),
  resume: z.any().optional(),
})

export default function FreelancerPage() {
  const { locale } = useI18n()

  const fields = [
    { name: 'fullName', label: locale === 'en' ? 'Full Name' : 'الاسم الكامل', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: locale === 'en' ? 'Phone' : 'الهاتف', type: 'tel' as const, required: true },
    { name: 'country', label: locale === 'en' ? 'Country' : 'الدولة', required: true },
    { name: 'specialization', label: locale === 'en' ? 'Specialization' : 'التخصص', required: true },
    { name: 'yearsExperience', label: locale === 'en' ? 'Years of Experience' : 'سنوات الخبرة', required: true },
    { name: 'hourlyRate', label: locale === 'en' ? 'Hourly Rate (USD)' : 'السعر بالساعة', required: true },
    { name: 'monthlyAvailability', label: locale === 'en' ? 'Monthly Availability (hours)' : 'التوفر الشهري (ساعات)', required: true },
    { name: 'technologies', label: locale === 'en' ? 'Preferred Technologies' : 'التقنيات المفضلة', type: 'textarea' as const, required: true, colSpan: 2 as const },
    { name: 'englishLevel', label: locale === 'en' ? 'English Level' : 'مستوى الإنجليزية', type: 'select' as const, required: true, options: ['Basic', 'Intermediate', 'Advanced', 'Native'].map((v) => ({ value: v, label: v })) },
    { name: 'arabicLevel', label: locale === 'en' ? 'Arabic Level' : 'مستوى العربية', type: 'select' as const, required: true, options: ['Basic', 'Intermediate', 'Advanced', 'Native'].map((v) => ({ value: v, label: v })) },
    { name: 'portfolio', label: 'Portfolio URL', type: 'url' as const },
    { name: 'linkedin', label: 'LinkedIn', type: 'url' as const },
    { name: 'github', label: 'GitHub', type: 'url' as const },
    { name: 'notes', label: locale === 'en' ? 'Notes' : 'ملاحظات', type: 'textarea' as const, colSpan: 2 as const },
    { name: 'resume', label: locale === 'en' ? 'Resume' : 'السيرة الذاتية', type: 'file' as const, accept: '.pdf,.doc,.docx', colSpan: 2 as const },
  ]

  return (
    <>
      <SEO title={locale === 'en' ? 'Freelancer Portal' : 'بوابة المستقلين'} description={locale === 'en' ? 'Join the Fratelanza freelancer network.' : 'انضم لشبكة مستقلي فراتيلانزا.'} path="/freelancer" />
      <PageHero title={locale === 'en' ? 'Freelancer Portal' : 'بوابة المستقلين'} subtitle={locale === 'en' ? 'Partner with Fratelanza on exciting enterprise projects.' : 'شارك فراتيلانزا في مشاريع مؤسسية مثيرة.'} />
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <DynamicForm
              fields={fields}
              schema={freelancerSchema}
              endpoint="/freelancers"
              submitLabel={locale === 'en' ? 'Submit Application' : 'إرسال الطلب'}
              successMessage={locale === 'en' ? 'Your freelancer application has been received. We will review your profile and contact you.' : 'تم استلام طلبك. سنراجع ملفك ونتواصل معك.'}
              useFormData
            />
          </Card>
        </div>
      </section>
    </>
  )
}
