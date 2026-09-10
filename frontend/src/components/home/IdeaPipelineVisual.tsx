import { motion, useReducedMotion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { heroPipelineSteps, homeT } from '@/data/homepage'
import { useTranslation } from '@/i18n/useTranslation'
import { cn } from '@/lib/utils'

export function IdeaPipelineVisual({ compact = false }: { compact?: boolean }) {
  const { locale, isAr } = useTranslation()
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        'relative',
        compact ? 'overflow-x-auto pb-2 -mx-1 px-1' : '',
      )}
    >
      <div
        className={cn(
          'flex items-stretch gap-1 sm:gap-2',
          compact ? 'min-w-max' : 'flex-wrap justify-center lg:justify-start',
        )}
      >
        {heroPipelineSteps.map((step, i) => (
          <motion.div
            key={step.label.en}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
            className={cn(
              'flex items-center gap-1 sm:gap-2',
              compact ? 'shrink-0' : '',
            )}
          >
            <div
              className={cn(
                'group relative flex flex-col items-center text-center rounded-xl border border-white/60 bg-white/80 backdrop-blur-sm shadow-sm',
                compact ? 'w-[4.5rem] sm:w-[5.25rem] p-2' : 'w-[4.75rem] sm:w-[5.5rem] p-2.5',
                i === heroPipelineSteps.length - 1 && 'border-mint-300/80 bg-mint-50/90',
              )}
            >
              <div
                className={cn(
                  'rounded-lg flex items-center justify-center mb-1',
                  compact ? 'w-7 h-7' : 'w-8 h-8',
                  i === heroPipelineSteps.length - 1
                    ? 'bg-gradient-to-br from-mint-500 to-brand-600 text-white'
                    : 'bg-brand-50 text-brand-700 group-hover:bg-brand-100 transition-colors',
                )}
              >
                <DynamicIcon name={step.icon} className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-ink leading-tight font-display">
                {homeT(step.label, locale)}
              </span>
            </div>
            {i < heroPipelineSteps.length - 1 && (
              <DynamicIcon
                name="ChevronRight"
                className={cn(
                  'w-3 h-3 text-brand-400/80 shrink-0',
                  isAr && 'rotate-180',
                  compact && 'mx-0.5',
                )}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
