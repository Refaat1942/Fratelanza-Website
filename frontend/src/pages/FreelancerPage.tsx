import { motion } from 'framer-motion'
import { z } from 'zod'
import { freelancerModel } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { Card, PageHero } from '@/components/ui/Card'
import { DynamicForm } from '@/components/forms/DynamicForm'
import { DynamicIcon } from '@/components/ui/DynamicIcon'

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
  const { t, ui, locale } = useTranslation()

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
      <SEO title={ui('freelancer', 'title')} description={ui('freelancer', 'seoDesc')} path="/freelancer" />
      <PageHero title={ui('freelancer', 'title')} subtitle={t(freelancerModel.subtitle)} />

      <section className="py-16 bg-gradient-to-b from-cyan-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-gradient-brand">
            {t(freelancerModel.title)}
          </h2>
          <p className="text-center text-white/60 max-w-3xl mx-auto mb-12">
            {t(freelancerModel.subtitle)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {freelancerModel.points.map((point, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full flex items-start gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                    <DynamicIcon name={point.icon} className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{t(point.title)}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{t(point.description)}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-center mb-2">{ui('freelancer', 'joinNetwork')}</h2>
          <p className="text-center text-white/50 text-sm mb-8">{ui('freelancer', 'joinNetworkSub')}</p>
          <Card>
            <DynamicForm
              fields={fields}
              schema={freelancerSchema}
              endpoint="/freelancers"
              submitLabel={ui('careers', 'submitApp')}
              successMessage={ui('freelancer', 'success')}
              useFormData
            />
          </Card>
        </div>
      </section>
    </>
  )
}
