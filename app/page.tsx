"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Search, Award, Star, MapPin, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Navbar from "./navbar/page"
import { SignedOut, SignInButton, SignUpButton, useAuth, useUser } from "@clerk/nextjs"
import { BackgroundPaths } from "@/components/background-paths"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { ContainerScroll } from "@/components/container-scroll-animation"
import { HeroSection } from "./components/HeroSection/page"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<"login" | "register">("login")
  const { user } = useUser()
  const router = useRouter()
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

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
    <div className="flex min-h-screen flex-col">
      {/* <Navbar></Navbar>
      <BackgroundPaths title="DineSafe">
      
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 max-w-2xl">
            Discover and explore Toronto's restaurants with confidence through our comprehensive food safety inspection database.
          </p>
          <PlaceholdersAndVanishInput placeholders={placeholders} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error("Function not implemented.")
              } } onSubmit={function (e: React.FormEvent<HTMLFormElement>): void {
                throw new Error("Function not implemented.")
              } }></PlaceholdersAndVanishInput>
          <div className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
            dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
            overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              
            <Button
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                text-black dark:text-white transition-all duration-300 
                group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                hover:shadow-md dark:hover:shadow-neutral-800/50"
            >
              
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                Explore Restaurants
              </span>
              <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                transition-all duration-300">
                →
              </span>
            </Button>
          </div>
        </div>
        
      </BackgroundPaths> */}
      <HeroSection></HeroSection>
      
      
      <main className="flex-1">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`https://ui.aceternity.com/_next/image?url=%2Flinear.webp&w=3840&q=75`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Make smarter dining decisions with health inspection data
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DineSafe helps you choose restaurants with confidence by showing health inspection scores,
                    violations, and reviews in one easy-to-use app.
                  </p>
                </div>
                <div className="max-w-md">
                  <SearchBar onSearch={handleSearch} placeholder="Search for restaurants, cuisines..." />
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  {user ? (
                    <Button size="lg" className="bg-teal-500 hover:bg-teal-600" onClick={() => router.push("/search")}>
                      Explore restaurants
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="lg" className="bg-teal-500 hover:bg-teal-600" onClick={openRegisterModal}>
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn more
                    </Button>
                  </Link>
                  
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full max-w-[450px] overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 opacity-50"></div>
                  <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-sm">
                    <div className="flex h-10 items-center border-b bg-muted/40 px-4">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 h-8 w-3/4 rounded-md bg-muted"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-muted"></div>
                        <div className="h-4 w-full rounded bg-muted"></div>
                        <div className="h-4 w-2/3 rounded bg-muted"></div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                          <div className="mb-2 h-4 w-1/2 rounded bg-muted"></div>
                          <div className="h-8 w-8 rounded-full bg-green-100">
                            <div className="flex h-full items-center justify-center font-bold text-green-600">A</div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="mb-2 h-4 w-1/2 rounded bg-muted"></div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="mb-2 h-4 w-1/3 rounded bg-muted"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-full rounded bg-muted"></div>
                          <div className="h-4 w-full rounded bg-muted"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section id="features" className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl">
                DineSafe provides all the information you need to make informed dining choices in one place.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-10">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-teal-100 p-3">
                  <Search className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold">Search Restaurants</h3>
                <p className="text-center text-muted-foreground">
                  Find restaurants in your area with our easy-to-use search feature. Filter by cuisine, location, and
                  more.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-teal-100 p-3">
                  <Award className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold">Health Inspection Data</h3>
                <p className="text-center text-muted-foreground">
                  View health inspection scores and violations for each restaurant, presented in a clear,
                  easy-to-understand format.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-teal-100 p-3">
                  <Star className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold">Reviews & Ratings</h3>
                <p className="text-center text-muted-foreground">
                  See customer reviews and ratings alongside health data to make fully informed dining decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Currently available in Blacksburg, VA</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About DineSafe</h2>
              <p className="text-muted-foreground md:text-xl">
                DineSafe is currently in prototype phase, focusing on restaurants in Blacksburg, VA. We're working to
                expand to more locations soon.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-3xl rounded-xl border bg-muted/20 p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground">
                    We believe everyone deserves to know the health and safety standards of where they eat. DineSafe
                    makes this information accessible and easy to understand.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Data Sources</h3>
                  <p className="text-muted-foreground">
                    We collect data from official health department records and combine it with user reviews to give you
                    the complete picture of each restaurant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="feedback" className="w-full bg-teal-50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Help Us Improve</h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl">
                We're constantly working to make DineSafe better. Take our quick 60-second survey to share your
                thoughts.
              </p>
              <Link href="https://forms.gle/example" target="_blank" rel="noopener noreferrer" className="mt-4">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                  Take the 60-second survey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your feedback helps us build a better product for everyone.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:justify-between md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-10 w-10 rounded-md  flex items-center justify-center text-white text-xs">
              <Image src={"/dineSafe.png"} alt={""} width={100} height={100}></Image>
            </div>
            <span>DineSafe</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2023 DineSafe. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>

      
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
                    Log out
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
