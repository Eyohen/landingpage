import { Navbar } from '@/components/Navbar'
import { ClosingCTA } from '@/sections/ClosingCTA'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { ContentToggle } from '@/components/blog/ContentToggle'
import { PRESS, type PressArticle } from '@/data/blog'
import { usePageMeta } from '@/lib/usePageMeta'
import clockIcon from '@/assets/figma/blog/icon-clock.svg'
import arrowUpRight from '@/assets/figma/blog/icon-arrow-up-right.svg'

/**
 * Newsroom — Figma node 2193:71464. Coverage of Stablezact published
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
      className="group grid grid-cols-[517fr_663fr] items-stretch overflow-hidden rounded-[12px] bg-white transition-shadow hover:shadow-[0_20px_50px_rgba(20,10,40,0.08)] max-lg:grid-cols-1"
    >
      <div className="m-[10px] overflow-hidden rounded-[8px] max-lg:h-[260px]">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="relative flex flex-col justify-center gap-[60px] px-[60px] py-10 max-lg:gap-8 max-md:px-6 max-md:py-8">
        <img
          src={arrowUpRight}
          alt=""
          aria-hidden="true"
          className="absolute right-5 top-5 size-[24px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-[100px] bg-[#ebebeb] px-2 py-1 text-[16px] font-medium tracking-[-0.88px] text-black max-md:text-[14px]">
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

          <h2 className="font-geist text-[48px] font-medium leading-[48px] tracking-[-3px] text-[#090909] max-lg:text-[36px] max-lg:leading-[38px] max-lg:tracking-[-2px] max-md:text-[28px] max-md:leading-[32px] max-md:tracking-[-1.2px]">
            {article.title}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[22px] font-medium leading-[1.5] tracking-[-0.88px] text-[rgba(10,10,10,0.6)] max-md:text-[17px] max-md:tracking-[-0.5px]">
            {article.excerpt}
          </p>
          {/* Naming the destination matters when the link leaves the site. */}
          <p className="font-geist text-[14px] font-medium text-[#888]">
            {article.publication} &middot; {article.date}
          </p>
        </div>
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
              <RevealGroup className="flex flex-col gap-6">
                {PRESS.map((article) => (
                  <RevealItem key={article.url}>
                    <PressCard article={article} />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}
