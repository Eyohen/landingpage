import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { InnerFooter } from '@/components/SiteFooter'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { useNoIndex, usePageMeta } from '@/lib/usePageMeta'

/** 404 page — rendered for unknown routes; marked noindex. */
export default function NotFound() {
  usePageMeta('Page not found — Stablezact')
  useNoIndex()

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black">
      <Navbar />
      <main className="container-1200 flex min-h-[60vh] flex-col items-start justify-center gap-5 pt-[120px]">
        <SectionEyebrow>404</SectionEyebrow>
        <h1 className="max-w-[640px] font-[family-name:var(--font-geist)] text-[48px] font-medium leading-[1.15] tracking-[-0.05em] max-md:text-[32px]">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="max-w-[480px] text-[18px] leading-[1.5] text-[var(--color-muted)]">
          The link may be outdated or mistyped. Head back to the homepage or
          explore what Stablezact can do for your business.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#7042d2] px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] text-white transition-colors hover:bg-[#5f32c5]"
          >
            Back to homepage
          </Link>
          <Link
            to="/solutions/payment-providers"
            className="inline-flex items-center justify-center rounded-[10px] bg-[#e7dcff] px-6 py-2.5 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.03em] text-[#7042d2] transition-colors hover:bg-[#dccbff]"
          >
            Explore solutions
          </Link>
        </div>
      </main>
      <InnerFooter />
    </div>
  )
}
