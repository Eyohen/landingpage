import type { SolutionContent } from './types'
import {
  iconGlobal,
  iconCustomize,
  iconWalletDone,
  iconStore,
  iconFilterVertical,
  iconTick,
  iconAirplane,
  iconLuggage,
  iconHospital,
  iconPersonStanding,
  iconStoreAlt,
  iconSuit,
  iconBus,
  iconShopSign,
  flagUsd,
  flagUk,
  flagCanada,
  flagNigeria,
} from './icons'

/** Figma frame 1634:23089 — "For Travel agencies". */
export const travel: SolutionContent = {
  metaTitle: 'Stablezact for Travel Companies — accept global payments from stablecoin wallets',
  metaDescription:
    'Give travellers another way to pay for flights, accommodation, experiences and travel services — settle in supported stablecoins or fiat where available.',
  hero: {
    eyebrow: 'TRAVEL COMPANIES',
    titleDark: 'Accept global payments',
    titleGray: 'from stablecoin wallets.',
    body: [
      'Give travellers another way to pay for flights, accommodation, experiences and travel services. Without relying exclusively on cards or domestic bank-payment methods — settle in supported stablecoins or fiat where available.',
    ],
    ctas: [{ label: 'Book a demo', href: '/book-a-demo', variant: 'purple' }],
  },
  capabilities: {
    headingDark: 'Built for travel',
    headingGray: 'payment challenges.',
    cards: [
      {
        icon: iconGlobal,
        title: 'Reach international customers',
        body: 'Accept payments from supported wallets without requiring customers to have a card issued in a particular country.',
      },
      {
        icon: iconCustomize,
        title: 'Support high-value purchases',
        body: 'Provide an additional payment option for flights, accommodation packages and other higher-value transactions.',
      },
      {
        icon: iconWalletDone,
        title: 'Confirm bookings quickly',
        body: 'Receive transaction validation and payment confirmation through APIs and webhooks.',
      },
      {
        icon: iconStore,
        title: 'Reduce checkout friction',
        body: 'Let customers pay from assets they already hold instead of first moving money through multiple financial services.',
      },
      {
        icon: iconFilterVertical,
        title: 'Fit existing booking flows',
        body: 'Integrate Stablezact alongside the payment methods already available on your website or application.',
      },
      {
        icon: iconTick,
        title: 'Direct settlement',
        body: 'Receive funds through a non-custodial settlement model that keeps your business in control.',
      },
    ],
  },
  sections: [
    {
      kind: 'split-panel',
      heading: 'Travel is global. Payment access is not.',
      body: 'Customers hold value in wallets across many currencies and markets. Stablezact lets them pay you from wherever they are.',
      chips: [
        { icon: flagUsd, label: 'USD', prefix: '$' },
        { icon: flagUk, label: 'GBP', prefix: '£' },
        { icon: flagCanada, label: 'CAD', prefix: '$' },
        { icon: flagNigeria, label: 'NGN', prefix: '₦' },
        { icon: flagCanada, label: 'CAD', prefix: '$' },
        { icon: flagUk, label: 'GBP', prefix: '£' },
        { icon: flagUsd, label: 'USD', prefix: '$' },
        { icon: flagNigeria, label: 'NGN', prefix: '₦' },
      ],
      chipCount: '40+',
    },
    {
      kind: 'chip-grid',
      eyebrow: 'SUITABLE FOR',
      heading: 'The businesses that move the world.',
      chips: [
        { icon: iconAirplane, label: 'Airlines' },
        { icon: iconLuggage, label: 'Online travel agencies' },
        { icon: iconHospital, label: 'Hotels & hospitality groups' },
        { icon: iconPersonStanding, label: 'Tour operators' },
        { icon: iconStoreAlt, label: 'Travel marketplaces' },
        { icon: iconSuit, label: 'Corporate travel providers' },
        { icon: iconBus, label: 'Transportation platforms' },
        { icon: iconShopSign, label: 'Luxury travel businesses' },
      ],
    },
  ],
  cta: {
    heading: 'Make it easier for global travellers to complete your booking',
    sub: 'Discuss your markets, average transaction value and settlement requirements with Stablezact.',
    cta: { label: 'Book a Demo', href: '/book-a-demo' },
  },
}
