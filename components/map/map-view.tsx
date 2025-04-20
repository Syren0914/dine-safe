"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Restaurant } from "@/lib/restaurant-data"
import { Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getHealthGradeColorClass } from "@/lib/restaurant-data"

// Default center coordinates for Blacksburg, VA
const DEFAULT_CENTER = {
  latitude: 37.2296,
  longitude: -80.4139,
}

interface MapViewProps {
  restaurants: Restaurant[]
  initialCenter?: { latitude: number; longitude: number }
  initialZoom?: number
  height?: string
  showControls?: boolean
  className?: string
}

export function MapView({
  restaurants,
  initialCenter = DEFAULT_CENTER,
  initialZoom = 13,
  height = "600px",
  showControls = true,
  className = "",
}: MapViewProps) {
  const { theme } = useTheme()
  const router = useRouter()
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [mapStyle, setMapStyle] = useState("streets-v12")

  // Update map style based on theme
  useEffect(() => {
    if (theme === "dark") {
      setMapStyle("dark-v11")
    } else {
      setMapStyle("streets-v12")
    }
  }, [theme])

  // Navigate to restaurant detail page
  const handleViewDetails = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`)
  }

  // Get marker color based on health score
  const getMarkerColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "green"
      case "B":
        return "yellow"
      case "C":
        return "orange"
      default:
        return "red"
    }
  }

  // Generate static map URL
  const generateMapUrl = () => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    const center = `${initialCenter.longitude},${initialCenter.latitude}`
    const zoom = initialZoom
    const size = "1280x720"

    // Create marker parameters
    const markers = restaurants
      .map((restaurant) => {
        const color = getMarkerColor(restaurant.healthScore.grade)
        const coordinates = `${restaurant.longitude || DEFAULT_CENTER.longitude},${restaurant.latitude || DEFAULT_CENTER.latitude}`
        return `pin-s-${restaurant.healthScore.grade.toLowerCase()}+${color}(${coordinates})`
      })
      .join(",")

    return `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/${markers}/${center},${zoom}/${size}?access_token=${token}`
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border ${className}`} style={{ height }}>
      <div className="relative w-full h-full">
        <Image
          src={generateMapUrl() || "/placeholder.svg"}
          alt="Map showing restaurant locations"
          fill
          className="object-cover"
        />

        {/* Restaurant list overlay */}
        <div className="absolute top-4 right-4 w-64 max-h-[80%] overflow-y-auto bg-background/90 backdrop-blur-sm rounded-lg border shadow-lg p-3">
          <h3 className="font-medium text-sm mb-2">Restaurants on Map</h3>
          <div className="space-y-2">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="p-2 rounded-md border hover:bg-muted cursor-pointer"
                onClick={() => setSelectedRestaurant(restaurant)}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold bg-${getMarkerColor(restaurant.healthScore.grade)}-500`}
                  >
                    {restaurant.healthScore.grade}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{restaurant.cuisine}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected restaurant details */}
        {selectedRestaurant && (
          <div className="absolute bottom-4 left-4 w-72 bg-background/90 backdrop-blur-sm rounded-lg border shadow-lg p-4">
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedRestaurant(null)}
            >
              ✕
            </button>

            <h3 className="font-medium text-sm">{selectedRestaurant.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{selectedRestaurant.cuisine}</p>

            <div className="flex items-center gap-2 mb-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${getHealthGradeColorClass(
                  selectedRestaurant.healthScore.grade,
                )}`}
              >
                {selectedRestaurant.healthScore.grade}
              </div>
              <span className="text-xs">Health Score: {selectedRestaurant.healthScore.score}/100</span>
            </div>

            <div className="flex items-center text-xs mb-2">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span>
                {selectedRestaurant.ratings.overall} ({selectedRestaurant.ratings.count} reviews)
              </span>
            </div>

            <div className="flex items-center text-xs mb-3">
              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground truncate">{selectedRestaurant.address}</span>
            </div>

            <Button
              size="sm"
              className="w-full text-xs h-7 bg-teal-500 hover:bg-teal-600"
              onClick={() => handleViewDetails(selectedRestaurant.id)}
            >
              View Details
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
