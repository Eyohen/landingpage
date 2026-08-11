import { describe, expect, it } from 'vitest'
import { postedAgo } from '@/data/blog'

describe('postedAgo', () => {
  it('reports minutes within the first hour', () => {
    const now = new Date('2026-08-01T00:30:00Z')
    expect(postedAgo('2026-08-01', now)).toBe('Posted 30 mins ago')
  })

  it('uses the singular for exactly one day', () => {
    const now = new Date('2026-08-02T00:00:00Z')
    expect(postedAgo('2026-08-01', now)).toBe('Posted 1 day ago')
  })

  it('reports whole days for a post published nine days ago', () => {
    const now = new Date('2026-08-10T00:00:00Z')
    expect(postedAgo('2026-08-01', now)).toBe('Posted 9 days ago')
  })

  it('rolls over to months past thirty days', () => {
    const now = new Date('2026-09-15T00:00:00Z')
    expect(postedAgo('2026-08-01', now)).toBe('Posted 1 month ago')
  })
})
