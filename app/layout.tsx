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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${grotesque.variable} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
