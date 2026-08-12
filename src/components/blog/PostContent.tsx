import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ConsentGatedEmbed } from '@/components/blog/ConsentGatedEmbed'
import { CodeSnippet } from '@/components/blog/CodeSnippet'

/**
 * Renders a post body authored in the CMS.
 *
 * The converters below reproduce the typography of the original hand-built
 * article (Figma node 2168:70798) — the crimson bar beside each heading, Geist
 * 18px body copy — so a CMS-authored post is visually identical to the one it
 * replaced. Headings also carry the anchor ids the "In this article" sidebar
 * links to; those ids are derived the same way in `scripts/fetch-content.ts`,
 * so the two must stay in step.
 */

/**
 * Media inside the body arrives as a CMS-relative path (`/api/media/file/…`),
 * unlike the cover image which the fetch step already absolutises. Resolving
 * here covers both the build and the live preview with one rule.
 */
function mediaUrl(url: string): string {
  if (/^https?:\/\//.test(url)) return url
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
      className="flex flex-col gap-9"
      converters={({ defaultConverters }) => ({
        ...defaultConverters,

        heading: ({ node, nodesToJSX }) => (
          <div
            id={slugify(textOf(node))}
            className="flex scroll-mt-[120px] items-start gap-3"
          >
            <span
              aria-hidden="true"
              className="mt-[3px] h-[32px] w-[4px] shrink-0 rounded-full bg-[#c73154]"
            />
            <h2 className="text-[23px] font-semibold leading-[29.9px] tracking-[-0.92px] text-[#0a0a0a] max-md:text-[20px] max-md:leading-[26px]">
              {nodesToJSX({ nodes: node.children })}
            </h2>
          </div>
        ),

        paragraph: ({ node, nodesToJSX }) => (
          <p className="font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
            {nodesToJSX({ nodes: node.children })}
          </p>
        ),

        list: ({ node, nodesToJSX }) =>
          node.listType === 'number' ? (
            <ol className="flex list-decimal flex-col gap-9 ps-[27px] font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
              {nodesToJSX({ nodes: node.children })}
            </ol>
          ) : (
            <ul className="flex list-disc flex-col gap-4 ps-[27px] font-geist text-[18px] font-medium leading-[1.6] tracking-[-0.5px] text-[#888] max-md:text-[16px]">
              {nodesToJSX({ nodes: node.children })}
            </ul>
          ),

        listitem: ({ node, nodesToJSX }) => (
          <li className="scroll-mt-[120px]">{nodesToJSX({ nodes: node.children })}</li>
        ),

        blocks: {
          imageBlock: ({ node }) => {
            const { image, caption } = node.fields as {
              image?: { url?: string; alt?: string }
              caption?: string
            }
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

          embedBlock: ({ node }) => {
            const { provider, url, title } = node.fields as {
              provider: 'youtube' | 'x'
              url: string
              title?: string
            }
            return <ConsentGatedEmbed provider={provider} url={url} title={title} />
          },

          codeBlock: ({ node }) => {
            const { code, language } = node.fields as { code: string; language?: string }
            return <CodeSnippet code={code} language={language} />
          },
        },
      })}
    />
  )
}
