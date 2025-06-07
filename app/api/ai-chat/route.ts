import { NextResponse } from "next/server"
import { HumanMessage } from "@langchain/core/messages"
import { createInspectionQAChain } from "@/lib/langchain/inspection-chain"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ response: "No message provided." }, { status: 400 })
    }

    const chain = await createInspectionQAChain()
    const response = await chain.call({
      input_documents: [],
      question: message,
    })

    return NextResponse.json({ response: response.text })
  } catch (error) {
    console.error("Error in /api/ai-chat:", error)
    return NextResponse.json(
      { response: "There was an error contacting the AI. Please try again later." },
      { status: 500 }
    )
  }
}
