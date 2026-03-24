import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

const siteDescription =
  "One week. Every piece of content your business needs. A four-night retreat for UK founders in Scotland - podcast, social content, and ads in the base week; optional add-ons (VSL, podcast mentoring, release support, EA) available separately. First cohort: 4–8 May 2026."

export const metadata: Metadata = {
  title: "Founder Focus Events - One week. Every piece of content your business needs.",
  description: siteDescription,
  openGraph: {
    title: "Founder Focus Events - One week. Every piece of content your business needs.",
    description: siteDescription,
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Founder Focus Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Focus Events - One week. Every piece of content your business needs.",
    description: siteDescription,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
