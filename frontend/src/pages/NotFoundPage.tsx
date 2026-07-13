import { useTranslation } from '@/i18n/useTranslation'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  const { ui } = useTranslation()

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-gold-600/30">404</h1>
        <h2 className="text-2xl font-bold mt-4">{ui('notFound', 'title')}</h2>
        <p className="text-body-subtle mt-2 mb-8">{ui('notFound', 'message')}</p>
        <Button href="/">{ui('common', 'backToHome')}</Button>
      </div>
    </div>
  )
}
