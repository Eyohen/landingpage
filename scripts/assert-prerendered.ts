import { readFileSync } from 'node:fs'
import { POSTS } from '../src/data/blog'

/**
 * Fails the build when a prerendered page has lost its real content or
 * metadata.
 *
 * This regression is invisible by eye: the site looks perfect in a browser
 * either way, because the SPA renders it client-side. Only a crawler would
 * notice, and by then the post is already published and not ranking.
 */

interface Check {
  file: string
  mustContain: string[]
}

const checks: Check[] = [
  ...POSTS.map((post) => ({
    file: `dist/blog/${post.slug}/index.html`,
    mustContain: [
      `<title>${post.title} | Stablezact</title>`,
      `og:title" content="${post.title} | Stablezact"`,
      `og:type" content="article"`,
      post.title,
    ],
  })),
  {
    file: 'dist/blog/index.html',
    mustContain: ['<title>Blog | Stablezact</title>', 'Explore the latest news'],
  },
  {
    file: 'dist/index.html',
    mustContain: ['og:image" content="https://stablezact.com/og-image.png"'],
  },
  // Serves genuine 404s. Without it, Azure has no fallback document and every
  // unknown URL would return a bare server error page.
  {
    file: 'dist/404.html',
    mustContain: ['name="robots" content="noindex"'],
  },
]

const failures: string[] = []

for (const check of checks) {
  let html: string
  try {
    html = readFileSync(check.file, 'utf8')
  } catch {
    failures.push(`${check.file} was not generated`)
    continue
  }

  for (const needle of check.mustContain) {
    if (!html.includes(needle)) {
      failures.push(`${check.file} is missing: ${needle}`)
    }
  }

  if (html.includes('opacity:0')) {
    failures.push(`${check.file} captured content still animating in (opacity:0)`)
  }
}

if (failures.length > 0) {
  console.error('Prerender check FAILED:')
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`Prerender check passed across ${checks.length} pages.`)
