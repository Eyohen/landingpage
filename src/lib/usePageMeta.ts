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

export interface PageMetaOptions {
  /** Absolute URL of this page's social share image. */
  image?: string
  /** Open Graph type — 'article' for blog posts, 'website' elsewhere. */
  type?: string
}

/**
 * Applies `value` to an existing head tag and returns a function restoring
 * whatever was there before. A missing tag or absent value is a no-op, so
 * pages only override the defaults in index.html that they actually set.
 */
function setMeta(selector: string, value: string | undefined): () => void {
  if (!value) return () => {}
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (!el) return () => {}

  if (el instanceof HTMLLinkElement) {
    const previous = el.href
    el.href = value
    return () => {
      el.href = previous
    }
  }

  const previous = el.content
  el.content = value
  return () => {
    el.content = previous
  }
}

/**
 * Sets the document title, meta description, canonical URL, Open Graph and
 * Twitter card tags for a page. The landing page's defaults (from index.html)
 * are restored on unmount, so navigating back to `/` keeps the original tags.
 *
 * The `twitter:*` tags matter as much as the `og:*` ones: index.html defines
 * them with site-wide values, and a defined twitter tag takes precedence over
 * its og equivalent — so leaving them alone would show the generic site title
 * on every shared inner page.
 */
export function usePageMeta(
  title: string,
  description?: string,
  options: PageMetaOptions = {},
) {
  const { pathname } = useLocation()
  const { image, type } = options

  usePageView(title)

  useEffect(() => {
    const url = ORIGIN + (pathname === '/' ? '/' : pathname)
    const previousTitle = document.title
    document.title = title

    const restores = [
      setMeta('meta[name="description"]', description),
      setMeta('link[rel="canonical"]', url),
      setMeta('meta[property="og:title"]', title),
      setMeta('meta[property="og:description"]', description),
      setMeta('meta[property="og:url"]', url),
      setMeta('meta[property="og:image"]', image),
      setMeta('meta[property="og:type"]', type),
      setMeta('meta[name="twitter:title"]', title),
      setMeta('meta[name="twitter:description"]', description),
      setMeta('meta[name="twitter:image"]', image),
    ]

    return () => {
      document.title = previousTitle
      for (const restore of restores) restore()
    }
  }, [title, description, pathname, image, type])
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
