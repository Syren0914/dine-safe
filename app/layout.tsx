import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./navbar/page"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DineSafe - Make Smarter Dining Decisions",
  description:
    "DineSafe helps you choose restaurants with confidence by showing health inspection scores, violations, and reviews in one easy-to-use app."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
