"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  initialValue?: string
  onSearch?: (value: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export function SearchBar({
  initialValue = "",
  onSearch,
  placeholder = "Search for restaurants, cuisines...",
  className = "",
  autoFocus = false,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  useEffect(() => {
    setSearchTerm(initialValue)
  }, [initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    } else {
      // If no onSearch prop is provided, navigate to search page
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const clearSearch = () => {
    setSearchTerm("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-10"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
      <Button type="submit" className="sr-only">
        Search
      </Button>
    </form>
  )
}
