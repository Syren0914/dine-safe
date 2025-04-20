"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SortSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export function SortSelect({ value, onValueChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="health-high">Health Score (High to Low)</SelectItem>
        <SelectItem value="health-low">Health Score (Low to High)</SelectItem>
        <SelectItem value="rating-high">Rating (High to Low)</SelectItem>
        <SelectItem value="rating-low">Rating (Low to High)</SelectItem>
        <SelectItem value="price-high">Price (High to Low)</SelectItem>
        <SelectItem value="price-low">Price (Low to High)</SelectItem>
        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
      </SelectContent>
    </Select>
  )
}
