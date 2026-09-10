import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { projectTypes, projectStages, budgetRanges, timelineRanges } from '@/data/leadQualification'
import { attributionPayload } from '@/lib/attribution'
import { trackEvent } from '@/lib/analytics'
import { submitForm } from '@/lib/api'
import { useTranslation } from '@/i18n/useTranslation'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const STEPS = 5

export function StartProjectForm() {
  const { ui, locale, isAr } = useTranslation()
  const [params] = useSearchParams()
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    projectType: params.get('type') || '',
    projectStage: '',
    estimatedBudget: '',
    desiredTimeline: '',
    message: '',
    contactPerson: '',
    companyName: '',
    whatsapp: '',
    email: '',
    country: '',
    existingWebsite: '',
    existingSystem: '',
    website: '',
  })
  const [attachment, setAttachment] = useState<File | null>(null)

  useEffect(() => {
    trackEvent('form_started')
  }, [])

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const optionLabel = (items: { value: string; label: { en: string; ar: string } }[], value: string) =>
    items.find((i) => i.value === value)?.label[locale] || value

  const next = () => {
    trackEvent('form_step_completed', { step })
    if (step === 0 && form.projectType) trackEvent('project_type_selected', { projectType: form.projectType })
    if (step === 1 && form.projectStage) trackEvent('project_stage_selected', { projectStage: form.projectStage })
    if (step === 2 && form.estimatedBudget) trackEvent('budget_selected', { budget: form.estimatedBudget })
    setStep((s) => Math.min(s + 1, STEPS - 1))
  }

  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    setStatus('loading')
    setError('')
    try {
      const payload = {
        companyName: form.companyName,
        contactPerson: form.contactPerson,
        whatsapp: form.whatsapp,
        email: form.email,
        country: form.country,
        message: form.message,
        projectType: form.projectType,
        projectStage: form.projectStage,
        estimatedBudget: form.estimatedBudget,
        desiredTimeline: form.desiredTimeline,
        existingWebsite: form.existingWebsite,
        existingSystem: form.existingSystem,
        interestedProduct: form.projectType,
        website: '',
        ...attributionPayload(),
      }

      if (attachment) {
        const fd = new FormData()
        Object.entries(payload).forEach(([k, v]) => { if (v) fd.append(k, String(v)) })
        fd.append('attachment', attachment)
        await submitForm('/leads', fd)
      } else {
        await submitForm('/leads', payload)
      }
      trackEvent('form_completed')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-premium rounded-2xl p-10 text-center max-w-lg mx-auto">
        <CheckCircle2 className="w-16 h-16 text-mint-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">{ui('startProject', 'successTitle')}</h2>
        <p className="text-body-muted">{ui('startProject', 'successMessage')}</p>
      </div>
    )
  }

  const choices = (items: typeof projectTypes, field: keyof typeof form) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => set(field, item.value)}
          className={cn(
            'px-4 py-3 rounded-xl text-sm font-semibold text-start border transition-all',
            form[field] === item.value
              ? 'bg-brand-700 text-white border-brand-700 shadow-md'
              : 'bg-white border-slate-200 hover:border-brand-300 text-ink-muted',
          )}
        >
          {item.label[locale]}
        </button>
      ))}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex gap-1 mb-8">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div key={i} className={cn('h-1 flex-1 rounded-full transition-colors', i <= step ? 'bg-brand-600' : 'bg-slate-200')} />
        ))}
      </div>

      <div className="glass-premium rounded-2xl p-6 sm:p-8 border border-slate-200">
        {step === 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">{ui('startProject', 'step1')}</h2>
            {choices(projectTypes, 'projectType')}
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">{ui('startProject', 'step2')}</h2>
            {choices(projectStages, 'projectStage')}
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">{ui('startProject', 'step3')}</h2>
            {choices(budgetRanges, 'estimatedBudget')}
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">{ui('startProject', 'step4')}</h2>
            {choices(timelineRanges, 'desiredTimeline')}
          </>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-2">{ui('startProject', 'step5')}</h2>
            <textarea
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              placeholder={ui('startProject', 'descriptionPlaceholder')}
              className="input-premium min-h-[100px]"
              rows={4}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input className="input-premium" placeholder={ui('startProject', 'name')} value={form.contactPerson} onChange={(e) => set('contactPerson', e.target.value)} required />
              <input className="input-premium" placeholder={ui('startProject', 'company')} value={form.companyName} onChange={(e) => set('companyName', e.target.value)} required />
              <input className="input-premium" placeholder={ui('startProject', 'whatsapp')} value={form.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
              <input type="email" className="input-premium" placeholder={ui('startProject', 'email')} value={form.email} onChange={(e) => set('email', e.target.value)} required />
              <input className="input-premium" placeholder={ui('startProject', 'country')} value={form.country} onChange={(e) => set('country', e.target.value)} />
              <input className="input-premium" placeholder={ui('startProject', 'existingWebsite')} value={form.existingWebsite} onChange={(e) => set('existingWebsite', e.target.value)} />
            </div>
            <input className="input-premium" placeholder={ui('startProject', 'existingSystem')} value={form.existingSystem} onChange={(e) => set('existingSystem', e.target.value)} />
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setAttachment(e.target.files?.[0] || null)} className="text-sm" />
          </div>
        )}

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

        <div className="flex justify-between mt-8 gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={back}>
              <ArrowLeft className={cn('w-4 h-4', isAr && 'rotate-180')} />
              {ui('common', 'back')}
            </Button>
          ) : <span />}
          {step < STEPS - 1 ? (
            <Button type="button" onClick={next} disabled={step === 0 && !form.projectType}>
              {ui('common', 'next')}
              <ArrowRight className={cn('w-4 h-4', isAr && 'rotate-180')} />
            </Button>
          ) : (
            <Button type="button" onClick={submit} disabled={status === 'loading' || !form.companyName || !form.email}>
              {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : ui('startProject', 'submit')}
            </Button>
          )}
        </div>
      </div>

      {step > 0 && (
        <p className="text-center text-xs text-body-subtle mt-4">
          {form.projectType && optionLabel(projectTypes, form.projectType)}
          {form.projectStage && ` · ${optionLabel(projectStages, form.projectStage)}`}
        </p>
      )}
    </div>
  )
}
