import { Navbar } from '@/components/Navbar'
import { ClosingCTA } from '@/sections/ClosingCTA'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { PostCard } from '@/components/newsroom/PostCard'
import { POSTS } from '@/data/newsroom'
import { usePageMeta } from '@/lib/usePageMeta'

/**
 * Newsroom index — Figma node 2168:70558 (labelled "Blog" in the file).
 * Page heading, then a three-column card grid that fills from POSTS, over the
 * shared purple CTA + footer.
 */

export default function Newsroom() {
  usePageMeta(
    'Newsroom | Stablezact',
    'News, milestones, product updates, and stories shaping the future of crypto payments at Stablezact.',
  )

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main>
        <section className="pb-[90px] pt-[150px] max-md:pb-[56px] max-md:pt-[118px]">
          <div className="container-1200 flex flex-col gap-[50px] max-md:gap-8">
            <Reveal className="flex flex-col gap-3">
              <h1 className="font-geist text-[60px] font-medium leading-[66px] tracking-[-3.6px] text-black max-lg:text-[48px] max-lg:leading-[54px] max-lg:tracking-[-2.4px] max-md:text-[38px] max-md:leading-[42px] max-md:tracking-[-1.6px]">
                Newsroom
              </h1>
              <p className="max-w-[1200px] text-[18px] font-medium leading-[26px] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
                Explore the latest news, milestones, product updates, and stories shaping the
                future of crypto payments at Stablezact.
              </p>
            </Reveal>

            <RevealGroup className="grid grid-cols-3 gap-x-3 gap-y-8 max-lg:grid-cols-2 max-md:grid-cols-1">
              {POSTS.map((post) => (
                <RevealItem key={post.slug}>
                  <PostCard post={post} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}
