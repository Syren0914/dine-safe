"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Search, List, MapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { RestaurantCard } from "@/components/search/restaurant-card"
import { MobileFilters } from "@/components/search/mobile-filters"
import { restaurants, filterRestaurants } from "@/lib/restaurant-data"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Footer } from "../components/Footer/Footer"
import dynamic from "next/dynamic"
import HeroHeader from "../navbar/page"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { transformInspectionsToRestaurants } from "@/lib/inspection-utils"
import type { InspectionData } from "@/types/inspection"


// Use dynamic import with no SSR for the LeafletMap component
const MapPlaceholder = () => (
  <div className="flex items-center justify-center w-full h-[calc(100vh-220px)] min-h-[500px] bg-muted/30 rounded-lg border">
    <div className="flex flex-col items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
    </div>
  </div>
)

export default function MapPage() {
  interface SearchBarProps {
    initialValue?: string
    onSearch?: (value: string) => void
    placeholder?: string
    className?: string
    autoFocus?: boolean
  }
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)
  const [view, setView] = useState<"map" | "list">("map")
  const [filters, setFilters] = useState({
    cuisine: "",
    neighborhood: "",
    minHealthScore: 0,
    priceRange: [] as number[],
    features: [] as string[],
  })
  const [showMap, setShowMap] = useState(false)
  const [inspectionData, setInspectionData] = useState<InspectionData[]>([])

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const res = await fetch("/api/inspections")
        const data = await res.json()
        setInspectionData(data)
      } catch (error) {
        console.error("Failed to fetch inspection data:", error)
      }
    }

    fetchInspections()
  }, [])

  useEffect(() => {
    const fetchAndTransform = async () => {
      try {
        const res = await fetch("/api/inspections")
        const data: InspectionData[] = await res.json()
  
        const transformed = transformInspectionsToRestaurants(data)
        setFilteredRestaurants(transformed)
      } catch (error) {
        console.error("Failed to fetch inspection data:", error)
      }
    }
  
    fetchAndTransform()
  }, [])
  


  // Check if any filters are applied
  const hasFilters =
    filters.cuisine !== "" ||
    filters.neighborhood !== "" ||
    filters.minHealthScore > 0 ||
    filters.priceRange.length > 0 ||
    filters.features.length > 0

  // Apply search and filters
  useEffect(() => {
    const filtered = filterRestaurants(restaurants, {
      searchTerm,
      ...filters,
    })
    setFilteredRestaurants(filtered)
  }, [searchTerm, filters])
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/inspections")
      const data = await res.json()
  
      const transformed = data
        .filter((entry: any) => entry.location?.longitude && entry.location?.latitude)
        .map((entry: any, index: number) => ({
          id: entry._id?.$oid || index.toString(),
          name: entry["Restaurant Name"] || "Unnamed",
          cuisine: "Unknown",
          latitude: entry.location.latitude,
          longitude: entry.location.longitude,
          address: entry.location.formatted_address || "Unknown",
          healthScore: {
            score: entry.Score || 0,
            grade: entry.Grade || "N/A",
          },
          ratings: { overall: 4.2, count: 80 },
          priceRange: 2,
          neighborhood: "Unknown",
          features: [],
          image_urls: entry.image_urls || [],
        }))
  
      setFilteredRestaurants(transformed)
    }
  
    fetchData()
  }, [])
  
  

  // Dynamically import the LeafletMap component
  

  const Mapbox3DMap = dynamic(() => import('@/components/map/map-view'), {
    ssr: false,
    loading: () => <MapPlaceholder />
  })


  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({
      cuisine: "",
      neighborhood: "",
      minHealthScore: 0,
      priceRange: [],
      features: [],
    })
  }

  // Render static map if LeafletMap is not available
  const renderStaticMap = () => {
    // Create a static map URL using Mapbox
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    const center = "-80.4139,37.2296" // Blacksburg, VA
    const zoom = 13
    const width = 1200
    const height = 600

    // Create markers string for the URL
    const markers = filteredRestaurants
      .slice(0, 10)
      .map((restaurant) => {
        const color =
          restaurant.healthScore.grade === "A"
            ? "green"
            : restaurant.healthScore.grade === "B"
              ? "yellow"
              : restaurant.healthScore.grade === "C"
                ? "orange"
                : "red"

        return `pin-s-${restaurant.healthScore.grade.toLowerCase()}+${color}(${restaurant.longitude || "-80.4139"},${restaurant.latitude || "37.2296"})`
      })
      .join(",")

    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${markers}/${center},${zoom}/${width}x${height}?access_token=${mapboxToken}`

    return (
      <div className="relative w-full h-[calc(100vh-220px)] min-h-[500px] rounded-lg border overflow-hidden">
        <Image src={mapUrl || "/placeholder.svg"} alt="Map of restaurants" fill className="object-cover" />
        <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-sm">
          <p>Interactive map loading failed. Showing static map instead.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col ">
      <HeroHeader />
      {/* Header */}
      
      
      

      <main className="flex-1 pt-[100px]">
        {/* Map Controls */}
        <div className="container px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Restaurant Map</h1>
            <p className="text-muted-foreground">
              {filteredRestaurants.length} {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"} found
            </p>
          </div>
          <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onSubmit={handleSubmit}
                  >
                    
                  </PlaceholdersAndVanishInput>

          <div className="flex items-center gap-3">
            <MobileFilters
              initialFilters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              filtersApplied={hasFilters}
            />

            <Tabs defaultValue="map" value={view} onValueChange={(v) => setView(v as "map" | "list")}>
              <TabsList>
                <TabsTrigger value="map">
                  <MapIcon className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="container px-4 mb-4">
            <div className="flex flex-wrap items-center gap-2 bg-muted/50 p-3 rounded-md">
              <span className="text-sm font-medium">Active filters:</span>
              {filters.cuisine && (
                <Badge variant="secondary" className="text-xs">
                  Cuisine: {filters.cuisine}
                </Badge>
              )}
              {filters.neighborhood && (
                <Badge variant="secondary" className="text-xs">
                  Neighborhood: {filters.neighborhood}
                </Badge>
              )}
              {filters.minHealthScore > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Min Health Score: {filters.minHealthScore}
                </Badge>
              )}
              {filters.priceRange.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Price: {"$".repeat(Math.min(...filters.priceRange))} - {"$".repeat(Math.max(...filters.priceRange))}
                </Badge>
              )}
              {filters.features.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  Features: {filters.features.length}
                </Badge>
              )}
              <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto" onClick={handleResetFilters}>
                Clear all
              </Button>
            </div>
          </div>
        )}

        {/* Map and List Views */}
        <div className="container px-4 pb-8">
          {view === "map" ? (
            <>
              <Mapbox3DMap
                restaurants={filteredRestaurants}
                height="calc(100vh - 220px)"
                className="min-h-[500px]"
              />

            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
              {filteredRestaurants.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <MapPin className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No restaurants found</h3>
                  <p className="text-muted-foreground mt-1 max-w-md">
                    We couldn't find any restaurants matching your search criteria. Try adjusting your filters or search
                    term.
                  </p>
                  <Button className="mt-4" onClick={handleResetFilters}>
                    Reset all filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer></Footer>
    </div>
  )
}
