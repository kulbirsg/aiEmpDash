"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThumbsUp, Star, Zap } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Database, DollarSign, Laptop, BarChart, Cog } from "lucide-react"

interface Idea {
  id: number
  text: string
  votes: number
  submitter: string
  team: string
  objective: string
}

interface NewsItem {
  id: number
  title: string
  description: string
  url: string
}

interface Training {
  id: number
  title: string
  description: string
}

interface NewsArticle {
  id: number
  title: string
  description: string
  source: string
  date: string
  content?: string
}

export default function Dashboard() {
  const [ideas, setIdeas] = useState<Idea[]>([
    {
      id: 1,
      text: "AI-powered route optimization for faster deliveries",
      votes: 15,
      submitter: "Emma Johnson",
      team: "Operations",
      objective: "Reduce delivery times by 30% and cut fuel costs by 20%",
    },
    {
      id: 2,
      text: "Smart packaging system that adapts to product size and protects sensitive parts",
      votes: 12,
      submitter: "Liam Chen",
      team: "IT",
      objective: "Decrease packaging waste by 40% and reduce shipping damages by 50%",
    },
    {
      id: 3,
      text: "Predictive maintenance AI for delivery fleet efficiency",
      votes: 8,
      submitter: "Sophia Rodriguez",
      team: "Operations",
      objective: "Reduce vehicle downtime by 60% and extend fleet lifespan by 25%",
    },
    {
      id: 4,
      text: "Customer chatbot for real-time delivery updates and assembly instructions",
      votes: 10,
      submitter: "Noah Patel",
      team: "Marketing",
      objective: "Improve customer satisfaction scores by 35% and reduce support calls by 50%",
    },
    {
      id: 5,
      text: "AI-driven inventory management system",
      votes: 7,
      submitter: "Olivia Kim",
      team: "SAP",
      objective: "Optimize stock levels to reduce overstock by 30% and stockouts by 80%",
    },
    {
      id: 6,
      text: "Automated financial forecasting using machine learning",
      votes: 9,
      submitter: "Ethan Brown",
      team: "Finance",
      objective: "Improve forecast accuracy by 40% and reduce financial planning time by 60%",
    },
    {
      id: 7,
      text: "AI-enhanced customer segmentation for targeted marketing",
      votes: 11,
      submitter: "Ava Garcia",
      team: "Marketing",
      objective: "Increase marketing ROI by 50% and customer engagement rates by 35%",
    },
    {
      id: 8,
      text: "Intelligent document processing for faster order handling",
      votes: 6,
      submitter: "Mason Taylor",
      team: "IT",
      objective: "Reduce order processing time by 70% and data entry errors by 90%",
    },
    {
      id: 9,
      text: "AI-powered supply chain optimization",
      votes: 14,
      submitter: "Isabella Martinez",
      team: "Operations",
      objective: "Reduce supply chain costs by 25% and improve on-time deliveries by 40%",
    },
    {
      id: 10,
      text: "Sentiment analysis for real-time customer feedback",
      votes: 13,
      submitter: "William Lee",
      team: "Marketing",
      objective: "Improve product development cycle by 30% and increase customer retention by 25%",
    },
  ])
  const [newIdea, setNewIdea] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [submitter, setSubmitter] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("")

  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null)
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null)
  const [selectedTeamIdeas, setSelectedTeamIdeas] = useState<{ team: string; ideas: Idea[] } | null>(null)
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)

  const [news] = useState<NewsArticle[]>([
    {
      id: 1,
      title: "AI-Driven Personalized Learning Platform Boosts Student Performance by 40%",
      description: "Revolutionary AI system adapts to individual learning styles and pace.",
      source: "EdTech Innovator",
      date: "February 28, 2025",
      content: `A groundbreaking AI-powered personalized learning platform has demonstrated remarkable success in improving student performance across various subjects. The system, developed by EduAI Technologies, uses advanced machine learning algorithms to adapt to each student's unique learning style, pace, and preferences.

    Key findings from the initial deployment:
    • 40% improvement in overall student performance
    • 50% reduction in time spent on challenging topics
    • 35% increase in student engagement and motivation
    • Personalized feedback and study plans for each student

    The platform has been particularly effective in helping students master complex subjects like mathematics and sciences. Educational institutions worldwide are now considering adopting this technology to revolutionize their teaching methods.`,
    },
    {
      id: 2,
      title: "Retail Giant Implements AI-Powered Dynamic Pricing, Sees 15% Revenue Increase",
      description: "Machine learning system optimizes prices in real-time based on demand and competition.",
      source: "Retail Tech Today",
      date: "February 25, 2025",
      content: `A major retail chain has reported a significant boost in revenue following the implementation of an AI-driven dynamic pricing system. The solution, which uses machine learning to adjust prices in real-time based on various factors, has resulted in a 15% increase in overall revenue within just three months of deployment.

    The system considers:
    • Real-time demand fluctuations
    • Competitor pricing
    • Inventory levels
    • Historical sales data
    • External factors (e.g., weather, events)

    The AI solution has shown particular success in optimizing prices for seasonal items and during promotional periods, leading to improved profit margins and reduced instances of overstock or stockouts.`,
    },
    {
      id: 3,
      title: "AI-Enhanced Robotics Revolutionizes Warehouse Operations, Efficiency Up by 60%",
      description: "Next-gen robots with advanced AI capabilities transform logistics and fulfillment centers.",
      source: "Supply Chain Quarterly",
      date: "February 20, 2025",
      content: `A new generation of AI-enhanced robots is transforming warehouse operations across the globe. These advanced machines, equipped with state-of-the-art artificial intelligence and computer vision, have demonstrated a remarkable 60% increase in overall warehouse efficiency.

    Key improvements include:
    • 70% faster order picking and packing
    • 50% reduction in inventory management errors
    • 40% decrease in operational costs
    • Enhanced worker safety with human-robot collaboration

    The robots use machine learning algorithms to optimize their movements, adapt to changing warehouse layouts, and even predict and prepare for incoming orders. Major e-commerce and logistics companies are rapidly adopting this technology to stay competitive in the fast-paced digital retail landscape.`,
    },
    {
      id: 4,
      title: "AI-Powered Virtual Shopping Assistants Boost Online Sales by 25%",
      description: "Conversational AI provides personalized shopping experiences, increasing conversion rates.",
      source: "E-commerce Trends",
      date: "February 15, 2025",
      content: `Online retailers are reporting a significant uptick in sales following the widespread adoption of AI-powered virtual shopping assistants. These sophisticated chatbots, powered by natural language processing and machine learning, have led to a 25% increase in online sales across various e-commerce platforms.

    The virtual assistants offer:
    • Personalized product recommendations
    • Instant responses to customer queries
    • Size and style guidance
    • Integration with AR/VR for virtual try-ons

    Retailers using the technology report improved customer satisfaction scores, higher conversion rates, and a notable reduction in returns. The success of these AI assistants is prompting many brands to invest heavily in conversational AI technologies.`,
    },
    {
      id: 5,
      title: "AI-Driven Predictive Maintenance Saves Manufacturing Industry Billions",
      description: "Machine learning models predict equipment failures, reducing downtime and maintenance costs.",
      source: "Industry 4.0 Magazine",
      date: "February 10, 2025",
      content: `The manufacturing sector is experiencing a paradigm shift in maintenance strategies, thanks to AI-driven predictive maintenance systems. These advanced solutions, which use machine learning to predict equipment failures before they occur, are estimated to have saved the industry billions in reduced downtime and maintenance costs.

    Benefits observed include:
    • 75% reduction in unplanned downtime
    • 50% decrease in maintenance costs
    • 30% improvement in equipment lifespan
    • Enhanced worker safety due to fewer emergency repairs

    The AI systems analyze data from IoT sensors, historical maintenance records, and even external factors like weather conditions to make highly accurate predictions. As a result, manufacturers can schedule maintenance activities optimally, avoiding costly breakdowns and extending the life of their equipment.`,
    },
  ])

  const [trainings] = useState<Training[]>([
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description: "Learn the basics of ML algorithms and their applications.",
    },
    {
      id: 2,
      title: "Advanced Deep Learning",
      description: "Dive deep into neural networks and cutting-edge DL techniques.",
    },
    {
      id: 3,
      title: "AI for Business Leaders",
      description: "Understand how AI can transform your business operations.",
    },
    {
      id: 4,
      title: "Natural Language Processing Fundamentals",
      description: "Explore the core concepts of NLP and its practical applications in AI.",
    },
    {
      id: 5,
      title: "AI Ethics and Governance",
      description: "Understand the ethical implications of AI and learn about governance frameworks.",
    },
  ])

  const handleSubmitIdea = () => {
    if (newIdea.trim() && newObjective.trim() && submitter.trim() && selectedTeam) {
      setIdeas([
        ...ideas,
        {
          id: Date.now(),
          text: newIdea,
          votes: 0,
          submitter: submitter,
          team: selectedTeam,
          objective: newObjective,
        },
      ])
      setNewIdea("")
      setNewObjective("")
      setSubmitter("")
      setSelectedTeam("")
    }
  }

  const handleVote = (id: number) => {
    setIdeas(ideas.map((idea) => (idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea)))
  }

  const getTeamStats = () => {
    const stats = ideas.reduce(
      (acc, idea) => {
        acc[idea.team] = (acc[idea.team] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .map(([team, count]) => ({
        team,
        count,
        percentage: (count / ideas.length) * 100,
      }))
  }

  const handleTeamIconClick = (team: string) => {
    const teamIdeas = ideas.filter((idea) => idea.team === team).sort((a, b) => b.votes - a.votes)
    setSelectedTeamIdeas({ team, ideas: teamIdeas })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AI Innovation Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="relative">
            <CardTitle>AI Idea Leaderboard</CardTitle>
            <CardDescription>Submit and vote for the best AI ideas!</CardDescription>
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-semibold">
              {ideas.length} Ideas
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] flex flex-col space-y-4">
              <div className="space-y-2 p-4 border rounded-lg">
                <Input placeholder="Enter your AI idea" value={newIdea} onChange={(e) => setNewIdea(e.target.value)} />
                <Input
                  placeholder="Objective of your idea"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                />
                <Input placeholder="Your name" value={submitter} onChange={(e) => setSubmitter(e.target.value)} />
                <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAP">SAP</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleSubmitIdea} className="w-full">
                  Submit Idea <Zap className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* iOS-style Team Ideas Icons */}
              <div className="mb-4 p-4 border rounded-lg">
                <h3 className="text-sm font-semibold mb-2">Team Ideas</h3>
                <div className="flex justify-between">
                  {getTeamStats().map(({ team, count }) => (
                    <div
                      key={team}
                      className="relative cursor-pointer w-16 flex flex-col items-center"
                      onClick={() => handleTeamIconClick(team)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shadow-sm">
                        {team === "SAP" && <Database className="w-6 h-6 text-black" />}
                        {team === "Finance" && <DollarSign className="w-6 h-6 text-black" />}
                        {team === "IT" && <Laptop className="w-6 h-6 text-black" />}
                        {team === "Marketing" && <BarChart className="w-6 h-6 text-black" />}
                        {team === "Operations" && <Cog className="w-6 h-6 text-black" />}
                      </div>
                      {count > 0 && (
                        <div className="absolute top-0 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                          {count}
                        </div>
                      )}
                      <p className="text-xs mt-1 text-center font-medium">{team}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-grow overflow-y-auto border rounded-lg p-4">
                {ideas
                  .sort((a, b) => b.votes - a.votes)
                  .map((idea, index) => (
                    <div
                      key={idea.id}
                      className={`mb-2 p-3 rounded-lg border transition-all ${
                        index < 3 ? "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200" : "bg-muted"
                      }`}
                      onClick={() => setSelectedIdea(idea)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center">
                            {index < 3 && <Star className="h-4 w-4 text-yellow-500 mr-1" />}
                            <span className="font-medium">{idea.text}</span>
                          </div>
                          <span className="text-xs text-gray-500 italic block mt-1">
                            {idea.submitter} ({idea.team})
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVote(idea.id)
                          }}
                          className="flex items-center"
                        >
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>{idea.votes}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>AI News Feed</CardTitle>
            <CardDescription>Stay updated with the latest AI events and news</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] overflow-y-auto space-y-4">
              {news.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedNews(item)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500 italic">
                      {item.source} - {item.date}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Available AI Trainings</CardTitle>
              <CardDescription>Enhance your AI skills with these training programs</CardDescription>
            </div>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lex-2cqgnFp5UjGGK88tMEyOVE8coxPbOk.png"
              alt="Learning Platform Logo"
              className="h-12 w-12 -mt-1"
            />
          </CardHeader>
          <CardContent>
            <div className="h-[600px] overflow-y-auto">
              <div className="space-y-4">
                {trainings.map((training) => (
                  <Card
                    key={training.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedTraining(training)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{training.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{training.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-[80vw] w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pr-8">{selectedNews?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm mb-4 whitespace-pre-line">{selectedNews?.content}</p>
            <p className="text-xs text-gray-500 italic">
              {selectedNews?.source} - {selectedNews?.date}
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!selectedTraining} onOpenChange={() => setSelectedTraining(null)}>
        <DialogContent className="max-w-[80vw] w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pr-8">{selectedTraining?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Learning Goals:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Understand key concepts and principles of {selectedTraining?.title}</li>
              <li>Apply theoretical knowledge to practical scenarios</li>
              <li>Develop skills in using relevant tools and technologies</li>
              <li>Analyze and solve complex problems in the field</li>
              <li>Evaluate and critique current trends and methodologies</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!selectedTeamIdeas} onOpenChange={() => setSelectedTeamIdeas(null)}>
        <DialogContent className="max-w-[80vw] w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pr-8">{selectedTeamIdeas?.team} Team Ideas</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedTeamIdeas?.ideas.map((idea, index) => (
              <div
                key={idea.id}
                className={`p-3 rounded-lg border transition-all ${
                  index < 3 ? "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200" : "bg-muted"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      {index < 3 && <Star className="h-4 w-4 text-yellow-500 mr-1" />}
                      <span className="font-medium">{idea.text}</span>
                    </div>
                    <span className="text-xs text-gray-500 italic block mt-1">{idea.submitter}</span>
                    <p className="text-sm mt-2">{idea.objective}</p>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    <span>{idea.votes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!selectedIdea} onOpenChange={() => setSelectedIdea(null)}>
        <DialogContent className="max-w-[80vw] w-full max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pr-8">{selectedIdea?.text}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm mb-2">
              <strong>Objective:</strong> {selectedIdea?.objective}
            </p>
            <p className="text-sm mb-4">
              <strong>Submitter:</strong> {selectedIdea?.submitter} ({selectedIdea?.team})
            </p>
            <div className="flex items-center">
              <ThumbsUp className="mr-1 h-4 w-4" />
              <span>{selectedIdea?.votes} votes</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .dialog-overlay {
          background-color: rgba(0, 0, 0, 0.5);
        }
        .dialog-content {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}

