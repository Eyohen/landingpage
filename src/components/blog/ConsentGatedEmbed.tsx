import { useEffect, useState } from 'react'
import { getConsent, onConsentChange, openCookieSettings } from '@/lib/consent'

/**
 * Third-party embeds behind the visitor's cookie choice.
 *
 * YouTube and X set cookies and profile the visitor the moment their iframe
 * loads. The rest of the site withholds every non-essential tracker until the
 * visitor opts in, and an embed dropped into an article would quietly break
 * that promise. So nothing third-party is requested until either the visitor
 * has accepted cookies or they explicitly click to load this one.
 */

export interface EmbedProps {
  provider: 'youtube' | 'x'
  url: string
  title?: string
}

/** Pulls the video id out of the watch, short and youtu.be URL forms. */
function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/,
  )
  return match?.[1] ?? null
}

function Placeholder({
  provider,
  url,
  onLoad,
}: {
  provider: EmbedProps['provider']
  url: string
  onLoad: () => void
}) {
  const name = provider === 'youtube' ? 'YouTube' : 'X'

  return (
    <div className="flex flex-col items-start gap-3 border border-[#e5e5e5] bg-white p-[30px] max-md:p-5">
      <p className="font-geist text-[16px] font-medium leading-[1.5] text-[#0a0a0a]">
        This {name} embed is blocked until you accept cookies.
      </p>
      <p className="font-geist text-[14px] leading-[1.5] text-[#888]">
        Loading it lets {name} set cookies on your device.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onLoad}
          className="rounded-[10px] bg-[#7042d2] px-5 py-2 font-geist text-[15px] font-medium text-white transition-colors hover:bg-[#5f32c5]"
        >
          Load this once
        </button>
        <button
          type="button"
          onClick={openCookieSettings}
          className="font-geist text-[15px] text-[#7042d2] underline underline-offset-2"
        >
          Cookie settings
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-geist text-[15px] text-[#888] underline underline-offset-2"
        >
          Open on {name}
        </a>
      </div>
    </div>
  )
}

export function ConsentGatedEmbed({ provider, url, title }: EmbedProps) {
  const [allowed, setAllowed] = useState(false)
  const [acceptedOnce, setAcceptedOnce] = useState(false)

  useEffect(() => {
    setAllowed(getConsent().analytics)
    return onConsentChange((consent) => setAllowed(consent.analytics))
  }, [])

  if (!allowed && !acceptedOnce) {
    return <Placeholder provider={provider} url={url} onLoad={() => setAcceptedOnce(true)} />
  }

  if (provider === 'youtube') {
    const id = youtubeId(url)
    if (!id) {
      return (
        <p className="font-geist text-[16px] text-[#888]">
          This YouTube link could not be read.{' '}
          <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
            Open it directly
          </a>
          .
        </p>
      )
    }
    return (
      <div className="aspect-video w-full overflow-hidden">
        {/* youtube-nocookie still avoids tracking cookies for viewers who did consent. */}
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title || 'YouTube video'}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="size-full border-0"
        />
      </div>
    )
  }

  return (
    <blockquote className="twitter-tweet">
      <a href={url}>{title || 'View post on X'}</a>
    </blockquote>
  )
}
