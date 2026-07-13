import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Option = { value: string; label: string }

type CustomSelectProps = {
  id: string
  options: Option[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export function CustomSelect({ id, options, value = '', onChange, placeholder = 'Select...', error }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen(!open)}
        className={cn(
          'input-premium flex items-center justify-between text-left cursor-pointer',
          !selected && 'text-body-subtle',
          error && 'ring-2 ring-red-400/50',
        )}
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <ChevronDown className={cn('w-4 h-4 text-body-subtle shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-xl glass-premium border border-slate-200/80 shadow-2xl shadow-black/50 py-1"
          >
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={cn(
                    'w-full px-4 py-2.5 text-sm text-left flex items-center justify-between hover:bg-brand-500/10 transition-colors',
                    value === opt.value ? 'text-brand-700 bg-brand-500/10' : 'text-white/80',
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {value === opt.value && <Check className="w-4 h-4 text-brand-400 shrink-0" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
