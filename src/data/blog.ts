import manifest from './blog-manifest.json'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/**
 * Blog content — Figma nodes 2168:70558 (index) and 2168:70798 (post).
 * Posts come from the CMS: `scripts/fetch-content.ts` writes blog-manifest.json
 * before every build, so publishing is a CMS action, not a code change.
 */

export interface PostCategory {
  name: string
  slug: string
}

export interface TocEntry {
  /** Anchor id of the element this entry scrolls to. */
  id: string
  label: string
}

export interface BlogPost {
  slug: string
  title: string
  /** Card excerpt on the index — truncated to one line by the card itself. */
  excerpt: string
  metaDescription: string
  author: string
  /** Display date, e.g. "August 1st, 2026". */
  date: string
  /** Machine date used for <time> and relative "posted x ago" labels. */
  isoDate: string
  readTime: string
  image: string
  imageAlt: string
  categories: PostCategory[]
  toc: TocEntry[]
  content: SerializedEditorState
}

export interface PressArticle {
  title: string
  /** The publisher's URL. Newsroom cards link out; we never host these. */
  url: string
  publication: string
  kind: 'contributed' | 'featured' | 'mention'
  excerpt: string
  readTime: string
  image: string
  imageAlt: string
  date: string
  isoDate: string
}

interface Manifest {
  posts: BlogPost[]
  press: PressArticle[]
}

const content = manifest as unknown as Manifest

export const POSTS: BlogPost[] = content.posts ?? []
export const PRESS: PressArticle[] = content.press ?? []

export function getPost(slug: string | undefined): BlogPost | undefined {
  return POSTS.find((post) => post.slug === slug)
}

/**
 * "Posted 4 days ago" in the design is static mock data. Deriving it from the
 * publish date keeps the label honest as a post ages.
 */
export function postedAgo(isoDate: string, now: Date = new Date()): string {
  const published = new Date(`${isoDate}T00:00:00Z`)
  const minutes = Math.floor((now.getTime() - published.getTime()) / 60000)

  if (minutes < 1) return 'Posted just now'
  if (minutes < 60) return `Posted ${minutes} min${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Posted ${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `Posted ${days} day${days === 1 ? '' : 's'} ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `Posted ${months} month${months === 1 ? '' : 's'} ago`

  const years = Math.floor(months / 12)
  return `Posted ${years} year${years === 1 ? '' : 's'} ago`
}
