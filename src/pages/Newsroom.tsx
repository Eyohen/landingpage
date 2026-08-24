import { Navbar } from '@/components/Navbar'
import { BlogFooter } from '@/components/blog/BlogFooter'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { ContentToggle } from '@/components/blog/ContentToggle'
import { PRESS, type PressArticle } from '@/data/blog'
import { usePageMeta } from '@/lib/usePageMeta'
import clockIcon from '@/assets/figma/blog/icon-clock.svg'
import arrowUpRight from '@/assets/figma/blog/icon-arrow-up-right.svg'

/**
 * Newsroom — Figma node 2396:111611. Coverage of Stablezact published
 * elsewhere. Every card leaves the site, so each is an external anchor rather
 * than a router link, and each says where it is going.
 */

const KIND_LABELS: Record<PressArticle['kind'], string> = {
  contributed: 'Contributed',
  featured: 'Featured',
  mention: 'Mention',
}

function PressCard({ article }: { article: PressArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[12px] bg-white p-1 transition-shadow duration-300 hover:shadow-[0px_4px_16px_0px_rgba(10,13,18,0.08)]"
    >
      <div className="aspect-[384/300] w-full overflow-hidden rounded-[8px]">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="relative flex flex-1 flex-col gap-3 px-6 pb-6 pt-5 max-md:px-5">
        <img
          src={arrowUpRight}
          alt=""
          aria-hidden="true"
          className="absolute right-6 top-5 size-[18px] opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 max-md:right-5"
        />

        <div className="flex items-center gap-2 pr-8">
          <span className="rounded-[100px] bg-[#ebebeb] px-2 py-0.5 font-geist text-[12px] font-medium tracking-[-0.2px] text-black">
            {KIND_LABELS[article.kind]}
          </span>
          {article.readTime ? (
            <span className="flex items-center gap-1">
              <img src={clockIcon} alt="" aria-hidden="true" className="size-[16px]" />
              <span className="font-geist text-[12px] font-medium tracking-[-0.2px] text-[#888]">
                {article.readTime}
              </span>
            </span>
          ) : null}
        </div>

        <h2 className="line-clamp-2 text-[16px] font-medium leading-[1.4] tracking-[-0.8px] text-[#0a0a0a]">
          {article.title}
        </h2>

        <p className="line-clamp-2 font-geist text-[12px] font-medium leading-[1.35] tracking-[-0.2px] text-[#a3a3a3]">
          {article.excerpt}
        </p>

        {/* A link that leaves the site should say where it goes. The Figma card
            stops at the excerpt, but dropping this would leave an outbound link
            with nothing naming its destination. */}
        <p className="mt-auto pt-1 font-geist text-[12px] font-medium tracking-[-0.2px] text-black">
          {article.publication} &middot; {article.date}
        </p>
      </div>
    </a>
  )
}

export default function Newsroom() {
  usePageMeta(
    'Newsroom | Stablezact',
    'Coverage of Stablezact in the press: interviews, features and contributed articles on crypto payments and merchant checkout.',
  )

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main>
        <section className="pb-[90px] pt-[150px] max-md:pb-[56px] max-md:pt-[118px]">
          <div className="container-1200 flex flex-col gap-[40px] max-md:gap-8">
            <Reveal>
              <ContentToggle active="Newsroom" />
            </Reveal>

            {PRESS.length === 0 ? (
              <p className="text-center font-geist text-[18px] text-[#888]">
                No press coverage yet.
              </p>
            ) : (
              <RevealGroup className="grid grid-cols-3 gap-x-3 gap-y-8 max-lg:grid-cols-2 max-md:grid-cols-1">
                {PRESS.map((article) => (
                  <RevealItem key={article.url} className="h-full">
                    <PressCard article={article} />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  )
}
