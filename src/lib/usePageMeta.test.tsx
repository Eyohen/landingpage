import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { usePageMeta } from '@/lib/usePageMeta'

/** The head tags index.html ships with, which pages override. */
const DEFAULTS = {
  title: 'Stablecoin Payment Infrastructure for Merchants | Stablezact',
  description: 'Stablezact enables crypto wallet payments.',
  image: 'https://stablezact.com/og-image.png',
}

function seedHead() {
  // innerHTML first — assigning it removes the <title> element, so setting
  // document.title beforehand would be wiped out.
  document.head.innerHTML = `
    <meta name="description" content="${DEFAULTS.description}" />
    <link rel="canonical" href="https://stablezact.com/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${DEFAULTS.title}" />
    <meta property="og:description" content="${DEFAULTS.description}" />
    <meta property="og:url" content="https://stablezact.com/" />
    <meta property="og:image" content="${DEFAULTS.image}" />
    <meta name="twitter:title" content="${DEFAULTS.title}" />
    <meta name="twitter:description" content="${DEFAULTS.description}" />
    <meta name="twitter:image" content="${DEFAULTS.image}" />
  `
  document.title = DEFAULTS.title
}

function content(selector: string) {
  return document.head.querySelector<HTMLMetaElement>(selector)?.content
}

function wrapper({ children }: { children: ReactNode }) {
  return <MemoryRouter initialEntries={['/blog/a-post']}>{children}</MemoryRouter>
}

describe('usePageMeta', () => {
  beforeEach(seedHead)

  it('sets the Open Graph and Twitter tags for a post', () => {
    renderHook(
      () =>
        usePageMeta('A Post | Stablezact', 'What the post is about', {
          image: 'https://stablezact.com/assets/cover.jpg',
          type: 'article',
        }),
      { wrapper },
    )

    expect(document.title).toBe('A Post | Stablezact')
    expect(content('meta[property="og:title"]')).toBe('A Post | Stablezact')
    expect(content('meta[property="og:image"]')).toBe(
      'https://stablezact.com/assets/cover.jpg',
    )
    expect(content('meta[property="og:type"]')).toBe('article')
  })

  it('updates the twitter tags, which would otherwise win with site defaults', () => {
    renderHook(
      () =>
        usePageMeta('A Post | Stablezact', 'What the post is about', {
          image: 'https://stablezact.com/assets/cover.jpg',
        }),
      { wrapper },
    )

    expect(content('meta[name="twitter:title"]')).toBe('A Post | Stablezact')
    expect(content('meta[name="twitter:description"]')).toBe('What the post is about')
    expect(content('meta[name="twitter:image"]')).toBe(
      'https://stablezact.com/assets/cover.jpg',
    )
  })

  it('restores every default on unmount so the image does not leak to other pages', () => {
    const { unmount } = renderHook(
      () =>
        usePageMeta('A Post | Stablezact', 'What the post is about', {
          image: 'https://stablezact.com/assets/cover.jpg',
          type: 'article',
        }),
      { wrapper },
    )

    unmount()

    expect(document.title).toBe(DEFAULTS.title)
    expect(content('meta[property="og:image"]')).toBe(DEFAULTS.image)
    expect(content('meta[name="twitter:image"]')).toBe(DEFAULTS.image)
    expect(content('meta[property="og:type"]')).toBe('website')
    expect(content('meta[name="twitter:title"]')).toBe(DEFAULTS.title)
  })

  it('leaves the image and type untouched when a page does not set them', () => {
    renderHook(() => usePageMeta('About | Stablezact', 'About us'), { wrapper })

    expect(content('meta[property="og:image"]')).toBe(DEFAULTS.image)
    expect(content('meta[property="og:type"]')).toBe('website')
  })
})
