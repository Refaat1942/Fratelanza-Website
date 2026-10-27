import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2, ArrowRight, Lock } from 'lucide-react'
import { submitForm } from '@/lib/api'
import { attributionPayload } from '@/lib/attribution'
import { trackEvent } from '@/lib/analytics'
import { projectTypes } from '@/data/leadQualification'
import { packages, registerCopy as C } from '@/data/site'
import { useTranslation } from '@/i18n/useTranslation'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { cn } from '@/lib/utils'

const field = 'input-premium'

export function RegisterForm({ className, source = 'register-form' }: { className?: string; source?: string }) {
  const { t, locale, isAr } = useTranslation()
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    need: params.get('type') || '',
    pkg: params.get('package') || '',
    message: '',
    website: '', // honeypot
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (form.name.trim().length < 2) e.name = t(C.errName)
    if (form.phone.replace(/\D/g, '').length < 8) e.phone = t(C.errPhone)
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t(C.errEmail)
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('loading')
    setServerError('')
    try {
      const pkgName = packages.find((p) => p.id === form.pkg)?.name.en || form.pkg || 'not sure'
      await submitForm('/leads', {
        companyName: (form.company || form.name).trim(),
        contactPerson: form.name.trim(),
        whatsapp: form.phone.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        projectType: form.need,
        interestedProduct: `Package: ${pkgName}`,
        message: form.message.trim(),
        ...attributionPayload(),
        website: form.website,
      })
      trackEvent('register_submitted', { source, package: form.pkg || 'not_sure', need: form.need })
      setStatus('ok')
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Error')
    }
  }

  if (status === 'ok') {
    return (
      <div className={cn('rounded-3xl bg-white p-8 sm:p-10 text-center shadow-xl ring-1 ring-slate-200', className)}>
        <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500" />
        <p className="mt-5 text-xl font-bold text-navy-900">{t(C.ok)}</p>
      </div>
    )
  }

  const label = (k: keyof typeof C.fields, htmlFor: string, req = false) => (
    <label htmlFor={htmlFor} className="block text-sm font-bold text-navy-900 mb-1.5">
      {t(C.fields[k])}
      {req && <span className="text-goldx-600"> *</span>}
    </label>
  )
  const err = (k: string) => errors[k] && <p className="mt-1 text-xs font-semibold text-rose-600">{errors[k]}</p>

  return (
    <form onSubmit={onSubmit} noValidate className={cn('rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-navy-950/10 ring-1 ring-slate-200', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {label('name', 'rf-name', true)}
          <input id="rf-name" className={field} value={form.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" />
          {err('name')}
        </div>
        <div>
          {label('company', 'rf-company')}
          <input id="rf-company" className={field} value={form.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" />
        </div>
        <div>
          {label('phone', 'rf-phone', true)}
          <input id="rf-phone" className={field} dir="ltr" inputMode="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" placeholder="01x xxxx xxxx" style={{ textAlign: isAr ? 'right' : 'left' }} />
          {err('phone')}
        </div>
        <div>
          {label('email', 'rf-email')}
          <input id="rf-email" className={field} dir="ltr" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" style={{ textAlign: isAr ? 'right' : 'left' }} />
          {err('email')}
        </div>
        <div>
          {label('need', 'rf-need')}
          <CustomSelect
            id="rf-need"
            value={form.need}
            onChange={(v) => set('need', v)}
            placeholder={t(C.fields.need)}
            options={projectTypes.map((p) => ({ value: p.value, label: p.label[locale] }))}
          />
        </div>
        <div>
          {label('pkg', 'rf-pkg')}
          <CustomSelect
            id="rf-pkg"
            value={form.pkg}
            onChange={(v) => set('pkg', v)}
            placeholder={t(C.fields.notSure)}
            options={[...packages.map((p) => ({ value: p.id, label: t(p.name) })), { value: 'not_sure', label: t(C.fields.notSure) }]}
          />
        </div>
        <div className="sm:col-span-2">
          {label('message', 'rf-msg')}
          <textarea id="rf-msg" rows={3} className={cn(field, 'resize-none')} value={form.message} onChange={(e) => set('message', e.target.value)} />
        </div>
        {/* honeypot */}
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={form.website} onChange={(e) => set('website', e.target.value)} aria-hidden="true" />
      </div>

      {status === 'error' && <p className="mt-4 text-sm font-semibold text-rose-600">{serverError}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-goldx-500 px-6 py-4 text-base font-extrabold text-navy-950 shadow-lg shadow-goldx-500/30 transition hover:bg-goldx-400 disabled:opacity-60"
      >
        {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
        {status === 'loading' ? t(C.sending) : t(C.submit)}
        {status !== 'loading' && <ArrowRight className={cn('w-5 h-5', isAr && 'rotate-180')} />}
      </button>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" />{t(C.privacy)}</span>
        <Link to="/start-project" className="font-semibold text-navy-700 hover:underline">{t(C.detailed)}</Link>
      </div>
    </form>
  )
}
