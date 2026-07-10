import { motion, type Variants } from 'motion/react'
import { SectionEyebrow } from '@/components/SectionEyebrow'
import coin1 from '@/assets/figma/coin1.png'
import coin2 from '@/assets/figma/coin2.png'
import mapImage from '@/assets/figma/Map.png'
import heroVideo from '@/assets/Stablezact demo video compressed.mp4'

const EASE = [0.22, 1, 0.36, 1] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[900px] flex-col overflow-hidden bg-white pt-[140px] pb-14 font-[family-name:var(--font-geist)] text-black max-md:min-h-[820px] max-md:pt-[116px]">
      {/* soft background grid + blush glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            'linear-gradient(#d8d8dd 1px, transparent 1px), linear-gradient(90deg, #d8d8dd 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-[-90px] h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-[#f2d2df] opacity-55 blur-[150px]" />
      <div className="pointer-events-none absolute left-[37%] top-[110px] h-[310px] w-[380px] rounded-full bg-[#ded5ff] opacity-45 blur-[170px]" />

      <motion.img
        src={mapImage}
        alt=""
        aria-hidden
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 0.82, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[360px] w-full select-none object-cover object-center opacity-80 max-md:h-[280px]"
      />

      <motion.img
        src={coin1}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -12, y: [0, -14, 0] }}
        transition={{
          opacity: { duration: 1.2, ease: EASE },
          scale: { duration: 1.2, ease: EASE },
          y: { duration: 6.5, ease: 'easeInOut', repeat: Infinity },
        }}
        className="pointer-events-none absolute left-[18%] top-[275px] z-10 w-[118px] select-none max-lg:left-[8%] max-md:left-[-8px] max-md:top-[360px] max-md:w-[82px]"
      />
      <motion.img
        src={coin2}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 0.9, rotate: 18 }}
        animate={{ opacity: 1, scale: 1, rotate: 18, y: [0, 16, 0] }}
        transition={{
          opacity: { duration: 1.2, ease: EASE, delay: 0.1 },
          scale: { duration: 1.2, ease: EASE, delay: 0.1 },
          y: { duration: 7, ease: 'easeInOut', repeat: Infinity },
        }}
        className="pointer-events-none absolute right-[18%] top-[360px] z-10 w-[132px] select-none max-lg:right-[8%] max-md:right-[-10px] max-md:top-[420px] max-md:w-[88px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container-1200 relative z-20 flex flex-1 flex-col items-center text-center"
      >
        <motion.div variants={item}>
          <SectionEyebrow className="justify-center">Add stablecoin as a checkout option</SectionEyebrow>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 max-w-[980px] text-[clamp(34px,4.2vw,54px)] font-semibold leading-[1.12] tracking-[-0.02em] max-md:mt-5 max-md:max-w-[360px] max-md:text-[38px]"
        >
          <span className="block text-[#070711] md:whitespace-nowrap">The complete stablecoin payment</span>
          <span className="block text-[#8b8891]">experience, simplified.</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="relative mt-12 h-[390px] w-[min(470px,78vw)] overflow-hidden rounded-[28px] border border-white/70 bg-[#f3f4f8]/85 shadow-[0_30px_90px_rgba(110,70,195,0.12)] backdrop-blur-sm max-md:mt-10 max-md:h-[270px] max-md:rounded-[22px]"
        >
          <video
            className="h-full w-full object-contain"
            src={heroVideo}
            title="Stablezact product demo"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
          />
        </motion.div>

        <motion.p
          variants={item}
          className="relative z-20 mt-10 max-w-[590px] text-[18px] leading-[1.5] tracking-[-0.02em] text-[#1a1720] max-md:mt-8 max-md:text-[16px]"
        >
          Accept stablecoin payments anywhere your business sells. Customers pay with
          crypto, and you receive instant settlement
        </motion.p>

        <motion.div variants={item} className="relative z-20 mt-8 flex flex-wrap items-center justify-center gap-4 max-md:w-full max-md:flex-col max-md:items-stretch">
          <a
            href="#book-a-demo"
            className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#7042d2] px-6 py-2.5 text-[18px] font-medium tracking-[-0.03em] text-white transition-colors hover:bg-[#5f32c5] max-md:w-full"
          >
            Book a Demo
          </a>
         
        </motion.div>
      </motion.div>
    </section>
  )
}
