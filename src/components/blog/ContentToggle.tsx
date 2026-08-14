import { Link } from 'react-router-dom'

/**
 * Header shared by the two content tabs — Figma nodes 2194:72601 (Blogs) and
 * 2193:71464 (Newsroom): a centred title with a pill toggle beneath it.
 *
 * The two tabs are separate routes rather than local state, so each is
 * linkable, prerendered, and independently indexable.
 */

const TABS = [
  { label: 'Blogs', to: '/blog' },
  { label: 'Newsroom', to: '/newsroom' },
] as const

export function ContentToggle({ active }: { active: 'Blogs' | 'Newsroom' }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-[40px] font-medium leading-none tracking-[-2px] text-[#090909] max-md:text-[30px] max-md:tracking-[-1.2px]">
        Blog &amp; Newsroom
      </h1>

      <nav
        aria-label="Content type"
        className="flex items-center gap-1 rounded-[24px] border border-[#e6e6e6] bg-[#f9fafa] p-1 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
      >
        {TABS.map((tab) => {
          const isActive = tab.label === active
          return (
            <Link
              key={tab.label}
              to={tab.to}
              aria-current={isActive ? 'page' : undefined}
              className={
                isActive
                  ? 'rounded-[24px] border-[0.5px] border-[#004cdd] bg-[rgba(0,76,221,0.05)] px-3 py-2 text-[14px] font-medium leading-5 text-[#1677ff] shadow-[0px_8px_14.8px_-6px_rgba(22,119,255,0.4),0px_0px_0px_2px_rgba(22,119,255,0.12)]'
                  : 'rounded-[8px] px-3 py-2 text-[14px] font-medium leading-5 text-[#535862] transition-colors hover:text-[#0a0a0a]'
              }
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
