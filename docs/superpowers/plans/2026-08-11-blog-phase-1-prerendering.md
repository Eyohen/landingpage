# Blog Phase 1: Prerendering Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve every page — especially each blog post — as static HTML carrying its own title, description and Open Graph tags, so search engines index them and social crawlers render correct link previews.

**Architecture:** Replace the client-only Vite SPA entry with `vite-react-ssg`, which renders each route to its own HTML file at build time and hydrates it in the browser. `src/App.tsx` changes from a `<BrowserRouter>` tree into an exported route array with a `Layout` route element; `src/main.tsx` exports a `ViteReactSSG` root. Blog pages emit metadata through `<Head>` so tags land in the built HTML instead of being applied by an effect. Page-view tracking is extracted from `usePageMeta` first, so pages moving to `<Head>` keep reporting to GA.

**Tech Stack:** Vite 8, React 19, react-router-dom 7, TypeScript 6, Tailwind 4, `vite-react-ssg`, Vitest + Testing Library (new), Azure Static Web Apps.

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
- `src/routes.tsx` — the exported route array and `Layout` (moved out of `App.tsx`)
- `scripts/generate-sitemap.ts` — writes `dist/sitemap.xml` from a static page list plus `POSTS`
- `scripts/assert-prerendered.ts` — post-build check that HTML contains real metadata

**Modified:**
- `vite.config.ts` — switch to `defineConfig` from `vitest/config`
- `package.json` — test scripts; build/dev switch to `vite-react-ssg`
- `src/main.tsx` — export a `ViteReactSSG` root
- `src/App.tsx` — reduced to re-exporting routes, or deleted if nothing imports it
- `src/lib/usePageMeta.ts` — delegates page-view tracking to `usePageView`
- `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` — metadata via `<Head>` + `usePageView`
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

`trackPageView` is currently called inside `usePageMeta`. Task 4 moves blog pages to `<Head>`, and if tracking stays welded to `usePageMeta` those pages will silently stop reporting page views to GA. Extract it first so the migration cannot cause that.

**Files:**
- Create: `src/lib/analytics.test.ts`
- Create: `src/lib/usePageView.ts`
- Modify: `src/lib/usePageMeta.ts`

**Interfaces:**
- Consumes: `trackPageView(path: string, title: string): void` from `src/lib/analytics.ts` (already implemented, dedupes by path, seeded from the entry URL).
- Produces: `usePageView(title: string): void` from `src/lib/usePageView.ts` — fires a GA page_view for the current pathname whenever the pathname or title changes. `usePageMeta` calls it internally; Task 4 calls it directly from pages that use `<Head>`.

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

### Task 3: Migrate to vite-react-ssg

The riskiest task. `vite-react-ssg` must work with React 19, Vite 8 and react-router-dom 7 as pinned. Verify before restructuring anything.

**Files:**
- Create: `src/routes.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx` (delete once nothing imports it)
- Modify: `package.json`

**Interfaces:**
- Produces: `export const routes: RouteRecord[]` from `src/routes.tsx`, consumed by `src/main.tsx`. Tasks 5 and 6 read `POSTS` from `src/data/blog.ts` directly, not this array.

- [ ] **Step 1: Install and verify compatibility**

```bash
npm i -D vite-react-ssg
npx vite-react-ssg --help
```

Expected: the CLI runs. **If installation fails on a peer-dependency conflict with React 19 or Vite 8, STOP and report it rather than forcing the install or changing pinned versions.** The fallback is `vite-plugin-react-ssg`; escalate the choice rather than deciding alone.

- [ ] **Step 2: Create the routes module**

Create `src/routes.tsx`, moving the tree out of `App.tsx`. `ScrollToTop` moves across unchanged.

```tsx
import { Suspense, lazy, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import type { RouteRecord } from 'vite-react-ssg'
import { CookieConsent } from '@/components/CookieConsent'
import { applyAnalyticsConsent } from '@/lib/analytics'
import { getConsent } from '@/lib/consent'
import { Landing } from '@/pages/Landing'
import { BookDemo } from '@/pages/BookDemo'
import { Contact } from '@/pages/Contact'
import { CookiePolicy } from '@/pages/CookiePolicy'
import { PrivacyPolicy } from '@/pages/PrivacyPolicy'
import { TermsOfUse } from '@/pages/TermsOfUse'
import { POSTS } from '@/data/blog'

function ScrollToTop() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [hash, pathname])

  return null
}

function Layout() {
  useEffect(() => {
    applyAnalyticsConsent(getConsent().analytics)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5]" />}>
        <Outlet />
      </Suspense>
      <CookieConsent />
    </div>
  )
}

const solutions = () => import('@/pages/solutions')

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/routes.tsx',
    children: [
      { index: true, element: <Landing />, entry: 'src/pages/Landing.tsx' },
      { path: 'book-a-demo', element: <BookDemo /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy', element: <PrivacyPolicy /> },
      { path: 'cookies', element: <CookiePolicy /> },
      { path: 'terms', element: <TermsOfUse /> },
      {
        path: 'solutions/payment-providers',
        lazy: async () => ({ Component: (await solutions()).PaymentProvidersPage }),
      },
      {
        path: 'solutions/enterprise-merchants',
        lazy: async () => ({ Component: (await solutions()).EnterpriseMerchantsPage }),
      },
      {
        path: 'solutions/e-commerce',
        lazy: async () => ({ Component: (await solutions()).ECommercePage }),
      },
      {
        path: 'solutions/travel',
        lazy: async () => ({ Component: (await solutions()).TravelPage }),
      },
      {
        path: 'solutions/retail-pos',
        lazy: async () => ({ Component: (await solutions()).RetailPosPage }),
      },
      {
        path: 'talk-to-sales',
        lazy: async () => ({ Component: (await import('@/pages/TalkToSales')).default }),
      },
      {
        path: 'contact-us',
        lazy: async () => ({ Component: (await import('@/pages/ContactUs')).default }),
      },
      {
        path: 'request-crypto-checkout',
        lazy: async () => ({
          Component: (await import('@/pages/RequestCryptoCheckout')).default,
        }),
      },
      {
        path: 'about',
        lazy: async () => ({ Component: (await import('@/pages/About')).default }),
      },
      {
        path: 'blog',
        lazy: async () => ({ Component: (await import('@/pages/Blog')).default }),
      },
      {
        path: 'blog/:slug',
        lazy: async () => ({ Component: (await import('@/pages/BlogPost')).default }),
        getStaticPaths: () => POSTS.map((post) => `blog/${post.slug}`),
      },
      {
        path: '*',
        lazy: async () => ({ Component: (await import('@/pages/NotFound')).default }),
      },
    ],
  },
]
```

- [ ] **Step 3: Rewrite the entry point**

Replace the contents of `src/main.tsx`:

```tsx
import { ViteReactSSG } from 'vite-react-ssg'
import 'lenis/dist/lenis.css'
import './index.css'
import { routes } from './routes'

export const createRoot = ViteReactSSG({ routes })
```

Note the `StrictMode` wrapper and `createRoot` call from the old entry are gone — `ViteReactSSG` owns mounting.

- [ ] **Step 4: Delete the old App module**

```bash
git rm src/App.tsx
```

Then run `grep -rn "from '@/App'\|from './App'" src` and fix any remaining import. Expected: no matches.

- [ ] **Step 5: Switch the build and dev scripts**

In `package.json`:

```json
"dev": "vite-react-ssg dev",
"build": "tsc -b && vite-react-ssg build",
```

- [ ] **Step 6: Build and inspect the output**

Run: `npm run build`
Then: `find dist -name "index.html" | sort`

Expected: an `index.html` for every static route, including `dist/about/index.html`, `dist/blog/index.html`, `dist/blog/how-to-stay-safe-with-crypto/index.html`, and `dist/solutions/travel/index.html`.

- [ ] **Step 7: Confirm real content is in the HTML**

Run:

```bash
grep -c "How to Stay Safe with Crypto" dist/blog/how-to-stay-safe-with-crypto/index.html
```

Expected: a count of 1 or more. If it is 0, prerendering produced an empty shell — stop and diagnose before continuing.

- [ ] **Step 8: Check the app still runs**

Run `npm run dev` and click through `/`, `/about`, `/blog`, the post, and a solutions page. Expected: no console errors, no hydration warnings, and the landing page's Lenis smooth scroll still works.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Prerender routes at build time with vite-react-ssg"
```

---

### Task 4: Emit blog metadata into the prerendered HTML

Prerendering alone does not fix metadata: `usePageMeta` sets tags in an effect, which never runs during a build. Blog pages must declare their tags during render.

**Files:**
- Modify: `src/pages/Blog.tsx`
- Modify: `src/pages/BlogPost.tsx`

**Interfaces:**
- Consumes: `usePageView(title: string): void` from Task 2; `Head` from `vite-react-ssg`.

- [ ] **Step 1: Update the blog index**

In `src/pages/Blog.tsx`, remove the `usePageMeta` import and call. Add:

```tsx
import { Head } from 'vite-react-ssg'
import { usePageView } from '@/lib/usePageView'
```

Inside the component, replace the `usePageMeta(...)` call with:

```tsx
const title = 'Blog | Stablezact'
const description =
  'News, milestones, product updates, and stories shaping the future of crypto payments at Stablezact.'
usePageView(title)
```

and render this as the first child of the returned tree:

```tsx
<Head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href="https://stablezact.com/blog" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content="https://stablezact.com/blog" />
</Head>
```

- [ ] **Step 2: Update the post page**

In `src/pages/BlogPost.tsx`, inside `Article`, remove the `usePageMeta` import and call and add the same imports. Then:

```tsx
const title = `${post.title} | Stablezact`
const url = `https://stablezact.com/blog/${post.slug}`
usePageView(title)
```

and render as the first child of the returned tree:

```tsx
<Head>
  <title>{title}</title>
  <meta name="description" content={post.metaDescription} />
  <link rel="canonical" href={url} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={post.metaDescription} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={`https://stablezact.com${post.image}`} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={post.metaDescription} />
  <meta name="twitter:image" content={`https://stablezact.com${post.image}`} />
</Head>
```

`post.image` is a Vite-resolved asset URL beginning with `/assets/...` in a build, so prefixing the origin yields an absolute URL — which social crawlers require.

- [ ] **Step 3: Build and verify the tags are in the HTML**

Run: `npm run build`
Then:

```bash
grep -o "<title>[^<]*</title>" dist/blog/how-to-stay-safe-with-crypto/index.html
grep -o 'og:title" content="[^"]*"' dist/blog/how-to-stay-safe-with-crypto/index.html
```

Expected: the post's own title in both, **not** "Stablecoin Payment Infrastructure for Merchants".

- [ ] **Step 4: Verify client navigation still updates the title**

Run `npm run dev`, navigate from `/` to `/blog` to the post, and confirm the browser tab title changes at each step. Then confirm page views still fire:

```js
window.dataLayer.filter(e => e[0] === 'event' && e[1] === 'page_view').map(e => e[2].page_path)
```

Expected: `['/blog', '/blog/how-to-stay-safe-with-crypto']`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Blog.tsx src/pages/BlogPost.tsx
git commit -m "Emit blog metadata into prerendered HTML via Head"
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
