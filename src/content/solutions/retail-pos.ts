import type { SolutionContent } from './types'
import {
  iconQrCode,
  iconZap,
  iconWalletDone,
  iconDashboard,
  iconLayers,
  iconCashier02,
  iconStoreAlt,
  iconShopSign,
  iconHospital,
  iconCashier,
  iconPersonStanding,
  iconSuit,
  iconSmartphone,
  iconBarcodeScan,
  flagUsd,
  flagUk,
  flagCanada,
  flagNigeria,
} from './icons'

/**
 * Figma frame 1651:23979 — "For retail and POS". The Figma frame carries
 * copy-paste leftovers from the Travel page (eyebrow, hero body, currency
 * heading, chip icons); those are adapted to retail wording here.
 */
export const retailPos: SolutionContent = {
  metaTitle: 'Stablezact for Retail & POS — bring stablecoin wallets to the physical checkout',
  metaDescription:
    'Give customers another way to pay in store. Stablezact generates QR payment requests at the till, validates the transaction on-chain and settles directly to your business.',
  hero: {
    eyebrow: 'RETAIL & POS',
    titleDark: 'Bring stablecoin wallets',
    titleGray: 'to the physical checkout.',
    body: [
      'Give customers another way to pay in store. Stablezact generates QR payment requests at the till, validates the transaction on-chain and settles directly to your business — in supported stablecoins or fiat where available.',
    ],
    ctas: [{ label: 'Book a Demo', href: '/book-a-demo', variant: 'purple' }],
  },
  capabilities: {
    headingDark: 'Built for everyday',
    headingGray: 'retail operations.',
    cards: [
      {
        icon: iconQrCode,
        title: 'QR-powered payments',
        body: 'Generate a unique payment request that customers can scan from their preferred supported wallet.',
      },
      {
        icon: iconZap,
        title: 'Fast payment validation',
        body: 'Give the cashier a clear successful, pending or failed payment status.',
      },
      {
        icon: iconWalletDone,
        title: 'Compatible customer wallets',
        body: 'Allow customers to pay without installing a merchant-specific application.',
      },
      {
        icon: iconDashboard,
        title: 'Settlement visibility',
        body: 'Provide transaction and settlement information through the merchant dashboard.',
      },
      {
        icon: iconLayers,
        title: 'Non-custodial infrastructure',
        body: 'Funds settle to the configured merchant wallet rather than being held by Stablezact.',
      },
      {
        icon: iconCashier02,
        title: 'Existing POS compatibility',
        body: 'Integrate through Android POS applications, APIs or other supported retail-software environments.',
      },
    ],
  },
  sections: [
    {
      merged: true,
      kind: 'split-panel',
      heading: 'Your customers are global. Payment access is not.',
      body: 'Shoppers hold value in wallets across many currencies and markets. Stablezact lets them spend it at your counter.',
      chips: [
        { icon: flagUsd, label: 'USD', prefix: '$' },
        { icon: flagUk, label: 'GBP', prefix: '£' },
        { icon: flagCanada, label: 'CAD', prefix: '$' },
        { icon: flagNigeria, label: 'NGN', prefix: '₦' },
      ],
      chipCount: '40+',
    },
    {
      kind: 'chip-grid',
      eyebrow: 'SUITABLE FOR',
      heading: 'From flagship stores to neighbourhood venues.',
      chips: [
        { icon: iconStoreAlt, label: 'Retail chains' },
        { icon: iconShopSign, label: 'Independent stores' },
        { icon: iconHospital, label: 'Hospitality venues' },
        { icon: iconCashier, label: 'Restaurants' },
        { icon: iconPersonStanding, label: 'Entertainment venues' },
        { icon: iconSuit, label: 'Luxury retailers' },
        { icon: iconSmartphone, label: 'Electronics stores' },
        { icon: iconBarcodeScan, label: 'Event & ticketing locations' },
      ],
    },
  ],
  cta: {
    heading: 'Let customers spend from their wallets in your stores.',
    sub: 'Speak with us about POS integration, store rollout and settlement.',
    cta: { label: 'Book a Demo', href: '/book-a-demo' },
  },
}
