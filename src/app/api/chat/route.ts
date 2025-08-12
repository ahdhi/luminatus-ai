import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        error: 'API key not configured'
      }, { status: 500 })
    }

    // Create model instance
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build conversation history for context
    let conversationContext = ''
    if (history && history.length > 0) {
      conversationContext = '\n\nConversation History:\n'
      // Include last 10 messages for context (to avoid token limits)
      const recentHistory = history.slice(-50) // Adjusted to 50 for more context
      // Use the last 50 messages for context
      recentHistory.forEach((msg: any, index: number) => {
        if (msg.isUser) {
          conversationContext += `User: ${msg.text}\n`
        } else {
          conversationContext += `Appu: ${msg.text}\n`
        }
      })
      conversationContext += '\n'
    }

    // Create Appu's personality prompt with conversation context
    const personalityPrompt = `You are Appu, the witty AI assistant for Luminatus AI company. 

About Luminatus AI:
- We're a cutting-edge AI technology company
- We develop innovative AI solutions and neural networks
- We offer AI consulting, custom AI development, and AI integration services
- We specialize in machine learning, deep learning, and AI automation

Your personality:
- Witty, funny, and engaging
- Use emojis and tech humor
- Be helpful but keep responses concise (2-3 sentences max)
- Always stay in character as Appu
- If asked about Luminatus AI, be enthusiastic about our services
- Remember the conversation context and refer to it when relevant${conversationContext}

Current user message: "${message}"

Respond as Appu, considering the conversation history above:`

    // Increase timeout and add retry logic
    const maxRetries = 2
    let lastError: any

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await Promise.race([
          model.generateContent(personalityPrompt),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), 10000)
          )
        ]) as any
        
        const response = await result.response
        const text = response.text()

        if (text && text.trim()) {
          return NextResponse.json({ response: text })
        }
        
        throw new Error('Empty response from Gemini')
      } catch (error) {
        console.error(`Gemini API Error (attempt ${attempt}):`, error)
        lastError = error
        
        if (attempt < maxRetries) {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    }

    // If all retries failed, return error
    return NextResponse.json({
      error: 'AI service temporarily unavailable',
      details: lastError?.message || 'Unknown error'
    }, { status: 503 })

  } catch (error) {
    console.error('API Route Error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
