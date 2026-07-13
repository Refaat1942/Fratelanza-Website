import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '@/data/content'
import { useTranslation } from '@/i18n/useTranslation'
import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export default function FAQPage() {
  const { t, ui } = useTranslation()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <SEO title={ui('faq', 'title')} description={ui('faq', 'seoDesc')} path="/faq" />
      <PageHero title={ui('faq', 'title')} subtitle={ui('faq', 'subtitle')} />

      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold pr-4">{t(item.question)}</span>
                <ChevronDown className={cn('w-5 h-5 text-gold-600 shrink-0 transition-transform', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-sm text-body-muted leading-relaxed">{t(item.answer)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
