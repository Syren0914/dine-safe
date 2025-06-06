import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const response = await fetch("http://127.0.0.1:5000/api/inspections")
  const data = await response.json()
  return NextResponse.json(data)
}
