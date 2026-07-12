import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: ReactNode
}

const variants = {
  primary: 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 hover:from-gold-400 hover:to-gold-500 shadow-lg shadow-gold-500/20',
  secondary: 'glass text-white hover:bg-white/10',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
  outline: 'border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export function Button({ variant = 'primary', size = 'md', href, className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 cursor-pointer',
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      )
    }
    return (
      <Link to={href} className={classes}>
        <motion.span className="inline-flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {children}
        </motion.span>
      </Link>
    )
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as object)}
    >
      {children}
    </motion.button>
  )
}
