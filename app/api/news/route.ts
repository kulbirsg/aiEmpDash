import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if API key exists
    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY environment variable is not set")
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.NEWS_API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
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
          source: article.source?.name || "Unknown Source",
          date: new Date(article.publishedAt).toLocaleDateString() || "Unknown Date",
          content: article.content || article.description || "No content available",
        })) || []

    // If no AI news found, return a fallback message
    if (aiNews.length === 0) {
      return NextResponse.json({
        articles: [
          {
            id: 1,
            title: "No AI news found",
            description: "Try again later for the latest AI news updates.",
            url: "#",
            source: "System",
            date: new Date().toLocaleDateString(),
            content: "No AI-related news articles were found in the current feed. Please check back later for updates.",
          },
        ],
      })
    }

    return NextResponse.json({ articles: aiNews })
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}

