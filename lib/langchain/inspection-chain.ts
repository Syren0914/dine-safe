import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"
import { RetrievalQAChain } from "langchain/chains"
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { Document } from "langchain/core/documents"



const FLASK_API_URL = "http://127.0.0.1:5000/api/inspections"

export async function createInspectionQAChain() {
  const res = await fetch(FLASK_API_URL)
  const data = await res.json()

  const docs = data.map((entry: any) => {
    const content = `
Restaurant: ${entry["Restaurant Name"]}
Score: ${entry["Score"]}
Grade: ${entry["Grade"]}
Date: ${entry["Inspection Date"]}
Violations: ${Array.isArray(entry["Violations"])
        ? entry["Violations"].map((v: any) => `${v.Section}: ${v.Observation}`).join("; ")
        : entry["Violations"] || "None"}
    `.trim()

    return new Document({
      pageContent: content,
      metadata: { name: entry["Restaurant Name"] },
    })
  })

  const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())

  const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  return RetrievalQAChain.fromLLM(model, vectorStore.asRetriever({ k: 4 }))
}
