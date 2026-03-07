import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Founder Focus Events — One Week. Every Piece of Content Your Business Needs.",
  description:
    "A week-long immersive retreat for UK founders. Content creation, sales focus, and founder community — all in a stunning Scottish house.",
  openGraph: {
    title: "Founder Focus Events",
    description:
      "A week-long immersive retreat for UK founders. VSL, podcast, social content, ads — all produced in one focused week.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Founder Focus Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Focus Events",
    description:
      "A week-long immersive retreat for UK founders. Content creation, sales focus, and founder community.",
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
