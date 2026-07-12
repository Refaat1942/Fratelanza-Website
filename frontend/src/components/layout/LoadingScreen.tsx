import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { company, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { Logo } from '@/components/ui/Logo'

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const { locale } = useI18n()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center relative"
          >
            <Logo size="xl" animated />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-sm font-semibold tracking-[0.3em] uppercase text-cyan-300/90"
            >
              {t(company.slogan, locale)}
            </motion.p>
            <motion.div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto mt-8">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-gold-400 to-cyan-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
