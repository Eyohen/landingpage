# Blog analytics: first-party readership measurement in the CMS

Date: 2026-09-07
Status: Approved, ready for implementation planning

## Context

The site already carries two analytics tags, both loaded from `index.html` and both gated
behind cookie consent:

- **Google Analytics 4** (`G-CHV550VCGD`, `index.html:19`). The site is a SPA, so route
  changes fire no hit of their own; `trackPageView` in `src/lib/analytics.ts:42` sends the
  missing `page_view` events. Blog posts get this through
  `usePageMeta` → `usePageView` (`src/pages/BlogPost.tsx:14`).
- **Microsoft Clarity** (`xybku39tvu`, `index.html:28`) for recordings and heatmaps.

Three properties of that setup are why this design exists:

1. **Consent gating undercounts.** `src/lib/consent.ts` defaults `analytics` to `false`, and
   nothing is granted until the visitor accepts the banner. Whatever fraction of readers
   decline or ignore it are absent from every number the marketing team looks at.
2. **There is no read signal.** GA4 reports views and an engagement-time estimate. Nothing
   in the codebase measures how far down a post anyone actually got. "Did this post land?"
   is not answerable today.
3. **The numbers live somewhere else.** Reading them means the GA4 UI, a separate login, and
   a mental model of GA4's dimensions — for a content team whose entire workflow is
   otherwise inside the Payload admin.

The deployment topology constrains where anything can live. The site is a static Vite + React
SPA with no server of its own: production is prerendered and served by Azure Static Web Apps
(`.github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml`,
`public/staticwebapp.config.json`), staging is Vercel via the `staging-deploy` remote, and
`vercel.json` is only a SPA rewrite. The one backend in the picture is the Payload CMS
(`blog-cms`, Payload 3.87.1 on Next 16, Postgres, deployed to Railway), which the site already
calls at runtime for draft previews.

## Goals

- Count every blog reader, not only those who accept the cookie banner.
- Measure whether a post was *read*, not merely opened.
- Put per-post numbers in front of the content team inside the CMS they already use.
- Own the data, in our own database, independent of Google.

## Non-goals

- Replacing GA4 or Clarity. They stay; this is additive and covers the blog only.
- Site-wide analytics for non-blog pages.
- Showing view counts to the public on the site itself.
- CSV export, per-author aggregation, email digests, or reconciliation against GA4 figures.
  All are straightforward additions on this schema; none is needed to answer the question
  that prompted the work.
- A device or browser breakdown. Clarity already covers that ground.

## Decisions

| Decision | Choice |
| --- | --- |
| Where ingest lives | A custom endpoint in the Payload CMS, following `src/endpoints/preview.ts` |
| Where data lives | Postgres, via Payload collections and a bundled migration |
| Where the dashboard lives | The Payload admin: a per-post tab plus a site-wide view |
| Consent | Not required — no cookies, no client-side identifier, no personal data retained |
| Uniqueness | Server-side daily rotating hash of IP + user agent |
| Read definition | `maxScroll >= 75%` **and** `engagedMs >= 30s`, derived server-side |
| Charting | Hand-rolled SVG; no chart library added to the admin bundle |

### Alternatives considered

**An edge collector** (a Vercel or Azure function near the reader, writing to the same
Postgres) would keep pageview traffic off the CMS. Rejected for now: production is Azure and
staging is Vercel, so it means two collectors or an awkward cross-origin one — real
infrastructure for a load blog traffic does not yet produce. The storage schema below is
unchanged by that move, so it stays available later.

**Self-hosting Umami or Plausible on Railway** would deliver a mature product for free.
Rejected because the per-post read-rate semantics still require custom events on top, it adds
a service to run and upgrade, and the "stats next to the post you wrote" experience degrades
to an embedded iframe — which is the specific thing this work is for.

## Collection: what the browser sends

A new module `src/lib/blogStats.ts` in the site repo, called from `BlogPost.tsx`. One post
view produces two beacons.

**Beacon 1 — on mount, fire-and-forget POST:**

```
{ viewId, slug, referrer }
```

`viewId` is a `crypto.randomUUID()` held in a ref. It lives in memory only — never a cookie,
never localStorage — and is gone when the tab closes. `referrer` is reduced to
`document.referrer`'s origin, and only when cross-origin; internal navigation sends nothing.

**Beacon 2 — on leaving, via `navigator.sendBeacon`:**

```
{ viewId, maxScroll, engagedMs }
```

- `maxScroll` is measured against the **article body's** bounding box, not the document.
  Scrolling past the footer and CTA card must not read as finishing the article.
- `engagedMs` accumulates only while the tab is visible and focused, pausing on
  `visibilitychange` and blur, capped at 30 minutes so a tab left open overnight cannot
  poison the average.
- Fired on `visibilitychange → hidden` — the only signal mobile Safari honours, as
  `beforeunload` is unreliable there — and on SPA route change away from the post. A reader
  who returns and leaves again sends a second beacon; the server keeps the maximum.

**Why two beacons rather than one at the end.** The closing beacon will sometimes be dropped.
Splitting them means a dropped beacon costs engagement enrichment for that view but never the
view itself. The headline number stays robust; only the enrichment degrades.

**`read` is derived, not sent.** The client reports raw `maxScroll` and `engagedMs`; the
threshold is applied server-side. Storing the raw numbers allows retuning the threshold after
observing real distributions — with the limitation that retuning re-derives only within the
raw retention window, not across all history.

**Uniqueness without a client identifier.** Computed server-side as
`sha256(dailySalt + ip + userAgent)`. The salt is random, rotates every 24 hours, and the
previous value is discarded, so yesterday's hashes cannot be linked to today's or back to a
person — the approach Plausible and Fathom use. Consequences to accept: one reader on phone
and laptop counts twice, and the uniquing window is a day rather than a session.

**Not instrumented:** `/blog/preview/*`. Editors reviewing drafts must not inflate their own
numbers.

**Content type.** `sendBeacon` cannot set headers, and a JSON content type would trigger a
CORS preflight the beacon cannot satisfy. Both beacons send a `text/plain` Blob; the endpoint
parses JSON from the body.

## Storage

Two Payload collections, both hidden from the admin nav, so types, migrations and access
control stay in the CMS repo's existing flow.

### `blog-view-events` — raw, one row per view, pruned after 90 days

| Field | Notes |
| --- | --- |
| `viewId` | Unique index; beacon 2 locates its row by this |
| `post` | Relationship to `posts`. Ingest resolves the slug and **drops anything not matching a published post** — this rejects junk writes and caps cardinality in one move |
| `visitorHash` | The daily rotating hash |
| `referrerType` | `direct` / `search` / `social` / `referral` |
| `referrerDomain` | Nullable; populated only for `referral` |
| `maxScroll` | Null until beacon 2; clamped 0–100 |
| `engagedMs` | Null until beacon 2; clamped to ≤ 30 min |
| `createdAt`, `day` | `day` indexed for rollup queries |

### `blog-post-stats-daily` — one row per post per day, retained permanently

Views, uniques, reads, `scrollP50`, `engagedMsAvg`, the four referrer-type counts, and a
`referrers` JSON map of the day's top referring domains. This is what the dashboard reads and
what allows the trend line to survive raw pruning.

### Rollup and pruning

`jobs.autoRun` in `payload.config.ts` currently holds one entry — a per-minute runner on the
`default` queue for scheduled publishing. This adds two further entries rather than reusing
that one, so rollup work never competes with publish jobs: an hourly entry (`0 * * * *`) for
the rollup queue and a nightly entry for pruning. The hourly job recomputes today and
yesterday as an idempotent upsert, so the dashboard is never more than an hour stale and a
late-arriving beacon is still counted. The nightly job prunes raw rows past retention. Aggregation uses raw SQL through
`payload.db.drizzle`, since `COUNT(DISTINCT …)` and a median are not expressible in Payload's
find API.

At 50k views per month, raw peaks at roughly 150k rows and ~20MB — not a concern for
Railway's Postgres.

### Access control

Public `create` is `false` on both collections; the ingest endpoint writes with
`overrideAccess: true`. Read is restricted to authenticated CMS users. There is no path from
the public internet to the stored data.

### Abuse controls on the ingest endpoint

It is an unauthenticated write, so:

- Request size cap and strict shape validation; `maxScroll` clamped 0–100, `engagedMs`
  clamped to ≤ 30 minutes.
- Known-crawler user agents dropped before any write.
- Beacon 2 is honoured only when its `viewId` matches a row created within the last 6 hours.
  Without this, anyone could POST fabricated reads.
- Per-hash caps: 30 views per post per day, and 60 requests per minute per hash overall.
  Both are constants, tunable without a schema change.
- The endpoint responds `204` in every case, including rejection, so probing reveals nothing
  about which slugs exist.

**Known limitation, accepted deliberately:** an in-process LRU is the only rate limiting
justified at this scale. Its counters reset on every deploy and would not hold across
replicas. If the CMS ever scales horizontally this must move to Postgres or Redis.

**Endpoint paths.** `POST /api/readership/ping` for ingest, `GET /api/readership/summary` for
the dashboard. The names matter: uBlock Origin's filter lists match on URL substrings, so
anything containing `collect`, `track`, `analytics`, `stats` or `event` would be blocked even
though the endpoint is first-party. The chosen names must be checked against current filter
lists during implementation.

**Referrer classification.** `referrerType` is derived server-side from the referring origin
against a small committed list: known search engines → `search`, known social networks →
`social`, empty or same-origin → `direct`, anything else → `referral`. The list lives in one
module in the CMS repo and is expected to be edited over time.

## Dashboard

Both surfaces are fed by one new authenticated endpoint (`GET /api/readership/summary`,
parameterised by post and date range) that reads only the daily rollup table. It authenticates off `req.user`
— the normal Payload session — so there is no new auth to build.

**Per-post "Performance" tab** on the post edit screen: a `type: 'ui'` field with a custom
component, placed in its own tab rather than the sidebar so it has full width. Shows that
post's views, uniques, reads, read rate, median scroll and average engaged time, a 30-day
sparkline, and its top referrers. An editor opening a post they wrote last month sees how it
did without leaving the screen — the reason the CMS is the right home for this.

**Site-wide "Blog performance" view** at `/admin/blog-performance`, registered through
`admin.components.views` and linked in the nav. A range selector (7 / 30 / 90 days), totals
across all posts, a trend chart, the traffic-source split, and a sortable table of every post:
title, published date, views, uniques, reads, read rate, median scroll, average time. The
sortable table is the screen that answers "which posts actually work".

**Charting.** A sparkline, a trend line and a bar chart are roughly 50 lines of hand-rolled
SVG. Recharts would add ~100kb to an already heavy admin bundle. A library can be adopted
later if the charting needs outgrow that.

**Presenting numbers honestly:**

- Read rate over a small sample is noise. Below ~100 views the figure renders greyed with a
  "low sample" marker rather than as a confident percentage.
- Posts published within the last 24 hours show "still collecting" rather than a number that
  is guaranteed to look bad.
- The view states plainly that these figures will not match GA4, and why.

## Testing

**Site repo** (vitest already configured, `vitest.config.ts`): unit tests for
`src/lib/blogStats.ts` covering scroll math against the article box, engaged-time
accumulation across visibility transitions, beacon 2 firing exactly once per hidden
transition, referrer reduction to type and origin, and no beacon on `/blog/preview/*`.

**CMS repo has no test infrastructure.** `vitest.setup.ts` exists but there is no config, no
test script, and no test files. Standing one up is part of this work, because the rollup
aggregation is the highest-risk code in the design and it fails silently — wrong numbers
still look like numbers. It requires fixture-based tests for views, uniques, reads, median and
average; a test that re-running the rollup is idempotent; and tests for hash rotation, slug
rejection, bot filtering, and the beacon-2 replay guard. The repo's existing
`docker-compose.yml` allows integration tests against a real Postgres.

## Rollout

Each step is independently deployable.

1. CMS: migration, collections, ingest endpoint, hashing, abuse controls. Deployed dark,
   collecting nothing.
2. CMS: add the Azure and Vercel origins to the `cors` list in `payload.config.ts`.
3. Site: `blogStats.ts` wired into `BlogPost.tsx`. Verify on staging that rows land.
4. CMS: rollup job and pruning.
5. CMS: summary endpoint and the two admin surfaces.
6. Privacy policy and cookie policy updated to describe first-party cookieless measurement.
   This must ship **with or before** step 3 reaches production, not after.

## Risks

- **Ad blockers.** A first-party endpoint avoids most blocking, but filter lists match URL
  substrings, so the path must be neutral (see above). Expect a few percent loss regardless.
- **The CMS is now on the blog's traffic path.** If Railway is down, beacons fail and data is
  lost. The site is unaffected: beacons are fire-and-forget, never awaited, and produce no
  user-visible error. A data gap, not an outage.
- **These numbers will not match GA4**, and should be meaningfully higher because there is no
  consent gate. The dashboard says so on its face.
- **Team traffic counts.** Preview routes are excluded; the team reading published posts is
  minor inflation being accepted.
- **Non-JS crawlers are never counted**, which is a feature rather than a gap.
- **Legal review.** The cookieless design is intended to avoid a consent requirement, but the
  policy wording in step 6 should be confirmed by whoever signs off on legal.
