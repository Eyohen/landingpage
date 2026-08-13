import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { ClosingCTA } from '@/sections/ClosingCTA'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { PostCard } from '@/components/blog/PostCard'
import { ContentToggle } from '@/components/blog/ContentToggle'
import { POSTS, type PostCategory } from '@/data/blog'
import { usePageMeta } from '@/lib/usePageMeta'
import moveRight from '@/assets/figma/blog/icon-move-right.svg'

/**
 * Blog index — Figma node 2168:70558.
 * Page heading, then a three-column card grid that fills from POSTS, over the
 * shared purple CTA + footer.
 *
 * Category and page live in the query string so a filtered view can be linked
 * and shared, and so the browser back button behaves as a reader expects.
 */

/** Matches the two rows of three in the Figma layout. */
const PAGE_SIZE = 6

function uniqueCategories(): PostCategory[] {
  const seen = new Map<string, PostCategory>()
  for (const post of POSTS) {
    for (const category of post.categories ?? []) {
      if (!seen.has(category.slug)) seen.set(category.slug, category)
    }
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name))
}

function FilterChip({
  label,
  active,
  onSelect,
}: {
  label: string
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`text-[16px] leading-[1.4] transition-colors ${
        active ? 'text-[#c73154]' : 'text-[rgba(10,10,10,0.6)] hover:text-[#c73154]'
      }`}
    >
      <span className="font-mono font-medium">[</span>
      <span className="font-geist px-1">{label}</span>
      <span className="font-mono font-medium">]</span>
    </button>
  )
}

export default function Blog() {
  const title = 'Blog | Stablezact'
  const description =
    'News, milestones, product updates, and stories shaping the future of crypto payments at Stablezact.'
  usePageMeta(title, description)

  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') ?? ''
  const page = Math.max(1, Number(params.get('page') ?? '1') || 1)

  const categories = useMemo(uniqueCategories, [])

  const filtered = useMemo(
    () =>
      activeCategory
        ? POSTS.filter((post) =>
            (post.categories ?? []).some((category) => category.slug === activeCategory),
          )
        : POSTS,
    [activeCategory],
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function select(category: string) {
    const next = new URLSearchParams(params)
    if (category) next.set('category', category)
    else next.delete('category')
    // Changing the filter invalidates the page number.
    next.delete('page')
    setParams(next)
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(params)
    if (nextPage <= 1) next.delete('page')
    else next.set('page', String(nextPage))
    setParams(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main>
        <section className="pb-[90px] pt-[150px] max-md:pb-[56px] max-md:pt-[118px]">
          <div className="container-1200 flex flex-col gap-[40px] max-md:gap-8">
            <Reveal className="flex flex-col items-center gap-6">
              <ContentToggle active="Blogs" />

              {categories.length > 0 ? (
                <nav
                  aria-label="Filter by category"
                  className="flex flex-wrap justify-center gap-x-4 gap-y-2"
                >
                  <FilterChip
                    label="All"
                    active={activeCategory === ''}
                    onSelect={() => select('')}
                  />
                  {categories.map((category) => (
                    <FilterChip
                      key={category.slug}
                      label={category.name}
                      active={activeCategory === category.slug}
                      onSelect={() => select(category.slug)}
                    />
                  ))}
                </nav>
              ) : null}
            </Reveal>

            {visible.length === 0 ? (
              <p className="font-geist text-[18px] text-[#888]">
                No posts in this category yet.
              </p>
            ) : (
              <RevealGroup className="grid grid-cols-3 gap-x-3 gap-y-8 max-lg:grid-cols-2 max-md:grid-cols-1">
                {visible.map((post) => (
                  <RevealItem key={post.slug}>
                    <PostCard post={post} />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}

            {pageCount > 1 ? (
              <nav
                aria-label="Pagination"
                className="flex items-center justify-between gap-4 border-t border-[#e5e5e5] pt-6"
              >
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-2 font-geist text-[16px] font-medium text-black disabled:pointer-events-none disabled:opacity-30"
                >
                  <img
                    src={moveRight}
                    alt=""
                    aria-hidden="true"
                    className="size-[20px] rotate-180 transition-transform group-hover:-translate-x-1"
                  />
                  Previous
                </button>
                <span className="font-geist text-[14px] text-[#888]">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === pageCount}
                  className="group flex items-center gap-2 font-geist text-[16px] font-medium text-black disabled:pointer-events-none disabled:opacity-30"
                >
                  Next
                  <img
                    src={moveRight}
                    alt=""
                    aria-hidden="true"
                    className="size-[20px] transition-transform group-hover:translate-x-1"
                  />
                </button>
              </nav>
            ) : null}
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}
