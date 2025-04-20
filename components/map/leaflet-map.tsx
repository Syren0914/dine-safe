"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import type { Restaurant } from "@/lib/restaurant-data"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"

// Add TypeScript interface for the global window object
declare global {
  interface Window {
    L: any
  }
}

// Default center coordinates for Blacksburg, VA
const DEFAULT_CENTER = {
  latitude: 37.2296,
  longitude: -80.4139,
}

interface LeafletMapProps {
  restaurants: Restaurant[]
  initialCenter?: { latitude: number; longitude: number }
  initialZoom?: number
  height?: string
  showControls?: boolean
  className?: string
  singleRestaurant?: boolean
}

function LeafletMap({
  restaurants,
  initialCenter = DEFAULT_CENTER,
  initialZoom = 13,
  height = "600px",
  showControls = true,
  className = "",
  singleRestaurant = false,
}: LeafletMapProps) {
  const { theme } = useTheme()
  const router = useRouter()
  const isMobile = useMobile()
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isMapReady, setIsMapReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fallbackToStatic, setFallbackToStatic] = useState(false)
  const mapId = `map-${Math.random().toString(36).substring(2, 9)}`

  // Function to safely load script
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = src
      script.async = true

      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))

      document.head.appendChild(script)
    })
  }

  // Function to safely load CSS
  const loadCSS = (href: string): Promise<void> => {
    return new Promise((resolve) => {
      // Check if link already exists
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve()
        return
      }

      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = href

      link.onload = () => resolve()
      // CSS loading doesn't reject, we just continue
      link.onerror = () => resolve()

      document.head.appendChild(link)
    })
  }

  // Initialize map after component mounts
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || !mapRef.current) return

    let isMounted = true
    let initializationAttempts = 0
    const MAX_ATTEMPTS = 3

    // Function to initialize the map
    const initializeMap = async () => {
      try {
        initializationAttempts++

        // Load Leaflet CSS and JS if not already loaded
        await Promise.all([
          loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"),
          loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"),
        ])

        // Wait a moment to ensure Leaflet is fully initialized
        await new Promise((resolve) => setTimeout(resolve, 300))

        // Check if component is still mounted
        if (!isMounted) return

        // Check if Leaflet is loaded
        if (!window.L) {
          if (initializationAttempts < MAX_ATTEMPTS) {
            console.log(`Leaflet not loaded yet, retrying (attempt ${initializationAttempts})...`)
            setTimeout(initializeMap, 500)
            return
          }
          throw new Error("Leaflet failed to load properly after multiple attempts")
        }

        const L = window.L

        // Clean up previous map instance if it exists
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        }

        // Initialize map
        const map = L.map(mapRef.current, {
          attributionControl: true,
          zoomControl: showControls,
          scrollWheelZoom: true,
        }).setView([initialCenter.latitude, initialCenter.longitude], initialZoom)

        // Set tile layer based on theme
        const tileLayer =
          theme === "dark"
            ? L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
                attribution:
                  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                maxZoom: 19,
              })
            : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
              })

        tileLayer.addTo(map)
        mapInstanceRef.current = map

        // Add markers for restaurants
        markersRef.current = restaurants.map((restaurant) => {
          const lat = Number.parseFloat(restaurant.latitude || DEFAULT_CENTER.latitude.toString())
          const lng = Number.parseFloat(restaurant.longitude || DEFAULT_CENTER.longitude.toString())

          // Create custom icon based on health grade
          const getMarkerColor = (grade: string) => {
            switch (grade) {
              case "A":
                return "#10b981" // green-500
              case "B":
                return "#eab308" // yellow-500
              case "C":
                return "#f97316" // orange-500
              default:
                return "#ef4444" // red-500
            }
          }

          const customIcon = L.divIcon({
            className: "custom-div-icon",
            html: `
              <div style="
                background-color: ${getMarkerColor(restaurant.healthScore.grade)};
                width: 30px;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                color: white;
                font-weight: bold;
                font-size: 14px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              ">
                ${restaurant.healthScore.grade}
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          })

          // Create marker and popup
          const marker = L.marker([lat, lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
              <div style="width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${restaurant.name}</h3>
                <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${restaurant.cuisine}</p>
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <div style="
                    background-color: ${getMarkerColor(restaurant.healthScore.grade)};
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 8px;
                    font-weight: bold;
                  ">
                    ${restaurant.healthScore.grade}
                  </div>
                  <span style="font-size: 12px;">Health Score: ${restaurant.healthScore.score}/100</span>
                </div>
                <div style="font-size: 12px; margin-bottom: 8px;">
                  ★ ${restaurant.ratings.overall} (${restaurant.ratings.count} reviews)
                </div>
                <button 
                  onclick="window.location.href='/restaurant/${restaurant.id}'"
                  style="
                    background-color: #14b8a6;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    width: 100%;
                  "
                >
                  View Details
                </button>
              </div>
            `)

          // Open popup on marker click
          marker.on("click", () => {
            marker.openPopup()
          })

          return marker
        })

        // If it's a single restaurant view, fit bounds to that marker
        if (singleRestaurant && restaurants.length === 1) {
          const lat = Number.parseFloat(restaurants[0].latitude || DEFAULT_CENTER.latitude.toString())
          const lng = Number.parseFloat(restaurants[0].longitude || DEFAULT_CENTER.longitude.toString())
          map.setView([lat, lng], 16)
        }
        // Otherwise fit bounds to all markers
        else if (restaurants.length > 1) {
          const group = L.featureGroup(markersRef.current)
          map.fitBounds(group.getBounds().pad(0.1))
        }

        // Force a resize to ensure the map renders correctly
        setTimeout(() => {
          if (map && isMounted) {
            map.invalidateSize()
          }
        }, 250)

        setIsMapReady(true)
        setError(null)
      } catch (error) {
        console.error("Error initializing map:", error)

        if (initializationAttempts < MAX_ATTEMPTS) {
          console.log(`Retrying map initialization (attempt ${initializationAttempts})...`)
          setTimeout(initializeMap, 1000)
        } else {
          setError("Failed to load interactive map. Showing static map instead.")
          setFallbackToStatic(true)
        }
      }
    }

    // Initialize the map
    initializeMap()

    // Cleanup function
    return () => {
      isMounted = false
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
          mapInstanceRef.current = null
        } catch (error) {
          console.error("Error cleaning up map:", error)
        }
      }
    }
  }, [restaurants, initialCenter, initialZoom, singleRestaurant, mapId, showControls])

  // Update map when theme changes
  useEffect(() => {
    if (!isMapReady || !mapInstanceRef.current || typeof window === "undefined") return

    try {
      const L = window.L
      if (!L) return

      const map = mapInstanceRef.current

      // Remove existing tile layers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          map.removeLayer(layer)
        }
      })

      // Add new tile layer based on theme
      const tileLayer =
        theme === "dark"
          ? L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
              maxZoom: 19,
            })
          : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              maxZoom: 19,
            })

      tileLayer.addTo(map)
    } catch (error) {
      console.error("Error updating map theme:", error)
    }
  }, [theme, isMapReady])

  // Render static map as fallback
  if (fallbackToStatic) {
    // Create a static map URL using Mapbox
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    const center = "-80.4139,37.2296" // Blacksburg, VA
    const zoom = 13
    const width = 1200
    const height = 600

    // Create markers string for the URL
    const markers = restaurants
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
      <div className={`relative rounded-lg overflow-hidden border ${className}`} style={{ height }}>
        <Image src={mapUrl || "/placeholder.svg"} alt="Map of restaurants" fill className="object-cover" />
        <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-md shadow-md text-sm">
          <p className="text-foreground">Interactive map unavailable. Showing static map instead.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`relative rounded-lg overflow-hidden border ${className}`} style={{ height }}>
        <div id={mapId} ref={mapRef} className="w-full h-full" />

        {/* Add CSS for Leaflet */}
        <style jsx global>{`
          .leaflet-container {
            width: 100%;
            height: 100%;
          }
          
          .leaflet-popup-content-wrapper {
            border-radius: 8px;
          }
          
          .leaflet-popup-content {
            margin: 12px;
          }
          
          .leaflet-control-zoom a {
            color: #333;
          }
          
          .dark .leaflet-control-zoom a {
            background-color: #1f2937;
            color: #fff;
            border-color: #374151;
          }
          
          .dark .leaflet-control-zoom-in {
            border-bottom-color: #374151;
          }
          
          .dark .leaflet-control-attribution {
            background-color: rgba(31, 41, 55, 0.8);
            color: #9ca3af;
          }
          
          .dark .leaflet-control-attribution a {
            color: #d1d5db;
          }
          
          .dark .leaflet-popup-content-wrapper {
            background-color: #1f2937;
            color: #f9fafb;
          }
          
          .dark .leaflet-popup-tip {
            background-color: #1f2937;
          }
        `}</style>

        {/* Loading state */}
        {!isMapReady && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center p-4">
              <div className="rounded-full bg-red-100 p-3 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-red-600">Map Error</h3>
              <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {/* Restaurant list for mobile */}
        {isMobile && restaurants.length > 1 && isMapReady && (
          <div className="absolute bottom-4 right-4">
            <button
              className="bg-background/90 backdrop-blur-sm text-foreground hover:bg-background/70 border shadow-lg px-3 py-1.5 rounded-md text-sm font-medium"
              onClick={() => {
                const listEl = document.getElementById("mobile-restaurant-list")
                if (listEl) {
                  listEl.classList.toggle("hidden")
                }
              }}
            >
              Show Restaurants ({restaurants.length})
            </button>

            <div
              id="mobile-restaurant-list"
              className="hidden mt-2 w-64 max-h-[300px] overflow-y-auto bg-background/90 backdrop-blur-sm rounded-lg border shadow-lg p-3"
            >
              <h3 className="font-medium text-sm mb-2">Restaurants</h3>
              <div className="space-y-2">
                {restaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="p-2 rounded-md border hover:bg-muted cursor-pointer"
                    onClick={() => {
                      if (typeof window === "undefined" || !window.L || !mapInstanceRef.current) return

                      const lat = Number.parseFloat(restaurant.latitude || DEFAULT_CENTER.latitude.toString())
                      const lng = Number.parseFloat(restaurant.longitude || DEFAULT_CENTER.longitude.toString())

                      mapInstanceRef.current.setView([lat, lng], 16)

                      // Find and open the popup for this restaurant
                      markersRef.current.forEach((marker) => {
                        const markerLatLng = marker.getLatLng()
                        if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
                          marker.openPopup()
                        }
                      })

                      // Hide the list
                      const listEl = document.getElementById("mobile-restaurant-list")
                      if (listEl) {
                        listEl.classList.add("hidden")
                      }
                    }}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          restaurant.healthScore.grade === "A"
                            ? "bg-green-500"
                            : restaurant.healthScore.grade === "B"
                              ? "bg-yellow-500"
                              : restaurant.healthScore.grade === "C"
                                ? "bg-orange-500"
                                : "bg-red-500"
                        }`}
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
          </div>
        )}
      </div>
    </>
  )
}

export default LeafletMap
