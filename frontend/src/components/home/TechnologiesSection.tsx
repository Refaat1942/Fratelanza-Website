import { motion } from 'framer-motion'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { technologyCategories } from '@/data/technologies'
import { useTranslation } from '@/i18n/useTranslation'
import { SectionHeader } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const colorMap = {
  brand: 'from-brand-500/15 to-brand-600/5 border-brand-300/30 text-brand-700',
  mint: 'from-mint-500/15 to-mint-600/5 border-mint-300/30 text-mint-700',
  gold: 'from-gold-500/15 to-gold-600/5 border-gold-300/30 text-gold-700',
}

export function TechnologiesSection() {
  const { t, ui } = useTranslation()

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-mint-50/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.08),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={ui('technologies', 'badge')}
          title={ui('technologies', 'title')}
          subtitle={ui('technologies', 'subtitle')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologyCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="glass-premium rounded-2xl p-6 h-full border border-slate-200/80 shadow-md shadow-brand-500/5"
            >
              <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center border mb-4', colorMap[cat.color])}>
                <DynamicIcon name={cat.icon} className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 font-display">{t(cat.name)}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + j * 0.03 }}
                    className="flex items-center gap-2 text-sm text-body-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    {t(item)}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
