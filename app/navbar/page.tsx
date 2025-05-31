import React from 'react'
import { useState, useEffect } from "react"
import { Search, Award, Star, MapPin, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import { SearchBar } from "@/components/search/search-bar"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from 'next/image'
import Link from 'next/link'
import { SignedOut, SignInButton, SignUpButton, useUser, UserButton } from '@clerk/nextjs'






export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [authView, setAuthView] = useState<"login" | "register">("login")
    const { user } = useUser()
    const router = useRouter()
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }
  
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])
  
    const openLoginModal = () => {
      setAuthView("login")
      setAuthModalOpen(true)
    }
  
    const openRegisterModal = () => {
      setAuthView("register")
      setAuthModalOpen(true)
    }
  
    const handleSearch = (value: string) => {
      router.push(`/search?q=${encodeURIComponent(value)}`)
    }
  return (
    <div>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-10 w-10 rounded-md  flex items-center justify-center">
              <Image src={"/dineSafe.png"} alt={""} height={100} width={100}></Image>
            </div>
            <span>DineSafe</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="#feedback"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Feedback
            </Link>
            <Link
              href="/map"
              className="text-sm font-medium te xt-muted-foreground transition-colors hover:text-foreground"
            >
              Maps
            </Link>

          </nav>
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <UserButton />
            ) : (
              <>
                <div>
                <SignInButton>Log in</SignInButton>
                </div>
                <div className="bg-teal-500 rounded-md p-2 text-white text-sm hover:bg-teal-600">
                  <SignUpButton>Sign up</SignUpButton>
                </div>
                
                
              </>
            )}
          </div>
          <MobileNav
            isOpen={mobileMenuOpen}
            setIsOpen={setMobileMenuOpen}
            onLoginClick={openLoginModal}
            onRegisterClick={openRegisterModal}
            user={user}
          />
        </div>
      </header>
    </div>
  )
}

function MobileNav({
    isOpen,
    setIsOpen,
    onLoginClick,
    onRegisterClick,
    user,
  }: {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    onLoginClick: () => void
    onRegisterClick: () => void
    user: any
  }) {
    
    const router = useRouter()
  
    return (
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
        {isOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-in">
            <nav className="container flex flex-col gap-6 p-6">
              <Link
                href="#features"
                className="text-lg font-medium transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-lg font-medium transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="#feedback"
                className="text-lg font-medium transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Feedback
              </Link>
              <Button
                variant="outline"
                className="flex justify-start"
                onClick={() => {
                  router.push("/search")
                  setIsOpen(false)
                }}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Restaurants
              </Button>
              <div className="border-t pt-4 mt-2">
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
                {user ? (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <SignedOut>
                      
                    </SignedOut>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full bg-teal-500 hover:bg-teal-600"
                      onClick={() => {
                        onRegisterClick()
                        setIsOpen(false)
                      }}
                    >
                      Sign up
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        onLoginClick()
                        setIsOpen(false)
                      }}
                    >
                      Log in
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    )
  }
