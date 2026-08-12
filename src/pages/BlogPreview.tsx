import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { BlogArticle } from '@/components/blog/BlogArticle'
import type { BlogPost } from '@/data/blog'
import { useNoIndex } from '@/lib/usePageMeta'

/**
 * Draft preview — shows an unpublished post rendered by the same components
 * that will serve it once published, so what an editor approves is what ships.
 *
 * Deliberately not prerendered and never indexed: it fetches at request time
 * from the CMS, which is exactly what a published post must not do. It is
 * reachable only with the shared secret the CMS puts in the Preview link.
 */

const CMS_URL = import.meta.env.VITE_CMS_URL

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; post: BlogPost; published: boolean }

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-6">
      <p className="max-w-[520px] text-center text-[18px] leading-[1.6] text-[#888]">
        {children}
      </p>
    </div>
  )
}

export default function BlogPreview() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const secret = params.get('secret') ?? ''
  const [state, setState] = useState<State>({ status: 'loading' })

  useNoIndex()

  useEffect(() => {
    if (!CMS_URL) {
      setState({ status: 'error', message: 'VITE_CMS_URL is not configured for this build.' })
      return
    }
    if (!slug || !secret) {
      setState({ status: 'error', message: 'This preview link is missing its slug or secret.' })
      return
    }

    let cancelled = false
    const query = new URLSearchParams({ slug, secret })

    fetch(`${CMS_URL}/api/preview?${query}`)
      .then(async (response) => {
        if (!response.ok) {
          const detail =
            response.status === 403
              ? 'This preview link is invalid or has expired.'
              : response.status === 404
                ? 'No post exists with that slug.'
                : `The CMS returned ${response.status}.`
          throw new Error(detail)
        }
        return response.json()
      })
      .then((data: BlogPost & { status: string }) => {
        if (cancelled) return
        // A post saved before anything was written into the body has no
        // content to render, which is a normal state for a brand-new draft.
        if (!data.content) {
          setState({
            status: 'error',
            message: 'This draft has no body content yet. Add some and save, then preview again.',
          })
          return
        }
        setState({ status: 'ready', post: data, published: data.status === 'published' })
      })
      .catch((error: Error) => {
        if (cancelled) return
        setState({ status: 'error', message: error.message })
      })

    return () => {
      cancelled = true
    }
  }, [slug, secret])

  if (state.status === 'loading') return <Notice>Loading preview…</Notice>
  if (state.status === 'error') return <Notice>{state.message}</Notice>

  return (
    <>
      {/* Makes it impossible to mistake a preview for the live site. */}
      <div className="fixed inset-x-0 top-0 z-[60] bg-[#c73154] py-1.5 text-center text-[13px] font-medium text-white">
        Preview — {state.published ? 'published post' : 'unpublished draft'}, not visible to visitors
      </div>
      <BlogArticle post={state.post} />
    </>
  )
}
