import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const useReadership = vi.fn()
vi.mock('@/lib/useReadership', () => ({
  useReadership: (...args: unknown[]) => useReadership(...args),
}))

const { default: BlogPost } = await import('@/pages/BlogPost')
const { POSTS } = await import('@/data/blog')

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog" element={<div>index</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

beforeEach(() => useReadership.mockClear())
afterEach(() => vi.clearAllMocks())

describe('BlogPost', () => {
  it('reports readership for the post being viewed', () => {
    const slug = POSTS[0]!.slug
    renderAt(`/blog/${slug}`)
    expect(useReadership).toHaveBeenCalledWith(
      slug,
      expect.objectContaining({ current: expect.anything() }),
    )
  })

  it('attaches the ref to the article element it measures', () => {
    const slug = POSTS[0]!.slug
    renderAt(`/blog/${slug}`)
    const ref = useReadership.mock.calls[0]![1] as { current: HTMLElement | null }
    expect(ref.current?.tagName).toBe('ARTICLE')
  })
})
