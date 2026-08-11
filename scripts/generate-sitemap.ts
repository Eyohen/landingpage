import { writeFileSync } from 'node:fs'
import { POSTS } from '../src/data/blog'

/**
 * Generates dist/sitemap.xml.
 *
 * This replaces a hand-maintained public/sitemap.xml, which drifted out of
 * date whenever pages changed and needed a dedicated commit to refresh every
 * lastmod by hand.
 */

const ORIGIN = 'https://stablezact.com'
const today = new Date().toISOString().slice(0, 10)

const staticPages: Array<{ path: string; priority: string }> = [
  { path: '/', priority: '1.0' },
  { path: '/solutions/payment-providers', priority: '0.9' },
  { path: '/solutions/enterprise-merchants', priority: '0.9' },
  { path: '/solutions/e-commerce', priority: '0.9' },
  { path: '/solutions/travel', priority: '0.9' },
  { path: '/solutions/retail-pos', priority: '0.9' },
  { path: '/about', priority: '0.8' },
  { path: '/blog', priority: '0.8' },
  { path: '/book-a-demo', priority: '0.8' },
  { path: '/talk-to-sales', priority: '0.8' },
  { path: '/contact-us', priority: '0.8' },
  { path: '/request-crypto-checkout', priority: '0.7' },
  { path: '/contact', priority: '0.5' },
  { path: '/privacy', priority: '0.3' },
  { path: '/terms', priority: '0.3' },
  { path: '/cookies', priority: '0.3' },
]

const entries = [
  ...staticPages.map((page) => ({
    loc: `${ORIGIN}${page.path}`,
    lastmod: today,
    priority: page.priority,
  })),
  // A post's lastmod is its own publish date, not the build date — otherwise
  // every deploy would claim all posts had changed.
  ...POSTS.map((post) => ({
    loc: `${ORIGIN}/blog/${post.slug}`,
    lastmod: post.isoDate,
    priority: '0.7',
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod><priority>${entry.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync('dist/sitemap.xml', xml)
console.log(`Sitemap written with ${entries.length} URLs.`)
