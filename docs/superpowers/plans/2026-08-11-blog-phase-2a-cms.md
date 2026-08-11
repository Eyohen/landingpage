# Blog Phase 2a: CMS-authored posts

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Marketing writes and publishes blog posts in a browser UI, with no developer, no PR, and no code change — and the published post still ships as prerendered static HTML.

**Architecture:** A self-hosted Payload CMS in a new repo (`coinleylabs/blog-cms`) owns posts, authors, categories and media in Postgres. The landing page build fetches published posts over Payload's REST API, writes a typed manifest, and prerenders as it already does. Publishing fires a `repository_dispatch` at the landing page repo, which rebuilds and redeploys.

**Tech Stack:** Payload (Node/TypeScript, Next-based admin), Postgres, Azure Blob Storage, `@payloadcms/richtext-lexical`, and the existing Vite 8 / React 19 site with its Playwright prerender step.

## Global Constraints

- **Two repos.** Tasks 1, 2 and 5 are in `coinleylabs/blog-cms`. Tasks 3, 4 and 6 are in `coinleylabs/landingpage` on the `staging` branch. Every task states which.
- Do not change the landing page's pinned versions: React `^19.2.7`, react-router-dom `^7.18.1`, Vite `^8.1.0`, TypeScript `~6.0.2`.
- The landing page build must keep passing `npm test`, `npx tsc --noEmit`, `npm run lint`, and the existing `scripts/assert-prerendered.ts` guard.
- **A build must fail loudly if the CMS is unreachable or returns zero posts.** Never deploy a site with a silently empty blog.
- Unauthenticated CMS reads return published documents only. Drafts must never be publicly readable.
- **Out of scope, deferred to Phase 2b:** draft preview and scheduled publishing. Do not build them here.
- **Out of scope, deferred to Phase 3:** inline image blocks, embeds, code blocks, categories filtering and pagination on the index. Model the fields, do not build the UI.
- Local development uses Postgres in Docker. Azure provisioning is the infra team's — Task 6 produces their handoff, it does not perform it.

---

## Prerequisites needing a human

- **Creating `coinleylabs/blog-cms`** is an outward action on your org. Confirm before Task 1 runs `gh repo create`.
- **Azure provisioning** (App Service or Container App, Postgres, Blob Storage) cannot be done from here — no Azure credentials and no Azure CLI installed. Task 6 writes the spec for whoever has access.
- **A GitHub token** for the CMS to trigger rebuilds, scoped to `repository_dispatch` on `coinleylabs/landingpage` only.

---

## File Structure

**New repo `coinleylabs/blog-cms`:**
- `src/payload.config.ts` — Payload config, Postgres adapter, collections
- `src/collections/Posts.ts` — the posts collection, drafts and access control
- `src/collections/Authors.ts`, `src/collections/Categories.ts`, `src/collections/Media.ts`
- `src/hooks/triggerSiteRebuild.ts` — fires `repository_dispatch` on publish
- `docker-compose.yml` — local Postgres
- `.env.example` — every variable the deployment needs
- `DEPLOYMENT.md` — the infra handoff

**In `coinleylabs/landingpage`:**
- Create: `scripts/fetch-content.ts` — pulls published posts, writes the manifest
- Create: `src/data/blog-manifest.json` — generated, git-ignored
- Create: `src/components/blog/PostContent.tsx` — renders Lexical content
- Modify: `src/data/blog.ts` — types plus manifest loading, replacing the literal
- Modify: `src/pages/BlogPost.tsx` — render `PostContent`, absolute CMS image URLs
- Modify: `scripts/prerender.ts` — allow the CMS media host through the request block
- Modify: `package.json` — `prebuild` fetch step
- Modify: `.github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml` — `repository_dispatch` trigger, CMS secrets

---

### Task 1: Scaffold the CMS

**Repo:** `coinleylabs/blog-cms` (new)

**Interfaces:**
- Produces: a Payload admin at `http://localhost:3000/admin` backed by Postgres, and a REST API at `/api`.

- [ ] **Step 1: Confirm, then create the repo**

Ask the user to confirm before running this — it creates a repository in their organisation.

```bash
gh repo create coinleylabs/blog-cms --private --clone
cd blog-cms
```

- [ ] **Step 2: Scaffold Payload with the Postgres adapter**

```bash
npx create-payload-app@latest . --db postgres --name blog-cms
```

Answer the prompts choosing the blank template. **Record the Payload major version it installs** — v4 enables versions by default with drafts off, v3 does not, and Task 2 depends on which you have.

- [ ] **Step 3: Add local Postgres**

Create `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:17
    restart: unless-stopped
    environment:
      POSTGRES_USER: blog
      POSTGRES_PASSWORD: blog
      POSTGRES_DB: blog_cms
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

Then:

```bash
docker compose up -d
```

- [ ] **Step 4: Point Payload at it**

In `.env`:

```
DATABASE_URI=postgres://blog:blog@localhost:5432/blog_cms
PAYLOAD_SECRET=<generate with: openssl rand -hex 32>
```

Copy the same keys, without values, into `.env.example`.

- [ ] **Step 5: Start it and create the first admin user**

```bash
npm run dev
```

Open `http://localhost:3000/admin`, create an admin user.
Expected: the admin panel loads and the user is created.

- [ ] **Step 6: Confirm the API answers**

```bash
curl -s http://localhost:3000/api/users | head -c 200
```

Expected: JSON, not an HTML error page.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Scaffold Payload CMS with Postgres"
git push -u origin main
```

---

### Task 2: Model the content

**Repo:** `coinleylabs/blog-cms`

The field names here are the contract the landing page consumes in Task 3. Changing one later means changing both repos.

**Interfaces:**
- Produces: `posts`, `authors`, `categories`, `media` collections. A published post is readable unauthenticated at `GET /api/posts?where[_status][equals]=published`.

- [ ] **Step 1: Media**

Create `src/collections/Media.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  upload: { mimeTypes: ['image/*'] },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describes the image for screen readers and search engines.' },
    },
  ],
}
```

- [ ] **Step 2: Authors and categories**

Create `src/collections/Authors.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  access: { read: () => true },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
  ],
}
```

Create `src/collections/Categories.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: { read: () => true },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ],
}
```

- [ ] **Step 3: Posts**

Create `src/collections/Posts.ts`. The `access.read` block is the security boundary — without it, unauthenticated callers can read unpublished drafts.

```ts
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'publishedAt', '_status'] },
  versions: { drafts: true },
  access: {
    read: ({ req }) => {
      // Logged-in editors see everything; the public sees published posts only.
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path, e.g. how-to-stay-safe-with-crypto' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'One line, shown on the blog index card.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      admin: { description: 'Shown by Google and in social link previews.' },
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'author', type: 'relationship', relationTo: 'authors', required: true },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { description: 'Drives ordering and the "posted x ago" label.' },
    },
    { name: 'content', type: 'richText', required: true },
  ],
}
```

- [ ] **Step 4: Register them**

In `src/payload.config.ts`, add all four to `collections`.

- [ ] **Step 5: Restart and recreate the schema**

```bash
npm run dev
```

Payload pushes the schema in development. Expected: no errors, and Posts / Authors / Categories / Media appear in the admin sidebar.

- [ ] **Step 6: Recreate the existing post through the UI**

In the admin, create one author ("Abisoye Falabi"), upload the cover image from
`landingpage/src/assets/figma/blog/crypto-safety.jpg`, then create the post using the copy from
`landingpage/src/data/blog.ts` — slug `how-to-stay-safe-with-crypto`, publishedAt `2026-08-01`.
Publish it.

This is the fixture every later task verifies against, so the slug must match exactly.

- [ ] **Step 7: Verify the public API returns it — and hides drafts**

```bash
curl -s "http://localhost:3000/api/posts?where\[_status\][equals]=published&depth=2" | head -c 400
```

Expected: the post, with `author` and `coverImage` expanded to objects rather than IDs.

Then save a second post as a **draft** and run:

```bash
curl -s "http://localhost:3000/api/posts" | grep -c "draft"
```

Expected: `0`. If the draft leaks, `access.read` is wrong — stop and fix before continuing.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "Model posts, authors, categories and media" && git push
```

---

### Task 3: Build the site from CMS content

**Repo:** `coinleylabs/landingpage`, branch `staging`

**Interfaces:**
- Consumes: `GET /api/posts?where[_status][equals]=published&depth=2` from Task 2.
- Produces: `src/data/blog-manifest.json`, and `POSTS` / `getPost` in `src/data/blog.ts` reading from it. `BlogPost` keeps `slug`, `title`, `excerpt`, `metaDescription`, `author`, `date`, `isoDate`, `readTime`, `image`, `imageAlt`, `toc`, and gains `content` (Lexical JSON) in place of `blocks`.

- [ ] **Step 1: Write the fetch script**

Create `scripts/fetch-content.ts`. It must fail the build rather than emit an empty manifest.

```ts
import { writeFileSync } from 'node:fs'

const CMS_URL = process.env.CMS_URL
if (!CMS_URL) throw new Error('CMS_URL is not set — refusing to build without content')

const query = 'where[_status][equals]=published&depth=2&limit=200&sort=-publishedAt'
const response = await fetch(`${CMS_URL}/api/posts?${query}`)

if (!response.ok) {
  throw new Error(`CMS returned ${response.status} — refusing to build a site with no blog`)
}

const { docs } = await response.json()

if (!Array.isArray(docs) || docs.length === 0) {
  throw new Error('CMS returned zero published posts — refusing to build an empty blog')
}

/** Words per minute used for the read-time estimate. */
const WPM = 200

function textOf(node: any): string {
  if (typeof node?.text === 'string') return node.text
  return (node?.children ?? []).map(textOf).join(' ')
}

function headings(node: any, found: Array<{ id: string; label: string }> = []) {
  if (node?.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
    const label = textOf(node).trim()
    if (label) {
      found.push({ id: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), label })
    }
  }
  for (const child of node?.children ?? []) headings(child, found)
  return found
}

const posts = docs.map((doc: any) => {
  const words = textOf(doc.content?.root ?? {}).split(/\s+/).filter(Boolean).length
  const published = new Date(doc.publishedAt)
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    metaDescription: doc.metaDescription,
    author: doc.author?.name ?? '',
    date: published.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    isoDate: published.toISOString().slice(0, 10),
    readTime: `${Math.max(1, Math.round(words / WPM))} mins read`,
    image: new URL(doc.coverImage.url, CMS_URL).href,
    imageAlt: doc.coverImage.alt,
    toc: headings(doc.content?.root ?? {}),
    content: doc.content,
  }
})

writeFileSync('src/data/blog-manifest.json', JSON.stringify(posts, null, 2))
console.log(`Fetched ${posts.length} published post(s) from the CMS.`)
```

- [ ] **Step 2: Rewrite the data module**

In `src/data/blog.ts`, delete the `POSTS` literal and the image import. Keep `TocEntry`,
`getPost` and `postedAgo` exactly as they are. Add `content: SerializedEditorState` to the
`BlogPost` interface and load the manifest:

```ts
import manifest from './blog-manifest.json'

export const POSTS: BlogPost[] = manifest as unknown as BlogPost[]
```

**Make `blocks` optional rather than deleting it** — `blocks?: PostBlock[]` — and keep the
`PostBlock` and `PostListItem` types for now. `BlogPost.tsx` still renders `post.blocks` and
would stop compiling the moment the field disappears; Task 4 replaces that renderer and
deletes the types then. Also change the map in `BlogPost.tsx` to `(post.blocks ?? []).map(…)`
so the page renders with an empty body in the meantime instead of crashing.

This keeps Task 3 independently shippable: the site builds, typechecks and deploys, with the
article body temporarily empty until Task 4.

- [ ] **Step 3: Ignore the generated manifest**

Add to `.gitignore`:

```
src/data/blog-manifest.json
```

- [ ] **Step 4: Run the fetch before every build**

In `package.json`:

```json
"prebuild": "vite-node scripts/fetch-content.ts",
```

Add `CMS_URL=http://localhost:3000` to a local `.env` for development.

- [ ] **Step 5: Allow the CMS media host through the prerenderer**

`scripts/prerender.ts` blocks every non-local request, which would now block cover images. Change the route filter to also allow the CMS origin:

```ts
const cmsOrigin = process.env.CMS_URL ?? ''
await context.route('**', (route) => {
  const url = route.request().url()
  const allowed = url.startsWith(origin) || (cmsOrigin !== '' && url.startsWith(cmsOrigin))
  return allowed ? route.continue() : route.abort()
})
```

Analytics hosts stay blocked, so builds still cannot fire GA or Clarity hits.

- [ ] **Step 6: Verify the manifest**

With the CMS running:

```bash
npx vite-node scripts/fetch-content.ts
cat src/data/blog-manifest.json | head -30
```

Expected: one post, `slug` `how-to-stay-safe-with-crypto`, an absolute `image` URL on the CMS host, a computed `readTime`, and a `toc` array derived from the headings.

- [ ] **Step 7: Verify it fails when it should**

```bash
CMS_URL=http://localhost:9999 npx vite-node scripts/fetch-content.ts; echo "exit=$?"
```

Expected: a thrown error and a non-zero exit. A build that quietly ships an empty blog is the failure mode this guards.

- [ ] **Step 8: Commit**

```bash
git add scripts/fetch-content.ts scripts/prerender.ts src/data/blog.ts package.json .gitignore
git commit -m "Build the blog from CMS content instead of a literal"
```

---

### Task 4: Render CMS content

**Repo:** `coinleylabs/landingpage`, branch `staging`

The article body is now Lexical JSON, not the hand-authored block array `ArticleBlock` renders.

**Interfaces:**
- Consumes: `post.content` and `post.toc` from Task 3.
- Produces: `PostContent` in `src/components/blog/PostContent.tsx`.

- [ ] **Step 1: Install the renderer**

```bash
npm i @payloadcms/richtext-lexical
```

- [ ] **Step 2: Write the content component**

Create `src/components/blog/PostContent.tsx`. Converters carry the existing typography so CMS posts look identical to the hand-built one — headings keep the crimson bar, body text stays Geist 18px `#888`.

```tsx
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function PostContent({ data }: { data: SerializedEditorState }) {
  return (
    <div className="flex flex-col gap-9">
      <RichText
        data={data}
        converters={({ defaultConverters }) => ({
          ...defaultConverters,
          heading: ({ node, nodesToJSX }) => {
            const children = nodesToJSX({ nodes: node.children })
            const label = node.children.map((c: { text?: string }) => c.text ?? '').join('')
            return (
              <div id={slugify(label)} className="flex scroll-mt-[120px] items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[3px] h-[32px] w-[4px] shrink-0 rounded-full bg-[#c73154]"
                />
                <h2 className="text-[23px] font-semibold leading-[29.9px] tracking-[-0.92px] text-[#0a0a0a] max-md:text-[20px]">
                  {children}
                </h2>
              </div>
            )
          },
          paragraph: ({ node, nodesToJSX }) => (
            <p className="font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
              {nodesToJSX({ nodes: node.children })}
            </p>
          ),
        })}
      />
    </div>
  )
}
```

- [ ] **Step 3: Use it in the post page**

In `src/pages/BlogPost.tsx`, delete `ArticleBlock` and the `(post.blocks ?? []).map(…)` call
left in place by Task 3, and render `<PostContent data={post.content} />` instead. Then remove
the now-unused `blocks` field from `BlogPost` and delete the `PostBlock` and `PostListItem`
types from `src/data/blog.ts`. The title card, `ArticleToc`, `BackToBlog` and the CTA are
unchanged.

- [ ] **Step 4: Fix the social image URL**

`post.image` is now already absolute (a CMS URL), so the origin prefix in the `usePageMeta` call is wrong. Change it to:

```tsx
usePageMeta(`${post.title} | Stablezact`, post.metaDescription, {
  image: post.image,
  type: 'article',
})
```

- [ ] **Step 5: Verify in the browser**

Run `npm run dev` with the CMS running, open `/blog/how-to-stay-safe-with-crypto`.
Expected: the article renders with the same typography as before, the TOC lists the headings from the CMS, and clicking an entry scrolls to it with the heading clear of the navbar.

- [ ] **Step 6: Verify the build still guards itself**

```bash
npm run build
```

Expected: fetch, build, prerender, sitemap, and `Prerender check passed`. The assertion still requires the post's title and `og:title` in the built HTML — that it passes proves CMS content survives prerendering.

- [ ] **Step 7: Full check and commit**

```bash
npm test && npx tsc --noEmit && npm run lint
git add -A
git commit -m "Render CMS rich text in blog posts"
```

---

### Task 5: Rebuild the site when a post is published

**Repo:** `coinleylabs/blog-cms`, then `coinleylabs/landingpage`

**Interfaces:**
- Produces: an `afterChange` hook on `posts` firing `repository_dispatch` with `event_type: publish-post`.

- [ ] **Step 1: Write the hook**

Create `src/hooks/triggerSiteRebuild.ts`:

```ts
import type { CollectionAfterChangeHook } from 'payload'

export const triggerSiteRebuild: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const becamePublished = doc._status === 'published'
  const wasPublished = previousDoc?._status === 'published'

  // Rebuild on publish, on edits to a live post, and on unpublish — each
  // changes what the public site should serve.
  if (!becamePublished && !wasPublished) return doc

  const token = process.env.GITHUB_DISPATCH_TOKEN
  if (!token) {
    req.payload.logger.error('GITHUB_DISPATCH_TOKEN unset — site will not rebuild')
    return doc
  }

  const response = await fetch(
    'https://api.github.com/repos/coinleylabs/landingpage/dispatches',
    {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // No fields from `doc` are sent. The workflow must never consume
      // attacker-influenced client_payload values in a shell step.
      body: JSON.stringify({ event_type: 'publish-post' }),
    },
  )

  if (!response.ok) {
    req.payload.logger.error(`Rebuild dispatch failed: ${response.status}`)
  }

  return doc
}
```

- [ ] **Step 2: Attach it**

In `src/collections/Posts.ts`:

```ts
hooks: { afterChange: [triggerSiteRebuild] },
```

Add `GITHUB_DISPATCH_TOKEN=` to `.env.example`, and a real fine-grained token — scoped to `coinleylabs/landingpage` with Contents: read and write only — to `.env`.

- [ ] **Step 3: Add the trigger to the site workflow**

In `landingpage`, in `.github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml`:

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main
  repository_dispatch:
    types: [publish-post]
```

Then update the job's `if:` so a dispatch run is not filtered out by the existing condition:

```yaml
    if: github.event_name == 'push' || github.event_name == 'repository_dispatch' || (github.event_name == 'pull_request' && github.event.action != 'closed')
```

Add `CMS_URL` as a repository variable and pass it to the build step's environment.

- [ ] **Step 4: Verify the dispatch fires**

With the CMS running locally, edit and republish the post in the admin, then:

```bash
gh run list --repo coinleylabs/landingpage --limit 3 --json event,createdAt --jq '.[] | "\(.createdAt[0:16]) \(.event)"'
```

Expected: a run with event `repository_dispatch` within a minute.

- [ ] **Step 5: Verify an unpublish also rebuilds**

Unpublish the post in the admin and confirm another `repository_dispatch` run appears. A post removed from the site is as much a content change as one added.

- [ ] **Step 6: Commit both repos**

```bash
# blog-cms
git add -A && git commit -m "Trigger a site rebuild when a post is published" && git push
# landingpage
git add .github/workflows/azure-static-web-apps-gray-coast-06a0fab10.yml
git commit -m "Rebuild on publish-post repository_dispatch"
```

---

### Task 6: Hand off deployment

**Repo:** `coinleylabs/blog-cms`

Everything so far runs locally. This task produces what the infra team needs, and cannot be completed from here — there are no Azure credentials in this environment.

- [ ] **Step 1: Configure Blob Storage for media**

Install and configure the Azure Blob storage adapter for the `media` collection, reading its connection string and container from environment variables. Local disk is fine for development but loses every upload on an ephemeral redeploy, so production must use Blob.

- [ ] **Step 2: Write DEPLOYMENT.md**

It must list: the Azure services required (App Service or Container App running Node, Postgres Flexible Server, Blob Storage container); every environment variable from `.env.example` and what it does; that `DATABASE_URI` must point at managed Postgres; that migrations run on deploy; the CORS allowlist entry for `https://stablezact.com`; and that the admin URL should not be publicly linked.

- [ ] **Step 3: Write the runbook for adding an editor**

A short section covering how to create an editor account and what they can and cannot do.

- [ ] **Step 4: Hand off and stop**

Report to the user that provisioning is required, with `DEPLOYMENT.md` as the spec. Do not attempt to create Azure resources.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "Document deployment requirements" && git push
```

---

## Done when

- An editor logs into the CMS, writes a post, hits Publish, and it appears on the blog within a few minutes with no developer involved.
- The published post is served as prerendered HTML with its own title, description and cover image as `og:image`.
- Drafts are not readable by unauthenticated callers.
- A build fails loudly if the CMS is unreachable or returns no posts.
- The infra team has a written spec for provisioning.

## Deferred

- **Phase 2b:** draft preview at `/blog/preview/:slug`, scheduled publishing via `versions.drafts.schedulePublish`.
- **Phase 3:** inline images, embeds with consent gating, code blocks, category filtering, pagination, RSS.
