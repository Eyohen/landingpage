# Blog Readership Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Measure how many people read each blog post — not just open it — without cookies or consent gating, and show the numbers inside the Payload admin next to the posts they describe.

**Architecture:** The site sends two cookieless beacons per post view (one on mount, one on leave) to a public endpoint on the Payload CMS. Raw view rows land in Postgres and are rolled up hourly into permanent per-post daily records; raw rows are pruned after 90 days. Two Payload admin surfaces read only the rollup table.

**Tech Stack:** Site — Vite 8, React 19, TypeScript, vitest + jsdom. CMS — Payload 3.87.1 on Next 16, `@payloadcms/db-postgres`, Node 24, vitest (to be introduced).

**Spec:** `docs/superpowers/specs/2026-09-07-blog-analytics-design.md` (in the site repo)

## Repositories

This plan spans two repos. Every task states which one it is in.

- **SITE** = `/Users/joshuasol/Desktop/work/coinley/stablezact-landing-page`
- **CMS** = `/Users/joshuasol/Desktop/work/coinley/blog-cms`

They deploy independently. Tasks 1–8 (CMS) ship before Tasks 9–11 (SITE) so the endpoint exists before anything calls it.

## Global Constraints

- **No cookies, no localStorage, no client-side persistent identifier.** The per-view `viewId` lives in a React ref and dies with the tab.
- **Read threshold:** `maxScroll >= 75` **and** `engagedMs >= 30000`. Derived server-side at rollup time, never sent by the client.
- **Engaged time cap:** 30 minutes (`1800000` ms). Clamped both client- and server-side.
- **Scroll clamp:** 0–100 inclusive, integer.
- **Raw retention:** 90 days. Daily rollups are permanent.
- **Rate limits:** 30 views per post per day per visitor hash; 60 requests per minute per visitor hash.
- **Beacon 2 replay window:** 6 hours. A `viewId` older than that is ignored.
- **Endpoint paths:** `POST /api/readership/ping`, `GET /api/readership/summary`. These names must never contain `collect`, `track`, `analytics`, `stats`, or `event` — uBlock Origin's filter lists match URL substrings and would block a first-party endpoint named that way.
- **Content type on both beacons:** `text/plain;charset=UTF-8`. It is CORS-safelisted, so no preflight — which `sendBeacon` cannot satisfy.
- **The ingest endpoint always responds `204`**, including on rejection. Probing must reveal nothing.
- **Never instrument `/blog/preview/*`.** Editors reviewing drafts must not inflate their own numbers.
- **Payload cron format is 6-field** (optional leading seconds): `'* 0 * * * *'` is hourly at minute 0.
- Site tests run with `npm test` (vitest, jsdom, `@` aliased to `src`). CMS tests run with `npm test` after Task 1 creates that script.

## Deliberate deviations from the spec

Four, each with its reason. Anything else that contradicts the spec is a bug in this plan.

1. **Aggregation is a pure TypeScript function, not SQL.** The spec specifies raw SQL (`COUNT(DISTINCT …)`, `PERCENTILE_CONT`). This plan instead fetches the day's raw rows and folds them in `summariseDay`. The aggregation is the highest-risk code in the design and it fails silently — wrong numbers still look like numbers — and a pure function is directly unit-testable against fixtures, where SQL is not. At ~1.7k rows/day (50k views/month) loading a day's rows is negligible. If volume ever makes that untrue, `summariseDay` is the seam to replace with SQL, and its tests become the SQL's acceptance tests.

2. **A third table: `readership-salts`.** The spec describes the daily salt rotating in memory. Held in memory, a mid-day Railway redeploy would generate a fresh salt and every returning reader that day would be counted as new — silently inflating uniques on exactly the days we deploy. Persisting the salt fixes that; deleting rows after two days preserves the unlinkability the spec promises.

3. **Collections are named `readership-*`, not `blog-view-events` / `blog-post-stats-daily`.** Consistent with the endpoint namespace, and Payload auto-exposes `/api/<slug>`, so a slug containing `stats` would put that word in a URL for no benefit.

4. **"Still collecting" for posts under 24h old is folded into the low-sample rule.** A post with fewer than 100 views shows its read rate greyed and marked, which covers a freshly published post and also the older post that never found an audience — a case the spec's time-based rule would have missed.

## File structure

**CMS (`blog-cms`)**

| File | Responsibility |
| --- | --- |
| `vitest.config.ts` (create) | Test runner config; none exists today |
| `src/readership/referrers.ts` (create) | Classify a referring origin into `direct`/`search`/`social`/`referral` |
| `src/readership/bots.ts` (create) | Known-crawler user-agent detection |
| `src/readership/rateLimit.ts` (create) | In-process fixed-window counters |
| `src/readership/visitorHash.ts` (create) | Daily rotating salt + IP/UA hashing |
| `src/readership/summarise.ts` (create) | Pure aggregation: raw rows → one daily record |
| `src/collections/ReadershipViews.ts` (create) | Raw view rows |
| `src/collections/ReadershipDaily.ts` (create) | Permanent per-post daily rollup |
| `src/collections/ReadershipSalts.ts` (create) | Daily salt storage, so restarts don't rotate the salt early |
| `src/endpoints/readershipPing.ts` (create) | Public ingest |
| `src/endpoints/readershipSummary.ts` (create) | Authenticated dashboard data |
| `src/jobs/readershipRollup.ts` (create) | Hourly rollup task |
| `src/jobs/readershipPrune.ts` (create) | Nightly prune of raw rows and stale salts |
| `src/components/readership/PostPerformance.tsx` (create) | Per-post admin tab |
| `src/components/readership/BlogPerformanceView.tsx` (create) | Site-wide admin view |
| `src/components/readership/charts.tsx` (create) | Hand-rolled SVG sparkline and bars |
| `src/payload.config.ts` (modify) | Register collections, endpoints, jobs, CORS |
| `src/collections/Posts.ts` (modify) | Add the Performance UI tab |
| `src/migrations/*` (create) | Generated schema migration |

**SITE (`stablezact-landing-page`)**

| File | Responsibility |
| --- | --- |
| `src/lib/readership.ts` (create) | Pure measurement helpers — no DOM, no network |
| `src/lib/useReadership.ts` (create) | React hook: lifecycle, listeners, beacons |
| `src/components/blog/BlogArticle.tsx` (modify) | Accept an optional `bodyRef` on `<article>` |
| `src/pages/BlogPost.tsx` (modify) | Own the ref and call the hook — published posts only |
| `src/vite-env.d.ts` (modify) | Declare `VITE_CMS_URL` (already used but undeclared) |
| `src/pages/PrivacyPolicy.tsx`, `src/pages/CookiePolicy.tsx` (modify) | Disclose cookieless measurement |

---

## Task 1: CMS test harness

The CMS repo has `vitest.setup.ts` but no config, no `test` script, and no test files. Nothing downstream can be tested until this exists.

**Files:**
- Create: `CMS/vitest.config.ts`
- Modify: `CMS/package.json`
- Test: `CMS/src/readership/smoke.test.ts` (deleted at the end of this task)

**Interfaces:**
- Consumes: nothing
- Produces: `npm test` runs vitest over `src/**/*.test.ts` in a Node environment with `@` aliased to `src`

- [ ] **Step 1: Add vitest as a dev dependency**

```bash
cd /Users/joshuasol/Desktop/work/coinley/blog-cms
npm install --save-dev vitest@^4
```

- [ ] **Step 2: Write the config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 3: Add the test script**

In `package.json`, add to `scripts`:

```json
"test": "cross-env NODE_OPTIONS=--no-deprecation vitest run",
"test:watch": "cross-env NODE_OPTIONS=--no-deprecation vitest"
```

- [ ] **Step 4: Write a smoke test that proves the harness runs**

Create `src/readership/smoke.test.ts`:

```ts
import { describe, expect, it } from 'vitest'

describe('test harness', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

- [ ] **Step 5: Run it**

Run: `npm test`
Expected: PASS, 1 test.

- [ ] **Step 6: Delete the smoke test and commit**

```bash
rm src/readership/smoke.test.ts
git add vitest.config.ts package.json package-lock.json
git commit -m "Add a test harness to the CMS"
```

---

## Task 2: Referrer classification (CMS)

**Files:**
- Create: `CMS/src/readership/referrers.ts`
- Test: `CMS/src/readership/referrers.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `type ReferrerType = 'direct' | 'search' | 'social' | 'referral'`
  - `classifyReferrer(origin: string | null | undefined): { type: ReferrerType; domain: string | null }`

- [ ] **Step 1: Write the failing test**

Create `src/readership/referrers.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { classifyReferrer } from './referrers'

describe('classifyReferrer', () => {
  it('treats a missing referrer as direct', () => {
    expect(classifyReferrer(null)).toEqual({ type: 'direct', domain: null })
    expect(classifyReferrer('')).toEqual({ type: 'direct', domain: null })
  })

  it('recognises search engines', () => {
    expect(classifyReferrer('https://www.google.com').type).toBe('search')
    expect(classifyReferrer('https://duckduckgo.com').type).toBe('search')
  })

  it('recognises social networks', () => {
    expect(classifyReferrer('https://www.linkedin.com').type).toBe('social')
    expect(classifyReferrer('https://t.co').type).toBe('social')
  })

  it('keeps the domain only for referrals', () => {
    expect(classifyReferrer('https://news.ycombinator.com')).toEqual({
      type: 'referral',
      domain: 'news.ycombinator.com',
    })
    expect(classifyReferrer('https://www.google.com').domain).toBeNull()
  })

  it('matches subdomains of a known host', () => {
    expect(classifyReferrer('https://l.facebook.com').type).toBe('social')
  })

  it('does not match a lookalike domain', () => {
    expect(classifyReferrer('https://notgoogle.com').type).toBe('referral')
  })

  it('treats an unparseable origin as direct', () => {
    expect(classifyReferrer('not a url')).toEqual({ type: 'direct', domain: null })
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- referrers`
Expected: FAIL — cannot find module `./referrers`.

- [ ] **Step 3: Implement**

Create `src/readership/referrers.ts`:

```ts
export type ReferrerType = 'direct' | 'search' | 'social' | 'referral'

/**
 * Hosts we care to name. Expected to be edited over time — adding an entry is
 * the whole cost of tracking a new channel.
 */
const SEARCH_HOSTS = [
  'google.com', 'google.co.uk', 'bing.com', 'duckduckgo.com', 'search.yahoo.com',
  'yandex.com', 'baidu.com', 'ecosia.org', 'brave.com',
]

const SOCIAL_HOSTS = [
  'linkedin.com', 'lnkd.in', 'twitter.com', 'x.com', 't.co', 'facebook.com', 'fb.com',
  'instagram.com', 'reddit.com', 'news.google.com', 'youtube.com', 'medium.com',
  't.me', 'discord.com', 'slack.com', 'bsky.app', 'mastodon.social',
]

/** True when `host` is `match` or a subdomain of it — never a lookalike like `notgoogle.com`. */
function hostMatches(host: string, match: string): boolean {
  return host === match || host.endsWith(`.${match}`)
}

/**
 * Classify the referring origin the browser reported. The client sends an
 * origin only — never a full URL — so there is no path or query to leak here.
 */
export function classifyReferrer(origin: string | null | undefined): {
  type: ReferrerType
  domain: string | null
} {
  if (!origin) return { type: 'direct', domain: null }

  let host: string
  try {
    host = new URL(origin).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return { type: 'direct', domain: null }
  }
  if (!host) return { type: 'direct', domain: null }

  if (SEARCH_HOSTS.some((known) => hostMatches(host, known))) {
    return { type: 'search', domain: null }
  }
  if (SOCIAL_HOSTS.some((known) => hostMatches(host, known))) {
    return { type: 'social', domain: null }
  }
  return { type: 'referral', domain: host }
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- referrers`
Expected: PASS, 7 tests.

- [ ] **Step 5: Commit**

```bash
git add src/readership/referrers.ts src/readership/referrers.test.ts
git commit -m "Classify referring origins into traffic sources"
```

---

## Task 3: Bot detection and rate limiting (CMS)

Two small pure modules, grouped because neither carries a meaningful review on its own and both exist only to protect the same endpoint.

**Files:**
- Create: `CMS/src/readership/bots.ts`, `CMS/src/readership/rateLimit.ts`
- Test: `CMS/src/readership/bots.test.ts`, `CMS/src/readership/rateLimit.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `isBot(userAgent: string | null | undefined): boolean`
  - `createRateLimiter(config: { limit: number; windowMs: number }): { allow(key: string, now?: number): boolean }`

- [ ] **Step 1: Write the failing bot test**

Create `src/readership/bots.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { isBot } from './bots'

describe('isBot', () => {
  it('flags common crawlers', () => {
    expect(isBot('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')).toBe(true)
    expect(isBot('Mozilla/5.0 (compatible; bingbot/2.0)')).toBe(true)
    expect(isBot('curl/8.4.0')).toBe(true)
    expect(isBot('python-requests/2.31.0')).toBe(true)
  })

  it('does not flag a real browser', () => {
    expect(
      isBot('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36'),
    ).toBe(false)
    expect(isBot('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1')).toBe(false)
  })

  it('treats a missing user agent as a bot', () => {
    expect(isBot(null)).toBe(true)
    expect(isBot('')).toBe(true)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- bots`
Expected: FAIL — cannot find module `./bots`.

- [ ] **Step 3: Implement bot detection**

Create `src/readership/bots.ts`:

```ts
/**
 * Crawler detection is a filter, not a security boundary — a determined script
 * can always claim to be Chrome. It exists to keep honest crawlers out of the
 * numbers. The stronger guard is that reads require a second beacon, which
 * nothing but a real browser running our JavaScript ever sends.
 */
const BOT_PATTERN =
  /bot|crawler|spider|crawling|slurp|facebookexternalhit|preview|scrape|curl|wget|python-requests|axios|node-fetch|headless|lighthouse|pingdom|monitor|uptime|semrush|ahrefs|screaming ?frog/i

/** A missing user agent counts as a bot: every real browser sends one. */
export function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true
  return BOT_PATTERN.test(userAgent)
}
```

- [ ] **Step 4: Run the bot tests**

Run: `npm test -- bots`
Expected: PASS, 3 tests.

- [ ] **Step 5: Write the failing rate-limiter test**

Create `src/readership/rateLimit.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { createRateLimiter } from './rateLimit'

describe('createRateLimiter', () => {
  it('allows up to the limit within a window', () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 60_000 })
    expect(limiter.allow('a', 0)).toBe(true)
    expect(limiter.allow('a', 1)).toBe(true)
    expect(limiter.allow('a', 2)).toBe(true)
    expect(limiter.allow('a', 3)).toBe(false)
  })

  it('keeps separate counts per key', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 })
    expect(limiter.allow('a', 0)).toBe(true)
    expect(limiter.allow('b', 0)).toBe(true)
    expect(limiter.allow('a', 0)).toBe(false)
  })

  it('resets once the window has passed', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })
    expect(limiter.allow('a', 0)).toBe(true)
    expect(limiter.allow('a', 999)).toBe(false)
    expect(limiter.allow('a', 1001)).toBe(true)
  })

  it('forgets keys whose window has expired, so memory does not grow without bound', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 })
    for (let i = 0; i < 500; i++) limiter.allow(`key-${i}`, 0)
    limiter.allow('later', 10_000)
    expect(limiter.size()).toBe(1)
  })
})
```

- [ ] **Step 6: Run it and watch it fail**

Run: `npm test -- rateLimit`
Expected: FAIL — cannot find module `./rateLimit`.

- [ ] **Step 7: Implement the rate limiter**

Create `src/readership/rateLimit.ts`:

```ts
interface Bucket {
  count: number
  startedAt: number
}

/**
 * Fixed-window counters held in process memory.
 *
 * Deliberately not durable: the counters reset on every deploy and would not
 * hold across replicas. That is the right trade at one Railway instance and
 * blog-scale traffic. If the CMS is ever scaled horizontally this must move to
 * Postgres or Redis — see the spec's "known limitation".
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>()

  /** Drop expired buckets so a long-running process does not accumulate keys forever. */
  function sweep(now: number): void {
    for (const [key, bucket] of buckets) {
      if (now - bucket.startedAt >= windowMs) buckets.delete(key)
    }
  }

  return {
    allow(key: string, now: number = Date.now()): boolean {
      sweep(now)
      const bucket = buckets.get(key)
      if (!bucket || now - bucket.startedAt >= windowMs) {
        buckets.set(key, { count: 1, startedAt: now })
        return true
      }
      if (bucket.count >= limit) return false
      bucket.count += 1
      return true
    },
    size(): number {
      return buckets.size
    },
  }
}
```

- [ ] **Step 8: Run the rate-limiter tests**

Run: `npm test -- rateLimit`
Expected: PASS, 4 tests.

- [ ] **Step 9: Commit**

```bash
git add src/readership/bots.ts src/readership/bots.test.ts src/readership/rateLimit.ts src/readership/rateLimit.test.ts
git commit -m "Add crawler filtering and rate limiting for readership ingest"
```

---

## Task 4: Collections and migration (CMS)

**Files:**
- Create: `CMS/src/collections/ReadershipViews.ts`, `CMS/src/collections/ReadershipDaily.ts`, `CMS/src/collections/ReadershipSalts.ts`
- Modify: `CMS/src/payload.config.ts`
- Create: `CMS/src/migrations/<generated>.ts`, and update `CMS/src/migrations/index.ts`

**Interfaces:**
- Consumes: `ReferrerType` from Task 2
- Produces: three collections with slugs `readership-views`, `readership-daily`, `readership-salts`; Postgres tables `readership_views`, `readership_daily`, `readership_salts`

- [ ] **Step 1: Create the raw view collection**

Create `src/collections/ReadershipViews.ts`:

```ts
import type { CollectionConfig } from 'payload'

/**
 * One row per blog post view. Written only by the ingest endpoint, which uses
 * `overrideAccess: true`; every access rule below is therefore the answer to
 * "what may the public do", and the answer is nothing.
 *
 * Pruned after 90 days by the nightly job. Permanent history lives in
 * `readership-daily`.
 */
export const ReadershipViews: CollectionConfig = {
  slug: 'readership-views',
  admin: { hidden: true },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'viewId', type: 'text', required: true, unique: true, index: true },
    { name: 'post', type: 'relationship', relationTo: 'posts', required: true, index: true },
    { name: 'visitorHash', type: 'text', required: true, index: true },
    {
      name: 'referrerType',
      type: 'select',
      required: true,
      options: ['direct', 'search', 'social', 'referral'],
    },
    { name: 'referrerDomain', type: 'text' },
    // Null until the second beacon lands. A view with no engagement data is
    // still a view — that is the point of splitting the beacons.
    { name: 'maxScroll', type: 'number' },
    { name: 'engagedMs', type: 'number' },
    // 'YYYY-MM-DD' in UTC. Stored as text because every read of it is an exact
    // match or a range on a string, and it keeps rollup grouping trivial.
    { name: 'day', type: 'text', required: true, index: true },
  ],
}
```

- [ ] **Step 2: Create the daily rollup collection**

Create `src/collections/ReadershipDaily.ts`:

```ts
import type { CollectionConfig } from 'payload'

/** One row per post per day, kept forever. This is what the dashboard reads. */
export const ReadershipDaily: CollectionConfig = {
  slug: 'readership-daily',
  admin: { hidden: true },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'post', type: 'relationship', relationTo: 'posts', required: true, index: true },
    { name: 'day', type: 'text', required: true, index: true },
    { name: 'views', type: 'number', required: true, defaultValue: 0 },
    { name: 'uniques', type: 'number', required: true, defaultValue: 0 },
    { name: 'reads', type: 'number', required: true, defaultValue: 0 },
    // Null when no view that day reported engagement at all.
    { name: 'scrollP50', type: 'number' },
    { name: 'engagedMsAvg', type: 'number' },
    { name: 'direct', type: 'number', required: true, defaultValue: 0 },
    { name: 'search', type: 'number', required: true, defaultValue: 0 },
    { name: 'social', type: 'number', required: true, defaultValue: 0 },
    { name: 'referral', type: 'number', required: true, defaultValue: 0 },
    // { [domain]: count } for the day's referring domains, capped at 20.
    { name: 'referrers', type: 'json' },
  ],
}
```

- [ ] **Step 3: Create the salt collection**

Create `src/collections/ReadershipSalts.ts`:

```ts
import type { CollectionConfig } from 'payload'

/**
 * The daily salt that makes visitor hashes unlinkable across days.
 *
 * It is stored rather than held in memory for a specific reason: a Railway
 * redeploy mid-day would otherwise generate a fresh salt, and every returning
 * visitor that day would hash differently and be counted as new. Persisting it
 * makes uniques survive deploys. Rows older than two days are deleted nightly,
 * which is what makes the previous day's hashes permanently unlinkable.
 */
export const ReadershipSalts: CollectionConfig = {
  slug: 'readership-salts',
  admin: { hidden: true },
  access: {
    read: () => false,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'day', type: 'text', required: true, unique: true, index: true },
    { name: 'salt', type: 'text', required: true },
  ],
}
```

- [ ] **Step 4: Register the collections**

In `src/payload.config.ts`, add the imports beside the existing collection imports:

```ts
import { ReadershipViews } from './collections/ReadershipViews'
import { ReadershipDaily } from './collections/ReadershipDaily'
import { ReadershipSalts } from './collections/ReadershipSalts'
```

and extend the `collections` array:

```ts
collections: [
  Users,
  Media,
  Authors,
  Categories,
  Posts,
  PressArticles,
  ReadershipViews,
  ReadershipDaily,
  ReadershipSalts,
],
```

- [ ] **Step 5: Generate types and the migration**

```bash
cd /Users/joshuasol/Desktop/work/coinley/blog-cms
npm run generate:types
npm run migrate:create -- readership
```

This writes a new file under `src/migrations/`. Open it and confirm it creates `readership_views`, `readership_daily` and `readership_salts` and **does not drop or alter any existing table** — if it does, stop and investigate before continuing.

- [ ] **Step 6: Register the migration**

Add the generated migration to `src/migrations/index.ts`, following the existing shape exactly:

```ts
import * as migration_<generated_name> from './<generated_name>';

// ... appended to the existing array:
  {
    up: migration_<generated_name>.up,
    down: migration_<generated_name>.down,
    name: '<generated_name>'
  },
```

This step is not optional. `payload.config.ts` runs `prodMigrations`, so a migration missing from this array simply never runs in production.

- [ ] **Step 7: Verify the migration applies**

```bash
docker compose up -d
npm run migrate
```

Expected: the migration runs without error. Then confirm the tables exist:

```bash
docker compose exec -T db psql -U blog -d blog_cms -c "\dt readership_*"
```

Expected: three tables listed. (If the compose service or database name differs, read `docker-compose.yml` and adjust.)

- [ ] **Step 8: Commit**

```bash
git add src/collections/Readership*.ts src/payload.config.ts src/migrations/ src/payload-types.ts
git commit -m "Add readership storage: raw views, daily rollups, and salts"
```

---

## Task 5: Visitor hashing (CMS)

**Files:**
- Create: `CMS/src/readership/visitorHash.ts`
- Test: `CMS/src/readership/visitorHash.test.ts`

**Interfaces:**
- Consumes: the `readership-salts` collection from Task 4
- Produces:
  - `utcDay(now?: Date): string` — `'YYYY-MM-DD'`
  - `hashVisitor(salt: string, ip: string, userAgent: string): string`
  - `saltFor(payload: Payload, day: string): Promise<string>`

- [ ] **Step 1: Write the failing test**

Create `src/readership/visitorHash.test.ts`. Only the pure functions are unit tested; `saltFor` needs a database and is covered by the endpoint's integration check in Task 6.

```ts
import { describe, expect, it } from 'vitest'
import { hashVisitor, utcDay } from './visitorHash'

describe('utcDay', () => {
  it('formats as YYYY-MM-DD in UTC', () => {
    expect(utcDay(new Date('2026-09-07T23:30:00Z'))).toBe('2026-09-07')
  })

  it('uses UTC, not local time', () => {
    expect(utcDay(new Date('2026-09-07T00:30:00Z'))).toBe('2026-09-07')
  })
})

describe('hashVisitor', () => {
  it('is stable for the same salt, ip and user agent', () => {
    expect(hashVisitor('salt', '1.2.3.4', 'Chrome')).toBe(hashVisitor('salt', '1.2.3.4', 'Chrome'))
  })

  it('differs when the salt rotates, so yesterday cannot be linked to today', () => {
    expect(hashVisitor('monday', '1.2.3.4', 'Chrome')).not.toBe(
      hashVisitor('tuesday', '1.2.3.4', 'Chrome'),
    )
  })

  it('differs per visitor', () => {
    expect(hashVisitor('salt', '1.2.3.4', 'Chrome')).not.toBe(hashVisitor('salt', '5.6.7.8', 'Chrome'))
    expect(hashVisitor('salt', '1.2.3.4', 'Chrome')).not.toBe(hashVisitor('salt', '1.2.3.4', 'Safari'))
  })

  it('does not contain the raw inputs', () => {
    const hash = hashVisitor('salt', '1.2.3.4', 'Chrome')
    expect(hash).not.toContain('1.2.3.4')
    expect(hash).toMatch(/^[a-f0-9]{64}$/)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- visitorHash`
Expected: FAIL — cannot find module `./visitorHash`.

- [ ] **Step 3: Implement**

Create `src/readership/visitorHash.ts`:

```ts
import { createHash, randomBytes } from 'node:crypto'
import type { Payload } from 'payload'

/** UTC calendar day as 'YYYY-MM-DD'. Everything in readership is bucketed by this. */
export function utcDay(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10)
}

/**
 * The only identifier we ever hold for a reader. It is unlinkable to a person
 * without the day's salt, and unlinkable across days because the salt rotates
 * and old salts are deleted.
 */
export function hashVisitor(salt: string, ip: string, userAgent: string): string {
  return createHash('sha256').update(`${salt}:${ip}:${userAgent}`).digest('hex')
}

const cache = new Map<string, string>()

/**
 * The salt for a given day, created on first use.
 *
 * Two requests on a cold process can race here. That is handled by reading back
 * after a failed create rather than by locking: `day` is unique, so the loser of
 * the race gets a duplicate-key error and then finds the winner's row.
 */
export async function saltFor(payload: Payload, day: string): Promise<string> {
  const cached = cache.get(day)
  if (cached) return cached

  const existing = await payload.find({
    collection: 'readership-salts',
    where: { day: { equals: day } },
    limit: 1,
    overrideAccess: true,
  })

  let salt = existing.docs[0]?.salt as string | undefined

  if (!salt) {
    const fresh = randomBytes(32).toString('hex')
    try {
      const created = await payload.create({
        collection: 'readership-salts',
        data: { day, salt: fresh },
        overrideAccess: true,
      })
      salt = created.salt as string
    } catch {
      const retry = await payload.find({
        collection: 'readership-salts',
        where: { day: { equals: day } },
        limit: 1,
        overrideAccess: true,
      })
      salt = retry.docs[0]?.salt as string | undefined
      if (!salt) throw new Error(`Could not obtain a readership salt for ${day}`)
    }
  }

  // Only ever holds a handful of entries; the prune job removes the rows, and a
  // process restart clears this.
  cache.set(day, salt)
  return salt
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- visitorHash`
Expected: PASS, 6 tests.

- [ ] **Step 5: Commit**

```bash
git add src/readership/visitorHash.ts src/readership/visitorHash.test.ts
git commit -m "Hash visitors behind a daily rotating salt"
```

---

## Task 6: Ingest endpoint (CMS)

**Files:**
- Create: `CMS/src/endpoints/readershipPing.ts`
- Modify: `CMS/src/payload.config.ts`
- Test: `CMS/src/endpoints/readershipPing.test.ts`

**Interfaces:**
- Consumes: `classifyReferrer` (Task 2), `isBot` and `createRateLimiter` (Task 3), `utcDay`/`hashVisitor`/`saltFor` (Task 5), the collections from Task 4
- Produces:
  - `readershipPingEndpoint: Endpoint` at `POST /api/readership/ping`
  - `parsePing(raw: string): PingBody | null` — exported for testing
  - `clientIpFrom(headers: Headers): string`

- [ ] **Step 1: Write the failing test for the pure parts**

Create `src/endpoints/readershipPing.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { clientIpFrom, parsePing } from './readershipPing'

describe('parsePing', () => {
  it('accepts a view beacon', () => {
    expect(parsePing(JSON.stringify({ viewId: 'v1', slug: 'a-post', referrer: 'https://x.com' })))
      .toEqual({ viewId: 'v1', slug: 'a-post', referrer: 'https://x.com' })
  })

  it('accepts an engagement beacon', () => {
    expect(parsePing(JSON.stringify({ viewId: 'v1', maxScroll: 80, engagedMs: 45000 })))
      .toEqual({ viewId: 'v1', maxScroll: 80, engagedMs: 45000 })
  })

  it('clamps out-of-range engagement values', () => {
    expect(parsePing(JSON.stringify({ viewId: 'v1', maxScroll: 900, engagedMs: 99_999_999 })))
      .toEqual({ viewId: 'v1', maxScroll: 100, engagedMs: 1_800_000 })
    expect(parsePing(JSON.stringify({ viewId: 'v1', maxScroll: -5, engagedMs: -1 })))
      .toEqual({ viewId: 'v1', maxScroll: 0, engagedMs: 0 })
  })

  it('rounds fractional engagement values', () => {
    expect(parsePing(JSON.stringify({ viewId: 'v1', maxScroll: 42.7, engagedMs: 1000.4 })))
      .toEqual({ viewId: 'v1', maxScroll: 43, engagedMs: 1000 })
  })

  it('rejects a body with no viewId', () => {
    expect(parsePing(JSON.stringify({ slug: 'a-post' }))).toBeNull()
  })

  it('rejects an over-long viewId', () => {
    expect(parsePing(JSON.stringify({ viewId: 'x'.repeat(200), slug: 'a' }))).toBeNull()
  })

  it('rejects malformed JSON', () => {
    expect(parsePing('{')).toBeNull()
    expect(parsePing('')).toBeNull()
  })

  it('rejects a non-object body', () => {
    expect(parsePing('"hello"')).toBeNull()
    expect(parsePing('null')).toBeNull()
  })

  it('drops a referrer that is not a string', () => {
    expect(parsePing(JSON.stringify({ viewId: 'v1', slug: 'a', referrer: 42 })))
      .toEqual({ viewId: 'v1', slug: 'a' })
  })
})

describe('clientIpFrom', () => {
  it('takes the first entry of x-forwarded-for', () => {
    const headers = new Headers({ 'x-forwarded-for': '203.0.113.9, 10.0.0.1' })
    expect(clientIpFrom(headers)).toBe('203.0.113.9')
  })

  it('falls back to x-real-ip', () => {
    expect(clientIpFrom(new Headers({ 'x-real-ip': '203.0.113.9' }))).toBe('203.0.113.9')
  })

  it('returns a constant when no header is present, so hashing still works', () => {
    expect(clientIpFrom(new Headers())).toBe('unknown')
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- readershipPing`
Expected: FAIL — cannot find module `./readershipPing`.

- [ ] **Step 3: Implement**

Create `src/endpoints/readershipPing.ts`:

```ts
import type { Endpoint } from 'payload'
import { classifyReferrer } from '../readership/referrers'
import { isBot } from '../readership/bots'
import { createRateLimiter } from '../readership/rateLimit'
import { hashVisitor, saltFor, utcDay } from '../readership/visitorHash'

/** Cookieless readership ingest. See docs/superpowers/specs/2026-09-07-blog-analytics-design.md in the site repo. */

const MAX_BODY_BYTES = 2_000
const MAX_ENGAGED_MS = 1_800_000
const REPLAY_WINDOW_MS = 6 * 60 * 60 * 1000
const VIEWS_PER_POST_PER_DAY = 30
const REQUESTS_PER_MINUTE = 60

export interface PingBody {
  viewId: string
  slug?: string
  referrer?: string
  maxScroll?: number
  engagedMs?: number
}

const perMinute = createRateLimiter({ limit: REQUESTS_PER_MINUTE, windowMs: 60_000 })
const perPostPerDay = createRateLimiter({ limit: VIEWS_PER_POST_PER_DAY, windowMs: 24 * 60 * 60 * 1000 })

function clampInt(value: unknown, min: number, max: number): number | undefined {
  if (typeof value !== 'number' || !Number.isFinite(value)) return undefined
  return Math.min(max, Math.max(min, Math.round(value)))
}

/**
 * Parse and validate a beacon body. Returns null for anything we will not
 * store — the endpoint answers 204 either way, so this is the only place that
 * knows the difference between "accepted" and "ignored".
 */
export function parsePing(raw: string): PingBody | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null

  const body = parsed as Record<string, unknown>
  const viewId = body.viewId
  if (typeof viewId !== 'string' || viewId.length === 0 || viewId.length > 100) return null

  const result: PingBody = { viewId }

  if (typeof body.slug === 'string' && body.slug.length > 0 && body.slug.length <= 200) {
    result.slug = body.slug
  }
  if (typeof body.referrer === 'string' && body.referrer.length <= 500) {
    result.referrer = body.referrer
  }
  const maxScroll = clampInt(body.maxScroll, 0, 100)
  if (maxScroll !== undefined) result.maxScroll = maxScroll
  const engagedMs = clampInt(body.engagedMs, 0, MAX_ENGAGED_MS)
  if (engagedMs !== undefined) result.engagedMs = engagedMs

  return result
}

/** Railway terminates TLS upstream, so the socket address is never the reader's. */
export function clientIpFrom(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  return headers.get('x-real-ip')?.trim() || 'unknown'
}

/** Every path returns this. Probing the endpoint must reveal nothing. */
function noContent(): Response {
  return new Response(null, { status: 204 })
}

export const readershipPingEndpoint: Endpoint = {
  path: '/readership/ping',
  method: 'post',
  handler: async (req) => {
    try {
      const userAgent = req.headers.get('user-agent')
      if (isBot(userAgent)) return noContent()

      const raw = await req.text?.()
      if (typeof raw !== 'string' || raw.length > MAX_BODY_BYTES) return noContent()

      const body = parsePing(raw)
      if (!body) return noContent()

      const now = new Date()
      const day = utcDay(now)
      const ip = clientIpFrom(req.headers)
      const salt = await saltFor(req.payload, day)
      const visitorHash = hashVisitor(salt, ip, userAgent ?? '')

      if (!perMinute.allow(visitorHash, now.getTime())) return noContent()

      if (body.slug) {
        // Beacon 1 — a new view.
        const posts = await req.payload.find({
          collection: 'posts',
          where: { slug: { equals: body.slug } },
          limit: 1,
          overrideAccess: false, // public access rules apply: published posts only
        })
        const post = posts.docs[0]
        if (!post) return noContent()

        if (!perPostPerDay.allow(`${visitorHash}:${post.id}:${day}`, now.getTime())) return noContent()

        const { type, domain } = classifyReferrer(body.referrer)

        await req.payload.create({
          collection: 'readership-views',
          data: {
            viewId: body.viewId,
            post: post.id,
            visitorHash,
            referrerType: type,
            referrerDomain: domain,
            day,
          },
          overrideAccess: true,
        })
        return noContent()
      }

      // Beacon 2 — engagement for a view we already recorded.
      if (body.maxScroll === undefined && body.engagedMs === undefined) return noContent()

      const existing = await req.payload.find({
        collection: 'readership-views',
        where: { viewId: { equals: body.viewId } },
        limit: 1,
        overrideAccess: true,
      })
      const view = existing.docs[0]
      if (!view) return noContent()

      // Without this window, anyone could POST fabricated reads against any
      // viewId they had ever seen.
      const age = now.getTime() - new Date(view.createdAt as string).getTime()
      if (age > REPLAY_WINDOW_MS) return noContent()

      await req.payload.update({
        collection: 'readership-views',
        id: view.id,
        data: {
          // A reader who returns and leaves again sends a second beacon; keep
          // the furthest and longest, never the latest.
          maxScroll: Math.max(view.maxScroll ?? 0, body.maxScroll ?? 0),
          engagedMs: Math.max(view.engagedMs ?? 0, body.engagedMs ?? 0),
        },
        overrideAccess: true,
      })
      return noContent()
    } catch (error) {
      // Analytics must never take the endpoint down or leak a stack trace.
      req.payload.logger.error({ err: error }, 'readership ping failed')
      return noContent()
    }
  },
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- readershipPing`
Expected: PASS, 12 tests.

- [ ] **Step 5: Register the endpoint**

In `src/payload.config.ts`:

```ts
import { readershipPingEndpoint } from './endpoints/readershipPing'
```

```ts
endpoints: [previewEndpoint, readershipPingEndpoint],
```

- [ ] **Step 6: Verify end to end against a real database**

```bash
docker compose up -d
npm run dev
```

In a second terminal:

```bash
curl -i -X POST http://localhost:3000/api/readership/ping \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36' \
  --data '{"viewId":"manual-test-1","slug":"<a real published slug>"}'
```

Expected: `HTTP/1.1 204`. Then send the engagement beacon:

```bash
curl -i -X POST http://localhost:3000/api/readership/ping \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36' \
  --data '{"viewId":"manual-test-1","maxScroll":88,"engagedMs":41000}'
```

Confirm the row:

```bash
docker compose exec -T db psql -U blog -d blog_cms \
  -c "SELECT view_id, max_scroll, engaged_ms, referrer_type, day FROM readership_views WHERE view_id = 'manual-test-1';"
```

Expected: one row with `max_scroll = 88`, `engaged_ms = 41000`, `referrer_type = 'direct'`.

Then confirm a bot is rejected — repeat the first curl with `-H 'User-Agent: Googlebot/2.1'` and a new `viewId`, and check no row was written.

Finally clean up: `DELETE FROM readership_views WHERE view_id LIKE 'manual-test-%';`

- [ ] **Step 7: Commit**

```bash
git add src/endpoints/readershipPing.ts src/endpoints/readershipPing.test.ts src/payload.config.ts
git commit -m "Accept cookieless readership beacons"
```

---

## Task 7: CORS and environment (CMS)

**Files:**
- Modify: `CMS/src/payload.config.ts`
- Modify: `CMS/DEPLOYMENT.md`

**Interfaces:**
- Consumes: nothing
- Produces: the production and staging site origins are permitted to POST to the CMS

- [ ] **Step 1: Widen the CORS list**

The current list is built from `SITE_URL` alone. Production (Azure) and staging (Vercel) are different origins and both must be allowed. In `src/payload.config.ts`, replace the `cors` value with:

```ts
  // The preview route and the readership beacons both call from the site's
  // origin. Production is Azure Static Web Apps and staging is Vercel, so both
  // must be listed — SITE_URL alone only ever covers one of them.
  cors: [
    process.env.SITE_URL,
    process.env.SITE_STAGING_URL,
    'http://localhost:5173',
    'http://localhost:5174',
  ].filter((value): value is string => Boolean(value)).filter(
    (value, index, all) => all.indexOf(value) === index,
  ),
```

- [ ] **Step 2: Document the new variable**

Add `SITE_STAGING_URL` to `DEPLOYMENT.md` beside the existing `SITE_URL` entry, describing it as the Vercel staging origin whose beacons and preview requests must be allowed through CORS.

- [ ] **Step 3: Verify the preflight-free request is accepted cross-origin**

With `npm run dev` running and `SITE_URL=http://localhost:5173` set:

```bash
curl -i -X POST http://localhost:3000/api/readership/ping \
  -H 'Origin: http://localhost:5173' \
  -H 'Content-Type: text/plain;charset=UTF-8' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/131.0 Safari/537.36' \
  --data '{"viewId":"cors-test-1","slug":"<a real published slug>"}'
```

Expected: `204`, with an `access-control-allow-origin: http://localhost:5173` header present.

- [ ] **Step 4: Set the variable in Railway**

Set `SITE_STAGING_URL` on the Railway service to the Vercel staging origin. Note in the commit message that this must be set before the site ships Task 11, or staging beacons will be blocked.

- [ ] **Step 5: Commit**

```bash
git add src/payload.config.ts DEPLOYMENT.md
git commit -m "Allow the production and staging site origins through CORS"
```

---

## Task 8: Rollup and pruning jobs (CMS)

**Files:**
- Create: `CMS/src/readership/summarise.ts`, `CMS/src/jobs/readershipRollup.ts`, `CMS/src/jobs/readershipPrune.ts`
- Modify: `CMS/src/payload.config.ts`
- Test: `CMS/src/readership/summarise.test.ts`

**Interfaces:**
- Consumes: `ReferrerType` (Task 2), collections (Task 4), `utcDay` (Task 5)
- Produces:
  - `summariseDay(rows: ViewRow[]): DailySummary`
  - `ViewRow` = `{ visitorHash: string; maxScroll: number | null; engagedMs: number | null; referrerType: ReferrerType; referrerDomain: string | null }`
  - `DailySummary` = `{ views, uniques, reads, scrollP50, engagedMsAvg, direct, search, social, referral, referrers }`
  - Task slugs `readership-rollup` and `readership-prune`

- [ ] **Step 1: Write the failing aggregation test**

Create `src/readership/summarise.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { summariseDay, type ViewRow } from './summarise'

function row(overrides: Partial<ViewRow> = {}): ViewRow {
  return {
    visitorHash: 'h1',
    maxScroll: null,
    engagedMs: null,
    referrerType: 'direct',
    referrerDomain: null,
    ...overrides,
  }
}

describe('summariseDay', () => {
  it('returns zeroes for no rows', () => {
    expect(summariseDay([])).toEqual({
      views: 0, uniques: 0, reads: 0, scrollP50: null, engagedMsAvg: null,
      direct: 0, search: 0, social: 0, referral: 0, referrers: {},
    })
  })

  it('counts views and distinct visitors separately', () => {
    const result = summariseDay([row({ visitorHash: 'a' }), row({ visitorHash: 'a' }), row({ visitorHash: 'b' })])
    expect(result.views).toBe(3)
    expect(result.uniques).toBe(2)
  })

  it('counts a read only when both thresholds are met', () => {
    const result = summariseDay([
      row({ maxScroll: 80, engagedMs: 31_000 }), // read
      row({ maxScroll: 74, engagedMs: 60_000 }), // not deep enough
      row({ maxScroll: 90, engagedMs: 29_000 }), // not long enough
      row({ maxScroll: 75, engagedMs: 30_000 }), // exactly at the boundary: read
      row(),                                     // no engagement beacon at all
    ])
    expect(result.reads).toBe(2)
    expect(result.views).toBe(5)
  })

  it('takes the median scroll of rows that reported one', () => {
    expect(summariseDay([
      row({ maxScroll: 10 }), row({ maxScroll: 50 }), row({ maxScroll: 90 }), row(),
    ]).scrollP50).toBe(50)
  })

  it('averages the two middle values for an even count', () => {
    expect(summariseDay([row({ maxScroll: 40 }), row({ maxScroll: 50 })]).scrollP50).toBe(45)
  })

  it('averages engaged time over rows that reported it, not over all views', () => {
    expect(summariseDay([row({ engagedMs: 10_000 }), row({ engagedMs: 20_000 }), row()]).engagedMsAvg).toBe(15_000)
  })

  it('leaves engagement null when no row reported any', () => {
    const result = summariseDay([row(), row()])
    expect(result.scrollP50).toBeNull()
    expect(result.engagedMsAvg).toBeNull()
  })

  it('counts each referrer type', () => {
    const result = summariseDay([
      row({ referrerType: 'search' }),
      row({ referrerType: 'social' }),
      row({ referrerType: 'social' }),
      row({ referrerType: 'referral', referrerDomain: 'news.ycombinator.com' }),
      row({ referrerType: 'direct' }),
    ])
    expect(result).toMatchObject({ direct: 1, search: 1, social: 2, referral: 1 })
  })

  it('tallies referring domains', () => {
    const result = summariseDay([
      row({ referrerType: 'referral', referrerDomain: 'a.com' }),
      row({ referrerType: 'referral', referrerDomain: 'a.com' }),
      row({ referrerType: 'referral', referrerDomain: 'b.com' }),
    ])
    expect(result.referrers).toEqual({ 'a.com': 2, 'b.com': 1 })
  })

  it('keeps only the top 20 referring domains', () => {
    const rows = Array.from({ length: 25 }, (_, i) =>
      row({ referrerType: 'referral', referrerDomain: `d${i}.com` }),
    )
    // Make d0 the clear leader so ordering is observable.
    rows.push(row({ referrerType: 'referral', referrerDomain: 'd0.com' }))
    const result = summariseDay(rows)
    expect(Object.keys(result.referrers)).toHaveLength(20)
    expect(result.referrers['d0.com']).toBe(2)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- summarise`
Expected: FAIL — cannot find module `./summarise`.

- [ ] **Step 3: Implement the aggregation**

Create `src/readership/summarise.ts`:

```ts
import type { ReferrerType } from './referrers'

export const READ_SCROLL_PERCENT = 75
export const READ_ENGAGED_MS = 30_000
const TOP_REFERRERS = 20

export interface ViewRow {
  visitorHash: string
  maxScroll: number | null
  engagedMs: number | null
  referrerType: ReferrerType
  referrerDomain: string | null
}

export interface DailySummary {
  views: number
  uniques: number
  reads: number
  scrollP50: number | null
  engagedMsAvg: number | null
  direct: number
  search: number
  social: number
  referral: number
  referrers: Record<string, number>
}

function median(values: number[]): number | null {
  if (values.length === 0) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 1) return sorted[middle]!
  return Math.round((sorted[middle - 1]! + sorted[middle]!) / 2)
}

/**
 * Reduce one post's raw views for one day into the row the dashboard reads.
 *
 * Pure on purpose: this is the only place the numbers are actually computed, and
 * wrong numbers look exactly like right ones, so it has to be directly testable.
 */
export function summariseDay(rows: ViewRow[]): DailySummary {
  const visitors = new Set<string>()
  const scrolls: number[] = []
  const engagements: number[] = []
  const domains = new Map<string, number>()
  const byType: Record<ReferrerType, number> = { direct: 0, search: 0, social: 0, referral: 0 }
  let reads = 0

  for (const r of rows) {
    visitors.add(r.visitorHash)
    if (r.maxScroll !== null) scrolls.push(r.maxScroll)
    if (r.engagedMs !== null) engagements.push(r.engagedMs)
    byType[r.referrerType] += 1
    if (r.referrerDomain) domains.set(r.referrerDomain, (domains.get(r.referrerDomain) ?? 0) + 1)
    if ((r.maxScroll ?? 0) >= READ_SCROLL_PERCENT && (r.engagedMs ?? 0) >= READ_ENGAGED_MS) reads += 1
  }

  const referrers: Record<string, number> = {}
  for (const [domain, count] of [...domains.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, TOP_REFERRERS)) {
    referrers[domain] = count
  }

  return {
    views: rows.length,
    uniques: visitors.size,
    reads,
    scrollP50: median(scrolls),
    engagedMsAvg:
      engagements.length === 0
        ? null
        : Math.round(engagements.reduce((sum, ms) => sum + ms, 0) / engagements.length),
    ...byType,
    referrers,
  }
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- summarise`
Expected: PASS, 10 tests.

- [ ] **Step 5: Write the rollup job**

Create `src/jobs/readershipRollup.ts`:

```ts
import type { Payload, TaskConfig } from 'payload'
import { summariseDay, type ViewRow } from '../readership/summarise'
import { utcDay } from '../readership/visitorHash'

/**
 * Recompute the daily rollup for the given days.
 *
 * Idempotent by construction: it derives each row entirely from the raw views
 * for that day and overwrites whatever was there. Running it twice, or running
 * it after a late beacon lands, produces the same answer as running it once.
 */
export async function rollupDays(payload: Payload, days: string[]): Promise<void> {
  for (const day of days) {
    const views = await payload.find({
      collection: 'readership-views',
      where: { day: { equals: day } },
      limit: 100_000,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    })

    const byPost = new Map<number | string, ViewRow[]>()
    for (const doc of views.docs) {
      const postId = doc.post as number | string
      const rows = byPost.get(postId) ?? []
      rows.push({
        visitorHash: doc.visitorHash as string,
        maxScroll: (doc.maxScroll ?? null) as number | null,
        engagedMs: (doc.engagedMs ?? null) as number | null,
        referrerType: doc.referrerType as ViewRow['referrerType'],
        referrerDomain: (doc.referrerDomain ?? null) as string | null,
      })
      byPost.set(postId, rows)
    }

    for (const [postId, rows] of byPost) {
      const summary = summariseDay(rows)
      const existing = await payload.find({
        collection: 'readership-daily',
        where: { and: [{ post: { equals: postId } }, { day: { equals: day } }] },
        limit: 1,
        overrideAccess: true,
      })

      if (existing.docs[0]) {
        await payload.update({
          collection: 'readership-daily',
          id: existing.docs[0].id,
          data: summary,
          overrideAccess: true,
        })
      } else {
        await payload.create({
          collection: 'readership-daily',
          data: { post: postId, day, ...summary },
          overrideAccess: true,
        })
      }
    }
  }
}

/** Yesterday and today, so a beacon that arrives after midnight is still counted. */
function daysToRoll(now: Date = new Date()): string[] {
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  return [utcDay(yesterday), utcDay(now)]
}

export const readershipRollupTask: TaskConfig<'readership-rollup'> = {
  slug: 'readership-rollup',
  // Hourly at minute 0. Payload's cron takes an optional leading seconds field.
  schedule: [{ cron: '* 0 * * * *', queue: 'readership' }],
  handler: async ({ req }) => {
    await rollupDays(req.payload, daysToRoll())
    return { output: {} }
  },
}
```

- [ ] **Step 6: Write the prune job**

Create `src/jobs/readershipPrune.ts`:

```ts
import type { TaskConfig } from 'payload'
import { utcDay } from '../readership/visitorHash'

const RAW_RETENTION_DAYS = 90
const SALT_RETENTION_DAYS = 2

function daysAgo(days: number, now: Date = new Date()): string {
  return utcDay(new Date(now.getTime() - days * 24 * 60 * 60 * 1000))
}

/**
 * Deletes raw view rows past retention, and salts older than two days.
 *
 * Deleting the salt is what makes the promise real: once it is gone, that day's
 * visitor hashes cannot be recomputed from an IP by anyone, including us.
 */
export const readershipPruneTask: TaskConfig<'readership-prune'> = {
  slug: 'readership-prune',
  // Daily at 03:15 UTC — off the hour so it never contends with the rollup.
  schedule: [{ cron: '* 15 3 * * *', queue: 'readership' }],
  handler: async ({ req }) => {
    await req.payload.delete({
      collection: 'readership-views',
      where: { day: { less_than: daysAgo(RAW_RETENTION_DAYS) } },
      overrideAccess: true,
    })
    await req.payload.delete({
      collection: 'readership-salts',
      where: { day: { less_than: daysAgo(SALT_RETENTION_DAYS) } },
      overrideAccess: true,
    })
    return { output: {} }
  },
}
```

- [ ] **Step 7: Register the jobs**

In `src/payload.config.ts`, import both tasks and extend the `jobs` block. The existing per-minute `default` entry stays exactly as it is — scheduled publishing must not start competing with rollup work:

```ts
import { readershipRollupTask } from './jobs/readershipRollup'
import { readershipPruneTask } from './jobs/readershipPrune'
```

```ts
  jobs: {
    tasks: [readershipRollupTask, readershipPruneTask],
    autoRun: [
      // Runs the queue every minute so scheduled publishes fire close to their
      // chosen time. Scheduled publishing creates a background job; with no
      // runner configured those jobs would sit unprocessed forever.
      { cron: '* * * * *', queue: 'default', limit: 20 },
      // Readership rollup and pruning have their own queue so they can never
      // delay a scheduled publish. The tasks declare their own cron; this
      // runner is what actually executes what they schedule.
      { cron: '* */5 * * * *', queue: 'readership', limit: 5 },
    ],
  },
```

- [ ] **Step 8: Verify the rollup produces correct numbers against a real database**

With `docker compose up -d` and `npm run dev` running, seed three views for one published post via the ping endpoint (varying `maxScroll` and `engagedMs` so exactly one qualifies as a read), then trigger the rollup directly:

```bash
npx tsx -e "
import { getPayload } from 'payload'
import config from './src/payload.config.ts'
import { rollupDays } from './src/jobs/readershipRollup.ts'
const payload = await getPayload({ config })
await rollupDays(payload, [new Date().toISOString().slice(0,10)])
const rows = await payload.find({ collection: 'readership-daily', overrideAccess: true })
console.log(JSON.stringify(rows.docs, null, 2))
process.exit(0)
"
```

Expected: one row with `views: 3`, `reads: 1`, and a non-null `scrollP50`. Run the same command a second time and confirm the numbers are **identical** — that is the idempotency check.

- [ ] **Step 9: Run the full test suite and commit**

Run: `npm test`
Expected: PASS, all suites.

```bash
git add src/readership/summarise.ts src/readership/summarise.test.ts src/jobs/ src/payload.config.ts
git commit -m "Roll readership views up daily and prune raw rows"
```

---

## Task 9: Measurement core (SITE)

Pure functions, no DOM and no network, so the risky arithmetic is testable in isolation.

**Files:**
- Create: `SITE/src/lib/readership.ts`
- Test: `SITE/src/lib/readership.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `referrerOrigin(referrer: string, currentOrigin: string): string | null`
  - `scrollPercent(box: { top: number; height: number }, viewportHeight: number): number`
  - `createEngagedTimer(now: number): { resume(now: number): void; pause(now: number): void; elapsed(now: number): number }`
  - `MAX_ENGAGED_MS: 1_800_000`

- [ ] **Step 1: Write the failing test**

Create `src/lib/readership.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { createEngagedTimer, MAX_ENGAGED_MS, referrerOrigin, scrollPercent } from '@/lib/readership'

describe('referrerOrigin', () => {
  it('returns the origin of a cross-origin referrer', () => {
    expect(referrerOrigin('https://www.linkedin.com/feed/x', 'https://stablezact.com'))
      .toBe('https://www.linkedin.com')
  })

  it('drops the path and query, so no reading history leaves the browser', () => {
    expect(referrerOrigin('https://x.com/a/b?utm=1#f', 'https://stablezact.com')).toBe('https://x.com')
  })

  it('returns null for same-origin navigation', () => {
    expect(referrerOrigin('https://stablezact.com/blog', 'https://stablezact.com')).toBeNull()
  })

  it('returns null for an empty or unparseable referrer', () => {
    expect(referrerOrigin('', 'https://stablezact.com')).toBeNull()
    expect(referrerOrigin('nonsense', 'https://stablezact.com')).toBeNull()
  })
})

describe('scrollPercent', () => {
  const viewport = 800

  it('is 0 when the article starts below the fold', () => {
    expect(scrollPercent({ top: 900, height: 4000 }, viewport)).toBe(0)
  })

  it('grows as the article scrolls past the viewport bottom', () => {
    // 800 of the 4000px article has passed the viewport bottom.
    expect(scrollPercent({ top: 0, height: 4000 }, viewport)).toBe(20)
  })

  it('is 100 once the end of the article has been reached', () => {
    expect(scrollPercent({ top: -3200, height: 4000 }, viewport)).toBe(100)
  })

  it('never exceeds 100 when scrolled past the article into the footer', () => {
    expect(scrollPercent({ top: -9000, height: 4000 }, viewport)).toBe(100)
  })

  it('returns 0 for an unrendered article rather than falsely reporting a read', () => {
    expect(scrollPercent({ top: 0, height: 0 }, viewport)).toBe(0)
  })
})

describe('createEngagedTimer', () => {
  it('counts time while running', () => {
    const timer = createEngagedTimer(0)
    expect(timer.elapsed(5000)).toBe(5000)
  })

  it('stops counting while paused', () => {
    const timer = createEngagedTimer(0)
    timer.pause(1000)
    expect(timer.elapsed(9000)).toBe(1000)
  })

  it('resumes without losing what it already counted', () => {
    const timer = createEngagedTimer(0)
    timer.pause(1000)
    timer.resume(5000)
    expect(timer.elapsed(6000)).toBe(2000)
  })

  it('ignores a second pause while already paused', () => {
    const timer = createEngagedTimer(0)
    timer.pause(1000)
    timer.pause(4000)
    expect(timer.elapsed(9000)).toBe(1000)
  })

  it('caps at 30 minutes so a tab left open overnight cannot skew the average', () => {
    const timer = createEngagedTimer(0)
    expect(timer.elapsed(24 * 60 * 60 * 1000)).toBe(MAX_ENGAGED_MS)
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- readership`
Expected: FAIL — cannot find module `@/lib/readership`.

- [ ] **Step 3: Implement**

Create `src/lib/readership.ts`:

```ts
/**
 * Measurement primitives for blog readership. Deliberately free of DOM and
 * network access so the arithmetic can be tested directly — see
 * docs/superpowers/specs/2026-09-07-blog-analytics-design.md.
 */

/** A tab left open overnight must not drag the average up. */
export const MAX_ENGAGED_MS = 30 * 60 * 1000

/**
 * The origin of the referring page, or null when there is none or it is our
 * own. Only the origin ever leaves the browser: the path would describe what
 * else the reader was looking at.
 */
export function referrerOrigin(referrer: string, currentOrigin: string): string | null {
  if (!referrer) return null
  try {
    const { origin } = new URL(referrer)
    return origin === currentOrigin ? null : origin
  } catch {
    return null
  }
}

/**
 * How far through the article body the reader has scrolled, 0–100.
 *
 * Measured against the article's own box rather than the document, because the
 * footer and CTA card sit below it — scrolling to the bottom of the page is not
 * the same as finishing the article, and counting it as such would inflate
 * every read rate on the site.
 *
 * `box` is a viewport-relative rect (`getBoundingClientRect()`), so `top` goes
 * negative as the article scrolls up past the top of the screen.
 */
export function scrollPercent(box: { top: number; height: number }, viewportHeight: number): number {
  if (box.height <= 0) return 0
  const passed = viewportHeight - box.top
  return Math.max(0, Math.min(100, Math.round((passed / box.height) * 100)))
}

export interface EngagedTimer {
  resume(now: number): void
  pause(now: number): void
  elapsed(now: number): number
}

/**
 * Accumulates time the reader was actually present — the tab visible and
 * focused — rather than wall-clock time on the page. Starts running.
 */
export function createEngagedTimer(now: number): EngagedTimer {
  let accumulated = 0
  let startedAt: number | null = now

  return {
    resume(at) {
      if (startedAt === null) startedAt = at
    },
    pause(at) {
      if (startedAt === null) return
      accumulated += Math.max(0, at - startedAt)
      startedAt = null
    },
    elapsed(at) {
      const live = startedAt === null ? 0 : Math.max(0, at - startedAt)
      return Math.min(MAX_ENGAGED_MS, accumulated + live)
    },
  }
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- readership`
Expected: PASS, 14 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/readership.ts src/lib/readership.test.ts
git commit -m "Add readership measurement primitives"
```

---

## Task 10: The beacon hook (SITE)

**Files:**
- Create: `SITE/src/lib/useReadership.ts`
- Modify: `SITE/src/vite-env.d.ts`
- Test: `SITE/src/lib/useReadership.test.tsx`

**Interfaces:**
- Consumes: `referrerOrigin`, `scrollPercent`, `createEngagedTimer` (Task 9)
- Produces: `useReadership(slug: string | undefined, bodyRef: RefObject<HTMLElement | null>): void`

- [ ] **Step 1: Declare the env variable that is already in use**

`src/vite-env.d.ts` declares `VITE_GA4_ID` and `VITE_CLARITY_ID` but not `VITE_CMS_URL`, even though `src/pages/BlogPreview.tsx:16` already reads it. Add it:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA4_ID?: string
  readonly VITE_CLARITY_ID?: string
  readonly VITE_CMS_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/useReadership.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useReadership } from '@/lib/useReadership'

const sent: Array<Record<string, unknown>> = []

function Harness({ slug }: { slug: string | undefined }) {
  const ref = useRef<HTMLElement | null>(null)
  useReadership(slug, ref)
  return <article ref={ref as React.Ref<HTMLElement>}>body</article>
}

function setVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', { value: state, configurable: true })
  document.dispatchEvent(new Event('visibilitychange'))
}

beforeEach(() => {
  sent.length = 0
  vi.stubEnv('VITE_CMS_URL', 'https://cms.test')
  vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
    sent.push(JSON.parse(String(init?.body)))
    return new Response(null, { status: 204 })
  }))
  // jsdom's navigator is read-only, so define the single property rather than
  // replacing the whole object — stubGlobal('navigator', …) breaks other APIs.
  Object.defineProperty(navigator, 'sendBeacon', {
    configurable: true,
    writable: true,
    value: vi.fn((_url: string, body: Blob) => {
      void body.text().then((text) => sent.push(JSON.parse(text)))
      return true
    }),
  })
  setVisibility('visible')
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('useReadership', () => {
  it('sends a view beacon on mount', async () => {
    render(<Harness slug="a-post" />)
    expect(sent).toHaveLength(1)
    expect(sent[0]).toMatchObject({ slug: 'a-post' })
    expect(sent[0]!.viewId).toEqual(expect.any(String))
  })

  it('sends no beacon without a slug', () => {
    render(<Harness slug={undefined} />)
    expect(sent).toHaveLength(0)
  })

  it('sends no beacon when the CMS URL is not configured', () => {
    vi.stubEnv('VITE_CMS_URL', '')
    render(<Harness slug="a-post" />)
    expect(sent).toHaveLength(0)
  })

  it('sends an engagement beacon carrying the same viewId when the tab is hidden', async () => {
    render(<Harness slug="a-post" />)
    setVisibility('hidden')
    await vi.waitFor(() => expect(sent).toHaveLength(2))
    expect(sent[1]!.viewId).toBe(sent[0]!.viewId)
    expect(sent[1]).toHaveProperty('maxScroll')
    expect(sent[1]).toHaveProperty('engagedMs')
  })

  it('does not send a second engagement beacon when nothing changed', async () => {
    render(<Harness slug="a-post" />)
    setVisibility('hidden')
    await vi.waitFor(() => expect(sent).toHaveLength(2))
    setVisibility('visible')
    setVisibility('hidden')
    await new Promise((resolve) => setTimeout(resolve, 20))
    expect(sent).toHaveLength(2)
  })

  it('sends an engagement beacon on unmount, for SPA navigation away', async () => {
    const view = render(<Harness slug="a-post" />)
    view.unmount()
    await vi.waitFor(() => expect(sent).toHaveLength(2))
  })
})
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npm test -- useReadership`
Expected: FAIL — cannot find module `@/lib/useReadership`.

- [ ] **Step 4: Implement**

Create `src/lib/useReadership.ts`:

```ts
import { useEffect, type RefObject } from 'react'
import { createEngagedTimer, referrerOrigin, scrollPercent } from '@/lib/readership'

/**
 * Reports one blog post view to the CMS: a view beacon on mount and an
 * engagement beacon on leaving.
 *
 * Nothing here is persisted in the browser. `viewId` lives for the life of the
 * effect and is gone when the tab closes — no cookie, no localStorage, and so
 * no consent gate. See the spec for why measurement is split across two
 * beacons rather than sent once at the end.
 */
export function useReadership(slug: string | undefined, bodyRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const cmsUrl = import.meta.env.VITE_CMS_URL
    if (!cmsUrl || !slug) return

    const endpoint = `${cmsUrl.replace(/\/$/, '')}/api/readership/ping`
    const viewId = crypto.randomUUID()
    const timer = createEngagedTimer(Date.now())
    let maxScroll = 0
    let lastSent: string | null = null

    /**
     * text/plain is the point: it is CORS-safelisted, so neither beacon
     * triggers a preflight — which `sendBeacon` cannot answer.
     */
    function send(payload: Record<string, unknown>, useBeacon: boolean): void {
      const body = JSON.stringify(payload)
      try {
        if (useBeacon && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' }))
          return
        }
        void fetch(endpoint, {
          method: 'POST',
          body,
          keepalive: true,
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          // Analytics must never surface as an error to the reader.
        }).catch(() => {})
      } catch {
        // A blocked or failed beacon is a missing data point, nothing more.
      }
    }

    send({ viewId, slug, referrer: referrerOrigin(document.referrer, window.location.origin) }, false)

    function measure(): void {
      const element = bodyRef.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      maxScroll = Math.max(
        maxScroll,
        scrollPercent({ top: rect.top, height: rect.height }, window.innerHeight),
      )
    }

    function flush(useBeacon: boolean): void {
      measure()
      const payload = { viewId, maxScroll, engagedMs: timer.elapsed(Date.now()) }
      // A reader who leaves, returns and leaves again should not cost two
      // identical writes; the server takes the maximum anyway.
      const fingerprint = `${payload.maxScroll}:${payload.engagedMs}`
      if (fingerprint === lastSent) return
      lastSent = fingerprint
      send(payload, useBeacon)
    }

    function onVisibilityChange(): void {
      if (document.visibilityState === 'hidden') {
        timer.pause(Date.now())
        flush(true)
      } else {
        timer.resume(Date.now())
      }
    }

    function onBlur(): void {
      timer.pause(Date.now())
    }

    function onFocus(): void {
      timer.resume(Date.now())
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure, { passive: true })
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      timer.pause(Date.now())
      // Route change away from the post: same report, but the page is not
      // going away, so a normal keepalive request is fine.
      flush(false)
    }
  }, [slug, bodyRef])
}
```

- [ ] **Step 5: Run the tests**

Run: `npm test -- useReadership`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add src/lib/useReadership.ts src/lib/useReadership.test.tsx src/vite-env.d.ts
git commit -m "Report blog post readership from the article page"
```

---

## Task 11: Wire the hook into published posts (SITE)

`BlogArticle` is shared by the published post page and the draft preview page. Instrumentation must reach only the first, so the ref is owned by `BlogPost` and passed down — preview simply never passes one. That makes "drafts are not counted" structural rather than a conditional someone can later get wrong.

**Files:**
- Modify: `SITE/src/components/blog/BlogArticle.tsx:136`
- Modify: `SITE/src/pages/BlogPost.tsx`
- Test: `SITE/src/pages/BlogPost.test.tsx`

**Interfaces:**
- Consumes: `useReadership` (Task 10)
- Produces: `BlogArticle` accepts `bodyRef?: Ref<HTMLElement>`

- [ ] **Step 1: Write the failing test**

Create `src/pages/BlogPost.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const useReadership = vi.fn()
vi.mock('@/lib/useReadership', () => ({ useReadership: (...args: unknown[]) => useReadership(...args) }))

const { default: BlogPost } = await import('@/pages/BlogPost')
const { getAllPosts } = await import('@/data/blog')

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog" element={<div>index</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

beforeEach(() => useReadership.mockClear())
afterEach(() => vi.clearAllMocks())

describe('BlogPost', () => {
  it('reports readership for the post being viewed', () => {
    const slug = getAllPosts()[0]!.slug
    renderAt(`/blog/${slug}`)
    expect(useReadership).toHaveBeenCalledWith(slug, expect.objectContaining({ current: expect.anything() }))
  })

  it('attaches the ref to the article element it measures', () => {
    const slug = getAllPosts()[0]!.slug
    renderAt(`/blog/${slug}`)
    const ref = useReadership.mock.calls[0]![1] as { current: HTMLElement | null }
    expect(ref.current?.tagName).toBe('ARTICLE')
  })
})
```

Check `src/data/blog.ts` for the exact export name that lists posts; if it is not `getAllPosts`, use whatever it exports and adjust.

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- BlogPost`
Expected: FAIL — `useReadership` was not called.

- [ ] **Step 3: Let `BlogArticle` expose its body element**

In `src/components/blog/BlogArticle.tsx`, add `bodyRef` to the component's props and attach it to the existing `<article>` at line 136:

```tsx
              <article ref={bodyRef} className="flex min-w-0 flex-col gap-9">
```

Change the component's props to:

```tsx
export function BlogArticle({ post, bodyRef }: { post: BlogPost; bodyRef?: Ref<HTMLElement> }) {
```

with `Ref` imported from `react`, and this comment above the prop:

```tsx
  // The published post page passes this so readership can be measured against
  // the article's own box. The draft preview deliberately passes nothing —
  // that is what keeps editors reviewing drafts out of the numbers.
```

Keep the existing `post` prop type exactly as it is declared today; only add `bodyRef`.

- [ ] **Step 4: Own the ref and call the hook in `BlogPost`**

Rewrite the `Article` component in `src/pages/BlogPost.tsx`:

```tsx
function Article({ post }: { post: Post }) {
  // Cover images are copied into the site, so post.image is site-relative.
  // Social crawlers need an absolute URL, so prefix the production origin.
  usePageMeta(`${post.title} | Stablezact`, post.metaDescription, {
    image: post.image.startsWith('http') ? post.image : `https://stablezact.com${post.image}`,
    type: 'article',
  })

  // Owned here rather than inside BlogArticle because BlogArticle is shared
  // with the draft preview route, which must never be counted.
  const bodyRef = useRef<HTMLElement | null>(null)
  useReadership(post.slug, bodyRef)

  return <BlogArticle post={post} bodyRef={bodyRef} />
}
```

with `import { useRef } from 'react'` and `import { useReadership } from '@/lib/useReadership'` added at the top.

- [ ] **Step 5: Run the tests**

Run: `npm test -- BlogPost`
Expected: PASS, 2 tests.

- [ ] **Step 6: Confirm the preview route is untouched**

Run: `npm test`
Expected: PASS, all suites — including the existing `BlogPreview` behaviour.

Then grep to prove the negative:

```bash
grep -rn "useReadership" src/pages/BlogPreview.tsx
```

Expected: no matches.

- [ ] **Step 7: Verify in a browser against a running CMS**

With the CMS running locally and `VITE_CMS_URL=http://localhost:3000` in the site's `.env`:

```bash
npm run dev
```

Open a blog post, scroll to the bottom, wait 35 seconds, then switch to another tab. In the CMS database:

```bash
docker compose exec -T db psql -U blog -d blog_cms \
  -c "SELECT view_id, max_scroll, engaged_ms FROM readership_views ORDER BY created_at DESC LIMIT 1;"
```

Expected: one row with `max_scroll` near 100 and `engaged_ms` above 30000. Open the browser devtools Network tab and confirm **no OPTIONS preflight** was sent for either beacon — if one appears, the content type is wrong.

- [ ] **Step 8: Commit**

```bash
git add src/components/blog/BlogArticle.tsx src/pages/BlogPost.tsx src/pages/BlogPost.test.tsx
git commit -m "Measure readership on published posts only"
```

---

## Task 12: Summary endpoint (CMS)

**Files:**
- Create: `CMS/src/endpoints/readershipSummary.ts`
- Modify: `CMS/src/payload.config.ts`
- Test: `CMS/src/endpoints/readershipSummary.test.ts`

**Interfaces:**
- Consumes: the `readership-daily` collection (Task 4)
- Produces:
  - `GET /api/readership/summary?post=<id>&days=<7|30|90>`
  - `parseRange(raw: string | null, now?: Date): { from: string; to: string; days: number }`
  - `foldSeries(rows: DailyRow[]): PostSummary` where `PostSummary = { views, uniques, reads, readRate, scrollP50, engagedMsAvg, referrers, byType, series: Array<{ day, views, reads }> }`

- [ ] **Step 1: Write the failing test**

Create `src/endpoints/readershipSummary.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { foldSeries, parseRange, type DailyRow } from './readershipSummary'

const now = new Date('2026-09-07T12:00:00Z')

function daily(overrides: Partial<DailyRow> = {}): DailyRow {
  return {
    day: '2026-09-07', views: 0, uniques: 0, reads: 0, scrollP50: null, engagedMsAvg: null,
    direct: 0, search: 0, social: 0, referral: 0, referrers: {}, ...overrides,
  }
}

describe('parseRange', () => {
  it('defaults to 30 days', () => {
    expect(parseRange(null, now)).toEqual({ from: '2026-08-09', to: '2026-09-07', days: 30 })
  })

  it('accepts the supported ranges', () => {
    expect(parseRange('7', now).days).toBe(7)
    expect(parseRange('90', now).days).toBe(90)
  })

  it('falls back to 30 for an unsupported or hostile value', () => {
    expect(parseRange('99999', now).days).toBe(30)
    expect(parseRange('drop table', now).days).toBe(30)
  })
})

describe('foldSeries', () => {
  it('sums counts across days', () => {
    const result = foldSeries([
      daily({ day: '2026-09-06', views: 10, uniques: 8, reads: 3 }),
      daily({ day: '2026-09-07', views: 5, uniques: 5, reads: 2 }),
    ])
    expect(result).toMatchObject({ views: 15, uniques: 13, reads: 5 })
  })

  it('computes read rate from the totals', () => {
    expect(foldSeries([daily({ views: 200, reads: 50 })]).readRate).toBe(0.25)
  })

  it('reports a null read rate when there are no views, rather than dividing by zero', () => {
    expect(foldSeries([]).readRate).toBeNull()
  })

  it('weights the scroll median by views rather than treating each day equally', () => {
    const result = foldSeries([
      daily({ views: 100, scrollP50: 80 }),
      daily({ views: 1, scrollP50: 10 }),
    ])
    expect(result.scrollP50).toBe(79)
  })

  it('merges referring domains across days', () => {
    const result = foldSeries([
      daily({ referrers: { 'a.com': 2 } }),
      daily({ referrers: { 'a.com': 3, 'b.com': 1 } }),
    ])
    expect(result.referrers).toEqual({ 'a.com': 5, 'b.com': 1 })
  })

  it('returns a day-ordered series for the chart', () => {
    const result = foldSeries([
      daily({ day: '2026-09-07', views: 5, reads: 1 }),
      daily({ day: '2026-09-06', views: 9, reads: 4 }),
    ])
    expect(result.series).toEqual([
      { day: '2026-09-06', views: 9, reads: 4 },
      { day: '2026-09-07', views: 5, reads: 1 },
    ])
  })
})
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- readershipSummary`
Expected: FAIL — cannot find module `./readershipSummary`.

- [ ] **Step 3: Implement**

Create `src/endpoints/readershipSummary.ts`:

```ts
import type { Endpoint } from 'payload'
import { utcDay } from '../readership/visitorHash'

const SUPPORTED_RANGES = [7, 30, 90]
const DEFAULT_RANGE = 30

export interface DailyRow {
  day: string
  views: number
  uniques: number
  reads: number
  scrollP50: number | null
  engagedMsAvg: number | null
  direct: number
  search: number
  social: number
  referral: number
  referrers: Record<string, number>
}

export interface PostSummary {
  views: number
  uniques: number
  reads: number
  readRate: number | null
  scrollP50: number | null
  engagedMsAvg: number | null
  referrers: Record<string, number>
  byType: { direct: number; search: number; social: number; referral: number }
  series: Array<{ day: string; views: number; reads: number }>
}

export function parseRange(raw: string | null, now: Date = new Date()): { from: string; to: string; days: number } {
  const requested = Number(raw)
  const days = SUPPORTED_RANGES.includes(requested) ? requested : DEFAULT_RANGE
  const from = new Date(now.getTime() - (days - 1) * 24 * 60 * 60 * 1000)
  return { from: utcDay(from), to: utcDay(now), days }
}

/**
 * Fold a post's daily rows into one summary.
 *
 * Averages are weighted by views: a day with one visitor must not pull the
 * median scroll as hard as a day with four hundred. Summing days and dividing
 * by the day count — the obvious implementation — gets this wrong.
 */
export function foldSeries(rows: DailyRow[]): PostSummary {
  const ordered = [...rows].sort((a, b) => a.day.localeCompare(b.day))

  let views = 0
  let uniques = 0
  let reads = 0
  let scrollWeight = 0
  let scrollTotal = 0
  let engagedWeight = 0
  let engagedTotal = 0
  const referrers: Record<string, number> = {}
  const byType = { direct: 0, search: 0, social: 0, referral: 0 }

  for (const row of ordered) {
    views += row.views
    uniques += row.uniques
    reads += row.reads
    byType.direct += row.direct
    byType.search += row.search
    byType.social += row.social
    byType.referral += row.referral

    if (row.scrollP50 !== null) {
      scrollTotal += row.scrollP50 * row.views
      scrollWeight += row.views
    }
    if (row.engagedMsAvg !== null) {
      engagedTotal += row.engagedMsAvg * row.views
      engagedWeight += row.views
    }
    for (const [domain, count] of Object.entries(row.referrers ?? {})) {
      referrers[domain] = (referrers[domain] ?? 0) + count
    }
  }

  return {
    views,
    uniques,
    reads,
    readRate: views === 0 ? null : reads / views,
    scrollP50: scrollWeight === 0 ? null : Math.round(scrollTotal / scrollWeight),
    engagedMsAvg: engagedWeight === 0 ? null : Math.round(engagedTotal / engagedWeight),
    referrers,
    byType,
    series: ordered.map((row) => ({ day: row.day, views: row.views, reads: row.reads })),
  }
}

/**
 * Dashboard data. Authenticated off the normal Payload session, and reads only
 * the rollup table — raw view rows never leave the database.
 */
export const readershipSummaryEndpoint: Endpoint = {
  path: '/readership/summary',
  method: 'get',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const url = new URL(req.url ?? '', 'http://localhost')
    const { from, to, days } = parseRange(url.searchParams.get('days'))
    const postId = url.searchParams.get('post')

    const where: Record<string, unknown> = {
      and: [{ day: { greater_than_equal: from } }, { day: { less_than_equal: to } }],
    }
    if (postId) {
      ;(where.and as unknown[]).push({ post: { equals: postId } })
    }

    const result = await req.payload.find({
      collection: 'readership-daily',
      where,
      limit: 100_000,
      pagination: false,
      depth: 0,
      overrideAccess: true,
    })

    const byPost = new Map<string, DailyRow[]>()
    for (const doc of result.docs) {
      const key = String(doc.post)
      const rows = byPost.get(key) ?? []
      rows.push({
        day: doc.day as string,
        views: (doc.views ?? 0) as number,
        uniques: (doc.uniques ?? 0) as number,
        reads: (doc.reads ?? 0) as number,
        scrollP50: (doc.scrollP50 ?? null) as number | null,
        engagedMsAvg: (doc.engagedMsAvg ?? null) as number | null,
        direct: (doc.direct ?? 0) as number,
        search: (doc.search ?? 0) as number,
        social: (doc.social ?? 0) as number,
        referral: (doc.referral ?? 0) as number,
        referrers: (doc.referrers ?? {}) as Record<string, number>,
      })
      byPost.set(key, rows)
    }

    if (postId) {
      return Response.json({ range: { from, to, days }, summary: foldSeries(byPost.get(postId) ?? []) })
    }

    // Site-wide: one summary per post, plus the totals across all of them.
    const posts = await req.payload.find({
      collection: 'posts',
      limit: 1000,
      depth: 0,
      overrideAccess: true,
    })
    const titles = new Map(posts.docs.map((doc) => [String(doc.id), { title: doc.title as string, slug: doc.slug as string, publishedAt: doc.publishedAt as string }]))

    return Response.json({
      range: { from, to, days },
      total: foldSeries([...byPost.values()].flat()),
      posts: [...byPost.entries()].map(([id, rows]) => ({
        id,
        ...(titles.get(id) ?? { title: '(deleted post)', slug: '', publishedAt: '' }),
        summary: foldSeries(rows),
      })),
    })
  },
}
```

- [ ] **Step 4: Run the tests**

Run: `npm test -- readershipSummary`
Expected: PASS, 9 tests.

- [ ] **Step 5: Register the endpoint**

In `src/payload.config.ts`:

```ts
import { readershipSummaryEndpoint } from './endpoints/readershipSummary'
```

```ts
endpoints: [previewEndpoint, readershipPingEndpoint, readershipSummaryEndpoint],
```

- [ ] **Step 6: Verify authentication actually blocks**

With `npm run dev` running:

```bash
curl -i 'http://localhost:3000/api/readership/summary?days=30'
```

Expected: `401`. Then log into the admin in a browser, open the same URL in that tab, and confirm JSON comes back.

- [ ] **Step 7: Commit**

```bash
git add src/endpoints/readershipSummary.ts src/endpoints/readershipSummary.test.ts src/payload.config.ts
git commit -m "Serve readership summaries to the admin"
```

---

## Task 13: Charts and the per-post tab (CMS)

**Files:**
- Create: `CMS/src/components/readership/charts.tsx`, `CMS/src/components/readership/PostPerformance.tsx`
- Modify: `CMS/src/collections/Posts.ts`

**Interfaces:**
- Consumes: `GET /api/readership/summary?post=<id>` (Task 12)
- Produces: a `Performance` tab on the post edit screen; `<Sparkline points={number[]} />` and `<BarRow label value total />` for reuse in Task 14

- [ ] **Step 1: Write the chart primitives**

Create `src/components/readership/charts.tsx`:

```tsx
'use client'

/**
 * Hand-rolled SVG rather than a chart library. A sparkline and a bar are a few
 * dozen lines each, and the admin bundle is heavy enough already. If the
 * charting needs ever outgrow this, that is the moment to add a dependency.
 */

export function Sparkline({ points, height = 40 }: { points: number[]; height?: number }) {
  if (points.length === 0) return null
  const width = Math.max(points.length * 8, 120)
  const max = Math.max(...points, 1)
  const step = points.length > 1 ? width / (points.length - 1) : width
  const path = points
    .map((value, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${(height - (value / max) * height).toFixed(1)}`)
    .join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} role="img" aria-label="Daily views">
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

export function BarRow({ label, value, total }: { label: string; value: number; total: number }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
      <span style={{ minWidth: 120, fontSize: 13 }}>{label}</span>
      <span style={{ flex: 1, background: 'var(--theme-elevation-100)', height: 8, borderRadius: 4 }}>
        <span style={{ display: 'block', width: `${percent}%`, height: '100%', background: 'currentColor', borderRadius: 4 }} />
      </span>
      <span style={{ minWidth: 72, fontSize: 13, textAlign: 'right' }}>
        {value.toLocaleString()} ({percent}%)
      </span>
    </div>
  )
}
```

- [ ] **Step 2: Write the per-post panel**

Create `src/components/readership/PostPerformance.tsx`:

```tsx
'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import { useEffect, useState } from 'react'
import { BarRow, Sparkline } from './charts'

/** Below this many views a read rate is noise, and presenting it as a number would mislead. */
const LOW_SAMPLE_VIEWS = 100

interface Summary {
  views: number
  uniques: number
  reads: number
  readRate: number | null
  scrollP50: number | null
  engagedMsAvg: number | null
  referrers: Record<string, number>
  byType: { direct: number; search: number; social: number; referral: number }
  series: Array<{ day: string; views: number; reads: number }>
}

function Stat({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div style={{ minWidth: 120 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, opacity: muted ? 0.45 : 1 }}>{value}</div>
    </div>
  )
}

export default function PostPerformance() {
  const { id } = useDocumentInfo()
  const [summary, setSummary] = useState<Summary | null>(null)
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    if (!id) return
    let cancelled = false
    fetch(`/api/readership/summary?post=${id}&days=30`, { credentials: 'include' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((data) => {
        if (cancelled) return
        setSummary(data.summary)
        setState('ready')
      })
      .catch(() => !cancelled && setState('error'))
    return () => {
      cancelled = true
    }
  }, [id])

  if (!id) return <p>Save the post first — there is nothing to measure yet.</p>
  if (state === 'loading') return <p>Loading…</p>
  if (state === 'error') return <p>Could not load readership figures.</p>
  if (!summary || summary.views === 0) {
    return <p>No readership recorded in the last 30 days. Newly published posts take up to an hour to appear.</p>
  }

  const lowSample = summary.views < LOW_SAMPLE_VIEWS
  const total = summary.byType.direct + summary.byType.search + summary.byType.social + summary.byType.referral

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <Stat label="Views" value={summary.views.toLocaleString()} />
        <Stat label="Unique readers" value={summary.uniques.toLocaleString()} />
        <Stat label="Reads" value={summary.reads.toLocaleString()} />
        <Stat
          label={lowSample ? 'Read rate (low sample)' : 'Read rate'}
          value={summary.readRate === null ? '—' : `${Math.round(summary.readRate * 100)}%`}
          muted={lowSample}
        />
        <Stat label="Median scroll" value={summary.scrollP50 === null ? '—' : `${summary.scrollP50}%`} />
        <Stat
          label="Avg. time"
          value={summary.engagedMsAvg === null ? '—' : `${Math.round(summary.engagedMsAvg / 1000)}s`}
        />
      </div>

      <div>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Views, last 30 days</div>
        <Sparkline points={summary.series.map((point) => point.views)} />
      </div>

      <div>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Where readers came from</div>
        <BarRow label="Direct" value={summary.byType.direct} total={total} />
        <BarRow label="Search" value={summary.byType.search} total={total} />
        <BarRow label="Social" value={summary.byType.social} total={total} />
        <BarRow label="Referral" value={summary.byType.referral} total={total} />
      </div>

      {Object.keys(summary.referrers).length > 0 && (
        <div>
          <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Top referring sites</div>
          {Object.entries(summary.referrers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([domain, count]) => (
              <BarRow key={domain} label={domain} value={count} total={total} />
            ))}
        </div>
      )}

      <p style={{ fontSize: 12, opacity: 0.6 }}>
        First-party, cookieless measurement. These figures count every reader, so they will be higher
        than Google Analytics, which only counts visitors who accept the cookie banner.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Add the tab to the Posts collection**

The current `fields` array is flat. Wrap it in tabs so the writing surface is untouched and performance gets its own space. In `src/collections/Posts.ts`, replace `fields: [ ... ]` with:

```ts
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          // Move the nine existing field objects here verbatim — `title`,
          // `content`, `slug`, `publishedAt`, `author`, `categories`,
          // `coverImage`, `excerpt`, `metaDescription` — cut from the current
          // `fields` array (src/collections/Posts.ts:48-120) with no edits of
          // any kind. Changing a `name` here renames a database column.
          fields: [],
        },
        {
          label: 'Performance',
          description: 'Readership for the last 30 days. Updates hourly.',
          fields: [
            {
              name: 'performance',
              type: 'ui',
              admin: {
                components: {
                  Field: '/components/readership/PostPerformance#default',
                },
              },
            },
          ],
        },
      ],
    },
  ],
```

Sidebar-positioned fields (`slug`, `publishedAt`, `author`, `categories`, `coverImage`, `excerpt`, `metaDescription`) keep `admin.position: 'sidebar'` and continue to render in the sidebar regardless of which tab they are declared in — do not change them.

- [ ] **Step 4: Regenerate the import map**

Payload resolves admin components through a generated import map; a component that is not in it renders as nothing.

```bash
npm run generate:importmap
```

- [ ] **Step 5: Verify no schema change was introduced**

A `ui` field stores nothing, and tabs without a `name` do not nest data. Confirm:

```bash
npm run migrate:create -- verify-no-change
```

Expected: Payload reports no schema changes. **Delete the generated file if one was produced anyway**, and investigate before continuing — this step exists because a wrongly-shaped tab silently renames every column under it.

- [ ] **Step 6: Verify in the admin**

Run `npm run dev`, open a published post that has view rows from Task 11's verification, and click the Performance tab. Confirm the stats render, the sparkline draws, and a post with fewer than 100 views shows the read rate greyed with the "low sample" label.

- [ ] **Step 7: Commit**

```bash
git add src/components/readership/ src/collections/Posts.ts src/app/\(payload\)/admin/importMap.js
git commit -m "Show each post its own readership on a Performance tab"
```

---

## Task 14: Site-wide dashboard view (CMS)

**Files:**
- Create: `CMS/src/components/readership/BlogPerformanceView.tsx`
- Modify: `CMS/src/payload.config.ts`

**Interfaces:**
- Consumes: `GET /api/readership/summary?days=<n>` (Task 12), `Sparkline`/`BarRow` (Task 13)
- Produces: an admin route at `/admin/blog-performance`, linked in the nav

- [ ] **Step 1: Write the view**

Create `src/components/readership/BlogPerformanceView.tsx`:

```tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { BarRow, Sparkline } from './charts'

const LOW_SAMPLE_VIEWS = 100
const RANGES = [7, 30, 90]

interface Summary {
  views: number
  uniques: number
  reads: number
  readRate: number | null
  scrollP50: number | null
  engagedMsAvg: number | null
  byType: { direct: number; search: number; social: number; referral: number }
  series: Array<{ day: string; views: number; reads: number }>
}

interface PostRow {
  id: string
  title: string
  publishedAt: string
  summary: Summary
}

type SortKey = 'views' | 'uniques' | 'reads' | 'readRate' | 'scrollP50' | 'engagedMsAvg' | 'publishedAt'

export default function BlogPerformanceView() {
  const [days, setDays] = useState(30)
  const [data, setData] = useState<{ total: Summary; posts: PostRow[] } | null>(null)
  const [sort, setSort] = useState<SortKey>('views')
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    setState('loading')
    fetch(`/api/readership/summary?days=${days}`, { credentials: 'include' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
      .then((payload) => {
        if (cancelled) return
        setData({ total: payload.total, posts: payload.posts })
        setState('ready')
      })
      .catch(() => !cancelled && setState('error'))
    return () => {
      cancelled = true
    }
  }, [days])

  const rows = useMemo(() => {
    if (!data) return []
    return [...data.posts].sort((a, b) => {
      if (sort === 'publishedAt') return String(b.publishedAt).localeCompare(String(a.publishedAt))
      return (b.summary[sort] ?? 0) - (a.summary[sort] ?? 0)
    })
  }, [data, sort])

  if (state === 'loading') return <div style={{ padding: 32 }}>Loading…</div>
  if (state === 'error' || !data) return <div style={{ padding: 32 }}>Could not load readership figures.</div>

  const total = data.total
  const sources = total.byType.direct + total.byType.search + total.byType.social + total.byType.referral

  const columns: Array<{ key: SortKey; label: string }> = [
    { key: 'publishedAt', label: 'Published' },
    { key: 'views', label: 'Views' },
    { key: 'uniques', label: 'Unique' },
    { key: 'reads', label: 'Reads' },
    { key: 'readRate', label: 'Read rate' },
    { key: 'scrollP50', label: 'Median scroll' },
    { key: 'engagedMsAvg', label: 'Avg. time' },
  ]

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Blog performance</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {RANGES.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setDays(range)}
              style={{ padding: '4px 12px', fontWeight: days === range ? 700 : 400, cursor: 'pointer' }}
            >
              {range} days
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div><div style={{ fontSize: 12, opacity: 0.7 }}>Views</div><div style={{ fontSize: 26, fontWeight: 600 }}>{total.views.toLocaleString()}</div></div>
        <div><div style={{ fontSize: 12, opacity: 0.7 }}>Unique readers</div><div style={{ fontSize: 26, fontWeight: 600 }}>{total.uniques.toLocaleString()}</div></div>
        <div><div style={{ fontSize: 12, opacity: 0.7 }}>Reads</div><div style={{ fontSize: 26, fontWeight: 600 }}>{total.reads.toLocaleString()}</div></div>
        <div><div style={{ fontSize: 12, opacity: 0.7 }}>Read rate</div><div style={{ fontSize: 26, fontWeight: 600 }}>{total.readRate === null ? '—' : `${Math.round(total.readRate * 100)}%`}</div></div>
      </div>

      <Sparkline points={total.series.map((point) => point.views)} height={64} />

      <div>
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Where readers came from</div>
        <BarRow label="Direct" value={total.byType.direct} total={sources} />
        <BarRow label="Search" value={total.byType.search} total={sources} />
        <BarRow label="Social" value={total.byType.social} total={sources} />
        <BarRow label="Referral" value={total.byType.referral} total={sources} />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px 4px' }}>Post</th>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => setSort(column.key)}
                style={{ textAlign: 'right', padding: '8px 4px', cursor: 'pointer', textDecoration: sort === column.key ? 'underline' : 'none' }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const lowSample = row.summary.views < LOW_SAMPLE_VIEWS
            return (
              <tr key={row.id} style={{ borderTop: '1px solid var(--theme-elevation-100)' }}>
                <td style={{ padding: '8px 4px' }}>
                  <a href={`/admin/collections/posts/${row.id}`}>{row.title}</a>
                </td>
                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{String(row.publishedAt).slice(0, 10)}</td>
                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{row.summary.views.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{row.summary.uniques.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{row.summary.reads.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '8px 4px', opacity: lowSample ? 0.45 : 1 }}>
                  {row.summary.readRate === null ? '—' : `${Math.round(row.summary.readRate * 100)}%`}
                  {lowSample && ' *'}
                </td>
                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{row.summary.scrollP50 === null ? '—' : `${row.summary.scrollP50}%`}</td>
                <td style={{ textAlign: 'right', padding: '8px 4px' }}>{row.summary.engagedMsAvg === null ? '—' : `${Math.round(row.summary.engagedMsAvg / 1000)}s`}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <p style={{ fontSize: 12, opacity: 0.6 }}>
        * Fewer than {LOW_SAMPLE_VIEWS} views — the read rate is not yet meaningful.
        A read is 75% of the article and at least 30 seconds. These figures are first-party and
        cookieless, so they count every reader and will be higher than Google Analytics, which only
        counts visitors who accept the cookie banner.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Register the view and the nav link**

In `src/payload.config.ts`, extend the existing `admin` block:

```ts
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        blogPerformance: {
          Component: '/components/readership/BlogPerformanceView#default',
          path: '/blog-performance',
        },
      },
    },
  },
```

- [ ] **Step 3: Regenerate the import map**

```bash
npm run generate:importmap
```

- [ ] **Step 4: Verify**

Run `npm run dev`, log into the admin, and open `http://localhost:3000/admin/blog-performance`. Confirm: totals render, the range buttons refetch, clicking a column header re-sorts, and a post title links to its edit screen. Log out and load the URL again — it must not render data.

- [ ] **Step 5: Commit**

```bash
git add src/components/readership/BlogPerformanceView.tsx src/payload.config.ts src/app/\(payload\)/admin/importMap.js
git commit -m "Add a site-wide blog performance view to the admin"
```

---

## Task 15: Policy disclosure (SITE)

Per the spec's rollout, this must ship with or before Task 11 reaches production.

**Files:**
- Modify: `SITE/src/pages/PrivacyPolicy.tsx`, `SITE/src/pages/CookiePolicy.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: published disclosure of cookieless measurement

- [ ] **Step 1: Read both pages and find the right section**

```bash
grep -n "Clarity\|Google Analytics\|analytics\|cookie" src/pages/PrivacyPolicy.tsx src/pages/CookiePolicy.tsx
```

Match the existing heading structure and prose style rather than appending a differently-shaped block.

- [ ] **Step 2: Add the disclosure**

Both pages need a passage covering, in the site's own voice:

- We count views and reading depth on blog articles ourselves, on our own servers.
- It sets no cookies and stores nothing in the browser, which is why it is not part of the cookie banner's choices.
- To tell readers apart for a single day we store a one-way hash of IP address and browser, salted with a secret that changes daily and is then deleted — after which the day's hashes cannot be traced to anyone.
- We record: which article, how far down it was scrolled, how long it was open and visible, and which site linked to it.
- We do not record: name, email, precise location, or any identifier that follows a reader between days or between sites.
- Raw records are deleted after 90 days; only per-article daily totals are kept.

The cookie policy additionally needs a sentence explaining why this is *not* listed among the cookie categories: it uses no cookies or browser storage at all.

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```

Expected: both succeed. Then `npm run dev`, open `/privacy-policy` and `/cookie-policy`, and read the new passages in context.

- [ ] **Step 4: Commit**

```bash
git add src/pages/PrivacyPolicy.tsx src/pages/CookiePolicy.tsx
git commit -m "Disclose cookieless blog readership measurement"
```

- [ ] **Step 5: Flag for legal sign-off**

This wording is a description of what the code does, not legal advice. Tell the user it needs review by whoever signs off on legal before it reaches production.

---

## Task 16: End-to-end verification on staging

**Files:** none — this is a verification task with no code.

- [ ] **Step 1: Confirm the CMS environment**

Confirm on Railway that `SITE_URL` and `SITE_STAGING_URL` are both set to the correct origins, and that the CMS has redeployed with every CMS task above.

- [ ] **Step 2: Deploy the site to staging**

```bash
git push staging-deploy staging
```

Confirm the Vercel build succeeds and `VITE_CMS_URL` is set in that build's environment.

- [ ] **Step 3: Produce a real view**

Open a published post on the staging site. Scroll to the end, wait 35 seconds, then close the tab. In the browser devtools Network tab confirm two requests to `/api/readership/ping`, both `204`, and **no OPTIONS preflight**.

- [ ] **Step 4: Confirm the row landed and the rollup ran**

Wait for the top of the next hour, then open `/admin/blog-performance` on the CMS and confirm the view and read appear against the right post.

- [ ] **Step 5: Confirm drafts are not counted**

Open a draft through the CMS Preview button, scroll through it, and confirm no new `/api/readership/ping` request is made.

- [ ] **Step 6: Report**

Report to the user: what was verified, the numbers observed, and anything that did not behave as designed. Do not claim the feature works until steps 3–5 have actually been run and their output seen.

---

## Notes for the executor

- **Two repos, two git histories.** Every `git add`/`git commit` runs in the repo named in that task's Files block. Never stage across repos.
- **The CMS must ship before the site.** Tasks 1–8 and 12–14 are CMS; 9–11 and 15 are SITE. The site's beacons are harmless if the endpoint is missing (they fail silently), but nothing can be verified until it exists.
- **`prodMigrations` means a migration missing from `src/migrations/index.ts` never runs in production.** Task 4 Step 6 is the single most consequential step in this plan.
- **Never claim a task passes without running its verification command and reading the output.**
