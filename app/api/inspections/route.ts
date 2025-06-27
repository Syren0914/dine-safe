import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("inspectionsDB")
    const collection = db.collection("graded_inspections")

    const inspections = await collection.find({}).toArray()

    console.log("✅ Total documents fetched:", inspections.length)

    return NextResponse.json(inspections)
  } catch (error) {
    console.error("❌ MongoDB Fetch Error:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
