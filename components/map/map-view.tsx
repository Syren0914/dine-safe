'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useTheme } from 'next-themes'
import type { Restaurant } from '@/lib/restaurant-data'
import { Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getHealthGradeColorClass } from '@/lib/restaurant-data'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

interface Mapbox3DMapProps {
  restaurants: Restaurant[]
  height?: string
  className?: string
}

export default function Mapbox3DMap({
  restaurants,
  height = '600px',
  className = '',
}: Mapbox3DMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const router = useRouter()
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [map, setMap] = useState<mapboxgl.Map | null>(null)

  const getMarkerColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'green'
      case 'B': return 'yellow'
      case 'C': return 'orange'
      default: return 'red'
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current) return

    const mapboxMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `mapbox://styles/mapbox/${theme === 'dark' ? 'dark-v11' : 'streets-v12'}`,
      center: [-80.4139, 37.2296],
      zoom: 13,
      pitch: 60,
      bearing: -17,
      antialias: true,
    })

    mapboxMap.on('load', () => {
      mapboxMap.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      })
      mapboxMap.setTerrain({ source: 'mapbox-dem', exaggeration: 1.4 })

      mapboxMap.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6,
        },
      })

      restaurants.forEach((restaurant) => {
        const el = document.createElement('div')
        el.className = 'marker'
        el.style.backgroundColor = getMarkerColor(restaurant.healthScore.grade)
        el.style.width = '12px'
        el.style.height = '12px'
        el.style.borderRadius = '50%'
        el.style.cursor = 'pointer'

        const marker = new mapboxgl.Marker(el)
          .setLngLat([Number(restaurant.longitude), Number(restaurant.latitude)])
          .addTo(mapboxMap)

        marker.getElement().addEventListener('click', () => {
          setSelectedRestaurant(restaurant)
          mapboxMap.flyTo({
            center: [Number(restaurant.longitude), Number(restaurant.latitude)],
            zoom: 15,
            essential: true,
          })
        })
      })
    })

    setMap(mapboxMap)
    return () => mapboxMap.remove()
  }, [theme, restaurants])

  const handleViewDetails = (id: string) => {
    router.push(`/restaurant/${id}`)
  }

  return (
    <div className={`relative rounded-lg overflow-hidden border ${className}`} style={{ height }}>
      <div ref={mapContainerRef} className="w-full h-full" />

      {selectedRestaurant && (
        <div className="absolute bottom-4 left-4 w-72 bg-background/90 backdrop-blur-sm rounded-lg border shadow-lg p-4 z-10">
          <button
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            onClick={() => setSelectedRestaurant(null)}
          >
            ✕
          </button>

          <h3 className="font-medium text-sm">{selectedRestaurant.name}</h3>
          <p className="text-xs text-muted-foreground mb-2">{selectedRestaurant.cuisine || "Unknown"}</p>

          <div className="flex items-center gap-2 mb-2">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${getHealthGradeColorClass(
                selectedRestaurant.healthScore.grade,
              )}`}
            >
              {selectedRestaurant.healthScore.grade}
            </div>
            <span className="text-xs">Health Score: {Math.abs(100 - selectedRestaurant.healthScore.score)}/100</span>
          </div>

          <div className="flex items-center text-xs mb-2">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            <span>
              {selectedRestaurant.ratings?.overall || 4.0} ({selectedRestaurant.ratings?.count || 50} reviews)
            </span>
          </div>

          <div className="flex items-center text-xs mb-3">
            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground truncate">
              {selectedRestaurant.address || "No address"}
            </span>
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
  )
}
