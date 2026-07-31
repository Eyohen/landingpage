import type { SolutionContent } from './types'
import {
  iconCreditCard,
  iconTick,
  iconWallet,
  iconClock,
  iconUsers,
  iconTelescope,
  iconCashier,
  iconSmartphone,
  iconGlobe,
  iconLink,
  iconInvoice,
  iconTransactionHistory,
  iconBarcodeScan,
} from './icons'

/** Figma frame 1606:21520 — "For enterprise merchants". */
export const enterpriseMerchants: SolutionContent = {
  metaTitle: 'Stablezact for Enterprise Merchants — accept stablecoins without changing how you operate',
  metaDescription:
    'Add stablecoin wallets as another checkout option and receive settlement directly to infrastructure controlled by your business — without replacing your existing PSP or checkout infrastructure.',
  hero: {
    eyebrow: 'ENTERPRISE MERCHANTS',
    titleDark: 'Accept stablecoins without changing',
    titleGray: 'how your business operates.',
    body: [
      'Add stablecoin wallets as another checkout option and receive settlement directly to infrastructure controlled by your business.',
    ],
    ctas: [
      { label: 'Book an enterprise Demo', href: '/book-a-demo', variant: 'purple' },
      { label: 'See how it works', href: '/#how-it-works', variant: 'soft' },
    ],
  },
  capabilities: {
    headingDark: 'Designed for enterprise',
    headingGray: 'payment environments.',
    cards: [
      {
        icon: iconCreditCard,
        title: 'Additive payment infrastructure',
        body: 'Introduce stablecoins without replacing your existing PSP, acquiring relationship or checkout infrastructure.',
      },
      {
        icon: iconTick,
        title: 'Direct settlement',
        body: 'Receive supported stablecoins directly to a wallet your business controls. Supported fiat settlement can be configured where available.',
      },
      {
        icon: iconWallet,
        title: 'Global wallet accessibility',
        body: 'Allow customers to pay using supported wallets regardless of whether they have access to your usual domestic payment methods.',
      },
      {
        icon: iconClock,
        title: 'Real-time confirmation',
        body: 'Receive payment-status updates through APIs and webhooks so orders can be confirmed automatically.',
      },
      {
        icon: iconUsers,
        title: 'Multiple customer experiences',
        body: 'Support browser wallets, mobile-wallet deep links, QR codes and payment links.',
      },
      {
        icon: iconTelescope,
        title: 'Transaction visibility',
        body: 'Track payments, statuses and settlement information through the Stablezact merchant dashboard.',
      },
    ],
  },
  sections: [
    {
      kind: 'chip-grid',
      eyebrow: 'WHERE IT FITS',
      heading: 'A stablecoin rail across every surface.',
      chips: [
        { icon: iconCashier, label: 'Online checkout' },
        { icon: iconSmartphone, label: 'Mobile applications' },
        { icon: iconGlobe, label: 'Cross-border purchases' },
        { icon: iconCreditCard, label: 'Customer account funding' },
        { icon: iconLink, label: 'Payment links' },
        { icon: iconInvoice, label: 'Subscription or invoice flows' },
        { icon: iconTransactionHistory, label: 'High-value transactions' },
        { icon: iconBarcodeScan, label: 'In-store QR payments' },
      ],
    },
    {
      merged: true,
      kind: 'split-panel',
      heading: 'Seven predictable steps',
      body: 'Add stablecoin wallets as another checkout option and receive settlement directly to infrastructure controlled by your business.',
      chips: [
        { label: 'Retail & consumer brands' },
        { label: 'Digital goods' },
        { label: 'Luxury & high value goods' },
        { label: 'Streaming & subscription' },
        { label: 'Gaming & content' },
        { label: 'Cross-border e-commerce' },
      ],
      chipCount: '5+',
      cards: [
        {
          title: 'Customer selects stablecoin at checkout',
          body: 'The stablecoin option appears alongside cards and other payment methods.',
        },
        {
          title: 'Stablezact displays the supported options',
          body: 'Wallets, networks and tokens the customer can use to pay.',
        },
        {
          title: 'The customer opens their preferred wallet',
          body: 'Via browser connection, mobile deep link, QR code or payment link.',
        },
        {
          title: 'The customer approves the payment',
          body: 'Amount, merchant, token and network are shown before signing.',
        },
        {
          title: 'Stablezact validates the transaction',
          body: 'Blockchain monitoring and confirmation before status is updated.',
        },
        {
          title: 'Your order-management system receives confirmation',
          body: 'Webhooks and API polling both supported for reliable delivery.',
        },
        {
          title: 'Settlement is delivered',
          body: 'To the configured wallet or supported settlement destination.',
        },
      ],
    },
  ],
  cta: {
    heading: 'Make your checkout accessible to the stablecoin wallet economy.',
    sub: 'Speak with our team about technical integration, merchant rollout and commercial structure.',
    cta: { label: 'Discuss an enterprise partnership', href: '/talk-to-sales' },
  },
}
