import { beforeEach, describe, expect, it, vi } from 'vitest'

async function freshAnalytics() {
  vi.resetModules()
  window.dataLayer = []
  return import('@/lib/analytics')
}

function pageViews() {
  return (window.dataLayer ?? []).filter(
    (entry): entry is [string, string, Record<string, string>] =>
      Array.isArray(entry) && entry[0] === 'event' && entry[1] === 'page_view',
  )
}

describe('trackPageView', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('does not re-report the entry URL, which index.html already sent', async () => {
    const { trackPageView } = await freshAnalytics()
    trackPageView('/', 'Home')
    expect(pageViews()).toHaveLength(0)
  })

  it('reports a navigation to a different path', async () => {
    const { trackPageView } = await freshAnalytics()
    trackPageView('/blog', 'Blog | Stablezact')
    const views = pageViews()
    expect(views).toHaveLength(1)
    expect(views[0][2]).toMatchObject({
      page_path: '/blog',
      page_title: 'Blog | Stablezact',
    })
  })

  it('collapses repeated calls for the same path into one hit', async () => {
    const { trackPageView } = await freshAnalytics()
    trackPageView('/blog', 'Blog | Stablezact')
    trackPageView('/blog', 'Blog | Stablezact')
    expect(pageViews()).toHaveLength(1)
  })
})
