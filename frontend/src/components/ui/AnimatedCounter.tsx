import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type AnimatedCounterProps = {
  value: string
  className?: string
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return

    const match = value.match(/^([\d.]+)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }

    const target = parseFloat(match[1])
    const suffix = match[2]
    const duration = 2000
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased
      setDisplay(`${Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {display}
    </motion.span>
  )
}
