import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useI18n } from '@/i18n/context'

const KEY = 'fl-intro-seen'
const DURATION = 3200

/** Opening intro: big logo + "Building Tomorrow Together". Once per visit, tap to skip. */
export function IntroSplash() {
  const reduce = useReducedMotion()
  const { locale } = useI18n()
  const isAr = locale === 'ar'
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined' || window.location.pathname.startsWith('/admin')) return false
    try { return !sessionStorage.getItem(KEY) } catch { return true }
  })

  useEffect(() => {
    if (!show) return
    try { sessionStorage.setItem(KEY, '1') } catch { /* storage blocked */ }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => setShow(false), reduce ? 1200 : DURATION)
    return () => { window.clearTimeout(timer); document.body.style.overflow = prev }
  }, [show, reduce])

  const primary = isAr ? 'فراتيلانزا' : 'FRATELANZA'
  const secondary = isAr ? 'FRATELANZA' : 'فراتيلانزا'
  const slogan = isAr ? 'نبني الغد معاً' : 'Building Tomorrow Together'
  const sloganAlt = isAr ? 'BUILDING TOMORROW TOGETHER' : 'نبني الغد معاً'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          role="presentation"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-navy-hero cursor-pointer select-none"
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-grid-faint opacity-70" />
          <div className="blob anim-drift h-[28rem] w-[28rem] -top-24 -start-24 bg-cyan-500/30" />
          <div className="blob anim-drift h-[26rem] w-[26rem] -bottom-28 -end-20 bg-violet-500/25" style={{ animationDelay: '-6s' }} />
          <div className="blob anim-drift h-[22rem] w-[22rem] top-1/3 end-1/4 bg-goldx-500/25" style={{ animationDelay: '-11s' }} />

          <div className="relative grid place-items-center">
            {/* expanding rings */}
            {!reduce && [0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border-2 border-goldx-300/60"
                style={{ width: 300, height: 300 }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 2.1], opacity: [0.7, 0] }}
                transition={{ duration: 2.4, delay: 0.3 + i * 0.6, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
            {/* rotating halo */}
            <div className="absolute h-[20rem] w-[20rem] sm:h-[28rem] sm:w-[28rem] lg:h-[33rem] lg:w-[33rem] rounded-full bg-[conic-gradient(from_0deg,#22d3ee,#a78bfa,#d4a03a,#34d399,#22d3ee)] opacity-60 blur-2xl anim-spin-slow" />
            <motion.div
              className="relative shine rounded-full"
              initial={reduce ? { opacity: 0 } : { scale: 0.35, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.15 }}
            >
              <img
                src="/logo.png"
                alt="Fratelanza"
                className="h-56 w-56 sm:h-80 sm:w-80 lg:h-96 lg:w-96 rounded-full object-cover shadow-[0_0_0_6px_rgba(242,216,154,0.85),0_30px_80px_rgba(0,0,0,0.55)]"
                style={{ clipPath: 'circle(41.5% at 49% 48.5%)', transform: 'scale(1.16)' }}
              />
            </motion.div>
          </div>

          <motion.h1
            className="relative mt-8 lg:mt-10 text-5xl sm:text-7xl font-extrabold leading-tight text-gold-shimmer"
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 50% 0 50%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0%)' }}
            transition={{ duration: 0.9, delay: 0.75, ease: 'easeOut' }}
          >
            {primary}
          </motion.h1>
          <motion.p
            className="relative mt-1 text-sm sm:text-base font-bold tracking-[0.4em] text-slate-300 rtl:tracking-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15 }}
          >
            {secondary}
          </motion.p>

          <motion.div
            className="relative mt-8 flex items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35 }}
          >
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-goldx-400 to-transparent" />
            <p className="text-2xl sm:text-4xl font-extrabold text-white">{slogan}</p>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-goldx-400 to-transparent" />
          </motion.div>
          <motion.p
            className="relative mt-3 text-xs sm:text-sm font-bold tracking-[0.35em] text-goldx-300 rtl:tracking-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            {sloganAlt}
          </motion.p>

          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 via-goldx-400 to-violet-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: (reduce ? 1200 : DURATION) / 1000, ease: 'linear' }}
            />
          </div>
          <p className="absolute bottom-6 text-xs text-slate-400">{isAr ? 'اضغط في أي مكان للدخول' : 'Tap anywhere to enter'}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
