import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqItems, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { PageHero } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

export default function FAQPage() {
  const { locale } = useI18n()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <>
      <SEO title="FAQ" description={locale === 'en' ? 'Frequently asked questions about Fratelanza.' : 'الأسئلة الشائعة عن فراتيلانزا.'} path="/faq" />
      <PageHero title="FAQ" subtitle={locale === 'en' ? 'Everything you need to know about Fratelanza.' : 'كل ما تحتاج معرفته عن فراتيلانزا.'} />

      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold pr-4">{t(item.question, locale)}</span>
                <ChevronDown className={cn('w-5 h-5 text-gold-400 shrink-0 transition-transform', open === i && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-sm text-white/60 leading-relaxed">{t(item.answer, locale)}</p>
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
