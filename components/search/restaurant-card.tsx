import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { type Restaurant, getPriceRangeSymbol, getHealthGradeColorClass } from "@/lib/restaurant-data"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`} className="block">
      <div className="group overflow-hidden rounded-lg border bg-card text-card-foreground transition-all hover:shadow-md">
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute right-2 top-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold ${getHealthGradeColorClass(
                restaurant.healthScore.grade,
              )}`}
            >
              {restaurant.healthScore.grade}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold line-clamp-1">{restaurant.name}</h3>
            <span className="ml-2 whitespace-nowrap text-sm text-muted-foreground">
              {getPriceRangeSymbol(restaurant.priceRange)}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{restaurant.cuisine}</p>
          <div className="mt-2 flex items-center text-sm">
            <div className="flex items-center">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>
                {restaurant.ratings.overall} ({restaurant.ratings.count})
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
              Health Score: {restaurant.healthScore.score}/100
            </Badge>
            {restaurant.features.slice(0, 2).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {restaurant.features.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{restaurant.features.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
