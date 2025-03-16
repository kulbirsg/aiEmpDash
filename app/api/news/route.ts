import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=de&category=technology&apiKey=${process.env.NEWS_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === "error") {
      throw new Error(data.message || "Unknown error occurred")
    }

    const aiNews =
      data.articles
        ?.filter(
          (article: any) =>
            article.title?.toLowerCase().includes("ai") ||
            article.description?.toLowerCase().includes("ai") ||
            article.title?.toLowerCase().includes("artificial intelligence") ||
            article.description?.toLowerCase().includes("artificial intelligence"),
        )
        .slice(0, 5)
        .map((article: any, index: number) => ({
          id: index + 1,
          title: article.title || "No title available",
          description: article.description || "No description available",
          url: article.url || "#",
        })) || []

    return NextResponse.json({ articles: aiNews })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

