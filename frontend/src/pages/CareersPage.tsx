import { z } from 'zod'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'

const careerSchema = z.object({
  website: z.string().max(0).optional(),
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Phone is required'),
  position: z.string().min(2, 'Desired role is required'),
  portfolio: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  experience: z.string().min(1, 'Experience is required'),
  availability: z.string().min(1, 'Availability is required'),
  expectedSalary: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  skills: z.string().min(2, 'Skills are required'),
  resume: z.any().refine(
    (val) => val instanceof FileList && val.length > 0,
    'CV attachment is required',
  ),
})

export default function CareersPage() {
  const { ui, locale } = useTranslation()

  const fields = [
    { name: 'fullName', label: locale === 'en' ? 'Full Name' : 'الاسم الكامل', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: locale === 'en' ? 'Phone' : 'الهاتف', type: 'tel' as const, required: true },
    { name: 'position', label: locale === 'en' ? 'Desired Role / Area of Interest' : 'الدور المطلوب / مجال الاهتمام', required: true },
    { name: 'country', label: locale === 'en' ? 'Country' : 'الدولة', required: true },
    { name: 'experience', label: locale === 'en' ? 'Years of Experience' : 'سنوات الخبرة', required: true },
    { name: 'availability', label: locale === 'en' ? 'Availability' : 'التوفر', required: true },
    { name: 'expectedSalary', label: locale === 'en' ? 'Expected Salary (optional)' : 'الراتب المتوقع (اختياري)' },
    { name: 'skills', label: locale === 'en' ? 'Skills & Expertise' : 'المهارات والخبرات', type: 'textarea' as const, required: true, colSpan: 2 as const },
    { name: 'portfolio', label: 'Portfolio URL', type: 'url' as const },
    { name: 'github', label: 'GitHub', type: 'url' as const },
    { name: 'linkedin', label: 'LinkedIn', type: 'url' as const },
    { name: 'resume', label: locale === 'en' ? 'CV / Resume (PDF, DOC)' : 'السيرة الذاتية (PDF, DOC)', type: 'file' as const, accept: '.pdf,.doc,.docx', required: true, colSpan: 2 as const },
  ]

  return (
    <>
      <SEO title={ui('careers', 'title')} description={ui('careers', 'seoDesc')} path="/careers" />
      <PageHero title={ui('careers', 'title')} subtitle={ui('careers', 'subtitle')} />

      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-body-muted mb-8 max-w-xl mx-auto">
            {ui('careers', 'formIntro')}
          </p>
          <Card>
            <DynamicForm
              fields={fields}
              schema={careerSchema}
              endpoint="/careers"
              submitLabel={ui('careers', 'submitApp')}
              successMessage={ui('careers', 'success')}
              useFormData
            />
          </Card>
        </div>
      </section>
    </>
  )
}
