import "@repo/theme/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@repo/utils"

import Providers from "./providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next Turbo",
  description: "Generated by create-next-turbo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
