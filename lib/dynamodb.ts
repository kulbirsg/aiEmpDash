import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb"

// Initialize the DynamoDB client with configuration for AWS Amplify
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "eu-north-1",
  // When deployed to Amplify, it will use the role assigned to the Amplify app
  // No need to explicitly provide credentials as Amplify will handle this
})

// Create a document client with optimized settings
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
  unmarshallOptions: {
    wrapNumbers: false,
  },
})

// Table name
const TABLE_NAME = "ai-innovation-ideas"

export interface IdeaItem {
  id: number
  text: string
  votes: number
  submitter: string
  team: string
  objective: string
}

// Function to get all ideas
export async function getAllIdeas() {
  try {
    const command = new ScanCommand({
      TableName: TABLE_NAME,
    })

    const response = await docClient.send(command)
    return response.Items || []
  } catch (error) {
    console.error("Error fetching ideas from DynamoDB:", error)
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

// Function to get a single idea by ID
export async function getIdeaById(id: number) {
  try {
    const command = new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    })

    const response = await docClient.send(command)
    return response.Item
  } catch (error) {
    console.error(`Error fetching idea with ID ${id} from DynamoDB:`, error)
    return null
  }
}

// Function to add a new idea
export async function addIdea(idea: IdeaItem) {
  try {
    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: idea,
    })

    await docClient.send(command)
    return idea
  } catch (error) {
    console.error("Error adding idea to DynamoDB:", error)
    throw error
  }
}

// Function to update idea votes
export async function updateIdeaVotes(id: number, votes: number) {
  try {
    const command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: "set votes = :votes",
      ExpressionAttributeValues: {
        ":votes": votes,
      },
      ReturnValues: "ALL_NEW",
    })

    const response = await docClient.send(command)
    return response.Attributes
  } catch (error) {
    console.error("Error updating idea votes in DynamoDB:", error)
    return null
  }
}

