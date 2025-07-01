"use client"; // <-- must be at the very top!

import React from 'react'
import { useState, useEffect } from "react"
import { Search, Award, Star, MapPin, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from 'next/image'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { useTransitionRouter } from 'next-view-transitions';
import Link from 'next/link';
import { cn } from '@/lib/utils';


const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/About' },
  { name: 'Map', href: '/map' },
  { name: 'Pricing', href: '/pricing' },

]

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const { user } = useUser()
  const router = useTransitionRouter()



  React.useEffect(() => {
      const handleScroll = () => {
          setIsScrolled(window.scrollY > 50)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
      <header className="z-60">
          <nav
              data-state={menuState && 'active'}
              className="fixed z-20 w-full px-2 group">
              <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                  <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                      <div className="flex w-full justify-between lg:w-auto">
                          <Link
                              href="/"
                              aria-label="home"
                              className="flex items-center space-x-2">
                              <Logo /> DineSafe
                          </Link>

                          <button
                              onClick={() => setMenuState(!menuState)}
                              aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                              className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                              <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                              <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                          </button>
                      </div>

                      <div className="absolute inset-0 m-auto hidden size-fit lg:block z-50">
                          <ul className="flex gap-8 text-sm">
                              {menuItems.map((item, index) => (
                                  <li key={index}>
                                      <Link
                                          href={item.href}
                                          className="text-white hover:text-lime-200 block duration-150" 
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            await router.push(item.href, {
                                              onTransitionReady: pageTransition,
                                            });
                                          }}
                                          
                                          >
                                          <span>{item.name}</span>
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                      </div>

                      <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                          <div className="lg:hidden">
                              <ul className="space-y-6 text-base">
                                  {menuItems.map((item, index) => (
                                      <li key={index}>
                                          <Link
                                              href={item.href}
                                              className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                              <span>{item.name}</span>
                                          </Link>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                          <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                                {!user ? (
                                  <>
                                    <SignInButton mode="modal">
                                      <Button variant="outline" size="sm">Sign In</Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                      <Button size="sm">Sign Up</Button>
                                    </SignUpButton>
                                    <ThemeToggle />
                                    
                                  </>
                                ) : (
                                  <UserButton afterSignOutUrl="/" />
                                )}
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
      </header>
  )
}

export default HeroHeader

const Logo = ({ className }: { className?: string }) => {
  return (
      <svg
          viewBox="0 0 78 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('h-5 w-auto', className)}>
          <path
              d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
              fill="url(#logo-gradient)"
          />
          
          <defs>
              <linearGradient
                  id="logo-gradient"
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="20"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#9B99FE" />
                  <stop
                      offset="1"
                      stopColor="#2BC8B7"
                  />
              </linearGradient>
          </defs>
      </svg>
  )
}

const pageTransition = () => {
    return new Promise<void>((resolve, reject) => {
        try {
            const oldView = document.documentElement.animate(
                [
                { opacity: 1, transform: 'translateY(0px)' },
                { opacity: 0, transform: 'translateY(-30px)' },
                ],
                {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards',
                pseudoElement: '::view-transition-old(root)',
                }
            )
        
            const newView = document.documentElement.animate(
                [
                { opacity: 0, transform: 'translateY(30px)' },
                { opacity: 1, transform: 'translateY(0)' },
                ],
                {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards',
                pseudoElement: '::view-transition-new(root)',
                }
            )
        
            Promise.all([oldView.finished, newView.finished]).then(() => resolve()).catch(reject)
        } catch (err) {
            console.error("Transition failed:", err);
            reject(err);
        }
    })
}
  
