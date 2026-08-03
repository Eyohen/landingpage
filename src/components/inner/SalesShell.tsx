import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { InnerFooter } from '@/components/SiteFooter'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/motion/Reveal'
import heroRings from '@/assets/figma/inner/hero-rings.svg'
import mailIcon from '@/assets/figma/inner/icon-mail.svg'
import userGroupIcon from '@/assets/figma/inner/icon-user-group.svg'

/**
 * Shared scaffolding for the sales pages (Talk to Sales / Contact Us /
 * Request Crypto Checkout) — Figma "Sales pages" section. Centered hero over
 * a concentric-rings decoration, then a white card with an info sidebar and
 * the form fields.
 */

export function SalesHero({
  eyebrow,
  title,
  sub,
  compact = false,
}: {
  eyebrow: string
  title: string
  sub: string
  /** Request page style: Inter 40px instead of Geist 60px */
  compact?: boolean
}) {
  return (
    <div className="relative pt-[170px] max-md:pt-[128px]">
      <img
        src={heroRings}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-160px] -z-10 h-[720px] w-[720px] max-w-none -translate-x-1/2 opacity-60"
      />
      <Reveal className="container-1200 flex flex-col items-center gap-4 text-center">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h1
          className={
            compact
              ? 'max-w-[760px] text-[40px] font-medium leading-[1.2] tracking-[-0.05em] text-[#090909] max-md:text-[30px]'
              : 'max-w-[820px] font-[family-name:var(--font-geist)] text-[60px] font-medium leading-[1.1] tracking-[-0.06em] text-[#090909] max-lg:text-[44px] max-md:text-[34px]'
          }
        >
          {title}
        </h1>
        <p className="max-w-[520px] font-[family-name:var(--font-geist)] text-[18px] leading-[1.5] tracking-[-0.02em] text-[#999]">
          {sub}
        </p>
      </Reveal>
    </div>
  )
}

export function FormSidebar({
  title,
  body,
  emailNote = 'Our team will get back to you within 24 hours.',
  showContactLink = true,
}: {
  title: string
  body: string
  emailNote?: string
  showContactLink?: boolean
}) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col justify-between gap-10 max-lg:w-full">
      <div className="flex flex-col gap-3">
        <h2 className="font-[family-name:var(--font-geist)] text-[36px] font-medium leading-[1.15] tracking-[-0.03em] text-black max-md:text-[28px]">
          {title}
        </h2>
        <p className="text-[14px] leading-[1.55] tracking-[-0.01em] text-[#6c6c6c]">{body}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <img src={mailIcon} alt="" aria-hidden="true" className="size-[20px]" />
          <p className="text-[14px] font-medium text-black">Reach the team</p>
          <p className="text-[13px] leading-[1.5] text-[#6c6c6c]">{emailNote}</p>
          {showContactLink ? (
            <Link
              to="/contact-us"
              className="text-[13px] text-[var(--color-purple)] underline underline-offset-2"
            >
              Contact us
            </Link>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <img src={userGroupIcon} alt="" aria-hidden="true" className="size-[20px]" />
          <p className="text-[14px] font-medium text-black">Join Community</p>
          <p className="text-[13px] leading-[1.5] text-[#6c6c6c]">
            Stay updated with latest news, tips, and updates.
          </p>
          <a
            href="https://x.com/stablezact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[var(--color-purple)] underline underline-offset-2"
          >
            Follow community now
          </a>
        </div>
      </div>
    </div>
  )
}

export function SalesPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5f5f5] text-black">
      <Navbar />
      <main className="relative isolate">{children}</main>
      <InnerFooter />
    </div>
  )
}
