import { SectionEyebrow } from '@/components/SectionEyebrow'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal'
import { CountUp } from '@/components/motion/CountUp'
import { Marquee } from '@/components/motion/Marquee'

import tokensGlow from '@/assets/figma/tokens-glow.png'
import iconWallet04 from '@/assets/figma/icon-wallet-04.svg'
import iconTokenCircle from '@/assets/figma/icon-token-circle.svg'

import tokenBase from '@/assets/figma/token-base.svg'
import tokenOptimism from '@/assets/figma/token-optimism.svg'
import tokenCelo from '@/assets/figma/token-celo.svg'
import tokenUnichain from '@/assets/figma/token-unichain.svg'
import tokenSolana from '@/assets/figma/token-solana.svg'
import tokenMonad from '@/assets/figma/token-monad.svg'
import tokenGnosis from '@/assets/figma/token-gnosis.svg'
import tokenCorn from '@/assets/figma/token-corn.svg'
import tokenInk from '@/assets/figma/token-ink.svg'
import tokenArbitrum from '@/assets/figma/token-arbitrum.svg'
import tokenAvalanche from '@/assets/figma/token-avalanche.svg'

import walletCoinbase from '@/assets/figma/wallet-coinbase.png'
import walletMetamask from '@/assets/figma/wallet-metamask.png'
import walletRabby from '@/assets/figma/wallet-rabby.png'
import walletZerion from '@/assets/figma/wallet-zerion.png'
import walletTrust from '@/assets/figma/wallet-trust.png'
import walletRainbow from '@/assets/figma/wallet-rainbow.png'
import walletPhantom from '@/assets/figma/wallet-phantom.png'

/* Token chips: first row (50px) and second row (slightly larger) from Figma. */
const tokensRow1 = [
  { src: tokenBase, name: 'Base' },
  { src: tokenOptimism, name: 'Optimism' },
  { src: tokenCelo, name: 'Celo', bg: '#fdfe54', inset: true },
  { src: tokenUnichain, name: 'Unichain' },
  { src: tokenSolana, name: 'Solana' },
  { src: tokenMonad, name: 'Monad' },
]

const tokensRow2 = [
  { src: tokenGnosis, name: 'Gnosis' },
  { src: tokenCorn, name: 'Corn' },
  { src: tokenInk, name: 'Ink' },
  { src: tokenArbitrum, name: 'Arbitrum' },
  { src: tokenAvalanche, name: 'Avalanche' },
]

const wallets = [
  { src: walletCoinbase, name: 'Coinbase Wallet' },
  { src: walletMetamask, name: 'MetaMask' },
  { src: walletRabby, name: 'Rabby Wallet', label: true },
  { src: walletTrust, name: 'Trust Wallet' },
  { src: walletZerion, name: 'Zerion' },
  { src: walletRainbow, name: 'Rainbow Wallet', label: true },
  { src: walletPhantom, name: 'Phantom' },
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
            <p className="max-w-[544px] text-[20px] font-normal leading-[1.5] tracking-[-0.04em] text-[#888] max-lg:text-[16px] max-lg:leading-[24px]">
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
                  <p className="font-mono text-[64px] font-medium leading-none tracking-[-0.05em] text-white max-lg:text-[40px]">
                    <CountUp value={300} suffix="+" />
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
              <div className="relative flex h-full min-h-[358px] max-lg:min-h-[270px] flex-col justify-between overflow-hidden rounded-[18px] border border-transparent bg-[var(--color-bg-dark)] px-6 pb-6 pt-[23px] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50">
                <img
                  src={tokensGlow}
                  alt=""
                  className="pointer-events-none absolute left-1/2 top-[-230px] size-[461px] -translate-x-1/2 object-cover opacity-60"
                />
                <div className="relative flex flex-col gap-1">
                  <p className="font-mono text-[64px] font-medium leading-none tracking-[-0.05em] text-white max-lg:text-[40px]">
                    <CountUp value={100} suffix="+" />
                  </p>
                  <p className="text-[18px] leading-[1.4] text-[var(--color-muted)]">
                    Over 100 tokens to choose from
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
              <div className="relative flex h-full min-h-[358px] max-lg:min-h-[270px] flex-col justify-between overflow-hidden rounded-[18px] border border-transparent bg-[var(--color-bg-dark)] px-6 pb-6 pt-[23px] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-purple)]/50">
                <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                  {tokensRow1.map((t) =>
                    t.bg ? (
                      <span
                        key={t.name}
                        className="flex size-[50px] items-center justify-center overflow-hidden rounded-full"
                        style={{ backgroundColor: t.bg }}
                      >
                        <img
                          src={t.src}
                          alt={t.name}
                          className="size-[35px]"
                        />
                      </span>
                    ) : (
                      <img
                        key={t.name}
                        src={t.src}
                        alt={t.name}
                        className="size-[50px] shrink-0"
                      />
                    ),
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                  {tokensRow2.map((t) => (
                    <img
                      key={t.name}
                      src={t.src}
                      alt={t.name}
                      className="size-[52px] shrink-0"
                    />
                  ))}
                </div>
              </div>
                <div className="flex flex-col gap-2">
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
            <Marquee speed={28} gap={60}>
              {wallets.map((w) => (
                <div key={w.name} className="flex items-center gap-2.5">
                  <img
                    src={w.src}
                    alt={w.name}
                    className="h-[40px] w-auto max-w-[120px] object-contain max-lg:h-[52px] max-lg:max-w-[150px]"
                  />
                  {w.label && (
                    <span className="whitespace-nowrap text-[20px] font-medium tracking-[-0.04em] text-white">
                      {w.name}
                    </span>
                  )}
                </div>
              ))}
            </Marquee>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
