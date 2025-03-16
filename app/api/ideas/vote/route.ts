import { NextResponse } from "next/server"
import { updateIdeaVotes, getIdeaById } from "@/lib/dynamodb"

// POST handler to update idea votes
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id } = body

    if (id === undefined || id === null) {
      return NextResponse.json({ error: "Missing idea ID" }, { status: 400 })
    }

    // Get the current idea to ensure it exists
    const existingIdea = await getIdeaById(id)

    // Calculate new vote count
    const newVotes = existingIdea ? (existingIdea.votes || 0) + 1 : 1

    // Update the votes
    const updatedIdea = await updateIdeaVotes(id, newVotes)

    // Return success even if DB update fails, to keep UI responsive
    return NextResponse.json({
      idea: updatedIdea || { id, votes: newVotes },
      success: !!updatedIdea,
    })
  } catch (error) {
    console.error("Error in POST /api/ideas/vote:", error)
    return NextResponse.json({ error: "Failed to update idea votes" }, { status: 500 })
  }
}

