import { Navbar } from '@/components/Navbar'
import { InnerFooter } from '@/components/SiteFooter'
import { InnerHero } from '@/components/inner/InnerHero'
import { SectionDivider } from '@/components/inner/SectionDivider'
import { CapabilitiesGrid } from '@/components/inner/CapabilitiesGrid'
import { ChipGrid } from '@/components/inner/ChipGrid'
import { SplitPanelSection } from '@/components/inner/SplitPanelSection'
import { GainsHowItWorks } from '@/components/inner/GainsHowItWorks'
import { CTABanner } from '@/components/inner/CTABanner'
import { FeatureSplit } from '@/components/inner/FeatureSplit'
import { usePageMeta } from '@/lib/usePageMeta'
import type { SolutionContent, SolutionSection } from '@/content/solutions/types'

/**
 * Shared layout for the five /solutions/* pages — renders a content file's
 * hero, capabilities grid and ordered middle sections, separated by the
 * plus-mark dividers, then the purple CTA banner and dark footer.
 */

function Section({ section }: { section: SolutionSection }) {
  switch (section.kind) {
    case 'gains-how-it-works':
      return <GainsHowItWorks {...section} />
    case 'chip-grid':
      return <ChipGrid {...section} />
    case 'split-panel':
      return <SplitPanelSection {...section} />
    case 'feature-split':
      return <FeatureSplit {...section} />
  }
}

export function SolutionPage({ content }: { content: SolutionContent }) {
  usePageMeta(content.metaTitle, content.metaDescription)

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main>
        <InnerHero {...content.hero} />
        <SectionDivider />
        <CapabilitiesGrid {...content.capabilities} />
        {content.sections.map((section, i) => (
          <div key={i}>
            <SectionDivider />
            <Section section={section} />
          </div>
        ))}
      </main>
      <CTABanner {...content.cta} />
      <InnerFooter />
    </div>
  )
}
