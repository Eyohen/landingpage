import { writeFileSync, mkdirSync } from 'node:fs'
import { POSTS } from '../src/data/blog'

/** Generates dist/blog/rss.xml from the same manifest the pages are built from. */

const ORIGIN = 'https://stablezact.com'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const items = POSTS.map((post) => {
  const url = `${ORIGIN}/blog/${post.slug}`
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(`${post.isoDate}T09:00:00Z`).toUTCString()}</pubDate>
    </item>`
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stablezact Blog</title>
    <link>${ORIGIN}/blog</link>
    <description>News, milestones, product updates, and stories shaping the future of crypto payments at Stablezact.</description>
    <language>en</language>
    <atom:link href="${ORIGIN}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

mkdirSync('dist/blog', { recursive: true })
writeFileSync('dist/blog/rss.xml', xml)
console.log(`RSS feed written with ${POSTS.length} item(s).`)
