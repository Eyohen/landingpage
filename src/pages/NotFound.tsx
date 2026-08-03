import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Reveal } from '@/components/motion/Reveal'
import { useNoIndex, usePageMeta } from '@/lib/usePageMeta'
import heroRings from '@/assets/figma/inner/hero-rings.svg'
import homeIcon from '@/assets/figma/inner/icon-home.svg'
import illustration from '@/assets/figma/not-found-illustration.png'

/** 404 page — Figma node 2017:24514. Rendered for unknown routes; noindex. */
export default function NotFound() {
  usePageMeta('Page not found — Stablezact')
  useNoIndex()

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">
      {/* concentric rings backdrop */}
      <img
        src={heroRings}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[100px] h-[908px] w-[908px] max-w-none -translate-x-1/2 opacity-70"
      />
      <Navbar />
      <main className="container-1200 relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 py-[140px] text-center">
        <Reveal>
          <img
            src={illustration}
            alt=""
            aria-hidden="true"
            className="mx-auto w-[650px] max-w-full object-contain"
          />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col items-center gap-[33px]">
          <h1 className="font-[family-name:var(--font-geist)] text-[64px] font-medium leading-[1.05] tracking-[-0.05em] text-black max-md:text-[38px]">
            Oooops! Page Not Found
          </h1>
          <p className="max-w-[698px] font-[family-name:var(--font-geist)] text-[18px] leading-[1.5] tracking-[-0.03em] text-[var(--color-muted)] max-md:text-[16px]">
            Looks like this page doesn&rsquo;t exist.
            <br />
            No worries, we&rsquo;re still here to help. Tell us what you&rsquo;re
            looking to enable, and the right person at Stablezact will get back
            to you within 1–2 business days.
          </p>
          <Link
            to="/"
            className="relative z-10 inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] bg-[#f1ecfa] p-4 font-[family-name:var(--font-geist)] text-[18px] font-medium tracking-[-0.64px] text-[#7042d2] transition-colors hover:bg-[#e6dcf7]"
          >
            <img src={homeIcon} alt="" aria-hidden="true" className="size-[16px]" />
            Take me to Home Page
          </Link>
        </Reveal>
      </main>
    </div>
  )
}
