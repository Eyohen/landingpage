import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/SmoothScroll"

const grotesque = Bricolage_Grotesque({
  variable: "--font-grotesque",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Coinley - Accept Crypto Payments Instantly",
  description: "Accept USDT and USDC payments with Coinley. Simple integration, instant settlements, and seamless crypto payment solutions for your business.",
  icons: {
    icon: [
      { url: "/favico.png", sizes: "any" },
      { url: "/favico.png", type: "image/png" },
    ],
    shortcut: "/favico.png",
    apple: "/favico.png",
  },
  openGraph: {
    title: "Coinley - Accept Crypto Payments Instantly",
    description: "Accept USDT and USDC payments with Coinley. Simple integration, instant settlements, and seamless crypto payment solutions for your business.",
    images: ["/favico.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coinley - Accept Crypto Payments Instantly",
    description: "Accept USDT and USDC payments with Coinley. Simple integration, instant settlements, and seamless crypto payment solutions for your business.",
    images: ["/favico.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favico.png" />
        <link rel="apple-touch-icon" href="/favico.png" />
      </head>
      <body className={`${grotesque.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
