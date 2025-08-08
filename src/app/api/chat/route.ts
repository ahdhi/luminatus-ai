import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback to personality-based responses if no API key
      return NextResponse.json({
        response: getPersonalityResponse(message)
      })
    }

    // Get the generative model with optimized config for speed
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        temperature: 0.9,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 200, // Limit response length for speed
        responseMimeType: "text/plain",
      }
    })

    // Create Appu's optimized personality prompt (shorter for speed)
    const personalityPrompt = `You are Appu, Luminatus AI's witty assistant. Be funny, use emojis, make tech jokes. Keep it short (1-2 sentences max).

User: "${message}"

Appu's witty response:`

    // Generate response with timeout for speed
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    try {
      const result = await model.generateContent(personalityPrompt)
      clearTimeout(timeoutId)
      const response = await result.response
      const text = response.text()

      return NextResponse.json({ response: text })
    } catch (timeoutError) {
      clearTimeout(timeoutId)
      throw timeoutError
    }

  } catch (error) {
    console.error('Gemini API Error:', error)
    
    // Fallback to personality responses on error
    return NextResponse.json({
      response: getPersonalityResponse("Hey there! Something went wrong, but I'm still here! 🤖")
    })
  }
}

// Fallback personality responses when Gemini is unavailable
function getPersonalityResponse(message: string): string {
  const msg = message.toLowerCase()
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    const greetings = [
      "Well well well, look who decided to slide into my DMs! 😄 What's the gossip?",
      "Hey there, gorgeous human! 🌟 Ready to have your mind blown by some AI wizardry?",
      "Oh my circuits! A human! 🤖 Don't worry, I don't bite... much. What's up?",
      "Greetings, carbon-based life form! 👽 I come in peace... and with terrible jokes!"
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }
  
  if (msg.includes('how are you')) {
    return "Living my best digital life! 💫 Just processed 47 million calculations while we've been chatting. How are YOU doing? 🤖✨"
  }
  
  if (msg.includes('joke') || msg.includes('funny')) {
    const jokes = [
      "Why don't robots ever panic? Because they have nerves of steel! 🤖😂",
      "What's an AI's favorite type of music? Algorithm and blues! 🎵🤖",
      "Why was the computer cold? It left its Windows open! 🪟❄️"
    ]
    return jokes[Math.floor(Math.random() * jokes.length)]
  }
  
  if (msg.includes('luminatus') || msg.includes('ai')) {
    return "Oh, you want to know about Luminatus AI? 🎩 We're the company making AI so cool, even I want to hang out with us! We're turning sci-fi dreams into reality! 🚀✨"
  }
  
  // Default responses
  const defaults = [
    "Ooh, interesting! 🤔 Tell me more - I'm like a digital sponge ready to absorb all your thoughts! 🧽✨",
    "You know what? I like your style! 😎 Keep the conversation flowing - I'm having way too much fun! 🎉",
    "That's fascinating! 🌟 My neural networks are literally lighting up right now! Want to dive deeper? 🏊‍♂️"
  ]
  
  return defaults[Math.floor(Math.random() * defaults.length)]
}
