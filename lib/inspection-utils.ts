import type { InspectionData } from "@/types/inspection"
import type { Restaurant } from "@/lib/restaurant-data"

export function transformInspectionToRestaurant(inspection: InspectionData): Restaurant {
  return {
    id: inspection._id || Math.random().toString(36).substr(2, 9),
    name: inspection["Restaurant Name"],
    cuisine: "Unknown", // This would need to be added to your inspection data
    address: inspection.Address || "Address not available",
    neighborhood: "Unknown", // This would need to be added to your inspection data
    city: inspection.City || "Unknown",
    state: inspection.State || "Unknown",
    zipCode: inspection["Zip Code"] || "Unknown",
    phone: inspection["Phone Number"] || "Unknown",
    website: "", // This would need to be added to your inspection data
    priceRange: 2, // Default value, would need to be added to your inspection data
    healthScore: {
      grade: inspection.Grade,
      score: inspection.Score,
      date: inspection["Inspection Date"],
    },
    ratings: {
      overall: 4.0, // Default value, would need to be added to your inspection data
      count: 50, // Default value, would need to be added to your inspection data
    },
    features: [], // This would need to be added to your inspection data
    image_urls: [], // This would need to be added to your inspection data
    latitude: inspection.Latitude?.toString(),
    longitude: inspection.Longitude?.toString(),
  }
}

export function transformInspectionsToRestaurants(inspections: InspectionData[]): Restaurant[] {
  return inspections.map(transformInspectionToRestaurant)
}

export function getHealthGradeColorClass(grade: string): string {
  switch (grade.toUpperCase()) {
    case 'A':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'B':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'C':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'D':
      return 'bg-red-100 text-red-700 border-red-200'
    case 'F':
      return 'bg-red-100 text-red-700 border-red-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

export function getHealthGradeColor(grade: string): string {
  switch (grade.toUpperCase()) {
    case 'A':
      return 'green'
    case 'B':
      return 'yellow'
    case 'C':
      return 'orange'
    case 'D':
    case 'F':
      return 'red'
    default:
      return 'gray'
  }
}

export function calculateHealthScore(score: number): number {
  // Convert the score to a 0-100 scale if needed
  // Assuming the score is already in the correct format
  return Math.max(0, Math.min(100, score))
}

export function formatInspectionDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return dateString
  }
}

export function getViolationSeverity(violations: string[]): 'low' | 'medium' | 'high' {
  if (!violations || violations.length === 0) return 'low'
  
  const criticalKeywords = ['critical', 'severe', 'immediate', 'closure', 'pest', 'contamination']
  const mediumKeywords = ['moderate', 'warning', 'notice', 'improper', 'inadequate']
  
  const violationText = violations.join(' ').toLowerCase()
  
  if (criticalKeywords.some(keyword => violationText.includes(keyword))) {
    return 'high'
  } else if (mediumKeywords.some(keyword => violationText.includes(keyword))) {
    return 'medium'
  }
  
  return 'low'
}

export function filterInspectionsByGrade(inspections: InspectionData[], grade: string): InspectionData[] {
  return inspections.filter(inspection => 
    inspection.Grade.toUpperCase() === grade.toUpperCase()
  )
}

export function filterInspectionsByScoreRange(inspections: InspectionData[], minScore: number, maxScore: number): InspectionData[] {
  return inspections.filter(inspection => 
    inspection.Score >= minScore && inspection.Score <= maxScore
  )
}

export function sortInspectionsByDate(inspections: InspectionData[], ascending: boolean = false): InspectionData[] {
  return [...inspections].sort((a, b) => {
    const dateA = new Date(a["Inspection Date"])
    const dateB = new Date(b["Inspection Date"])
    return ascending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
  })
}

export function getInspectionStats(inspections: InspectionData[]) {
  const totalInspections = inspections.length
  const averageScore = totalInspections > 0 
    ? inspections.reduce((sum, inspection) => sum + inspection.Score, 0) / totalInspections 
    : 0
  
  const gradeDistribution = {
    A: inspections.filter(i => i.Grade.toUpperCase() === 'A').length,
    B: inspections.filter(i => i.Grade.toUpperCase() === 'B').length,
    C: inspections.filter(i => i.Grade.toUpperCase() === 'C').length,
    D: inspections.filter(i => i.Grade.toUpperCase() === 'D').length,
    F: inspections.filter(i => i.Grade.toUpperCase() === 'F').length,
  }
  
  const recentInspections = inspections.filter(i => {
    const inspectionDate = new Date(i["Inspection Date"])
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return inspectionDate >= thirtyDaysAgo
  }).length
  
  const criticalViolations = inspections.reduce((sum, inspection) => 
    sum + (inspection["Critical Violations"] || 0), 0
  )
  
  const nonCriticalViolations = inspections.reduce((sum, inspection) => 
    sum + (inspection["Non-Critical Violations"] || 0), 0
  )
  
  return {
    totalInspections,
    averageScore: Math.round(averageScore * 100) / 100,
    gradeDistribution,
    recentInspections,
    criticalViolations,
    nonCriticalViolations,
  }
} 