import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ConsentGatedEmbed } from '@/components/blog/ConsentGatedEmbed'
import { CodeSnippet } from '@/components/blog/CodeSnippet'

/**
 * Renders a post body authored in the CMS.
 *
 * The converters below reproduce the typography of Figma 2396:111306 and
 * 2439:123908 — the crimson bar beside each section heading, Geist 18px body
 * copy. Spacing between blocks lives in `.post-body` in index.css, because the
 * design's rhythm varies by which two elements meet and a flex `gap` can only
 * apply one value to every pair.
 *
 * Headings still carry anchor ids, derived the same way as in
 * `scripts/fetch-content.ts`. Nothing links to them since the table of
 * contents was removed, but they keep deep links into a section working.
 */

/** Shape of a custom block node as the Lexical converters receive it. */
interface BlockNode<Fields> {
  node: { fields: Fields }
}

interface ImageBlockFields {
  image?: { url?: string; alt?: string }
  caption?: string
}

interface EmbedBlockFields {
  provider: 'youtube' | 'x'
  url: string
  title?: string
}

interface CodeBlockFields {
  code: string
  language?: string
}

/**
 * Media inside the body arrives as a CMS-relative path (`/api/media/file/…`),
 * unlike the cover image which the fetch step already absolutises. Resolving
 * here covers both the build and the live preview with one rule.
 */
function mediaUrl(url: string): string {
  // Already absolute, or already copied into the site by the fetch step.
  if (/^https?:\/\//.test(url) || url.startsWith('/')) return url
  const base = import.meta.env.VITE_CMS_URL
  return base ? new URL(url, base).href : url
}

/** Must match `slugify` in scripts/fetch-content.ts. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function textOf(node: { text?: string; children?: unknown[] }): string {
  if (typeof node.text === 'string') return node.text
  return ((node.children ?? []) as { text?: string; children?: unknown[] }[])
    .map(textOf)
    .join('')
}

export function PostContent({ data }: { data: SerializedEditorState }) {
  return (
    <RichText
      data={data}
      className="post-body flex flex-col"
      converters={({ defaultConverters }) => ({
        ...defaultConverters,

        heading: ({ node, nodesToJSX }) => {
          // A subsection label is body copy turned black, not a smaller
          // heading — that is how both boards set them, and it keeps the
          // crimson marker meaning "new section" and nothing else.
          if (node.tag === 'h3') {
            return (
              <h3
                id={slugify(textOf(node))}
                className="scroll-mt-[120px] font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-black max-md:text-[16px]"
              >
                {nodesToJSX({ nodes: node.children })}
              </h3>
            )
          }
          return (
            <div
              id={slugify(textOf(node))}
              className="post-section flex scroll-mt-[120px] items-start gap-3"
            >
              <span
                aria-hidden="true"
                className="mt-[3px] h-[32px] w-[4px] shrink-0 rounded-full bg-[#c73154]"
              />
              <h2 className="text-[23px] font-semibold leading-[29.9px] tracking-[-0.92px] text-[#0a0a0a] max-md:text-[20px] max-md:leading-[26px]">
                {nodesToJSX({ nodes: node.children })}
              </h2>
            </div>
          )
        },

        paragraph: ({ node, nodesToJSX }) => (
          <p className="font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
            {nodesToJSX({ nodes: node.children })}
          </p>
        ),

        list: ({ node, nodesToJSX }) =>
          node.listType === 'number' ? (
            <ol className="flex list-decimal flex-col ps-[27px] font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
              {nodesToJSX({ nodes: node.children })}
            </ol>
          ) : (
            <ul className="flex list-disc flex-col ps-[27px] font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
              {nodesToJSX({ nodes: node.children })}
            </ul>
          ),

        listitem: ({ node, nodesToJSX }) => (
          <li className="scroll-mt-[120px]">{nodesToJSX({ nodes: node.children })}</li>
        ),

        blocks: {
          imageBlock: ({ node }: BlockNode<ImageBlockFields>) => {
            const { image, caption } = node.fields
            if (!image?.url) return null
            return (
              <figure className="flex flex-col gap-3">
                <img
                  src={mediaUrl(image.url)}
                  alt={image.alt ?? ''}
                  loading="lazy"
                  className="w-full object-cover"
                />
                {caption ? (
                  <figcaption className="font-geist text-[14px] leading-[1.5] text-[#888]">
                    {caption}
                  </figcaption>
                ) : null}
              </figure>
            )
          },

          embedBlock: ({ node }: BlockNode<EmbedBlockFields>) => {
            const { provider, url, title } = node.fields
            return <ConsentGatedEmbed provider={provider} url={url} title={title} />
          },

          codeBlock: ({ node }: BlockNode<CodeBlockFields>) => {
            const { code, language } = node.fields
            return <CodeSnippet code={code} language={language} />
          },
        },
      })}
    />
  )
}
