import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { CountUp } from '@/components/motion/CountUp'
import { Marquee } from '@/components/motion/Marquee'

import tokensGlow from '@/assets/figma/tokens-glow.png'
import iconWallet04 from '@/assets/figma/icon-wallet-04.svg'
import iconTokenCircle from '@/assets/figma/icon-token-circle.svg'

import tokenOptimism from '@/assets/figma/token-optimism.svg'
import tokenCelo from '@/assets/figma/token-celo.svg'
import tokenUnichain from '@/assets/figma/token-unichain.svg'
import tokenSolana from '@/assets/figma/token-solana.svg'
import tokenMonad from '@/assets/figma/token-monad.svg'
import tokenGnosis from '@/assets/figma/token-gnosis.svg'
import tokenCorn from '@/assets/figma/token-corn.svg'
import tokenArbitrum from '@/assets/figma/token-arbitrum.svg'
import tokenAvalanche from '@/assets/figma/token-avalanche.svg'

import walletCoinbase from '@/assets/figma/wallet-m-1.png'
import walletMetamask from '@/assets/figma/wallet-m-2.png'
import walletZerion from '@/assets/figma/wallet-m-3.png'
import walletPhantom from '@/assets/figma/wallet-m-4.png'
import walletTrust from '@/assets/figma/wallet-m-5.png'
import walletRabbyIcon from '@/assets/figma/wallet-m-rabby-icon.png'
import walletRainbowIcon from '@/assets/figma/wallet-m-rainbow-icon.png'

const networkTokens = [
  { src: tokenOptimism, name: 'Optimism', className: 'left-[8%] top-[7%] size-[50px]' },
  { src: tokenCelo, name: 'Celo', bg: '#fdfe54', className: 'left-[33%] top-[7%] size-[50px]', iconClassName: 'size-[35px]' },
  { src: tokenUnichain, name: 'Unichain', className: 'left-[61%] top-[9%] size-[48px]' },
  { src: tokenSolana, name: 'Solana', className: 'right-[8%] top-[9%] size-[50px]' },
  { src: tokenGnosis, name: 'Gnosis', className: 'left-[-6%] top-[32%] size-[50px]' },
  { src: tokenCorn, name: 'Corn', className: 'left-[20%] top-[35%] size-[48px]' },
  { src: tokenMonad, name: 'Monad', className: 'left-[46%] top-[32%] size-[50px]' },
  { src: tokenArbitrum, name: 'Arbitrum', className: 'right-[18%] top-[34%] size-[48px]' },
  { src: tokenAvalanche, name: 'Avalanche', className: 'right-[-6%] top-[30%] size-[50px]' },
] as const

type MarqueeWallet =
  | { kind: 'banner'; src: string; name: string; zoom?: boolean }
  | { kind: 'labelled'; src: string; name: string; iconClass: string; imgClass: string }

const wallets: MarqueeWallet[] = [
  { kind: 'banner', src: walletCoinbase, name: 'Coinbase Wallet' },
  { kind: 'banner', src: walletMetamask, name: 'MetaMask' },
  {
    kind: 'labelled',
    src: walletRabbyIcon,
    name: 'Rabby Wallet',
    iconClass: 'size-[29px] overflow-hidden rounded-[6px]',
    imgClass: 'size-full object-cover',
  },
  { kind: 'banner', src: walletZerion, name: 'Zerion' },
  { kind: 'banner', src: walletTrust, name: 'Trust Wallet', zoom: true },
  {
    kind: 'labelled',
    src: walletRainbowIcon,
    name: 'Rainbow Wallet',
    iconClass: 'relative h-[39px] w-[39px] overflow-hidden',
    imgClass: 'absolute left-[-52.4%] top-[-4.3%] h-[109%] w-[205%] max-w-none',
  },
  { kind: 'banner', src: walletPhantom, name: 'Phantom' },
]

/**
 * "Ecosystem" section — One integration. The entire wallet economy!
 * Dark section (#080808). Three stat/showcase cards plus a wallet logo strip.
 * Figma node 352:25230.
 */
export function Ecosystem() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-bg-dark)] py-[120px] text-white max-lg:py-[60px]">
      <div className="container-1200">
        <div className="flex flex-col gap-10 max-lg:gap-9">
          <SectionEyebrow>Ecosystem</SectionEyebrow>

          {/* heading row */}
          <Reveal className="flex flex-col items-start justify-between gap-6 max-lg:gap-4 lg:flex-row lg:items-center">
            <h2 className="max-w-[475px] text-[40px] font-medium leading-[44px] tracking-[-0.055em] max-lg:text-[28px] max-lg:leading-[33.6px]">
              One integration. The entire wallet economy!
            </h2>
            <p className="max-w-[544px] font-[family-name:var(--font-geist)] text-[16px] font-medium leading-[1.4] tracking-[-0.04em] text-white max-lg:text-[15px]">
              Stablezact routes payments across every major wallet, token, and
              chain which allows your customers pay how they already hold.
              Multiple blockchain networks with instant settlement
            </p>
          </Reveal>

          {/* three cards */}
          <RevealGroup className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Card 1 — accept more customers */}
            <RevealItem className="h-full">
              <div className="flex h-full min-h-[358px] max-lg:min-h-[270px] flex-col justify-between rounded-[18px] border border-transparent bg-[#7042d2] px-6 pb-6 pt-[23px] transition-all duration-300 hover:-translate-y-1 hover:border-white/30">
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[64px] font-medium leading-none tracking-[-0.03em] text-white max-lg:text-[40px]">
                    <CountUp value={300} suffix="M+" />
                  </p>
                  <p className="text-[18px] leading-[1.4] text-white">
                    Enable crypto holders to pay directly.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <img src={iconWallet04} alt="" className="size-6" />
                  <p className="text-[24px] font-medium leading-none tracking-[-0.02em] text-white max-lg:text-[20px]">
                    Accept more customers
                  </p>
                </div>
              </div>
            </RevealItem>

            {/* Card 2 — tokens */}
            <RevealItem className="h-full">
              <div className="relative flex h-full min-h-[358px] max-lg:min-h-[270px] flex-col justify-between overflow-hidden rounded-[18px] border border-transparent bg-[var(--color-bg-dark)] px-6 pb-6 pt-[23px] transition-all duration-300 hover:-translate-y-1 hover:border-[#2a2a2e]">
                <img
                  src={tokensGlow}
                  alt=""
                  className="pointer-events-none absolute left-1/2 top-[-230px] size-[461px] -translate-x-1/2 object-cover opacity-60"
                />
                <div className="relative flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[64px] font-medium leading-none tracking-[-0.03em] text-white max-lg:text-[40px]">
                    <CountUp value={1000} suffix="+" />
                  </p>
                  <p className="text-[18px] leading-[1.4] text-[var(--color-muted)]">
                    Customers can pay from over 1000 tokens.
                  </p>
                </div>
                <div className="relative flex flex-col gap-2">
                  <img src={iconTokenCircle} alt="" className="size-6" />
                  <p className="text-[24px] font-medium leading-none tracking-[-0.05em] text-white max-lg:text-[20px]">
                    Tokens
                  </p>
                </div>
              </div>
            </RevealItem>

            {/* Card 3 — blockchain networks */}
            <RevealItem className="h-full">
              <div className="relative flex h-full min-h-[358px] max-lg:min-h-[270px] flex-col justify-between overflow-hidden rounded-[18px] border border-transparent bg-[var(--color-bg-dark)] px-6 pb-6 pt-[23px] transition-all duration-300 hover:-translate-y-1 hover:border-[#2a2a2e]">
                <div className="relative h-[210px] max-lg:h-[150px]">
                  {networkTokens.map((t) =>
                    'bg' in t ? (
                      <span
                        key={t.name}
                        className={`absolute flex items-center justify-center overflow-hidden rounded-full ${t.className}`}
                        style={{ backgroundColor: t.bg }}
                      >
                        <img src={t.src} alt={t.name} className={t.iconClassName ?? 'size-full'} />
                      </span>
                    ) : (
                      <img
                        key={t.name}
                        src={t.src}
                        alt={t.name}
                        className={`absolute shrink-0 object-contain ${t.className}`}
                      />
                    ),
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <img src={iconTokenCircle} alt="" className="size-6 opacity-95" />
                  <p className="text-[24px] font-medium leading-none tracking-[-0.05em] text-white max-lg:text-[20px]">
                    Multiple blockchain network
                  </p>
                </div>
              </div>
            </RevealItem>
          </RevealGroup>

          {/* wallet logo strip */}
          <Reveal
            as="div"
            className="overflow-hidden border-y-[3px] border-[#1a1a1a] py-5"
          >
            <Marquee speed={28} gap={92}>
              {wallets.map((w) =>
                w.kind === 'banner' ? (
                  <div
                    key={w.name}
                    className="relative h-[56px] w-[100px] shrink-0 overflow-hidden"
                  >
                    <img
                      src={w.src}
                      alt={w.name}
                      className={
                        w.zoom
                          ? 'absolute left-[-53.8%] top-[-52.4%] h-[208%] w-[208%] max-w-none'
                          : 'size-full object-cover'
                      }
                    />
                  </div>
                ) : (
                  <div key={w.name} className="flex min-w-max items-center gap-[2px]">
                    <span className={w.iconClass}>
                      <img src={w.src} alt="" aria-hidden="true" className={w.imgClass} />
                    </span>
                    <span className="whitespace-nowrap font-[family-name:var(--font-geist)] text-[15px] font-medium tracking-[-0.02em] text-white">
                      {w.name}
                    </span>
                  </div>
                ),
              )}
            </Marquee>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
