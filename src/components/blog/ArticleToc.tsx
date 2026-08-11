import { useEffect, useState } from 'react'
import type { TocEntry } from '@/data/blog'

/**
 * "In this article" sidebar — Figma node 2168:70800. Bracketed entries that
 * jump to a section anchor; the entry for the section currently under the
 * navbar is highlighted in crimson.
 */

/** Distance below the viewport top at which a section counts as "current". */
const ACTIVE_OFFSET = 140

export function ArticleToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? '')

  useEffect(() => {
    const ids = entries.map((entry) => entry.id)

    const sync = () => {
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id
      }
      setActiveId(current)
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [entries])

  return (
    <nav
      aria-label="In this article"
      className="flex flex-col gap-[25px] border-[0.4px] border-[#e5e5e5] bg-white p-6"
    >
      <p className="text-[15px] leading-[21px] tracking-[-0.6px] text-[#0a0a0a]">
        In this article:
      </p>
      <ul className="flex flex-col gap-8 max-lg:gap-5">
        {entries.map((entry) => {
          const active = entry.id === activeId
          return (
            <li key={entry.id}>
              {/* Inline (not flex) so the closing bracket hugs the label when it wraps. */}
              <a
                href={`#${entry.id}`}
                aria-current={active ? 'true' : undefined}
                className={`block text-[18px] leading-[1.4] transition-colors ${
                  active ? 'text-[#c73154]' : 'text-[rgba(10,10,10,0.6)] hover:text-[#c73154]'
                }`}
              >
                <span className="font-mono font-medium">[</span>
                <span className="font-geist px-1">{entry.label}</span>
                <span className="font-mono font-medium">]</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
