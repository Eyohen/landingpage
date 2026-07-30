import type { FormEvent, ReactNode } from 'react'
import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { InnerFooter } from '@/components/SiteFooter'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal } from '@/components/motion/Reveal'
import { HoneypotField } from '@/components/inner/form'
import { readFormData, submitForm, type SubmitResult } from '@/lib/forms'
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
}: {
  eyebrow: string
  title: string
  sub: string
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
        <h1 className="max-w-[760px] text-[44px] font-medium leading-[1.15] tracking-[-0.05em] text-[#090909] max-md:text-[32px]">
          {title}
        </h1>
        <p className="max-w-[520px] text-[17px] leading-[1.5] tracking-[-0.02em] text-[var(--color-muted)]">
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
}: {
  title: string
  body: string
  emailNote?: string
}) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col justify-between gap-10 max-lg:w-full">
      <div className="flex flex-col gap-3">
        <h2 className="text-[24px] font-medium tracking-[-0.03em] text-black">{title}</h2>
        <p className="text-[14px] leading-[1.55] tracking-[-0.01em] text-[#6c6c6c]">{body}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <img src={mailIcon} alt="" aria-hidden="true" className="size-[20px]" />
          <p className="text-[14px] font-medium text-black">Email address</p>
          <p className="text-[13px] leading-[1.5] text-[#6c6c6c]">{emailNote}</p>
          <a
            href="mailto:support@stablezact.com"
            className="text-[13px] text-[var(--color-purple)] underline underline-offset-2"
          >
            support@stablezact.com
          </a>
        </div>
        <div className="flex flex-col gap-1.5">
          <img src={userGroupIcon} alt="" aria-hidden="true" className="size-[20px]" />
          <p className="text-[14px] font-medium text-black">Join Community</p>
          <p className="text-[13px] leading-[1.5] text-[#6c6c6c]">
            Stay updated with latest news, tips, and updates.
          </p>
          <a
            href="/contact-us"
            className="text-[13px] text-[var(--color-purple)] underline underline-offset-2"
          >
            Follow community now
          </a>
        </div>
      </div>
    </div>
  )
}

export type FormStatus = 'idle' | 'sending' | SubmitResult | 'error'

export function SalesForm({
  formKind,
  mailSubject,
  submitLabel,
  footnote,
  sidebar,
  children,
  onResult,
  successContent,
}: {
  formKind: string
  mailSubject: string
  submitLabel: string
  footnote: string
  sidebar: ReactNode
  children: ReactNode
  onResult?: (status: FormStatus) => void
  /** when provided and the form was sent via the endpoint, replaces the card */
  successContent?: ReactNode
}) {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const { data, isSpam } = readFormData(formEl)
    if (isSpam) return
    setStatus('sending')
    try {
      const result = await submitForm(formKind, mailSubject, data)
      setStatus(result)
      onResult?.(result)
      if (result === 'sent') formEl.reset()
    } catch {
      setStatus('error')
      onResult?.('error')
    }
  }

  if (status === 'sent' && successContent) {
    return <>{successContent}</>
  }

  return (
    <Reveal delay={0.1} className="container-1200 pb-[110px] pt-14 max-md:pb-[64px]">
      <div className="mx-auto flex max-w-[1080px] gap-12 rounded-[18px] bg-white p-10 shadow-[0_30px_90px_rgba(20,10,40,0.06)] max-lg:flex-col max-md:p-6">
        {sidebar}
        <form onSubmit={handleSubmit} className="relative flex flex-1 flex-col gap-7" noValidate={false}>
          <HoneypotField />
          {children}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-fit items-center justify-center rounded-[12px] bg-[var(--color-purple)] px-5 py-3.5 text-[16px] font-medium tracking-[-0.02em] text-white transition-colors hover:bg-[var(--color-purple-bright)] disabled:cursor-not-allowed disabled:opacity-60 max-sm:w-full"
            >
              {status === 'sending' ? 'Sending…' : submitLabel}
            </button>
            {status === 'sent' ? (
              <p className="text-[14px] text-[#148c54]">
                Thanks — your message has been sent. We&apos;ll get back to you shortly.
              </p>
            ) : status === 'mailto' ? (
              <p className="text-[14px] text-[#6c6c6c]">
                Your email client has been opened with the details — hit send to
                deliver your message.
              </p>
            ) : status === 'error' ? (
              <p className="text-[14px] text-[var(--color-accent)]">
                Something went wrong sending your message. Please try again or
                email support@stablezact.com.
              </p>
            ) : null}
            <p className="text-[13px] leading-[1.5] text-[#9b9b9b]">{footnote}</p>
          </div>
        </form>
      </div>
    </Reveal>
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
