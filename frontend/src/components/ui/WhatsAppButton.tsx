import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { company } from '@/data/content'

export function WhatsAppButton() {
  const href = `https://wa.me/${company.whatsapp.replace(/\D/g, '')}`

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle className="w-5 h-5" />
      </motion.span>
      <span className="text-sm font-semibold hidden sm:inline">WhatsApp</span>
    </motion.a>
  )
}
