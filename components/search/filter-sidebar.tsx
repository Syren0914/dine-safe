"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getUniqueNeighborhoods, getUniqueCuisines, getUniqueFeatures } from "@/lib/restaurant-data"
import { restaurants } from "@/lib/restaurant-data"

interface FilterSidebarProps {
  initialFilters: {
    cuisine: string
    neighborhood: string
    minHealthScore: number
    priceRange: number[]
    features: string[]
  }
  onFilterChange: (filters: any) => void
  onReset: () => void
  className?: string
}

export function FilterSidebar({ initialFilters, onFilterChange, onReset, className = "" }: FilterSidebarProps) {
  const [filters, setFilters] = useState(initialFilters)

  const neighborhoods = getUniqueNeighborhoods(restaurants)
  const cuisines = getUniqueCuisines(restaurants)
  const features = getUniqueFeatures(restaurants)

  const handleNeighborhoodChange = (neighborhood: string) => {
    const newFilters = {
      ...filters,
      neighborhood: filters.neighborhood === neighborhood ? "" : neighborhood,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCuisineChange = (cuisine: string) => {
    const newFilters = {
      ...filters,
      cuisine: filters.cuisine === cuisine ? "" : cuisine,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleHealthScoreChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      minHealthScore: value[0],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceRangeChange = (price: number) => {
    const newPriceRange = filters.priceRange.includes(price)
      ? filters.priceRange.filter((p) => p !== price)
      : [...filters.priceRange, price]

    const newFilters = {
      ...filters,
      priceRange: newPriceRange,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleFeatureChange = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature]

    const newFilters = {
      ...filters,
      features: newFeatures,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      cuisine: "",
      neighborhood: "",
      minHealthScore: 0,
      priceRange: [],
      features: [],
    }
    setFilters(resetFilters)
    onReset()
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="mb-3 font-medium">Health Score</h3>
        <div className="px-2">
          <Slider
            defaultValue={[filters.minHealthScore]}
            min={0}
            max={100}
            step={5}
            onValueChange={handleHealthScoreChange}
          />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span>Min: {filters.minHealthScore}</span>
            <span>Max: 100</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-medium">Price Range</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((price) => (
            <div key={price} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${price}`}
                checked={filters.priceRange.includes(price)}
                onCheckedChange={() => handlePriceRangeChange(price)}
              />
              <Label htmlFor={`price-${price}`} className="cursor-pointer text-foreground">
                {"$".repeat(price)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-medium">Neighborhood</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {neighborhoods.map((neighborhood) => (
            <div key={neighborhood} className="flex items-center space-x-2">
              <Checkbox
                id={`neighborhood-${neighborhood}`}
                checked={filters.neighborhood === neighborhood}
                onCheckedChange={() => handleNeighborhoodChange(neighborhood)}
              />
              <Label htmlFor={`neighborhood-${neighborhood}`} className="cursor-pointer text-foreground">
                {neighborhood}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-medium">Cuisine</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {cuisines.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox
                id={`cuisine-${cuisine}`}
                checked={filters.cuisine === cuisine}
                onCheckedChange={() => handleCuisineChange(cuisine)}
              />
              <Label htmlFor={`cuisine-${cuisine}`} className="cursor-pointer text-foreground">
                {cuisine}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-medium">Features</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={filters.features.includes(feature)}
                onCheckedChange={() => handleFeatureChange(feature)}
              />
              <Label htmlFor={`feature-${feature}`} className="cursor-pointer text-foreground">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  )
}
