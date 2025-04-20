// Mock restaurant data for the search functionality

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  address: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  phone: string
  website: string
  priceRange: 1 | 2 | 3 | 4 // $ to $$
  healthScore: {
    grade: string
    score: number
    date: string
  }
  ratings: {
    overall: number
    count: number
  }
  features: string[]
  image: string
  latitude?: string // Added for map functionality
  longitude?: string // Added for map functionality
  distance?: number // Added dynamically based on search location
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Blacksburg Bistro",
    cuisine: "American, Farm-to-Table",
    address: "123 Main Street",
    neighborhood: "Downtown",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-1234",
    website: "https://blacksburgbistro.com",
    priceRange: 3,
    healthScore: {
      grade: "A",
      score: 95,
      date: "2023-10-15",
    },
    ratings: {
      overall: 4.3,
      count: 127,
    },
    features: ["Outdoor Seating", "Vegetarian Options", "Full Bar"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2296",
    longitude: "-80.4139",
  },
  {
    id: "2",
    name: "Hokie Grill",
    cuisine: "Burgers, American",
    address: "456 College Ave",
    neighborhood: "Campus",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-2345",
    website: "https://hokiegrill.com",
    priceRange: 2,
    healthScore: {
      grade: "A",
      score: 92,
      date: "2023-09-20",
    },
    ratings: {
      overall: 4.1,
      count: 89,
    },
    features: ["Takeout", "Delivery", "Late Night"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2270",
    longitude: "-80.4220",
  },
  {
    id: "3",
    name: "Sushi Paradise",
    cuisine: "Japanese, Sushi",
    address: "789 Draper Rd",
    neighborhood: "Downtown",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-3456",
    website: "https://sushiparadise.com",
    priceRange: 3,
    healthScore: {
      grade: "B",
      score: 86,
      date: "2023-08-05",
    },
    ratings: {
      overall: 4.5,
      count: 156,
    },
    features: ["Reservations", "Vegetarian Options", "Gluten-Free Options"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2310",
    longitude: "-80.4170",
  },
  {
    id: "4",
    name: "Taco Town",
    cuisine: "Mexican, Tex-Mex",
    address: "101 Progress St",
    neighborhood: "North Main",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-4567",
    website: "https://tacotown.com",
    priceRange: 1,
    healthScore: {
      grade: "A",
      score: 94,
      date: "2023-11-01",
    },
    ratings: {
      overall: 4.2,
      count: 78,
    },
    features: ["Takeout", "Delivery", "Kid-Friendly"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2350",
    longitude: "-80.4100",
  },
  {
    id: "5",
    name: "Pizza Palace",
    cuisine: "Italian, Pizza",
    address: "202 Turner St",
    neighborhood: "Downtown",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-5678",
    website: "https://pizzapalace.com",
    priceRange: 2,
    healthScore: {
      grade: "A",
      score: 97,
      date: "2023-10-10",
    },
    ratings: {
      overall: 4.7,
      count: 203,
    },
    features: ["Takeout", "Delivery", "Late Night", "Beer and Wine"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2290",
    longitude: "-80.4160",
  },
  {
    id: "6",
    name: "Green Garden",
    cuisine: "Vegetarian, Vegan",
    address: "303 Washington St",
    neighborhood: "South Main",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-6789",
    website: "https://greengarden.com",
    priceRange: 2,
    healthScore: {
      grade: "A",
      score: 98,
      date: "2023-09-15",
    },
    ratings: {
      overall: 4.4,
      count: 112,
    },
    features: ["Vegetarian Options", "Vegan Options", "Gluten-Free Options", "Organic"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2240",
    longitude: "-80.4190",
  },
  {
    id: "7",
    name: "Noodle House",
    cuisine: "Asian, Thai, Vietnamese",
    address: "404 Roanoke St",
    neighborhood: "Downtown",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-7890",
    website: "https://noodlehouse.com",
    priceRange: 2,
    healthScore: {
      grade: "B",
      score: 85,
      date: "2023-08-20",
    },
    ratings: {
      overall: 4.3,
      count: 95,
    },
    features: ["Takeout", "Delivery", "Vegetarian Options"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2300",
    longitude: "-80.4150",
  },
  {
    id: "8",
    name: "Steakhouse 61",
    cuisine: "Steakhouse, American",
    address: "505 University City Blvd",
    neighborhood: "North Blacksburg",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-8901",
    website: "https://steakhouse61.com",
    priceRange: 4,
    healthScore: {
      grade: "A",
      score: 93,
      date: "2023-10-05",
    },
    ratings: {
      overall: 4.6,
      count: 167,
    },
    features: ["Reservations", "Full Bar", "Private Dining"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2380",
    longitude: "-80.4230",
  },
  {
    id: "9",
    name: "Breakfast Club",
    cuisine: "Breakfast, Brunch",
    address: "606 Main St",
    neighborhood: "Downtown",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-9012",
    website: "https://breakfastclub.com",
    priceRange: 2,
    healthScore: {
      grade: "A",
      score: 91,
      date: "2023-09-10",
    },
    ratings: {
      overall: 4.5,
      count: 142,
    },
    features: ["Breakfast", "Brunch", "Kid-Friendly", "Vegetarian Options"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2295",
    longitude: "-80.4145",
  },
  {
    id: "10",
    name: "Curry Corner",
    cuisine: "Indian, Pakistani",
    address: "707 Patrick Henry Dr",
    neighborhood: "North Main",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-0123",
    website: "https://currycorner.com",
    priceRange: 2,
    healthScore: {
      grade: "C",
      score: 78,
      date: "2023-07-15",
    },
    ratings: {
      overall: 4.0,
      count: 86,
    },
    features: ["Takeout", "Delivery", "Vegetarian Options", "Halal"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2330",
    longitude: "-80.4080",
  },
  {
    id: "11",
    name: "Pho Real",
    cuisine: "Vietnamese, Soup",
    address: "808 Prices Fork Rd",
    neighborhood: "West Blacksburg",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-1234",
    website: "https://phoreal.com",
    priceRange: 2,
    healthScore: {
      grade: "B",
      score: 87,
      date: "2023-08-25",
    },
    ratings: {
      overall: 4.4,
      count: 103,
    },
    features: ["Takeout", "Delivery", "Vegetarian Options"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2320",
    longitude: "-80.4260",
  },
  {
    id: "12",
    name: "Burger Barn",
    cuisine: "Burgers, Fast Food",
    address: "909 Giles Rd",
    neighborhood: "South Main",
    city: "Blacksburg",
    state: "VA",
    zipCode: "24060",
    phone: "(540) 555-2345",
    website: "https://burgerbarn.com",
    priceRange: 1,
    healthScore: {
      grade: "B",
      score: 84,
      date: "2023-09-05",
    },
    ratings: {
      overall: 3.9,
      count: 67,
    },
    features: ["Takeout", "Drive-Thru", "Late Night"],
    image: "/placeholder.svg?height=200&width=300",
    latitude: "37.2260",
    longitude: "-80.4180",
  },
]

// Helper function to get price range as $ symbols
export function getPriceRangeSymbol(priceRange: number): string {
  return "$".repeat(priceRange)
}

// Helper function to get health grade color class
export function getHealthGradeColorClass(grade: string): string {
  switch (grade) {
    case "A":
      return "bg-green-100 text-green-700"
    case "B":
      return "bg-yellow-100 text-yellow-700"
    case "C":
      return "bg-orange-100 text-orange-700"
    default:
      return "bg-red-100 text-red-700"
  }
}

// Helper function to filter restaurants based on search criteria
export function filterRestaurants(
  restaurants: Restaurant[],
  {
    searchTerm = "",
    cuisine = "",
    neighborhood = "",
    minHealthScore = 0,
    priceRange = [],
    features = [],
  }: {
    searchTerm?: string
    cuisine?: string
    neighborhood?: string
    minHealthScore?: number
    priceRange?: number[]
    features?: string[]
  },
): Restaurant[] {
  return restaurants.filter((restaurant) => {
    // Filter by search term (name or cuisine)
    if (
      searchTerm &&
      !restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by cuisine
    if (cuisine && !restaurant.cuisine.toLowerCase().includes(cuisine.toLowerCase())) {
      return false
    }

    // Filter by neighborhood
    if (neighborhood && restaurant.neighborhood !== neighborhood) {
      return false
    }

    // Filter by minimum health score
    if (minHealthScore > 0 && restaurant.healthScore.score < minHealthScore) {
      return false
    }

    // Filter by price range
    if (priceRange.length > 0 && !priceRange.includes(restaurant.priceRange)) {
      return false
    }

    // Filter by features
    if (features.length > 0 && !features.every((feature) => restaurant.features.includes(feature))) {
      return false
    }

    return true
  })
}

// Helper function to sort restaurants
export function sortRestaurants(restaurants: Restaurant[], sortBy: string): Restaurant[] {
  const sortedRestaurants = [...restaurants]

  switch (sortBy) {
    case "health-high":
      return sortedRestaurants.sort((a, b) => b.healthScore.score - a.healthScore.score)
    case "health-low":
      return sortedRestaurants.sort((a, b) => a.healthScore.score - b.healthScore.score)
    case "rating-high":
      return sortedRestaurants.sort((a, b) => b.ratings.overall - a.ratings.overall)
    case "rating-low":
      return sortedRestaurants.sort((a, b) => a.ratings.overall - b.ratings.overall)
    case "price-high":
      return sortedRestaurants.sort((a, b) => b.priceRange - a.priceRange)
    case "price-low":
      return sortedRestaurants.sort((a, b) => a.priceRange - b.priceRange)
    case "name-asc":
      return sortedRestaurants.sort((a, b) => a.name.localeCompare(b.name))
    case "name-desc":
      return sortedRestaurants.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return sortedRestaurants
  }
}

// Get all unique neighborhoods
export function getUniqueNeighborhoods(restaurants: Restaurant[]): string[] {
  const neighborhoods = restaurants.map((restaurant) => restaurant.neighborhood)
  return [...new Set(neighborhoods)].sort()
}

// Get all unique cuisines
export function getUniqueCuisines(restaurants: Restaurant[]): string[] {
  const allCuisines = restaurants.flatMap((restaurant) =>
    restaurant.cuisine.split(", ").map((cuisine) => cuisine.trim()),
  )
  return [...new Set(allCuisines)].sort()
}

// Get all unique features
export function getUniqueFeatures(restaurants: Restaurant[]): string[] {
  const allFeatures = restaurants.flatMap((restaurant) => restaurant.features)
  return [...new Set(allFeatures)].sort()
}
