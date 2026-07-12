import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import { overview, coreValues, timeline, leadership, t } from '@/data/content'
import { useI18n } from '@/i18n/context'
import { SEO } from '@/components/SEO'
import { Card, PageHero, SectionHeader } from '@/components/ui/Card'

export default function AboutPage() {
  const { locale } = useI18n()

  return (
    <>
      <SEO
        title={locale === 'en' ? 'About Us' : 'من نحن'}
        description={t(overview.profile, locale)}
        path="/about"
      />
      <PageHero
        title={locale === 'en' ? 'About Fratelanza' : 'عن فراتيلانزا'}
        subtitle={t(overview.profile, locale)}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-4 text-gold-400">
                {locale === 'en' ? 'Our Story' : 'قصتنا'}
              </h2>
              <p className="text-white/60 leading-relaxed">{t(overview.story, locale)}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card glow>
                <h3 className="text-lg font-semibold mb-3">{locale === 'en' ? 'Company Profile' : 'ملف الشركة'}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t(overview.profile, locale)}</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gold-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-xl font-bold text-gold-400 mb-3">{locale === 'en' ? 'Vision' : 'الرؤية'}</h3>
            <p className="text-white/60 leading-relaxed">{t(overview.vision, locale)}</p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-gold-400 mb-3">{locale === 'en' ? 'Mission' : 'الرسالة'}</h3>
            <p className="text-white/60 leading-relaxed">{t(overview.mission, locale)}</p>
          </Card>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={locale === 'en' ? 'Core Values' : 'قيمنا الأساسية'} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card>
                    <DynamicIcon name={val.icon} className="w-8 h-8 text-gold-400 mb-3" />
                    <h3 className="font-semibold mb-2">{t(val.title, locale)}</h3>
                    <p className="text-sm text-white/50">{t(val.description, locale)}</p>
                  </Card>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title={locale === 'en' ? 'Business Philosophy' : 'فلسفة العمل'}
            subtitle={t(overview.philosophy, locale)}
          />
        </div>
      </section>

      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={locale === 'en' ? 'Our Journey' : 'رحلتنا'} />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold-500/20 md:-translate-x-px" />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                  {i % 2 === 0 && (
                    <Card className="inline-block text-left">
                      <span className="text-gold-400 font-bold">{item.year}</span>
                      <h3 className="font-semibold mt-1">{t(item.title, locale)}</h3>
                      <p className="text-sm text-white/50 mt-1">{t(item.description, locale)}</p>
                    </Card>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center shrink-0 z-10">
                  <div className="w-3 h-3 rounded-full bg-gold-400" />
                </div>
                <div className="flex-1 md:hidden">
                  <Card>
                    <span className="text-gold-400 font-bold">{item.year}</span>
                    <h3 className="font-semibold mt-1">{t(item.title, locale)}</h3>
                    <p className="text-sm text-white/50 mt-1">{t(item.description, locale)}</p>
                  </Card>
                </div>
                <div className={`flex-1 ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'} hidden md:block`}>
                  {i % 2 !== 0 && (
                    <Card className="inline-block text-left">
                      <span className="text-gold-400 font-bold">{item.year}</span>
                      <h3 className="font-semibold mt-1">{t(item.title, locale)}</h3>
                      <p className="text-sm text-white/50 mt-1">{t(item.description, locale)}</p>
                    </Card>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title={locale === 'en' ? 'Leadership' : 'القيادة'} />
          {leadership.map((leader, i) => (
            <Card key={i} className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-gold-500/10 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-gold-400" />
              </div>
              <h3 className="text-xl font-bold">{leader.name}</h3>
              <p className="text-gold-400 text-sm mt-1">{t(leader.role, locale)}</p>
              <p className="text-white/50 mt-4 text-sm leading-relaxed">{t(leader.bio, locale)}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
