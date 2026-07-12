import { useState } from 'react'
import { z } from 'zod'
import { careers as jobs, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'

const careerSchema = z.object({
  website: z.string().max(0).optional(),
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Phone is required'),
  position: z.string().min(1, 'Select a position'),
  portfolio: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  experience: z.string().min(1, 'Experience is required'),
  availability: z.string().min(1, 'Availability is required'),
  expectedSalary: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  skills: z.string().min(2, 'Skills are required'),
  resume: z.any().optional(),
})

export default function CareersPage() {
  const { locale } = useI18n()
  const [dept, setDept] = useState('all')

  const departments = ['all', ...new Set(jobs.map((j) => j.department.en))]
  const filtered = dept === 'all' ? jobs : jobs.filter((j) => j.department.en === dept)

  const fields = [
    { name: 'fullName', label: locale === 'en' ? 'Full Name' : 'الاسم الكامل', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, required: true },
    { name: 'phone', label: locale === 'en' ? 'Phone' : 'الهاتف', type: 'tel' as const, required: true },
    { name: 'position', label: locale === 'en' ? 'Position' : 'الوظيفة', type: 'select' as const, required: true, options: jobs.map((j) => ({ value: j.id, label: t(j.title, locale) })) },
    { name: 'country', label: locale === 'en' ? 'Country' : 'الدولة', required: true },
    { name: 'experience', label: locale === 'en' ? 'Years of Experience' : 'سنوات الخبرة', required: true },
    { name: 'availability', label: locale === 'en' ? 'Availability' : 'التوفر', required: true },
    { name: 'expectedSalary', label: locale === 'en' ? 'Expected Salary' : 'الراتب المتوقع' },
    { name: 'skills', label: locale === 'en' ? 'Skills' : 'المهارات', type: 'textarea' as const, required: true, colSpan: 2 as const },
    { name: 'portfolio', label: 'Portfolio URL', type: 'url' as const },
    { name: 'github', label: 'GitHub', type: 'url' as const },
    { name: 'linkedin', label: 'LinkedIn', type: 'url' as const },
    { name: 'resume', label: locale === 'en' ? 'Resume (PDF)' : 'السيرة الذاتية', type: 'file' as const, accept: '.pdf,.doc,.docx', colSpan: 2 as const },
  ]

  return (
    <>
      <SEO title={locale === 'en' ? 'Careers' : 'الوظائف'} description={locale === 'en' ? 'Join the Fratelanza team. View open positions and apply.' : 'انضم لفريق فراتيلانزا. اطلع على الوظائف المتاحة وقدّم.'} path="/careers" />
      <PageHero title={locale === 'en' ? 'Careers' : 'الوظائف'} subtitle={locale === 'en' ? 'Build the future of enterprise technology with us.' : 'ابنِ مستقبل التكنولوجيا المؤسسية معنا.'} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((d) => (
              <button key={d} onClick={() => setDept(d)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${dept === d ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                {d === 'all' ? (locale === 'en' ? 'All' : 'الكل') : d}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map((job) => (
              <Card key={job.id}>
                <span className="text-xs text-gold-400 font-semibold">{t(job.department, locale)}</span>
                <h3 className="text-lg font-bold mt-1">{t(job.title, locale)}</h3>
                <p className="text-sm text-white/50 mt-2">{t(job.description, locale)}</p>
                <div className="flex gap-4 mt-4 text-xs text-white/40">
                  <span>{t(job.location, locale)}</span>
                  <span>{t(job.type, locale)}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24 bg-gradient-to-b from-gold-500/5 to-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">{locale === 'en' ? 'Apply Now' : 'قدّم الآن'}</h2>
          <Card>
            <DynamicForm
              fields={fields}
              schema={careerSchema}
              endpoint="/careers"
              submitLabel={locale === 'en' ? 'Submit Application' : 'إرسال الطلب'}
              successMessage={locale === 'en' ? 'Your application has been received. We will review it and get back to you soon.' : 'تم استلام طلبك. سنراجعه ونتواصل معك قريباً.'}
              useFormData
            />
          </Card>
        </div>
      </section>
    </>
  )
}
