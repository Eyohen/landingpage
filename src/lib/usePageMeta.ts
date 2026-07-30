import { useEffect } from 'react'

/**
 * Sets the document title and meta description for a page. The landing
 * page's defaults (from index.html) are restored when the component
 * unmounts, so navigating back to `/` keeps the original tags.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDescription = meta?.content

    document.title = title
    if (description && meta) meta.content = description

    return () => {
      document.title = prevTitle
      if (meta && prevDescription !== undefined) meta.content = prevDescription
    }
  }, [title, description])
}
