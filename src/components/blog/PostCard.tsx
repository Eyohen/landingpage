import { Link } from 'react-router-dom'
import type { BlogPost } from '@/data/blog'
import clockIcon from '@/assets/figma/blog/icon-clock.svg'

/**
 * Blog index card — Figma node 2396:112016.
 *
 * A white card that insets its own cover image: the 392px card carries 4px of
 * padding around a 384x300 image, so the card edge reads as a border around
 * the picture rather than the picture running to the edge.
 *
 * Title and excerpt are both clamped to two lines. The Figma sizes the card
 * for exactly that much text, and clamping rather than truncating keeps every
 * card in a row the same height however long the CMS copy runs.
 */

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[12px] bg-white p-1 transition-shadow duration-300 hover:shadow-[0px_4px_16px_0px_rgba(10,13,18,0.08)]"
      aria-label={post.title}
    >
      <div className="aspect-[384/300] w-full overflow-hidden rounded-[8px]">
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-col gap-3 px-6 pb-6 pt-5 max-md:px-5">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1">
            <img src={clockIcon} alt="" aria-hidden="true" className="size-[16px]" />
            <span className="font-geist text-[12px] font-medium tracking-[-0.2px] text-[#888]">
              {post.readTime}
            </span>
          </span>
          <time
            dateTime={post.isoDate}
            className="font-geist text-[12px] font-semibold tracking-[-0.2px] text-black"
          >
            {post.date}
          </time>
        </div>

        <h2 className="line-clamp-2 text-[16px] font-medium leading-[1.4] tracking-[-0.8px] text-[#0a0a0a]">
          {post.title}
        </h2>

        <p className="line-clamp-2 font-geist text-[12px] font-medium leading-[1.35] tracking-[-0.2px] text-[#a3a3a3]">
          {post.excerpt}
        </p>
      </div>
    </Link>
  )
}
