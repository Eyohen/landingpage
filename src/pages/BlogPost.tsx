import { Link, Navigate, useParams } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { ClosingCTA } from '@/sections/ClosingCTA'
import { Reveal } from '@/components/motion/Reveal'
import { ArticleToc } from '@/components/blog/ArticleToc'
import { BracketCorners } from '@/components/blog/BracketCorners'
import { PostContent } from '@/components/blog/PostContent'
import { getPost, type BlogPost as Post } from '@/data/blog'
import { usePageMeta } from '@/lib/usePageMeta'
import clockIcon from '@/assets/figma/blog/icon-clock.svg'
import moveRight from '@/assets/figma/blog/icon-move-right.svg'

/**
 * Blog article — Figma node 2168:70798. Full-bleed cover image, sticky
 * "In this article" sidebar and the article body, over the shared purple CTA
 * + footer. Anchors carry scroll-mt so the fixed navbar never covers a target.
 */

/**
 * Closes out the article. The Figma design (node 2168:70953) puts a
 * previous / next pair here, but with a single published post there is
 * nothing to point at, so that row is left out until there is a second post.
 */
function BackToBlog() {
  return (
    <Link
      to="/blog"
      className="group flex w-fit items-center gap-2 font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-black"
    >
      <img
        src={moveRight}
        alt=""
        aria-hidden="true"
        className="size-[24px] rotate-180 transition-transform group-hover:-translate-x-1"
      />
      Back to Blog
    </Link>
  )
}

function Article({ post }: { post: Post }) {
  // `post.image` is already an absolute CMS URL, which is what social crawlers
  // require — no origin prefix.
  usePageMeta(`${post.title} | Stablezact`, post.metaDescription, {
    image: post.image,
    type: 'article',
  })

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
                <p className="font-geist text-[12px] font-medium tracking-[-0.2px] text-black">
                  By {post.author}
                </p>
              </Reveal>

              <PostContent data={post.content} />

              <BackToBlog />
            </article>
          </div>
        </section>
      </main>
      <ClosingCTA />
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) return <Navigate to="/blog" replace />
  return <Article post={post} />
}
