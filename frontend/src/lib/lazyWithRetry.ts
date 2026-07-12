import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

const RETRY_KEY = 'fratelanza-chunk-retry'

function isChunkLoadError(error: unknown): boolean {
  if (!(error instanceof Error)) return false
  const msg = error.message.toLowerCase()
  return (
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('importing a module script failed') ||
    msg.includes('loading chunk') ||
    msg.includes('chunkloaderror')
  )
}

export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(() =>
    factory().catch((error: unknown) => {
      if (isChunkLoadError(error) && !sessionStorage.getItem(RETRY_KEY)) {
        sessionStorage.setItem(RETRY_KEY, '1')
        window.location.reload()
        return new Promise<{ default: T }>(() => {})
      }
      sessionStorage.removeItem(RETRY_KEY)
      throw error
    }),
  )
}
