import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { ViewTransitions } from 'next-view-transitions'
import { ExpandableChatDemo } from '@/components/chat/chat'



export const metadata: Metadata = {
  title: 'CrAIve',
  description: 'Welcome to CrAIve, your trusted partner in food safety and compliance.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased font-roobert">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ExpandableChatDemo/>
            <header className="flex justify-between items-center ">
              {/* Theme toggle or nav goes here */}
              
            </header>
            {/* <SplashCursor/> */}

            <ViewTransitions>
            {children}
            </ViewTransitions>
          </ThemeProvider>
        </body>
      </html>
      
    </ClerkProvider>
  )
}
