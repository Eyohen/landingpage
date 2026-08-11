import cornerA from '@/assets/figma/about/corner-a.svg'
import cornerB from '@/assets/figma/about/corner-b.svg'

/**
 * The crimson bracket corners that mark tinted panels across the site
 * (Figma vectors 86 / 87). Drop into a `relative` container.
 */

export function BracketCorners() {
  return (
    <>
      <img src={cornerA} alt="" aria-hidden="true" className="absolute left-0 top-0 size-[10px]" />
      <img
        src={cornerB}
        alt=""
        aria-hidden="true"
        className="absolute right-0 top-0 size-[10px] -scale-y-100 rotate-180"
      />
      <img
        src={cornerB}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 size-[10px] rotate-180"
      />
      <img
        src={cornerA}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 size-[10px] -scale-y-100"
      />
    </>
  )
}
