import { Link } from 'react-router-dom'
import { postedAgo, type NewsroomPost } from '@/data/newsroom'
import { BracketCorners } from '@/components/newsroom/BracketCorners'
import clockIcon from '@/assets/figma/newsroom/icon-clock.svg'

/**
 * Newsroom index card — Figma node 2168:70638. Relative "posted" label, 249px
 * cover image, then a bracket-cornered tinted panel with the read time, date,
 * title and a single-line excerpt.
 */

export function PostCard({ post }: { post: NewsroomPost }) {
  return (
    <Link
      to={`/newsroom/${post.slug}`}
      className="group flex flex-col gap-1"
      aria-label={post.title}
    >
      <div className="flex flex-col gap-2">
        <span className="font-geist text-[12px] font-medium tracking-[-0.2px] text-[#888]">
          {postedAgo(post.isoDate)}
        </span>
        <div className="h-[249px] w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className="relative flex flex-col gap-3 bg-[rgba(112,66,210,0.03)] p-[30px] transition-colors group-hover:bg-[rgba(112,66,210,0.06)] max-md:p-5">
        <BracketCorners />
        <div className="flex items-start justify-between gap-4">
          <span className="flex items-center gap-1">
            <img src={clockIcon} alt="" aria-hidden="true" className="size-[16px]" />
            <span className="font-geist text-[12px] font-medium tracking-[-0.2px] text-[#888]">
              {post.readTime}
            </span>
          </span>
          <time
            dateTime={post.isoDate}
            className="font-geist text-[12px] font-medium tracking-[-0.2px] text-black"
          >
            {post.date}
          </time>
        </div>

        <h2 className="text-[16px] font-medium leading-[1.4] tracking-[-0.8px] text-[#0a0a0a]">
          {post.title}
        </h2>

        <p className="truncate font-geist text-[12px] font-medium tracking-[-0.2px] text-[#888]">
          {post.excerpt}
        </p>
      </div>
    </Link>
  )
}
