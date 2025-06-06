import { type Metadata } from 'next'
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { ViewTransitions } from 'next-view-transitions'
import SplashCursor from './Animations/SplashCursor/SplashCursor'


export const metadata: Metadata = {
  title: 'DineSafe',
  description: 'Welcome to DineSafe, your trusted partner in food safety and compliance.',
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
