import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'brand' | 'navy' | 'light'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
}

const variants = {
  primary:
    'bg-goldx-500 text-navy-950 hover:bg-goldx-400 font-bold shadow-lg shadow-goldx-500/25 border border-goldx-600/30',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 font-bold shadow-lg shadow-navy-900/20',
  light: 'bg-white/10 text-white border border-white/25 hover:bg-white/20 font-semibold backdrop-blur',
  brand: 'bg-navy-900 text-white hover:bg-navy-800 font-bold shadow-lg shadow-navy-900/20',
  secondary:
    'bg-white text-navy-900 border border-slate-300 hover:border-navy-700 hover:bg-slate-50 font-semibold shadow-sm',
  ghost: 'text-navy-800 hover:text-navy-900 hover:bg-slate-100 font-semibold',
  outline:
    'border-2 border-navy-800 text-navy-900 bg-white hover:bg-slate-50 font-semibold shadow-sm',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-base rounded-2xl',
}

export function Button({ variant = 'primary', size = 'md', href, className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-display transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className,
  )

  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      )
    }
    return (
      <Link to={href} className={classes}>
        <motion.span className="inline-flex items-center gap-2" whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.98 }}>
          {children}
        </motion.span>
      </Link>
    )
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...(props as object)}
    >
      {children}
    </motion.button>
  )
}
