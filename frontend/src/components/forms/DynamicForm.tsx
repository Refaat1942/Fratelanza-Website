import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { submitForm } from '@/lib/api'
import { useTranslation } from '@/i18n/useTranslation'

type FormField = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'number' | 'file' | 'url'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  accept?: string
  rows?: number
  colSpan?: 1 | 2
}

type DynamicFormProps = {
  fields: FormField[]
  schema: z.ZodType
  endpoint: string
  submitLabel: string
  successMessage: string
  useFormData?: boolean
  transform?: (data: Record<string, unknown>) => Record<string, unknown>
}

export function DynamicForm({
  fields,
  schema,
  endpoint,
  submitLabel,
  successMessage,
  useFormData = false,
  transform,
}: DynamicFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const { ui } = useTranslation()

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema as z.ZodObject<z.ZodRawShape>),
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    setStatus('loading')
    setErrorMsg('')
    const payload = transform ? transform(data) : data
    try {
      if (useFormData) {
        const formData = new FormData()
        Object.entries(payload).forEach(([key, value]) => {
          if (value instanceof FileList && value.length > 0) {
            formData.append(key, value[0])
          } else if (value !== undefined && value !== null && value !== '') {
            formData.append(key, String(value))
          }
        })
        await submitForm(endpoint, formData, payload.website as string)
      } else {
        await submitForm(endpoint, { ...payload, website: payload.website as string })
      }
      setStatus('success')
      reset()
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Submission failed')
    }
  }

  if (status === 'success') {
    return (
      <div className="glass-premium rounded-2xl p-12 text-center glow-brand">
        <CheckCircle2 className="w-16 h-16 text-mint-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">{ui('common', 'thankYou')}</h3>
        <p className="text-body-muted">{successMessage}</p>
        <Button className="mt-6" onClick={() => setStatus('idle')}>
          {ui('common', 'submitAnother')}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="text" {...register('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.name} className={cn(field.colSpan === 2 && 'md:col-span-2')}>
            <label htmlFor={field.name} className="form-label">
              {field.label}
              {field.required && <span className="text-brand-600 ms-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                {...register(field.name)}
                rows={field.rows || 4}
                placeholder={field.placeholder}
                className="input-premium resize-none"
              />
            ) : field.type === 'select' ? (
              <Controller
                name={field.name}
                control={control}
                render={({ field: ctrl }) => (
                  <CustomSelect
                    id={field.name}
                    options={field.options || []}
                    value={ctrl.value as string}
                    onChange={ctrl.onChange}
                    placeholder={ui('common', 'select')}
                    error={(errors[field.name] as { message?: string })?.message}
                  />
                )}
              />
            ) : field.type === 'file' ? (
              <input
                id={field.name}
                type="file"
                accept={field.accept}
                {...register(field.name)}
                className="input-premium file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-brand-500/20 file:text-brand-700 file:text-sm file:font-medium"
              />
            ) : (
              <input
                id={field.name}
                type={field.type || 'text'}
                {...register(field.name)}
                placeholder={field.placeholder}
                className="input-premium"
              />
            )}

            {errors[field.name] && (
              <p className="mt-1.5 text-sm text-red-400">{(errors[field.name] as { message?: string })?.message}</p>
            )}
          </div>
        ))}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {errorMsg}
        </div>
      )}

      <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full md:w-auto">
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {ui('common', 'submitting')}
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  )
}
