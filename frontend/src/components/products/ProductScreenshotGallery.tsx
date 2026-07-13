import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import type { ProductScreenshot } from '@/data/productShowcases'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

export function ProductScreenshotGallery({ shots }: { shots: ProductScreenshot[] }) {
  const { t, isAr } = useTranslation()
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (shots.length === 0) return null

  const current = shots[active]

  const prev = () => setActive((i) => (i === 0 ? shots.length - 1 : i - 1))
  const next = () => setActive((i) => (i === shots.length - 1 ? 0 : i + 1))

  return (
    <div className="space-y-4">
      <div className="relative group">
        <motion.div
          key={current.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <img
            src={current.src}
            alt={t(current.title)}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </motion.div>
        <button
          onClick={() => setLightbox(true)}
          className="absolute top-3 end-3 p-2 rounded-lg glass opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        {shots.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute start-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className={cn('w-5 h-5', isAr && 'rotate-180')} />
            </button>
            <button
              onClick={next}
              className="absolute end-3 top-1/2 -translate-y-1/2 p-2 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className={cn('w-5 h-5', isAr && 'rotate-180')} />
            </button>
          </>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-brand-300">{t(current.title)}</h3>
        <p className="text-sm text-white/50 mt-1">{t(current.description)}</p>
      </div>

      {shots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              onClick={() => setActive(i)}
              className={cn(
                'shrink-0 w-24 h-14 rounded-lg overflow-hidden border-2 transition-all',
                i === active ? 'border-brand-400 ring-2 ring-brand-400/30' : 'border-white/10 opacity-60 hover:opacity-100',
              )}
            >
              <img src={shot.src} alt={t(shot.title)} className="w-full h-full object-cover object-top" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 end-4 p-2 rounded-lg glass"
              onClick={() => setLightbox(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={current.src}
              alt={t(current.title)}
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
