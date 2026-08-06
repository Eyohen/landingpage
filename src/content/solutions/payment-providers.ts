import type { SolutionContent } from './types'
import {
  iconWallet,
  iconCustomerService,
  iconStore,
  iconCardValidation,
  iconFilterVertical,
  iconLayers,
  iconCoins,
  iconTap,
  iconWalletSm,
  iconStamp,
  iconCash,
} from './icons'

/** Figma frame 1430:6679 — "For payment Providers". */
export const paymentProviders: SolutionContent = {
  metaTitle: 'Stablezact for Payment Service Providers — stablecoin payments for your merchant network',
  metaDescription:
    'Give your merchants access to crypto wallet payments through the payment infrastructure they already use. Stablezact helps PSPs and PayFacs launch stablecoin acceptance without building wallet connectivity from the ground up.',
  hero: {
    eyebrow: 'PAYMENT SERVICE PROVIDERS',
    titleDark: 'Add stablecoin payments across',
    titleGray: 'your merchant networks.',
    body: [
      'Give your merchants access to crypto wallet payments through the payment infrastructure they already use.',
      'Stablezact helps PSPs and PayFacs launch stablecoin acceptance without building wallet connectivity, blockchain routing and transaction validation from the ground up.',
    ],
    ctas: [
      { label: 'Discuss a PSP partnership', href: '/talk-to-sales', variant: 'purple' },
      { label: 'See how it works', href: '/#how-it-works', variant: 'soft' },
    ],
  },
  capabilities: {
    headingDark: 'Built for payment companies,',
    headingGray: 'not only individual merchants.',
    cards: [
      {
        icon: iconWallet,
        title: 'One integration, broad wallet coverage',
        body: 'Connect your platform to hundreds of supported wallets across multiple blockchain networks without maintaining separate integrations for each wallet or chain.',
      },
      {
        icon: iconCustomerService,
        title: 'Distribute through your channels',
        body: 'Make stablecoin acceptance available as an additional payment method within your existing merchant dashboard, APIs or checkout products.',
      },
      {
        icon: iconStore,
        title: 'Direct merchant settlement',
        body: 'Payments can settle directly to wallets controlled by your merchants or to an agreed settlement structure. Stablezact does not need to take custody of merchant funds.',
      },
      {
        icon: iconCardValidation,
        title: 'Payment orchestration and validation',
        body: 'Stablezact handles wallet connection, payment instructions, network monitoring and transaction validation before returning the payment status to your platform.',
      },
      {
        icon: iconFilterVertical,
        title: 'Enterprise transaction controls',
        body: 'Use webhooks, idempotency controls, transaction references and payment-status updates to support reliable processing at scale.',
      },
      {
        icon: iconLayers,
        title: 'Commercial flexibility',
        body: 'Support platform pricing, merchant-level pricing and volume-based commercial arrangements appropriate for your distribution model.',
      },
    ],
  },
  sections: [
    {
      kind: 'gains-how-it-works',
      heading: 'From merchant activation to settlement',
      gainsTitle: 'What your business gains',
      gainsBody:
        'Everything you need to launch stablecoin payments quickly, create new revenue opportunities, and help your merchants reach more customers without the complexity of blockchain infrastructure.',
      gains: [
        'Fast route to launching stablecoin acceptance',
        'A new product for your existing merchant base',
        'Payment revenue without full blockchain infrastructure',
        'Broader customer reach for your merchants',
        'A non-custodial infrastructure model',
        'APIs designed to fit existing payment workflows',
      ],
      steps: [
        {
          icon: iconCoins,
          title: 'Your merchant enables stablecoins',
          body: 'The merchant activates stablecoin payments as an additional method through your platform.',
        },
        {
          icon: iconTap,
          title: 'The customer selects stablecoin at checkout',
          body: 'Your existing checkout presents stablecoins alongside cards, bank transfers and other supported methods.',
        },
        {
          icon: iconWalletSm,
          title: 'Stablezact connects the customer’s wallet',
          body: 'The customer selects a supported wallet, network and token and approves the payment.',
        },
        {
          icon: iconStamp,
          title: 'The transaction is validated instantly',
          body: 'Stablezact monitors the blockchain transaction and sends the confirmed payment status to your platform.',
        },
        {
          icon: iconCash,
          title: 'The merchant receives settlement',
          body: 'Funds are delivered directly to the configured merchant settlement wallet. Supported fiat settlement can be enabled where available.',
        },
      ],
    },
    {
      kind: 'split-panel',
      eyebrow: 'CAPABILITIES',
      heading: 'The payment companies powering modern commerce',
      chips: [
        { label: 'Payment service providers' },
        { label: 'Payment facilitators' },
        { label: 'Merchant acquirers' },
        { label: 'Payment gateways' },
        { label: 'Payment orchestration platforms' },
      ],
      chipCount: '3+',
      panelTitle: 'Integration options',
      cards: [
        {
          title: 'Embedded API',
          body: 'Integrate Stablezact directly into your checkout and merchant-management experience.',
        },
        {
          title: 'Hosted payment experience',
          body: 'Launch faster using Stablezact-hosted components while maintaining your existing customer journey.',
        },
        {
          title: 'White-labelled deployment',
          body: 'Present stablecoin checkout as part of your own payment proposition, subject to the agreed implementation model.',
        },
        {
          title: 'Merchant referral partnership',
          body: 'Refer eligible merchants to Stablezact while offering stablecoin acceptance as part of your broader product suite.',
        },
      ],
    },
  ],
  cta: {
    heading: 'Launch stablecoin payments without blockchain infrastructure.',
    sub: 'Speak with our team about technical integration, merchant rollout and commercial structure.',
    cta: { label: 'Discuss a PSP partnership', href: '/talk-to-sales' },
  },
}
