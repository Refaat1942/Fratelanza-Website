import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'brand'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
}

const variants = {
  primary:
    'bg-gradient-to-r from-gold-500 to-amber-600 text-ink hover:from-gold-400 hover:to-amber-500 glow-button font-bold border border-amber-700/15 shadow-md shadow-amber-500/20',
  brand:
    'bg-gradient-to-r from-brand-700 via-brand-600 to-mint-600 text-white hover:from-brand-600 hover:to-mint-500 shadow-lg shadow-brand-700/30 font-bold border border-brand-800/20',
  secondary:
    'bg-white text-brand-800 border-2 border-slate-300 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-900 font-semibold shadow-sm',
  ghost: 'text-brand-800 hover:text-brand-900 hover:bg-brand-100 font-semibold',
  outline:
    'border-2 border-brand-600 text-brand-800 bg-white hover:bg-brand-50 hover:border-brand-700 hover:text-brand-900 font-semibold shadow-sm',
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
