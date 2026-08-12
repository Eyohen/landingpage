import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { preview } from 'vite'
import { chromium } from 'playwright'
import { POSTS } from '../src/data/blog'

/**
 * Snapshots every route to static HTML after `vite build`.
 *
 * The site is a client-rendered SPA, so without this the server returns an
 * empty shell: search engines have to execute JavaScript to see anything, and
 * the social crawlers used by X, LinkedIn, Slack and WhatsApp — which never run
 * JavaScript — see no title, description or image at all.
 *
 * The app mounts with `createRoot`, not `hydrateRoot`, so React replaces this
 * snapshot on load rather than hydrating it. The snapshot exists for crawlers
 * and first paint; there is no hydration mismatch to reconcile.
 */

// Vercel's build image has no browser and no way to install its system
// dependencies without root, so prerendering cannot run there. Those projects
// serve the staging review URL, where the SPA fallback renders every page
// client-side; production runs on Azure, which does prerender. Skipping is
// announced loudly rather than silently degrading.
if (process.env.VERCEL) {
  console.log('VERCEL detected — skipping prerender. Pages will render client-side only.')
  process.exit(0)
}

const ROUTES = [
  '/',
  '/about',
  '/blog',
  ...POSTS.map((post) => `/blog/${post.slug}`),
  '/solutions/payment-providers',
  '/solutions/enterprise-merchants',
  '/solutions/e-commerce',
  '/solutions/travel',
  '/solutions/retail-pos',
  '/book-a-demo',
  '/talk-to-sales',
  '/contact-us',
  '/request-crypto-checkout',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
]

const PORT = 4173

const server = await preview({
  preview: { port: PORT, strictPort: true },
  logLevel: 'error',
})

const origin = `http://localhost:${PORT}`
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })

// Never let the build touch the network. Beyond keeping builds fast and
// offline-safe, this stops CI from firing real Google Analytics and Clarity
// hits into the production property every time the site is deployed.
const cmsOrigin = process.env.CMS_URL ?? ''
await context.route('**', (route) => {
  const url = route.request().url()
  // Cover images come from the CMS, so that origin has to be reachable.
  // Analytics hosts stay blocked either way.
  const allowed = url.startsWith(origin) || (cmsOrigin !== '' && url.startsWith(cmsOrigin))
  return allowed ? route.continue() : route.abort()
})

const captured = new Map<string, string>()

// Any unmatched path renders the NotFound page; captured separately so Azure
// can serve a real 404 instead of falling back to the prerendered landing
// page, which would let crawlers index every bad URL as a homepage duplicate.
const NOT_FOUND_PROBE = '/__prerender_not_found__'

for (const route of [...ROUTES, NOT_FOUND_PROBE]) {
  const page = await context.newPage()
  await page.goto(`${origin}${route}`, { waitUntil: 'load' })
  await page.waitForSelector('#root > *', { timeout: 15_000 })

  // Page content is wrapped in `Reveal`, which animates up from opacity: 0 when
  // scrolled into view. Without a full scroll pass first, most of the page gets
  // captured while still invisible.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let y = 0
        const step = () => {
          y += window.innerHeight
          window.scrollTo(0, y)
          if (y < document.body.scrollHeight) {
            requestAnimationFrame(step)
          } else {
            window.scrollTo(0, 0)
            resolve()
          }
        }
        step()
      }),
  )
  await page.waitForTimeout(500)

  // Vite injects <link rel="modulepreload"> hints for lazy chunks at runtime,
  // and they serialise with this server's absolute origin. Left in place they
  // point browsers at localhost in production, so make them root-relative.
  const html = (await page.content()).replaceAll(origin, '')

  captured.set(route, html)
  await page.close()
  console.log(`  prerendered ${route}`)
}

await browser.close()
await server.close()

// Written only after every page is captured — the pages are served from the
// same dist/ directory being written into.
for (const [route, html] of captured) {
  if (route === NOT_FOUND_PROBE) {
    writeFileSync(path.join('dist', '404.html'), html)
    continue
  }
  const dir = route === '/' ? 'dist' : path.join('dist', route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, 'index.html'), html)
}

console.log(`Wrote ${captured.size - 1} prerendered pages plus 404.html.`)
