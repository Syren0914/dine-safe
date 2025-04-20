"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  Star,
  ChevronRight,
  Share2,
  Bookmark,
  BookmarkCheck,
  Menu,
  X,
  MapIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth/auth-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import dynamic from "next/dynamic"

// Use dynamic import with no SSR for the LeafletMap component
const LeafletMap = dynamic(() => import("@/components/map/leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-[200px] bg-muted/30 rounded-lg border">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
        <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

// Mock data for a restaurant
const restaurantData = {
  id: "123",
  name: "Blacksburg Bistro",
  cuisine: "American, Farm-to-Table",
  address: "123 Main Street, Blacksburg, VA 24060",
  phone: "(540) 555-1234",
  website: "https://blacksburgbistro.com",
  latitude: "37.2296",
  longitude: "-80.4139",
  hours: [
    { day: "Monday", hours: "11:00 AM - 9:00 PM" },
    { day: "Tuesday", hours: "11:00 AM - 9:00 PM" },
    { day: "Wednesday", hours: "11:00 AM - 9:00 PM" },
    { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday", hours: "11:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "10:00 AM - 8:00 PM" },
  ],
  healthScore: {
    current: {
      grade: "A",
      score: 95,
      date: "2023-10-15",
    },
    history: [
      { grade: "A", score: 95, date: "2023-10-15" },
      { grade: "A", score: 92, date: "2023-04-22" },
      { grade: "B", score: 86, date: "2022-10-30" },
      { grade: "A", score: 94, date: "2022-04-18" },
    ],
  },
  violations: [
    {
      id: "v1",
      date: "2023-10-15",
      description: "Food contact surfaces not properly cleaned and sanitized",
      severity: "low",
      corrected: true,
    },
    {
      id: "v2",
      date: "2023-04-22",
      description: "Improper cold holding temperatures for potentially hazardous food",
      severity: "medium",
      corrected: true,
    },
    {
      id: "v3",
      date: "2022-10-30",
      description: "Evidence of pests observed in food preparation area",
      severity: "high",
      corrected: true,
    },
    {
      id: "v4",
      date: "2022-10-30",
      description: "Handwashing sink not accessible or supplied properly",
      severity: "medium",
      corrected: true,
    },
  ],
  ratings: {
    overall: 4.3,
    food: 4.5,
    service: 4.2,
    ambiance: 4.4,
    value: 4.0,
    count: 127,
  },
  reviews: [
    {
      id: "r1",
      author: "Emily S.",
      date: "2023-11-02",
      rating: 5,
      text: "Absolutely loved the farm-to-table concept. Everything tasted fresh and the staff was very knowledgeable about where the ingredients came from. Will definitely be back!",
      helpful: 12,
      unhelpful: 1,
    },
    {
      id: "r2",
      author: "Michael T.",
      date: "2023-10-18",
      rating: 4,
      text: "Great food and atmosphere. Service was a bit slow during the lunch rush, but the quality of the food made up for it. Their seasonal menu is always interesting.",
      helpful: 8,
      unhelpful: 2,
    },
    {
      id: "r3",
      author: "Sarah L.",
      date: "2023-09-30",
      rating: 3,
      text: "Food was good but a bit overpriced for the portion sizes. The restaurant was very clean though, which I appreciate after seeing their good health inspection score.",
      helpful: 15,
      unhelpful: 3,
    },
  ],
  photos: [
    {
      id: "p1",
      url: "/placeholder.svg?height=400&width=600",
      alt: "Restaurant interior",
    },
    {
      id: "p2",
      url: "/placeholder.svg?height=400&width=600",
      alt: "Signature dish",
    },
    {
      id: "p3",
      url: "/placeholder.svg?height=400&width=600",
      alt: "Outdoor seating area",
    },
    {
      id: "p4",
      url: "/placeholder.svg?height=400&width=600",
      alt: "Bar area",
    },
  ],
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [isSaved, setIsSaved] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<"login" | "register">("login")
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMap, setShowMap] = useState(false)

  // Get restaurant data (in a real app, this would fetch from an API)
  const restaurant = restaurantData

  // Format restaurant for map view
  const restaurantForMap = {
    id: restaurant.id,
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    address: restaurant.address,
    neighborhood: "Downtown",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: restaurant.phone,
    website: restaurant.website,
    priceRange: 3 as const,
    healthScore: restaurant.healthScore.current,
    ratings: restaurant.ratings,
    features: ["Outdoor Seating", "Vegetarian Options"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
  }

  // Delay showing the map to ensure it's properly initialized
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  // Handle save restaurant
  const handleSaveRestaurant = () => {
    if (!user) {
      setAuthView("login")
      setAuthModalOpen(true)
      return
    }
    setIsSaved(!isSaved)
  }

  // Handle review helpful/unhelpful
  const handleReviewFeedback = (reviewId: string, isHelpful: boolean) => {
    if (!user) {
      setAuthView("login")
      setAuthModalOpen(true)
      return
    }
    // In a real app, this would send the feedback to an API
    console.log(`Review ${reviewId} marked as ${isHelpful ? "helpful" : "unhelpful"}`)
  }

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500 bg-red-50"
      case "medium":
        return "text-orange-500 bg-orange-50"
      case "low":
        return "text-yellow-500 bg-yellow-50"
      default:
        return "text-gray-500 bg-gray-50"
    }
  }

  // Get grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-700"
      case "B":
        return "bg-yellow-100 text-yellow-700"
      case "C":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-red-100 text-red-700"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <div className="flex items-center gap-2 font-semibold">
              <div className="h-8 w-8 rounded-md bg-teal-500 flex items-center justify-center text-white">DS</div>
              <span className="hidden md:inline">DineSafe</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={() => {}}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button
              variant={isSaved ? "default" : "outline"}
              size="sm"
              onClick={handleSaveRestaurant}
              className={isSaved ? "bg-teal-500 hover:bg-teal-600" : ""}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Menu</span>
            </Button>

            {mobileMenuOpen && (
              <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-in">
                <div className="container flex flex-col gap-4 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Button
                    variant={isSaved ? "default" : "outline"}
                    onClick={handleSaveRestaurant}
                    className={isSaved ? "bg-teal-500 hover:bg-teal-600" : ""}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="mr-2 h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => {}}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Separator />
                  <Button variant="ghost" onClick={() => router.push("/")}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Restaurant Header */}
        <section className="w-full bg-muted/30 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:gap-12">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{restaurant.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span>{restaurant.cuisine}</span>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {restaurant.ratings.overall} ({restaurant.ratings.count} reviews)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span>{restaurant.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold ${getGradeColor(restaurant.healthScore.current.grade)}`}
                  >
                    {restaurant.healthScore.current.grade}
                  </div>
                  <div>
                    <div className="text-sm font-medium">Health Score</div>
                    <div className="text-2xl font-bold">{restaurant.healthScore.current.score}/100</div>
                    <div className="text-xs text-muted-foreground">
                      Last inspected {new Date(restaurant.healthScore.current.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="w-full py-6">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src={restaurant.photos[activePhotoIndex].url || "/placeholder.svg"}
                  alt={restaurant.photos[activePhotoIndex].alt}
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                {restaurant.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-md ${
                      index === activePhotoIndex ? "ring-2 ring-teal-500" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.alt}
                      width={96}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-teal-500 data-[state=active]:bg-transparent"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="health"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-teal-500 data-[state=active]:bg-transparent"
                >
                  Health Inspections
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-teal-500 data-[state=active]:bg-transparent"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-teal-500 data-[state=active]:bg-transparent"
                >
                  <MapIcon className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="pt-6">
                <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                  <div>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold">About {restaurant.name}</h2>
                      <p className="mt-2 text-muted-foreground">
                        {restaurant.name} is a farm-to-table restaurant specializing in locally-sourced American
                        cuisine. Our menu changes seasonally to showcase the freshest ingredients from local farmers and
                        producers.
                      </p>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-xl font-bold">Health Score Summary</h2>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium text-muted-foreground">Current Score</div>
                              <div className="text-2xl font-bold">{restaurant.healthScore.current.score}/100</div>
                            </div>
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold ${getGradeColor(restaurant.healthScore.current.grade)}`}
                            >
                              {restaurant.healthScore.current.grade}
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            Last inspected {new Date(restaurant.healthScore.current.date).toLocaleDateString()}
                          </div>
                          <Link href="#health">
                            <Button variant="link" className="h-auto p-0 text-teal-500">
                              View inspection history
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="text-sm font-medium text-muted-foreground">Recent Violations</div>
                          {restaurant.violations.length > 0 ? (
                            <div className="mt-2">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={getSeverityColor(restaurant.violations[0].severity)}
                                >
                                  {restaurant.violations[0].severity}
                                </Badge>
                                <div className="text-sm truncate">{restaurant.violations[0].description}</div>
                              </div>
                              <div className="mt-2 text-xs text-muted-foreground">
                                {restaurant.violations.length - 1} more violation(s) in the last year
                              </div>
                              <Link href="#health">
                                <Button variant="link" className="h-auto p-0 text-teal-500">
                                  View all violations
                                  <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          ) : (
                            <div className="mt-2 text-sm">No recent violations</div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">Reviews Summary</h2>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="text-4xl font-bold">{restaurant.ratings.overall}</div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= Math.round(restaurant.ratings.overall)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Based on {restaurant.ratings.count} reviews
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-20 text-sm">Food</div>
                          <Progress value={restaurant.ratings.food * 20} className="h-2" />
                          <div className="w-8 text-right text-sm">{restaurant.ratings.food}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 text-sm">Service</div>
                          <Progress value={restaurant.ratings.service * 20} className="h-2" />
                          <div className="w-8 text-right text-sm">{restaurant.ratings.service}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 text-sm">Ambiance</div>
                          <Progress value={restaurant.ratings.ambiance * 20} className="h-2" />
                          <div className="w-8 text-right text-sm">{restaurant.ratings.ambiance}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-20 text-sm">Value</div>
                          <Progress value={restaurant.ratings.value * 20} className="h-2" />
                          <div className="w-8 text-right text-sm">{restaurant.ratings.value}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Link href="#reviews">
                          <Button variant="link" className="h-auto p-0 text-teal-500">
                            Read all reviews
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium">Contact Information</h3>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div>{restaurant.address}</div>
                            <Button variant="link" className="h-auto p-0 text-teal-500">
                              Get directions
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-muted-foreground" />
                          <div>{restaurant.phone}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <a
                            href={restaurant.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-500 hover:underline"
                          >
                            {restaurant.website.replace(/^https?:\/\//, "")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border p-4">
                      <h3 className="font-medium">Hours of Operation</h3>
                      <div className="mt-4 space-y-2">
                        {restaurant.hours.map((day) => (
                          <div key={day.day} className="flex justify-between text-sm">
                            <div className="font-medium">{day.day}</div>
                            <div>{day.hours}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Location</h3>
                      <div className="aspect-video overflow-hidden rounded-md">
                        {/* Static map image as fallback */}
                        <div className="relative w-full h-full">
                          <Image 
                            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+14b8a6(${restaurant.longitude},${restaurant.latitude})/${restaurant.longitude},${restaurant.latitude},15,0/300x200?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                            alt="Restaurant location map"
                            width={300}
                            height={200}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      </div>
                      <Button
                        variant="link"
                        className="mt-2 h-auto p-0 text-teal-500"
                        onClick={() => router.push("/map")}
                      >
                        View full map
                        <MapIcon className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Health Inspections Tab */}
              <TabsContent value="health" className="pt-6">
                <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                  <div>
                    <div className="mb-8">
                      <h2 className="text-xl font-bold">Health Inspection History</h2>
                      <p className="mt-2 text-muted-foreground">
                        View the complete health inspection history for {restaurant.name}, including scores, grades, and
                        dates.
                      </p>

                      <div className="mt-6 space-y-4">
                        {restaurant.healthScore.history.map((inspection, index) => (
                          <div key={inspection.date} className="rounded-lg border p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-muted-foreground">
                                  Inspection Date: {new Date(inspection.date).toLocaleDateString()}
                                </div>
                                <div className="mt-1 text-lg font-bold">Score: {inspection.score}/100</div>
                              </div>
                              <div
                                className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold ${getGradeColor(inspection.grade)}`}
                              >
                                {inspection.grade}
                              </div>
                            </div>

                            {index === 0 && (
                              <div className="mt-4">
                                <div className="text-sm font-medium">Violations Found:</div>
                                <ul className="mt-2 space-y-2">
                                  {restaurant.violations
                                    .filter((v) => v.date === inspection.date)
                                    .map((violation) => (
                                      <li key={violation.id} className="flex items-start gap-2 text-sm">
                                        <Badge variant="outline" className={getSeverityColor(violation.severity)}>
                                          {violation.severity}
                                        </Badge>
                                        <div>
                                          {violation.description}
                                          {violation.corrected && (
                                            <span className="ml-2 text-xs text-green-600">(Corrected on site)</span>
                                          )}
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}


\
