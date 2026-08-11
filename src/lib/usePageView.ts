import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'

/**
 * Reports a GA page_view for the current route. Pages that set their metadata
 * with `usePageMeta` get this for free; pages that use `<Head>` for
 * prerendered metadata must call it themselves.
 */
export function usePageView(title: string): void {
  const { pathname } = useLocation()

  useEffect(() => {
    trackPageView(pathname, title)
  }, [pathname, title])
}
