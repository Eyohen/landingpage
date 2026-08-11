# Blog Phase 1: Prerendering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve every page — especially each blog post — as static HTML carrying its own title, description and Open Graph tags, so search engines index them and social crawlers render correct link previews.

**Architecture:** Keep the app exactly as it is and add a post-build step: after `vite build`, serve `dist/` and visit every route in headless Chromium, saving the rendered DOM as that route's `index.html`. Crawlers then receive real content and real meta tags. Page-view tracking is extracted from `usePageMeta` first so metadata work cannot silently break GA reporting.

**Tech Stack:** Vite 8, React 19, react-router-dom 7, TypeScript 6, Tailwind 4, Playwright (prerender), vite-node, Vitest + Testing Library (new), Azure Static Web Apps.

## Global Constraints

- Node/React versions are fixed by the repo: React `^19.2.7`, react-router-dom `^7.18.1`, Vite `^8.1.0`, TypeScript `~6.0.2`. Do not upgrade or downgrade any of them to make a tool fit.
- `npm run build` must continue to run `tsc -b` before bundling. Typecheck failures block the build.
- `npm run lint` (oxlint) must pass with no new findings.
- Every existing route must still render identically. This phase changes how HTML is produced, not what any page looks like.
- The prerendered HTML for a blog post MUST contain that post's `<title>` and `og:title`. This is the entire point of the phase; a build that loses it is a failed build.
- Blog content stays in `src/data/blog.ts` for this phase. The CMS arrives in Phase 2 — do not add fetching, network calls, or CMS types here.
- Commit after every task. Work on the `staging` branch.

---

## File Structure

**Created:**
- `vitest.config.ts` — test runner config, jsdom environment, `@` alias
- `src/test/setup.ts` — Testing Library cleanup between tests
- `src/lib/analytics.test.ts` — covers the page-view dedupe guard
- `src/data/blog.test.ts` — covers `postedAgo`
- `src/lib/usePageView.ts` — the extracted page-view hook
- `scripts/generate-sitemap.ts` — writes `dist/sitemap.xml` from a static page list plus `POSTS`
- `scripts/prerender.ts` — snapshots every route to static HTML with headless Chromium
- `scripts/assert-prerendered.ts` — post-build check that HTML contains real metadata

**Modified:**
- `package.json` — test scripts; `postbuild` chain
- `src/lib/usePageMeta.ts` — delegates page-view tracking to `usePageView`
- `src/lib/usePageMeta.ts`, `src/pages/BlogPost.tsx` — per-post Open Graph image
- `public/staticwebapp.config.json` — verified against prerendered output

**Deleted:**
- `public/sitemap.xml` — replaced by the generated file

---

### Task 1: Add test infrastructure

No test runner exists in this repo. This task adds one and proves it works against a pure function that already exists.

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/data/blog.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `postedAgo(isoDate: string, now?: Date): string` from `src/data/blog.ts` (already implemented).
- Produces: `npm test` runs the suite. Later tasks add files matching `src/**/*.test.ts`.

- [ ] **Step 1: Install dependencies**

```bash
npm i -D vitest jsdom @testing-library/react @testing-library/dom
```

Do not pin a major version — let npm resolve one compatible with the pinned Vite 8. If the install reports a peer-dependency conflict, STOP and report it rather than passing `--force` or `--legacy-peer-deps`.

- [ ] **Step 2: Create the Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
```

- [ ] **Step 3: Create the test setup file**

Create `src/test/setup.ts`:

```ts
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
```

- [ ] **Step 4: Add the test scripts**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write the failing test**

Create `src/data/blog.test.ts`:

```ts
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
```

- [ ] **Step 6: Run the tests**

Run: `npm test`
Expected: 4 tests PASS. If any fail, the assertion is wrong about existing behaviour — read `postedAgo` in `src/data/blog.ts` and correct the test, not the function. This task must not change production code.

- [ ] **Step 7: Commit**

```bash
git add vitest.config.ts src/test/setup.ts src/data/blog.test.ts package.json package-lock.json
git commit -m "Add Vitest test infrastructure with postedAgo coverage"
```

---

### Task 2: Extract page-view tracking into its own hook

`trackPageView` is currently called inside `usePageMeta`, so any page that stops using that hook silently stops reporting page views to GA. Extracting it into its own hook removes that trap before the metadata work starts.

**Files:**
- Create: `src/lib/analytics.test.ts`
- Create: `src/lib/usePageView.ts`
- Modify: `src/lib/usePageMeta.ts`

**Interfaces:**
- Consumes: `trackPageView(path: string, title: string): void` from `src/lib/analytics.ts` (already implemented, dedupes by path, seeded from the entry URL).
- Produces: `usePageView(title: string): void` from `src/lib/usePageView.ts` — fires a GA page_view for the current pathname whenever the pathname or title changes. `usePageMeta` calls it internally, so existing pages are unaffected; any page that sets metadata another way calls it directly.

- [ ] **Step 1: Write the failing test for the dedupe guard**

Create `src/lib/analytics.test.ts`:

```ts
import { beforeEach, describe, expect, it, vi } from 'vitest'

async function freshAnalytics() {
  vi.resetModules()
  window.dataLayer = []
  return import('@/lib/analytics')
}

function pageViews() {
  return (window.dataLayer ?? []).filter(
    (entry) => Array.isArray(entry) && entry[0] === 'event' && entry[1] === 'page_view',
  )
}

describe('trackPageView', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
  })

  it('does not re-report the entry URL, which index.html already sent', async () => {
    const { trackPageView } = await freshAnalytics()
    trackPageView('/', 'Home')
    expect(pageViews()).toHaveLength(0)
  })

  it('reports a navigation to a different path', async () => {
    const { trackPageView } = await freshAnalytics()
    trackPageView('/blog', 'Blog | Stablezact')
    const views = pageViews()
    expect(views).toHaveLength(1)
    expect(views[0][2]).toMatchObject({ page_path: '/blog', page_title: 'Blog | Stablezact' })
  })

  it('collapses repeated calls for the same path into one hit', async () => {
    const { trackPageView } = await freshAnalytics()
    trackPageView('/blog', 'Blog | Stablezact')
    trackPageView('/blog', 'Blog | Stablezact')
    expect(pageViews()).toHaveLength(1)
  })
})
```

- [ ] **Step 2: Run the test to verify it passes against current behaviour**

Run: `npm test -- analytics`
Expected: 3 PASS. These lock in behaviour that already exists, so the refactor in the next steps cannot break it.

- [ ] **Step 3: Create the hook**

Create `src/lib/usePageView.ts`:

```ts
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '@/lib/analytics'

/**
 * Reports a GA page_view for the current route. Pages that set their metadata
 * with `usePageMeta` get this for free; pages that use `<Head>` for
 * prerendered metadata must call it themselves.
 */
export function usePageView(title: string): void {
  const { pathname } = useLocation()

  useEffect(() => {
    trackPageView(pathname, title)
  }, [pathname, title])
}
```

- [ ] **Step 4: Delegate from usePageMeta**

In `src/lib/usePageMeta.ts`, remove the `trackPageView` import and the `trackPageView(pathname, title)` call inside the effect. Add at the top of the `usePageMeta` function body, before its `useEffect`:

```ts
usePageView(title)
```

and import it:

```ts
import { usePageView } from '@/lib/usePageView'
```

- [ ] **Step 5: Verify nothing regressed**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: all tests PASS, no type errors, no lint findings.

- [ ] **Step 6: Verify in the browser**

Run `npm run dev`, open the site, navigate from `/` to `/blog` and into the post. In the console, run:

```js
window.dataLayer.filter(e => e[0] === 'event' && e[1] === 'page_view')
```

Expected: exactly one entry per navigation, each with the correct `page_path` and the destination page's `page_title` — not the previous page's.

- [ ] **Step 7: Commit**

```bash
git add src/lib/usePageView.ts src/lib/usePageMeta.ts src/lib/analytics.test.ts
git commit -m "Extract page-view tracking into usePageView hook"
```

---

### Task 3: Prerender routes with headless Chromium

**Revised 2026-08-11.** The original plan used `vite-react-ssg`. Its latest release (0.9.2)
declares `react-router-dom ^6.14.1`, and this repo pins 7.18.1, so it cannot be installed
without forcing peer resolution. React 19 and Vite 8 were both fine — the router was the
blocker. Rather than adopt a far younger library or downgrade the router, we snapshot the
built SPA with headless Chromium after the normal Vite build.

This keeps `src/App.tsx`, `src/main.tsx` and `usePageMeta` exactly as they are. Because the
app mounts with `createRoot` (not `hydrateRoot`), React replaces the snapshot on load rather
than hydrating it, so there are no hydration-mismatch concerns: the snapshot exists for
crawlers and first paint.

**Files:**
- Create: `scripts/prerender.ts`
- Modify: `package.json`
- Modify: `.github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml`

**Interfaces:**
- Consumes: `POSTS` from `src/data/blog.ts`.
- Produces: `dist/<route>/index.html` for every route listed in `ROUTES`.

- [ ] **Step 1: Install Playwright**

```bash
npm i -D playwright
npx playwright install chromium
```

- [ ] **Step 2: Write the prerender script**

Create `scripts/prerender.ts`. Three details matter and must not be dropped:

- **Block every non-local request.** Otherwise the build waits on Google Fonts and, worse,
  fires real GA and Clarity hits from CI into your production analytics property.
- **Scroll the full page before capturing.** Content is wrapped in `Reveal`, which animates
  from `opacity: 0` when scrolled into view. Capturing without scrolling bakes
  `opacity: 0` into the HTML for most of the page.
- **Capture every route before writing any file**, since the pages are being served from the
  same `dist/` directory we are writing into.

```ts
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { preview } from 'vite'
import { chromium } from 'playwright'
import { POSTS } from '../src/data/blog'

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

// Never let the build touch the network: no font fetches, no analytics hits from CI.
await context.route('**', (route) => {
  if (route.request().url().startsWith(origin)) return route.continue()
  return route.abort()
})

const captured = new Map<string, string>()

for (const route of ROUTES) {
  const page = await context.newPage()
  await page.goto(`${origin}${route}`, { waitUntil: 'load' })
  await page.waitForSelector('#root > *', { timeout: 15_000 })

  // Trigger every whileInView reveal so nothing is captured at opacity: 0.
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
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
    })
  })
  await page.waitForTimeout(500)

  captured.set(route, await page.content())
  await page.close()
  console.log(`prerendered ${route}`)
}

await browser.close()
await server.close()

for (const [route, html] of captured) {
  const dir = route === '/' ? 'dist' : path.join('dist', route)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, 'index.html'), html)
}

console.log(`Wrote ${captured.size} prerendered pages.`)
```

- [ ] **Step 3: Wire it into the build**

Install the Vite-aware runner (`src/data/blog.ts` imports a `.jpg` and uses the `@` alias, so
plain `node` and `tsx` both fail on it):

```bash
npm i -D vite-node
```

In `package.json` scripts:

```json
"postbuild": "vite-node scripts/prerender.ts"
```

- [ ] **Step 4: Build and confirm the files exist**

Run: `npm run build`
Then: `find dist -name "index.html" | sort`

Expected: 18 files, including `dist/index.html`, `dist/about/index.html`,
`dist/blog/index.html` and `dist/blog/how-to-stay-safe-with-crypto/index.html`.

- [ ] **Step 5: Confirm real content, not an empty shell**

```bash
grep -c "How to Stay Safe with Crypto" dist/blog/how-to-stay-safe-with-crypto/index.html
grep -c "Common scam methods" dist/blog/how-to-stay-safe-with-crypto/index.html
```

Expected: both non-zero.

- [ ] **Step 6: Confirm nothing was captured invisible**

```bash
grep -c 'opacity:0' dist/blog/how-to-stay-safe-with-crypto/index.html || true
```

Expected: 0. A non-zero count means the scroll pass did not finish before capture — raise the
wait in Step 2 rather than accepting it, because content baked at `opacity: 0` is content a
crawler may discount.

- [ ] **Step 7: Confirm the metadata came through**

```bash
grep -o "<title>[^<]*</title>" dist/blog/how-to-stay-safe-with-crypto/index.html
```

Expected: the post's own title, not the landing page default. This works because a real
browser ran `usePageMeta` before the snapshot was taken.

- [ ] **Step 8: Install Chromium in CI**

In `.github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml`, the Azure action runs
the build itself, so Chromium must be present before it does. Add this step to
`build_and_deploy_job`, immediately after `actions/checkout` and before `Build And Deploy`:

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - name: Install dependencies and Chromium
        run: |
          npm ci
          npx playwright install --with-deps chromium
```

- [ ] **Step 9: Verify the app still runs**

Run `npm run dev`, click through `/`, `/about`, `/blog`, the post and a solutions page.
Expected: no console errors, and the landing page's smooth scroll still works. This task
changes only what happens after a build, so nothing here should differ.

- [ ] **Step 10: Commit**

```bash
git add scripts/prerender.ts package.json package-lock.json .github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml
git commit -m "Prerender routes to static HTML with headless Chromium"
```

---

### Task 4: Add per-post social images

`usePageMeta` sets title, description, canonical, `og:title`, `og:description` and `og:url`,
but never `og:image`. Every blog post therefore shares the site-wide OG image, so a post
shared on X or LinkedIn shows a generic graphic instead of its cover photo.

**Files:**
- Modify: `src/lib/usePageMeta.ts`
- Modify: `src/pages/BlogPost.tsx`

**Interfaces:**
- Produces: `usePageMeta(title: string, description?: string, options?: { image?: string; type?: string })`.
  Existing two-argument callers are unaffected.

- [ ] **Step 1: Extend the hook**

In `src/lib/usePageMeta.ts`, change the signature to accept an options object and, inside the
effect, set `og:image`, `twitter:image` and `og:type` when `options.image` / `options.type`
are provided — restoring the previous values on unmount exactly as the existing tags do.
Use the existing `upsertMeta` helper for tags that may not exist in `index.html`.

- [ ] **Step 2: Pass the post's cover image**

In `src/pages/BlogPost.tsx`, inside `Article`, change the call to:

```tsx
usePageMeta(`${post.title} | Stablezact`, post.metaDescription, {
  image: `https://stablezact.com${post.image}`,
  type: 'article',
})
```

`post.image` is a Vite-resolved asset path beginning with `/assets/…` in a build, so
prefixing the origin yields the absolute URL social crawlers require.

- [ ] **Step 3: Verify in the built HTML**

Run: `npm run build`
Then:

```bash
grep -o 'og:image" content="[^"]*"' dist/blog/how-to-stay-safe-with-crypto/index.html
grep -o 'og:type" content="[^"]*"' dist/blog/how-to-stay-safe-with-crypto/index.html
```

Expected: an absolute `https://stablezact.com/assets/crypto-safety-*.jpg` URL, and `article`.

- [ ] **Step 4: Verify the landing page is unaffected**

```bash
grep -o 'og:image" content="[^"]*"' dist/index.html
```

Expected: the original `https://stablezact.com/og-image.png`. Restoring on unmount must not
leak the post image onto other pages.

- [ ] **Step 5: Run the full check**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/lib/usePageMeta.ts src/pages/BlogPost.tsx
git commit -m "Set per-post Open Graph image and article type"
```

---

### Task 5: Guard prerendering with an automated build check

Steps 3 and 7 of earlier tasks checked the HTML by hand. A regression here is invisible in a browser and fatal to the goal, so it needs an automated check that runs on every build.

**Files:**
- Create: `scripts/assert-prerendered.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: the `dist/` output of `npm run build`.
- Produces: a `postbuild` script that exits non-zero when prerendering degrades.

- [ ] **Step 1: Write the check**

Create `scripts/assert-prerendered.ts`:

```ts
import { readFileSync } from 'node:fs'
import { POSTS } from '../src/data/blog'

interface Check {
  file: string
  mustContain: string[]
}

const checks: Check[] = POSTS.map((post) => ({
  file: `dist/blog/${post.slug}/index.html`,
  mustContain: [
    `<title>${post.title} | Stablezact</title>`,
    `og:title" content="${post.title} | Stablezact"`,
    post.title,
  ],
}))

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
}

if (failures.length > 0) {
  console.error('Prerender check FAILED:')
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`Prerender check passed for ${checks.length} post(s).`)
```

- [ ] **Step 2: Wire it into the build**

Install the runner:

```bash
npm i -D vite-node
```

In `package.json` scripts:

```json
"postbuild": "vite-node scripts/assert-prerendered.ts"
```

**Use `vite-node`, not `tsx` or plain `node`.** `src/data/blog.ts` imports a `.jpg`
(`import cryptoSafety from '@/assets/figma/blog/crypto-safety.jpg'`) and uses the `@` alias.
Only a Vite-aware runner resolves those; `tsx` fails on the image import.

- [ ] **Step 3: Verify it passes on a good build**

Run: `npm run build`
Expected: build succeeds and prints `Prerender check passed for 1 post(s).`

- [ ] **Step 4: Verify it actually catches a regression**

Temporarily break it on purpose:

```bash
echo "<html></html>" > dist/blog/how-to-stay-safe-with-crypto/index.html
npx vite-node scripts/assert-prerendered.ts; echo "exit=$?"
```

Expected: it prints the missing strings and `exit=1`. A check that cannot fail is worthless — confirm this before moving on. Then restore with `npm run build`.

- [ ] **Step 5: Commit**

```bash
git add scripts/assert-prerendered.ts package.json package-lock.json
git commit -m "Fail the build when post metadata is missing from prerendered HTML"
```

---

### Task 6: Generate the sitemap at build time

`public/sitemap.xml` is hand-maintained and has already gone stale once, needing a dedicated commit to refresh 15 `lastmod` dates. Generate it from the route list instead.

**Files:**
- Create: `scripts/generate-sitemap.ts`
- Delete: `public/sitemap.xml`
- Modify: `package.json`

**Interfaces:**
- Consumes: `POSTS` from `src/data/blog.ts`.
- Produces: `dist/sitemap.xml`.

- [ ] **Step 1: Write the generator**

Create `scripts/generate-sitemap.ts`:

```ts
import { writeFileSync } from 'node:fs'
import { POSTS } from '../src/data/blog'

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
    (e) =>
      `  <url><loc>${e.loc}</loc><lastmod>${e.lastmod}</lastmod><priority>${e.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync('dist/sitemap.xml', xml)
console.log(`Sitemap written with ${entries.length} URLs.`)
```

A post's `lastmod` uses its own `isoDate` rather than the build date, so republishing the site does not falsely claim every post changed.

- [ ] **Step 2: Remove the hand-maintained file**

```bash
git rm public/sitemap.xml
```

- [ ] **Step 3: Chain it into postbuild**

In `package.json`, change `postbuild` to run both checks:

```json
"postbuild": "vite-node scripts/generate-sitemap.ts && vite-node scripts/assert-prerendered.ts"
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Then: `cat dist/sitemap.xml`

Expected: 17 `<url>` entries — the 16 static pages plus the one post at `/blog/how-to-stay-safe-with-crypto` with `lastmod` `2026-08-01`. Confirm no URL contains `/newsroom`.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-sitemap.ts package.json
git commit -m "Generate sitemap.xml at build time instead of by hand"
```

---

### Task 7: Verify Azure serves the prerendered files

The spec flags one unverified assumption: that Azure Static Web Apps serves `/blog/my-post` from `dist/blog/my-post/index.html` rather than falling through `navigationFallback` to the SPA shell. If it falls through, every check so far still passes locally while crawlers receive the wrong page — the exact failure this phase exists to prevent. This must be confirmed on a real deployment.

**Files:**
- Modify: `public/staticwebapp.config.json` (only if the check below fails)

- [ ] **Step 1: Push and open a preview environment**

```bash
git push origin staging
gh pr create --base main --head staging --title "Blog: prerendered pages" --body "Phase 1: prerendering, generated sitemap, page-view hook extraction."
```

Pushing to `staging` alone deploys nothing — only a PR targeting `main` builds an Azure preview environment. Wait for the "Build and Deploy Job" check to pass, then take the preview URL from the PR comment.

- [ ] **Step 2: Check what the server actually returns**

Substitute the preview URL:

```bash
curl -s "<PREVIEW_URL>/blog/how-to-stay-safe-with-crypto" | grep -o "<title>[^<]*</title>"
```

Expected: the post's title. **If it returns the landing page title, the SPA fallback is winning** — the prerendered file is not being served.

- [ ] **Step 3: If it fell through, restrict the fallback**

Only if Step 2 failed. Update `public/staticwebapp.config.json` so the fallback cannot swallow prerendered directories:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": [
      "/assets/*",
      "/blog/*",
      "/*.{js,css,json,xml,txt,map,ico,png,jpg,jpeg,gif,svg,webp,avif,woff,woff2,ttf,eot}"
    ]
  }
}
```

Rebuild, push, and repeat Step 2 until it returns the post's title.

- [ ] **Step 4: Confirm the social preview**

Run against the preview URL:

```bash
curl -s "<PREVIEW_URL>/blog/how-to-stay-safe-with-crypto" | grep -o 'og:title" content="[^"]*"'
```

Expected: the post's own `og:title`. This is the single check that proves the phase achieved its goal.

- [ ] **Step 5: Confirm deep links and 404s still behave**

Visit `<PREVIEW_URL>/about` and `<PREVIEW_URL>/definitely-not-a-page` directly. Expected: About renders; the unknown path renders the 404 page. Note that unknown paths are now rewritten to a prerendered landing page shell rather than an empty one, so watch for a flash of landing content before the 404 appears. If it is visible, report it — the fix is a dedicated 404 rewrite, which is out of scope for this task.

- [ ] **Step 6: Commit any config change**

```bash
git add public/staticwebapp.config.json
git commit -m "Exclude prerendered blog paths from the SPA navigation fallback"
git push origin staging
```

---

## Done when

- Every route builds to its own HTML file with real content.
- `curl` against a deployed preview returns each post's own `<title>` and `og:title`.
- `npm run build` fails if that ever stops being true.
- `sitemap.xml` is generated, not hand-edited.
- Page views still fire once per navigation with the correct title.
- No visual change to any page.
