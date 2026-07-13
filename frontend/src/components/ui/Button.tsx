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
  primary: 'bg-gradient-to-r from-gold-400 to-amber-500 text-ink hover:from-gold-300 hover:to-amber-400 glow-button font-bold',
  brand: 'bg-gradient-to-r from-brand-500 via-brand-500 to-mint-500 text-white hover:from-brand-400 hover:to-mint-400 shadow-lg shadow-brand-500/25 font-bold',
  secondary: 'glass-premium text-ink hover:bg-brand-50 hover:border-brand-200 font-semibold',
  ghost: 'text-ink-muted hover:text-brand-700 hover:bg-brand-50 font-semibold',
  outline: 'border-2 border-brand-300/60 text-brand-700 hover:bg-brand-50 hover:border-brand-400 font-semibold',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-2.5 text-sm rounded-xl',
  lg: 'px-8 py-3.5 text-base rounded-2xl',
}

export function Button({ variant = 'primary', size = 'md', href, className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-display transition-all duration-300 cursor-pointer',
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
