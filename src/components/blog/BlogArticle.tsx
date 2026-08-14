import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { BlogFooter } from '@/components/blog/BlogFooter'
import { Reveal } from '@/components/motion/Reveal'
import { ArticleToc } from '@/components/blog/ArticleToc'
import { BracketCorners } from '@/components/blog/BracketCorners'
import { PostContent } from '@/components/blog/PostContent'
import { POSTS, type BlogPost } from '@/data/blog'
import clockIcon from '@/assets/figma/blog/icon-clock.svg'
import moveRight from '@/assets/figma/blog/icon-move-right.svg'

/**
 * The article itself — Figma node 2168:70798. Shared by the published post
 * page and the draft preview, so what an editor previews is rendered by the
 * same code that will serve the post once it goes live.
 */

/**
 * Previous / next row — Figma node 2168:70953.
 *
 * Posts run newest first, so "previous" is the newer neighbour and "next" the
 * older one. The newest post has no newer neighbour, so its left slot links
 * back to the index instead of sitting empty; the oldest post simply has no
 * next.
 */
function SiblingCard({ title }: { title: string }) {
  return (
    <div className="relative bg-[rgba(112,66,210,0.03)] px-[30px] py-4 transition-colors group-hover:bg-[rgba(112,66,210,0.06)] max-md:px-5">
      <BracketCorners />
      <p className="text-[14px] font-medium leading-[1.4] tracking-[-0.8px] text-[#0a0a0a]">
        {title}
      </p>
    </div>
  )
}

const NAV_LABEL =
  'flex items-center gap-2 font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-black'

function PostNav({ post }: { post: BlogPost }) {
  const index = POSTS.findIndex((entry) => entry.slug === post.slug)
  const previous = index > 0 ? POSTS[index - 1] : undefined
  const next = index >= 0 && index < POSTS.length - 1 ? POSTS[index + 1] : undefined

  return (
    <div className="flex items-start gap-3 max-md:flex-col">
      <div className="flex flex-1 flex-col gap-[11px] max-md:w-full">
        {previous ? (
          <Link to={`/blog/${previous.slug}`} className="group flex flex-col gap-[11px]">
            <span className={NAV_LABEL}>
              <img
                src={moveRight}
                alt=""
                aria-hidden="true"
                className="size-[24px] rotate-180 transition-transform group-hover:-translate-x-1"
              />
              Previous
            </span>
            <SiblingCard title={previous.title} />
          </Link>
        ) : (
          <Link to="/blog" className={`group w-fit ${NAV_LABEL}`}>
            <img
              src={moveRight}
              alt=""
              aria-hidden="true"
              className="size-[24px] rotate-180 transition-transform group-hover:-translate-x-1"
            />
            Back to Blog
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col items-end gap-[11px] max-md:w-full max-md:items-start">
        {next ? (
          <Link
            to={`/blog/${next.slug}`}
            className="group flex w-full flex-col items-end gap-[11px] max-md:items-start"
          >
            <span className={NAV_LABEL}>
              Next
              <img
                src={moveRight}
                alt=""
                aria-hidden="true"
                className="size-[24px] transition-transform group-hover:translate-x-1"
              />
            </span>
            <div className="w-full">
              <SiblingCard title={next.title} />
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main className="pt-[125px] max-md:pt-[96px]">
        <div className="h-[500px] w-full overflow-hidden max-lg:h-[380px] max-md:h-[240px]">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="size-full object-cover"
            fetchPriority="high"
          />
        </div>

        <section className="pb-[128px] pt-[102px] max-md:pb-[72px] max-md:pt-[56px]">
          <div className="container-1200 flex items-start gap-8 max-lg:flex-col">
            <aside className="w-[468px] shrink-0 max-lg:w-full">
              <div className="sticky top-[110px] max-lg:static">
                <ArticleToc entries={post.toc} />
              </div>
            </aside>

            <article className="flex min-w-0 flex-1 flex-col gap-9">
              <Reveal className="relative flex flex-col gap-3 bg-[rgba(112,66,210,0.04)] p-[30px] max-md:p-5">
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
                <h1 className="text-[40px] font-medium leading-[normal] tracking-[-2px] text-[#090909] max-lg:text-[34px] max-lg:tracking-[-1.4px] max-md:text-[28px] max-md:tracking-[-1px]">
                  {post.title}
                </h1>
              </Reveal>

              <PostContent data={post.content} />

              <PostNav post={post} />
            </article>
          </div>
        </section>
      </main>
      <BlogFooter />
    </div>
  )
}
