import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Particle = { id: number; x: number; y: number; size: number; delay: number }

export function AnimatedBackground({ variant = 'hero' }: { variant?: 'hero' | 'subtle' }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: variant === 'hero' ? 24 : 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      })),
    )
  }, [variant])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/4 -left-20 w-[520px] h-[520px] rounded-full bg-cyan-300/25 blur-[100px]"
        animate={{ x: [0, 40, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] rounded-full bg-emerald-300/20 blur-[90px]"
        animate={{ x: [0, -35, 0], y: [0, -18, 0], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-amber-200/25 blur-[110px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-400/25"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4 + p.delay, repeat: Infinity, delay: p.delay }}
        />
      ))}

      <motion.div
        className="absolute top-24 right-[12%] w-14 h-14 border-2 border-brand-300/30 rounded-2xl rotate-12 bg-white/30"
        animate={{ rotate: [12, 20, 12], y: [0, -12, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-28 left-[8%] w-10 h-10 border-2 border-mint-400/35 rounded-full bg-mint-100/40"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(240,249,255,0.4)_100%)]" />
    </div>
  )
}
