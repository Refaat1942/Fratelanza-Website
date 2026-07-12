import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { company } from '@/data/content'

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-950"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img src="/logo.svg" alt={company.name} className="h-16 mx-auto mb-6" />
            <motion.div
              className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
