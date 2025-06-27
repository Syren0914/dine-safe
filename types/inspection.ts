export interface InspectionData {
  _id?: string
  "Restaurant Name": string
  "Inspection Date": string
  Score: number
  Grade: string
  "Latitude"?: number
  "Longitude"?: number
  Address?: string
  City?: string
  State?: string
  "Zip Code"?: string
  Violations?: string[]
  "Violation Details"?: ViolationDetail[]
  "Inspector Name"?: string
  "Inspection Type"?: string
  "Follow-up Required"?: boolean
  "Follow-up Date"?: string
  Status?: string
  "Business License"?: string
  "Phone Number"?: string
  "Business Type"?: string
  "Risk Level"?: string
  "Previous Score"?: number
  "Previous Grade"?: string
  "Previous Inspection Date"?: string
  "Score Change"?: number
  "Grade Change"?: string
  "Critical Violations"?: number
  "Non-Critical Violations"?: number
  "Total Violations"?: number
  "Corrected On Site"?: number
  "Corrected Later"?: number
  "Uncorrected"?: number
  "Re-inspection Required"?: boolean
  "Re-inspection Date"?: string
  "Closure Date"?: string
  "Reopening Date"?: string
  "Closure Reason"?: string
  "Reopening Conditions"?: string
  "Notes"?: string
  "Photos"?: string[]
  "Documents"?: string[]
  "Last Updated"?: string
  "Created At"?: string
}

export interface ViolationDetail {
  code: string
  description: string
  severity: 'critical' | 'non-critical'
  corrected: boolean
  "corrected-date"?: string
  points: number
  category: string
  "sub-category"?: string
}

export interface InspectionSearchParams {
  restaurantName?: string
  grade?: string
  minScore?: number
  maxScore?: number
  startDate?: string
  endDate?: string
  city?: string
  state?: string
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface InspectionStats {
  totalInspections: number
  averageScore: number
  gradeDistribution: {
    A: number
    B: number
    C: number
    D: number
    F: number
  }
  recentInspections: number
  criticalViolations: number
  nonCriticalViolations: number
} 