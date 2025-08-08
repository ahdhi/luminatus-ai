'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm Appu, and I'm probably the coolest AI you'll meet today (don't tell the other AIs I said that 😉). What's cooking?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mount detection for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Scroll detection for enhanced visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get AI response from Gemini API (optimized for speed)
  const getAppuResponse = async (userMessage: string): Promise<string> => {
    try {
      // Add timeout for faster user experience
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      return data.response || "Oops! My circuits got a bit tangled there! 🤖 Try asking me something else! ✨"
      
    } catch (error) {
      console.error('Error getting AI response:', error)
      
      // Quick fallback responses for better UX
      const message = userMessage.toLowerCase()
      
      if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hey there! 👋 I'm having a quick coffee break ☕ but still here to chat! What's up? 😊"
      }
      
      if (message.includes('how are you')) {
        return "I'm doing fantastic! 💫 Just a tiny hiccup in my neural networks, but I'm back! How are you doing? 🤖"
      }
      
      // Default fallback
      return "Whoops! 🙈 My AI brain had a little glitch there, but I'm still here! Try asking me something else! ✨"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Get AI response
      const botResponseText = await getAppuResponse(inputValue)
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date()
      }

      setTimeout(() => {
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 500) // Small delay for natural feel

    } catch (error) {
      console.error('Error in handleSendMessage:', error)
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong! 😅 But hey, I'm still here and ready to chat! ✨",
        isUser: false,
        timestamp: new Date()
      }
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorResponse])
        setIsTyping(false)
      }, 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Don't render on server
  if (!mounted) return null

  return createPortal(
    <motion.div
      className={`fixed ${isScrolled ? 'bottom-8 right-8' : 'bottom-6 right-6'} z-[9999] transition-all duration-300`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mb-4 w-80 h-96 bg-gray-900/95 backdrop-blur-xl border border-neon-cyan/30 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border-b border-neon-cyan/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Appu</h3>
                  <p className="text-gray-300 text-xs">AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto h-64">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isUser 
                        ? 'bg-neon-purple/20' 
                        : 'bg-gradient-to-r from-neon-cyan to-neon-purple'
                    }`}>
                      {message.isUser ? (
                        <User className="w-3 h-3 text-neon-purple" />
                      ) : (
                        <Bot className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className={`p-2 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-neon-purple/20 text-white ml-2'
                        : 'bg-gray-800/60 text-gray-100 mr-2'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-800/60 text-gray-100 p-2 rounded-lg text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neon-cyan/30 bg-gray-900/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-gray-800/60 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/30"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-neon-cyan to-neon-purple text-white p-2 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isScrolled 
            ? 'w-16 h-16 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink shadow-2xl' 
            : 'w-14 h-14 bg-gradient-to-r from-neon-cyan to-neon-purple shadow-xl'
        } rounded-full text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl group relative overflow-hidden`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <X className={isScrolled ? "w-8 h-8" : "w-6 h-6"} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <MessageCircle className={isScrolled ? "w-8 h-8" : "w-6 h-6"} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>,
    document.body
  )
}