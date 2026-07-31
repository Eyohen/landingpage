import type { InnerHeroContent } from '@/components/inner/InnerHero'
import type { CapabilitiesContent } from '@/components/inner/CapabilitiesGrid'
import type { ChipGridContent } from '@/components/inner/ChipGrid'
import type { SplitPanelContent } from '@/components/inner/SplitPanelSection'
import type { GainsHowItWorksContent } from '@/components/inner/GainsHowItWorks'
import type { CTABannerContent } from '@/components/inner/CTABanner'
import type { FeatureSplitContent } from '@/components/inner/FeatureSplit'

/** Ordered page-specific middle sections rendered between the capabilities
 * grid and the closing CTA banner. */
export type SolutionSection =
  | ({ kind: 'gains-how-it-works'; merged?: boolean } & GainsHowItWorksContent)
  | ({ kind: 'chip-grid'; merged?: boolean } & ChipGridContent)
  | ({ kind: 'split-panel'; merged?: boolean } & SplitPanelContent)
  | ({ kind: 'feature-split'; merged?: boolean } & FeatureSplitContent)

export interface SolutionContent {
  metaTitle: string
  metaDescription: string
  hero: InnerHeroContent
  capabilities: CapabilitiesContent
  sections: SolutionSection[]
  cta: CTABannerContent
}
