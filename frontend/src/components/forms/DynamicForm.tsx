import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { submitForm } from '@/lib/api'

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
}

export function DynamicForm({
  fields,
  schema,
  endpoint,
  submitLabel,
  successMessage,
  useFormData = false,
}: DynamicFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema as z.ZodObject<z.ZodRawShape>),
  })

  const onSubmit = async (data: Record<string, unknown>) => {
    setStatus('loading')
    setErrorMsg('')
    try {
      if (useFormData) {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof FileList && value.length > 0) {
            formData.append(key, value[0])
          } else if (value !== undefined && value !== null && value !== '') {
            formData.append(key, String(value))
          }
        })
        await submitForm(endpoint, formData, data.website as string)
      } else {
        await submitForm(endpoint, { ...data, website: data.website as string })
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
      <div className="glass rounded-2xl p-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-gold-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-white/60">{successMessage}</p>
        <Button className="mt-6" onClick={() => setStatus('idle')}>
          Submit Another
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
            <label htmlFor={field.name} className="block text-sm font-medium text-white/80 mb-2">
              {field.label}
              {field.required && <span className="text-gold-400 ml-1">*</span>}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                {...register(field.name)}
                rows={field.rows || 4}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none"
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                {...register(field.name)}
                className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              >
                <option value="">Select...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : field.type === 'file' ? (
              <input
                id={field.name}
                type="file"
                accept={field.accept}
                {...register(field.name)}
                className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 text-white/60 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gold-500/20 file:text-gold-300 file:text-sm"
              />
            ) : (
              <input
                id={field.name}
                type={field.type || 'text'}
                {...register(field.name)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              />
            )}

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-400">{(errors[field.name] as { message?: string })?.message}</p>
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
            Submitting...
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  )
}
