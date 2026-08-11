import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { usePageView } from '@/lib/usePageView'

const ORIGIN = 'https://stablezact.com'

function upsertMeta(selector: string, create: () => HTMLElement, content: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (!el) {
    el = create() as HTMLMetaElement
    document.head.appendChild(el)
  }
  if (el instanceof HTMLLinkElement) el.href = content
  else el.content = content
  return el
}

/**
 * Sets the document title, meta description, canonical URL and Open Graph
 * tags for a page. The landing page's defaults (from index.html) are
 * restored on unmount, so navigating back to `/` keeps the original tags.
 */
export function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation()

  usePageView(title)

  useEffect(() => {
    const prevTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDescription = meta?.content
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const prevCanonical = canonical?.href
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const prevOgTitle = ogTitle?.content
    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    const prevOgDesc = ogDesc?.content
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    const prevOgUrl = ogUrl?.content

    const url = ORIGIN + (pathname === '/' ? '/' : pathname)
    document.title = title
    if (description && meta) meta.content = description
    if (canonical) canonical.href = url
    if (ogTitle) ogTitle.content = title
    if (description && ogDesc) ogDesc.content = description
    if (ogUrl) ogUrl.content = url

    return () => {
      document.title = prevTitle
      if (meta && prevDescription !== undefined) meta.content = prevDescription
      if (canonical && prevCanonical !== undefined) canonical.href = prevCanonical
      if (ogTitle && prevOgTitle !== undefined) ogTitle.content = prevOgTitle
      if (ogDesc && prevOgDesc !== undefined) ogDesc.content = prevOgDesc
      if (ogUrl && prevOgUrl !== undefined) ogUrl.content = prevOgUrl
    }
  }, [title, description, pathname])
}

/** Marks the current page noindex while mounted (e.g. the 404 page). */
export function useNoIndex() {
  useEffect(() => {
    const el = upsertMeta(
      'meta[name="robots"]',
      () => {
        const m = document.createElement('meta')
        m.name = 'robots'
        return m
      },
      'noindex',
    )
    return () => {
      el.remove()
    }
  }, [])
}
