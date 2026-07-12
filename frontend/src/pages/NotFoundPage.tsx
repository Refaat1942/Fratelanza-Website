import { useI18n } from '@/i18n/context'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  const { locale } = useI18n()

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gold-400/30">404</h1>
        <h2 className="text-2xl font-bold mt-4">{locale === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة'}</h2>
        <p className="text-white/50 mt-2 mb-8">{locale === 'en' ? 'The page you are looking for does not exist.' : 'الصفحة التي تبحث عنها غير موجودة.'}</p>
        <Button href="/">{locale === 'en' ? 'Back to Home' : 'العودة للرئيسية'}</Button>
      </div>
    </div>
  )
}
