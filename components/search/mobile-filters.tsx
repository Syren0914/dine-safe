"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterSidebar } from "@/components/search/filter-sidebar"
import { SlidersHorizontal } from "lucide-react"

interface MobileFiltersProps {
  initialFilters: {
    cuisine: string
    neighborhood: string
    minHealthScore: number
    priceRange: number[]
    features: string[]
  }
  onFilterChange: (filters: any) => void
  onReset: () => void
  filtersApplied: boolean
}

export function MobileFilters({ initialFilters, onFilterChange, onReset, filtersApplied }: MobileFiltersProps) {
  const [open, setOpen] = useState(false)

  const handleFilterChange = (filters: any) => {
    onFilterChange(filters)
  }

  const handleReset = () => {
    onReset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {filtersApplied && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-xs text-white">
              •
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar initialFilters={initialFilters} onFilterChange={handleFilterChange} onReset={handleReset} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
