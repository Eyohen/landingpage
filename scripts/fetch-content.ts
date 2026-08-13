import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Pulls published posts from the CMS into a manifest the build reads.
 *
 * Runs before every build. It throws rather than writing an empty manifest:
 * a green deploy that silently dropped every post is worse than a red build,
 * because nothing would alert anyone until someone noticed the blog was bare.
 */

const MANIFEST = 'src/data/blog-manifest.json'
const CMS_URL = process.env.VITE_CMS_URL

/**
 * With no CMS configured, build from the committed manifest — the last content
 * fetched from a real CMS, kept in git. That keeps CI and preview builds
 * working without a reachable CMS, while still refusing to build from nothing.
 */
if (!CMS_URL) {
  if (!existsSync(MANIFEST)) {
    throw new Error(
      `VITE_CMS_URL is not set and ${MANIFEST} is missing — refusing to build without content`,
    )
  }
  const committed = JSON.parse(readFileSync(MANIFEST, 'utf8')) as { posts?: unknown[] }
  if (!Array.isArray(committed.posts) || committed.posts.length === 0) {
    throw new Error(`${MANIFEST} contains no posts — refusing to build an empty blog`)
  }
  console.log(
    `No VITE_CMS_URL set — building from the committed manifest (${committed.posts.length} post(s)).`,
  )
  process.exit(0)
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
  // Top-level sections only. Long-form pieces carry many h3 subsections, and
  // including them turns the sidebar into a second table of contents.
  if (node.type === 'heading' && node.tag === 'h2') {
    const label = textOf(node).trim()
    if (label) found.push({ id: slugify(label), label })
  }
  for (const child of node.children ?? []) headingsOf(child, found)
  return found
}

/**
 * Media is copied into the site rather than hot-linked from the CMS.
 *
 * Three reasons: the committed manifest stays self-contained so a build needs
 * no CMS at all; images are served same-origin instead of from a second host;
 * and a CMS outage cannot break images on a site that is already deployed.
 */
const MEDIA_DIR = 'public/blog-media'

async function localiseMedia(url: string | undefined): Promise<string> {
  if (!url) return ''
  const absolute = new URL(url, CMS_URL).href
  const name = path.basename(new URL(absolute).pathname)
  const target = path.join(MEDIA_DIR, name)

  if (!existsSync(target)) {
    const response = await fetch(absolute)
    if (!response.ok) {
      throw new Error(`Could not download ${absolute}: ${response.status}`)
    }
    mkdirSync(MEDIA_DIR, { recursive: true })
    writeFileSync(target, Buffer.from(await response.arrayBuffer()))
    console.log(`  downloaded ${name}`)
  }

  return `/blog-media/${name}`
}

/** Rewrites image URLs inside body blocks to their local copies. */
async function localiseBlocks(node: Record<string, any>): Promise<void> {
  if (node?.type === 'block' && node.fields?.blockType === 'imageBlock' && node.fields.image?.url) {
    node.fields.image.url = await localiseMedia(node.fields.image.url)
  }
  for (const child of node?.children ?? []) await localiseBlocks(child)
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

for (const doc of docs) await localiseBlocks(doc.content?.root ?? {})

const posts = await Promise.all(docs.map(async (doc) => {
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
    image: await localiseMedia(doc.coverImage?.url),
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
}))

const pressResponse = await fetch(
  `${CMS_URL}/api/press-articles?${new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '1',
    limit: '200',
    sort: '-publishedAt',
  })}`,
)
if (!pressResponse.ok) {
  throw new Error(`CMS returned ${pressResponse.status} for press articles`)
}

const { docs: pressDocs } = (await pressResponse.json()) as { docs: Record<string, any>[] }

const press = await Promise.all((pressDocs ?? []).map(async (doc) => {
  const published = new Date(doc.publishedAt)
  return {
    title: doc.title,
    url: doc.url,
    publication: doc.publication,
    kind: doc.kind,
    excerpt: doc.excerpt,
    readTime: doc.readTime ?? '',
    image: await localiseMedia(doc.image?.url),
    imageAlt: doc.image?.alt ?? '',
    date: formatDate(published),
    isoDate: published.toISOString().slice(0, 10),
  }
}))

writeFileSync(MANIFEST, `${JSON.stringify({ posts, press }, null, 2)}\n`)
console.log(
  `Fetched ${posts.length} published post(s) and ${press.length} press article(s) from the CMS.`,
)
