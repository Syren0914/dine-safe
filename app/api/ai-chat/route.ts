import { NextRequest, NextResponse } from "next/server"

interface InspectionEntry {
  Score: number;
  "Restaurant Name": string;
  Grade: string;
}

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  try {
    const isAskingBest = /best.*restaurant.*blacksburg/i.test(message)
    let restaurantData = ""

    if (isAskingBest) {
      const res = await fetch("http://127.0.0.1:5000/api/inspections")
      const data = await res.json()

      const topRestaurants = data
        .filter((entry: InspectionEntry) => typeof entry.Score === "number" && !isNaN(entry.Score))
        .sort((a: InspectionEntry, b: InspectionEntry) => a.Score - b.Score) // Lower = better
        .slice(0, 3) // Limit to top 3

      restaurantData = topRestaurants
        .map((r: any, i: number) => {
          const name = r["Restaurant Name"]
          const score = r["Score"]
          const grade = r["Grade"]
          const lat = r["Latitude"]
          const lng = r["Longitude"]
          const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`
          return `${i + 1}. [${name}](${mapsLink}) — Score: ${Math.max(0, 100 - score)}/100, Grade: ${grade}`


          
        })
        .join("\n")
    }

    const systemPrompt = `
You're a helpful assistant for the DineSafe app. If asked for restaurant recommendations, provide up to 3 top-rated places in Blacksburg based on inspection scores. Be concise. For each, show the name, reversed score (as out of 100), and grade. Add Yelp or TripAdvisor ratings only if relevant.
`.trim()

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: isAskingBest ? `${message}\n\nHere's the restaurant data:\n${restaurantData}` : message },
        ],
      }),
    })

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || "No response."

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Groq AI Error:", error)
    return NextResponse.json({ error: "Groq API failed." }, { status: 500 })
  }
}
