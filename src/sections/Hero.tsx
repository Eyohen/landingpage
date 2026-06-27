import { motion, type Variants } from 'motion/react'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import isometric from '@/assets/figma/hero-isometric.png'
import shopify from '@/assets/figma/shopify.png'
import woocommerce from '@/assets/figma/woocommerce.png'

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <path d="M3.75 9H14.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <path d="M5 3.5L14 9L5 14.5V3.5Z" fill="currentColor" />
    </svg>
  )
}

/**
 * Dark landing hero — matches the Framer prototype.
 * Floating isometric crypto-buildings art, crimson eyebrow,
 * two-tone headline, Book a Demo / Watch Product Demo CTAs, trusted-by row.
 * Content (Figma node 352:21509).
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[860px] flex-col overflow-hidden bg-[var(--color-bg-dark)] pt-[120px] pb-12 text-white">
      {/* subtle background grid + purple glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[38%] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-[var(--color-purple)] opacity-25 blur-[200px]" />

      {/* floating isometric illustration */}
      <motion.img
        src={isometric}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 0.95, scale: 1, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 1.2, ease: EASE },
          scale: { duration: 1.2, ease: EASE },
          y: { duration: 7, ease: 'easeInOut', repeat: Infinity },
        }}
        className="pointer-events-none absolute left-1/2 top-[110px] w-[min(1180px,96vw)] max-w-none -translate-x-1/2 select-none"
      />

      {/* centered headline block */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-1200 relative z-10 flex flex-1 flex-col items-center justify-center text-center max-lg:items-start max-lg:text-left"
      >
        <motion.div variants={item}>
          <SectionEyebrow className="justify-center max-lg:justify-start">Add crypto as a checkout option</SectionEyebrow>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 max-w-[900px] text-[clamp(40px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.03em]"
        >
          <span className="text-white">The complete crypto payment </span>
          <span className="text-[#8a8a93]">experience, simplified.</span>
        </motion.h1>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4 max-lg:w-full max-lg:flex-col max-lg:items-stretch">
          <a
            href="#book-a-demo"
            className="group inline-flex items-center justify-center gap-2 bg-[var(--color-purple)] px-6 py-3.5 text-[18px] font-medium tracking-[-0.02em] text-white transition-colors hover:bg-[var(--color-purple-bright)] max-lg:w-full"
          >
            Book a Demo
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </a>
          <a
            href="#watch-demo"
            className="inline-flex items-center justify-center gap-2 border-[0.6px] border-[var(--color-purple)] px-6 py-3.5 text-[18px] font-medium tracking-[-0.02em] text-[var(--color-purple-bright)] transition-colors hover:bg-[var(--color-purple)]/15 max-lg:w-full"
          >
            Watch Product Demo
            <PlayIcon />
          </a>
        </motion.div>
      </motion.div>

      {/* bottom row: subtext + trusted by */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
        className="container-1200 relative z-10 mt-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
      >
        <p className="max-w-[460px] text-[16px] leading-[1.55] text-[var(--color-muted-dark)]">
          Accept crypto payments anywhere your business sells. Customers pay with
          crypto, and you receive instant settlement in stablecoins or supported
          fiat.
        </p>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <span className="text-[15px] text-[var(--color-muted-dark)]">Trusted by:</span>
          <div className="flex items-center gap-8">
            <img src={shopify} alt="Shopify" className="h-7 w-auto object-contain" />
            <img src={woocommerce} alt="WooCommerce" className="h-6 w-auto object-contain" />
            <span className="text-[22px] font-semibold tracking-tight text-white">Cal.com</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
