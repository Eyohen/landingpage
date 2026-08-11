# Blog: CMS-driven posts with static rendering

Date: 2026-08-11
Status: Approved, ready for implementation planning

## Context

The blog ships today as two working pages — `/blog` and `/blog/:slug` — built from Figma
nodes `2168:70558` and `2168:70798`. Content is a typed literal in `src/data/blog.ts`
holding a single post. Publishing a second post means a code change and a deploy.

Two properties of the current setup shape everything below:

1. **The site is a client-rendered SPA on a static host.** It is a Vite + React Router app
   deployed to Azure Static Web Apps by
   `.github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml`, which triggers only on
   push to `main` and pull requests targeting `main`. `vercel.json` in the repo is vestigial;
   the live routing config is `public/staticwebapp.config.json`.
2. **Page metadata is applied by JavaScript.** `src/lib/usePageMeta.ts` sets title,
   description, canonical and Open Graph tags in an effect after load. Search crawlers can
   execute JavaScript; the social crawlers used by X, LinkedIn, Slack and WhatsApp do not. As
   things stand, every blog post shared on social shows the landing page's generic title,
   description and image from `index.html`.

Point 2 is the reason this design centres on static HTML rather than on the choice of CMS.
A blog exists to be found and shared. Content that only assembles itself in the browser
fails at both.

## Goals

- Marketing publishes and edits posts through a CMS admin UI, without touching git.
- Every published post is served as static HTML carrying its own metadata.
- Posts can be scheduled to go live at a future date and time.
- Editors can preview an unpublished draft rendered in the real page design.
- Post bodies support rich text, inline images with captions, embeds, and code blocks.
- Posts carry categories; the index filters by category and paginates.

## Non-goals

- Migrating the marketing site to Next.js.
- Publishing that is live in seconds. A rebuild of roughly two minutes is accepted.
- Incremental rebuilds. Every publish rebuilds the whole site, which is appropriate at this
  volume and should not be optimised until it hurts.
- Comments, search, newsletters, or per-post analytics dashboards.

## Decisions

| Decision | Choice |
| --- | --- |
| Authoring | Self-hosted CMS with an admin UI for non-developers |
| CMS | Payload (Node/TypeScript, Postgres) |
| CMS hosting | Its own Azure service with its own Postgres, isolated from `coinleyserver` |
| Media storage | Azure Blob Storage |
| Rendering | Build-time prerender of the existing Vite app via `vite-react-ssg` |
| Publish trigger | Payload hook → GitHub `repository_dispatch` → existing Actions workflow |
| Scheduling | Payload `versions.drafts.schedulePublish` with an `onSuccess` rebuild dispatch |
| Preview | Non-prerendered route in the site, fetching drafts live, `noindex` |
| Embeds | Click-to-load, gated behind cookie consent |

Payload's admin panel is itself a Next.js application. That is contained: the CMS is a
separate internal deployable and does not move the public site toward Next.

## Architecture

Two independently deployed services.

**CMS** — Payload at `cms.stablezact.com`, on its own Azure service backed by its own
Postgres instance. Owns the admin UI, REST API, editor accounts, scheduling, and media
uploads to Azure Blob Storage. No public traffic and no SEO surface.

**Site** — the existing `landingpage` repo, hosting unchanged on Azure Static Web Apps via
the existing workflow. The build gains a step that fetches posts from the CMS and prerenders
one HTML file per post.

```
Editor → Payload admin → Postgres + Blob Storage
                ↓ (publish / scheduled publish)
        repository_dispatch → GitHub Actions → build (fetch + prerender) → Azure SWA
```

## Content model

Four Payload collections. Drafts are enabled on `posts` with `schedulePublish: true`.

**posts**
- `title` — text, required
- `slug` — text, unique, required; generated from title, editable
- `excerpt` — textarea, required; the index card truncates it to one line
- `coverImage` — upload relation to `media`, required
- `author` — relation to `authors`, required
- `categories` — relation to `categories`, hasMany
- `publishedAt` — date, required; drives ordering, the `postedAgo` label, and the build filter
- `seo` — group: `metaTitle`, `metaDescription`, `ogImage`; each falls back to the post's
  title, excerpt, and cover image when blank
- `readTime` — number, computed from the body on save, not typed by hand
- `content` — rich text (Lexical) with three custom blocks below

**Custom body blocks**
- `imageBlock` — upload relation plus a caption
- `embedBlock` — provider (`youtube` | `x`) and a URL
- `codeBlock` — language and code

**authors** — `name`, `role`, `avatar` (upload), `bio`. Replaces today's plain
`By Abisoye Falabi` string field.

**categories** — `name`, `slug`.

**media** — uploads, stored in Azure Blob Storage.

Two things the current hand-built model does that the CMS model deliberately drops:

- **The table of contents is derived from the headings in the body**, not authored
  separately. The first post exposed exactly this failure: the Figma TOC listed
  "Why Crypto Security Matters", a section the article does not contain, and the entries were
  not in document order. A derived TOC cannot drift from the article.
- **`readTime` is computed**, for the same reason.

`postedAgo` in `src/data/blog.ts` already derives the relative label from `publishedAt` and
carries over unchanged.

## Build and rendering

The build runs in two stages.

**Fetch.** A script queries the Payload REST API for posts where `publishedAt <= now` and
`_status = published`, resolves authors, categories and media URLs, and writes a content
manifest to disk. Payload generates TypeScript types from the collection config; the fetch
script imports them and maps each post onto the site's own `BlogPost` type, so a CMS schema
change that breaks the contract fails typechecking rather than producing a broken page.

**Prerender.** `vite-react-ssg` replaces the current SPA entry point. The `/blog/:slug`
route declares `getStaticPaths`, reading slugs from the manifest, and each route renders to
its own HTML file. Per-post `<title>`, meta description, canonical, Open Graph, Twitter card
and Article JSON-LD are emitted through the library's `<Head>` component, so they exist in
the served HTML rather than being applied by an effect.

Two files stop being maintained by hand, both generated from the same manifest:

- `public/sitemap.xml` — currently hand-edited and already went stale once, requiring a
  dedicated commit to refresh 15 `lastmod` dates.
- An RSS feed at `/blog/rss.xml`.

Azure Static Web Apps must serve `/blog/my-post` from the prerendered
`/blog/my-post/index.html` rather than falling through `navigationFallback` to the SPA shell.
This is standard SWA behaviour but must be verified on a preview environment before merge,
because a silent fallback would leave the pages looking correct in a browser while serving
crawlers an empty shell — the precise failure this design exists to prevent.

## Publishing and scheduling

An `afterChange` hook on `posts` fires when a post transitions to published, POSTing a
`repository_dispatch` to GitHub with a fine-grained token. The existing workflow gains
`repository_dispatch` alongside its current triggers, then builds and deploys as it does now.

Scheduling uses Payload's built-in `schedulePublish`, which enqueues a job with `waitUntil`
set to the chosen time; the task flips `_status` to published when it runs. Because it is a
standard task config, an `onSuccess` handler fires the same rebuild dispatch, so a post
scheduled for 09:00 goes live at 09:00 rather than waiting for a polling interval.

The build's `publishedAt <= now` filter is a second, independent guard: a future-dated post
cannot leak into a build triggered by some unrelated event.

## Preview

A `/blog/preview/:slug` route, excluded from `getStaticPaths` so it is never prerendered. It
fetches the draft from Payload with `?draft=true`, renders it through the same components as
a published post, and calls the existing `useNoIndex()` hook from `src/lib/usePageMeta.ts` so
it is never indexed. Payload's `admin.preview` is a function returning an arbitrary URL, so
the Preview button points here, carrying a shared preview secret.

Reusing the real components is the point: the editor sees the true page, not a CMS
approximation. Preview has no SEO requirement, which is why it can fetch at runtime while
published posts cannot.

Because the CMS is on a subdomain, this requires a CORS allowlist on Payload and cookie
settings that permit the editor's authenticated draft request from `stablezact.com`.

## Index page

The grid gains category filtering and pagination. `PostCard` is unchanged. The heading,
subtitle, and card layout stay as built from Figma.

## Changes to existing code

- `src/data/blog.ts` — keeps its exported types, `getPost` and `postedAgo`; sources posts
  from the generated manifest instead of a literal array. Block types extend with
  `image`, `embed` and `code`. `toc` becomes derived rather than authored.
- `src/pages/BlogPost.tsx` — `ArticleBlock` grows cases for the three new block types;
  metadata moves from `usePageMeta` to `<Head>`.
- `src/pages/Blog.tsx` — category filter and pagination; metadata moves to `<Head>`.
- `src/components/blog/ArticleToc.tsx` — consumes derived headings. Scroll-spy is unchanged.
- `src/lib/analytics.ts` and `src/lib/usePageMeta.ts` — **page-view tracking must be
  extracted from `usePageMeta` into its own hook.** `trackPageView` is currently called
  inside `usePageMeta`; blog pages moving to `<Head>` would silently stop reporting page
  views. The path-based dedupe guard seeded from the entry URL stays correct under
  prerendering, since each post is a real document load.
- `.github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml` — add
  `repository_dispatch` trigger and the CMS fetch step, with CMS URL and token as secrets.
- `public/sitemap.xml` — deleted, replaced by a generated file.

Components that do not change: `PostCard`, `BracketCorners`, `Navbar`, `SiteFooter`,
`ClosingCTA`.

## Failure modes

- **CMS unreachable at build time → fail the build.** Never deploy a site with an empty
  blog. A green deploy that silently drops every post is worse than a red build, because
  nothing alerts anyone. The same applies to an unexpectedly empty manifest.
- **Prerendering silently regressing to SPA fallback** — caught by the build-time HTML
  assertion below rather than by eye.
- **Media URLs pointing at a dead host** — media is served from Blob Storage, independent of
  the CMS container's lifecycle.
- **Embeds loading before consent** — embeds render as a click-to-load placeholder until the
  visitor accepts cookies, consistent with the Consent Mode v2 handling already shipped.

## Security

- A fine-grained GitHub token, scoped to `repository_dispatch` on this repo only, held in the
  CMS environment.
- A preview secret shared between the CMS and the site.
- Azure Blob Storage credentials held by the CMS.
- Payload editor accounts with roles; the admin panel is not publicly linked from the site.

## Testing

- **Unit** — the block renderer for each block type; TOC derivation from headings; the
  `publishedAt <= now` filter, which is the one piece that can silently leak an embargoed
  post.
- **Build assertion** — a prerendered post's HTML contains its title and `og:title`. This
  guards the design's entire premise; without it, a prerendering regression looks fine in a
  browser while being invisible to crawlers.
- **Manual, once per environment** — the full publish path, the scheduled publish path, and
  the preview flow from the Payload admin.

## Implementation phases

The design is one coherent system but too large for a single reviewable change. It splits
into three phases, each independently verifiable and each leaving the site in a working
state:

1. **Prerendering** — move the existing site to `vite-react-ssg`, prerender all current
   routes including the one hard-coded post, move blog metadata to `<Head>`, extract page-view
   tracking out of `usePageMeta`, and generate the sitemap. No CMS involved. Verifiable on its
   own: post HTML served by Azure contains the post's title and `og:title`.
2. **CMS and content pipeline** — provision Payload, Postgres and Blob Storage; model the
   collections; build the fetch step and manifest; swap `src/data/blog.ts` from a literal to
   the manifest; wire the publish and scheduled-publish dispatches; add the preview route.
3. **Body blocks and index features** — image, embed and code blocks with consent gating;
   category filtering and pagination; RSS feed.

Phase 1 delivers the SEO fix on its own even if phases 2 and 3 slip.

## Rollout

The blog pages are on `staging` and have never been deployed; `main` has no blog code and no
live `/blog` URLs. There is nothing to redirect and no indexed content to preserve, so this
can ship as a single release once the CMS is provisioned.

To get a staging URL for review at any point, open a pull request from `staging` to `main`;
Azure builds a preview environment for it. Pushing to `staging` alone deploys nothing.
