"use client"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Restaurant, getPriceRangeSymbol, getHealthGradeColorClass } from "@/lib/restaurant-data"
import { useEffect, useState } from "react"
import type { InspectionData } from "@/types/inspection"

interface RestaurantCardProps {
  restaurant: Restaurant
}


export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [inspection, setInspection] = useState<InspectionData | null>(null)
  
  const imageList = restaurant.images?.length
  ? restaurant.images.map(i => i.url)
  : ["/fallback.jpg"] // Local fallback image in /public folder
  useEffect(() => {
    const fetchInspection = async () => {
      try {
        const res = await fetch(`/api/inspections?restaurantName=${encodeURIComponent(restaurant.name)}`)
        const data: InspectionData[] = await res.json()

        const matched = data.find((r: InspectionData) =>
          r["Restaurant Name"]?.toLowerCase().includes(restaurant.name.toLowerCase())
        )

        if (matched) setInspection(matched)
      } catch (err) {
        console.error("Failed to fetch inspection data", err)
      }
    }

    fetchInspection()
  }, [restaurant.name])

  const healthGrade = inspection?.Grade || restaurant.healthScore.grade
  const score = inspection?.Score ?? restaurant.healthScore.score
  const name = inspection?.["Restaurant Name"] || restaurant.name

  return (
    <Link href={`/restaurant/${restaurant.id}`} className="block">
      <div className="group overflow-hidden rounded-lg border bg-card text-card-foreground transition-all hover:shadow-md">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
        {imageList.map((url, idx) => (
  <div key={idx} className="relative w-full h-[200px]">
    <Image
      src={url}
      alt={`${name} image ${idx + 1}`}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      className="object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement
        target.src = "/fallback.jpg"
      }}
    />
  </div>
))}

          <div className="absolute right-2 top-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${getHealthGradeColorClass(
                healthGrade,
              )}`}
            >
              {healthGrade}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold line-clamp-1">{name}</h3>
            <span className="ml-2 whitespace-nowrap text-sm text-muted-foreground">
              {getPriceRangeSymbol(restaurant.priceRange)}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{restaurant.cuisine}</p>
          <div className="mt-2 flex items-center text-sm">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {/* {restaurant.ratings.overall} ({restaurant.ratings.count}) */}
              </span>
            </div>
            <span className="mx-2 text-muted-foreground">•</span>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="line-clamp-1">{restaurant.neighborhood}</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              Health Score: {score}/100
            </Badge>
            {/* {restaurant.features.slice(0, 2).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {restaurant.features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{restaurant.features.length - 2} more
              </Badge>
            )} */}
          </div>
        </div>
      </div>
    </Link>
  )
}
