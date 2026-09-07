import { render } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useReadership } from '@/lib/useReadership'

const sent: Array<Record<string, unknown>> = []

function Harness({ slug }: { slug: string | undefined }) {
  const ref = useRef<HTMLElement | null>(null)
  useReadership(slug, ref)
  return <article ref={ref}>body</article>
}

function setVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', { value: state, configurable: true })
  document.dispatchEvent(new Event('visibilitychange'))
}

beforeEach(() => {
  sent.length = 0
  vi.stubEnv('VITE_CMS_URL', 'https://cms.test')
  vi.stubGlobal(
    'fetch',
    vi.fn(async (_url: string, init?: RequestInit) => {
      sent.push(JSON.parse(String(init?.body)))
      return new Response(null, { status: 204 })
    }),
  )
  // jsdom's navigator is read-only, so define the single property rather than
  // replacing the whole object — stubGlobal('navigator', …) breaks other APIs.
  Object.defineProperty(navigator, 'sendBeacon', {
    configurable: true,
    writable: true,
    value: vi.fn((_url: string, body: Blob) => {
      void body.text().then((text) => sent.push(JSON.parse(text)))
      return true
    }),
  })
  setVisibility('visible')
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useReadership', () => {
  it('sends a view beacon on mount', () => {
    render(<Harness slug="a-post" />)
    expect(sent).toHaveLength(1)
    expect(sent[0]).toMatchObject({ slug: 'a-post' })
    expect(sent[0]!.viewId).toEqual(expect.any(String))
  })

  it('sends no beacon without a slug', () => {
    render(<Harness slug={undefined} />)
    expect(sent).toHaveLength(0)
  })

  it('sends no beacon when the CMS URL is not configured', () => {
    vi.stubEnv('VITE_CMS_URL', '')
    render(<Harness slug="a-post" />)
    expect(sent).toHaveLength(0)
  })

  it('sends an engagement beacon carrying the same viewId when the tab is hidden', async () => {
    render(<Harness slug="a-post" />)
    setVisibility('hidden')
    await vi.waitFor(() => expect(sent).toHaveLength(2))
    expect(sent[1]!.viewId).toBe(sent[0]!.viewId)
    expect(sent[1]).toHaveProperty('maxScroll')
    expect(sent[1]).toHaveProperty('engagedMs')
  })

  it('does not send a second engagement beacon when nothing changed', async () => {
    render(<Harness slug="a-post" />)
    setVisibility('hidden')
    await vi.waitFor(() => expect(sent).toHaveLength(2))
    setVisibility('visible')
    setVisibility('hidden')
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(sent).toHaveLength(2)
  })

  it('sends an engagement beacon on unmount, for SPA navigation away', async () => {
    const view = render(<Harness slug="a-post" />)
    view.unmount()
    await vi.waitFor(() => expect(sent).toHaveLength(2))
  })
})
