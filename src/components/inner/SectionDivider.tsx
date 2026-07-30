import dividerPlus from '@/assets/figma/inner/icon-divider-plus.svg'

/**
 * Full-width hairline divider with a plus mark at each end of the content
 * column — Figma node 1606:21506.
 */
export function SectionDivider() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center px-5">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[rgba(70,72,77,0.12)]" />
      <div className="container-1200 relative flex items-center justify-between">
        <img src={dividerPlus} alt="" aria-hidden="true" className="size-[36px]" />
        <img src={dividerPlus} alt="" aria-hidden="true" className="size-[36px]" />
      </div>
    </div>
  )
}
