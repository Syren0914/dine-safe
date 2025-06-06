"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search/search-bar"
import { RestaurantCard } from "@/components/search/restaurant-card"
import { FilterSidebar } from "@/components/search/filter-sidebar"
import { SortSelect } from "@/components/search/sort-select"
import { MobileFilters } from "@/components/search/mobile-filters"
import { restaurants, filterRestaurants, sortRestaurants } from "@/lib/restaurant-data"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { Footer } from "../components/Footer/Footer"


export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [filters, setFilters] = useState({
    cuisine: "",
    neighborhood: "",
    minHealthScore: 0,
    priceRange: [] as number[],
    features: [] as string[],
  })
  const [sortBy, setSortBy] = useState("health-high")
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)

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
    const sorted = sortRestaurants(filtered, sortBy)
    setFilteredRestaurants(sorted)

    // Update URL with search parameters
    const params = new URLSearchParams()
    if (searchTerm) params.set("q", searchTerm)
    if (filters.cuisine) params.set("cuisine", filters.cuisine)
    if (filters.neighborhood) params.set("neighborhood", filters.neighborhood)
    if (filters.minHealthScore > 0) params.set("minScore", filters.minHealthScore.toString())
    if (filters.priceRange.length > 0) params.set("price", filters.priceRange.join(","))
    if (filters.features.length > 0) params.set("features", filters.features.join(","))
    if (sortBy !== "health-high") params.set("sort", sortBy)

    const url = `/search${params.toString() ? `?${params.toString()}` : ""}`
    router.push(url, { scroll: false })
  }, [searchTerm, filters, sortBy, router])

  // Handle search submission
  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
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
              <div className="h-10 w-10 rounded-md  flex items-center justify-center text-white">
                <Image src={"/dineSafe.png"} alt={""} width={100} height={100}></Image>
              </div>
              <span className="hidden md:inline">DineSafe</span>
            </div>
          </div>

          <div className="flex-1 mx-4 max-w-xl">
            <SearchBar initialValue={searchTerm} onSearch={handleSearch} autoFocus />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Sidebar for desktop */}
            <div className="hidden md:block md:w-64 lg:w-72 shrink-0">
              <div className="sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <FilterSidebar
                  initialFilters={filters}
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">
                      {searchTerm ? `Results for "${searchTerm}"` : "All Restaurants"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {filteredRestaurants.length} {filteredRestaurants.length === 1 ? "restaurant" : "restaurants"}{" "}
                      found
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="md:hidden">
                      <MobileFilters
                        initialFilters={filters}
                        onFilterChange={handleFilterChange}
                        onReset={handleResetFilters}
                        filtersApplied={hasFilters}
                      />
                    </div>
                    <SortSelect value={sortBy} onValueChange={setSortBy} />
                  </div>
                </div>

                {/* Active filters */}
                {hasFilters && (
                  <div className="flex flex-wrap items-center gap-2 bg-muted/50 p-3 rounded-md">
                    <span className="text-sm font-medium">Active filters:</span>
                    {filters.cuisine && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setFilters({ ...filters, cuisine: "" })}
                      >
                        Cuisine: {filters.cuisine}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    {filters.neighborhood && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setFilters({ ...filters, neighborhood: "" })}
                      >
                        Neighborhood: {filters.neighborhood}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    {filters.minHealthScore > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setFilters({ ...filters, minHealthScore: 0 })}
                      >
                        Min Health Score: {filters.minHealthScore}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    {filters.priceRange.length > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setFilters({ ...filters, priceRange: [] })}
                      >
                        Price: {"$".repeat(Math.min(...filters.priceRange))} -{" "}
                        {"$".repeat(Math.max(...filters.priceRange))}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    {filters.features.length > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setFilters({ ...filters, features: [] })}
                      >
                        Features: {filters.features.length}
                        <X className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto" onClick={handleResetFilters}>
                      Clear all
                    </Button>
                  </div>
                )}

                {/* Results */}
                {filteredRestaurants.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {filteredRestaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium">No restaurants found</h3>
                    <p className="text-muted-foreground mt-1 max-w-md">
                      We couldn't find any restaurants matching your search criteria. Try adjusting your filters or
                      search term.
                    </p>
                    <Button className="mt-4" onClick={handleResetFilters}>
                      Reset all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
