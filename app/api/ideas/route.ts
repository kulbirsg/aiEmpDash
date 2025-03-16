import { NextResponse } from "next/server"
import { getAllIdeas, addIdea, type IdeaItem } from "@/lib/dynamodb"

// GET handler to fetch all ideas
export async function GET() {
  try {
    const ideas = await getAllIdeas()
    return NextResponse.json({ ideas })
  } catch (error) {
    console.error("Error in GET /api/ideas:", error)
    return NextResponse.json({ ideas: [] }, { status: 200 }) // Return empty array instead of error
  }
}

// POST handler to add a new idea
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, submitter, team, objective } = body

    if (!text || !submitter || !team || !objective) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newIdea: IdeaItem = {
      id: Date.now(), // Use timestamp as ID
      text,
      votes: 0,
      submitter,
      team,
      objective,
    }

    try {
      await addIdea(newIdea)
      return NextResponse.json({ idea: newIdea, success: true })
    } catch (dbError) {
      console.error("DynamoDB error details:", dbError)
      // Return the idea anyway so UI can still update
      return NextResponse.json({
        idea: newIdea,
        success: false,
        persistedToDb: false,
      })
    }
  } catch (error) {
    console.error("Error in POST /api/ideas:", error)
    return NextResponse.json({ error: "Failed to add idea" }, { status: 500 })
  }
}

