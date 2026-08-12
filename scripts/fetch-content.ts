import { writeFileSync } from 'node:fs'

/**
 * Pulls published posts from the CMS into a manifest the build reads.
 *
 * Runs before every build. It throws rather than writing an empty manifest:
 * a green deploy that silently dropped every post is worse than a red build,
 * because nothing would alert anyone until someone noticed the blog was bare.
 */

const CMS_URL = process.env.VITE_CMS_URL
if (!CMS_URL) {
  throw new Error('VITE_CMS_URL is not set — refusing to build without content')
}

/** Words per minute used to estimate read time. */
const WORDS_PER_MINUTE = 200

interface LexicalNode {
  type?: string
  tag?: string
  text?: string
  children?: LexicalNode[]
}

function textOf(node: LexicalNode): string {
  if (typeof node.text === 'string') return node.text
  return (node.children ?? []).map(textOf).join(' ')
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Matches the Figma design's "August 1st, 2026" rather than Intl's
 *  "1 August 2026", which has no ordinal suffix. */
function formatDate(date: Date): string {
  const day = date.getUTCDate()
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th'
  const month = date.toLocaleDateString('en-GB', { month: 'long', timeZone: 'UTC' })
  return `${month} ${day}${suffix}, ${date.getUTCFullYear()}`
}

/** The "In this article" sidebar is derived from the headings in the body,
 *  so it can never drift from the article the way a hand-authored list can. */
function headingsOf(node: LexicalNode, found: Array<{ id: string; label: string }> = []) {
  if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
    const label = textOf(node).trim()
    if (label) found.push({ id: slugify(label), label })
  }
  for (const child of node.children ?? []) headingsOf(child, found)
  return found
}

const query = new URLSearchParams({
  'where[_status][equals]': 'published',
  depth: '2',
  limit: '200',
  sort: '-publishedAt',
})

const response = await fetch(`${CMS_URL}/api/posts?${query}`)
if (!response.ok) {
  throw new Error(`CMS returned ${response.status} — refusing to build a site with no blog`)
}

const { docs } = (await response.json()) as { docs: Record<string, any>[] }

if (!Array.isArray(docs) || docs.length === 0) {
  throw new Error('CMS returned zero published posts — refusing to build an empty blog')
}

const posts = docs.map((doc) => {
  const root: LexicalNode = doc.content?.root ?? {}
  const words = textOf(root).split(/\s+/).filter(Boolean).length
  const published = new Date(doc.publishedAt)

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    metaDescription: doc.metaDescription,
    author: doc.author?.name ?? '',
    date: formatDate(published),
    isoDate: published.toISOString().slice(0, 10),
    readTime: `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} mins read`,
    // Absolute so the prerenderer and social crawlers can both resolve it.
    image: new URL(doc.coverImage.url, CMS_URL).href,
    imageAlt: doc.coverImage.alt ?? '',
    categories: Array.isArray(doc.categories)
      ? doc.categories
          .map((category: { name?: string; slug?: string }) => ({
            name: category?.name ?? '',
            slug: category?.slug ?? '',
          }))
          .filter((category: { slug: string }) => category.slug !== '')
      : [],
    toc: headingsOf(root),
    content: doc.content,
  }
})

writeFileSync('src/data/blog-manifest.json', `${JSON.stringify(posts, null, 2)}\n`)
console.log(`Fetched ${posts.length} published post(s) from the CMS.`)
