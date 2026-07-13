import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import { useTranslation } from '@/i18n/useTranslation'

export function RouteError() {
  const error = useRouteError()
  const { ui, dir } = useTranslation()

  const isChunkError =
    error instanceof Error &&
    (error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Loading chunk'))

  const title = isChunkError ? ui('errors', 'updateTitle') : ui('errors', 'title')
  const message = isChunkError ? ui('errors', 'updateMessage') : ui('errors', 'message')

  return (
    <div dir={dir} className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="glass-premium rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-3 text-ink font-display">{title}</h1>
        <p className="text-body-muted mb-6">{message}</p>
        {!isRouteErrorResponse(error) && error instanceof Error && !isChunkError && (
          <p className="text-body-subtle text-xs mb-4 font-mono break-all">{error.message}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-mint-500 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {ui('errors', 'reload')}
          </button>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl glass hover:bg-brand-50 transition-colors text-ink font-semibold"
          >
            {ui('errors', 'home')}
          </Link>
        </div>
      </div>
    </div>
  )
}
