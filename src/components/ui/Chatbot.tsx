'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(true) // Auto-open on load
  const [isMinimized, setIsMinimized] = useState(false)
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

  useEffect(() => {
    setMounted(true)
    console.log('Chatbot component mounted!')
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      })

      const data = await response.json()
      
      let botMessageText = "Sorry, I'm having trouble thinking right now! 🤖"
      
      if (response.ok && data.response) {
        botMessageText = data.response
      } else if (data.error) {
        if (data.error === 'AI service temporarily unavailable') {
          botMessageText = "I'm having a temporary brain freeze! 🧠❄️ Try asking me again in a moment!"
        } else if (data.error === 'API key not configured') {
          botMessageText = "Oops! My AI brain isn't fully connected yet. The developers need to check my configuration! 🔧"
        } else {
          botMessageText = "Something went wrong on my end! Let me know if you'd like to try again! 😅"
        }
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botMessageText,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Hmm, I can't seem to connect right now! Check your internet and let's try again! 🌐",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #00d9ff 0%, #a855f7 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(0, 217, 255, 0.3)'
            }}
          >
            <MessageCircle size={24} />
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: '#ec4899' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-[9999] w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)]"
          >
            <div className="glass-effect rounded-2xl border border-white/20 shadow-2xl overflow-hidden h-full flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 p-4 flex items-center justify-between border-b border-white/10"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)' 
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      background: 'linear-gradient(135deg, #00d9ff 0%, #a855f7 100%)' 
                    }}
                  >
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Appu</h3>
                    <p className="text-xs text-gray-400">AI Assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start gap-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}
                            style={{ 
                              background: message.isUser 
                                ? 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)' 
                                : 'linear-gradient(135deg, #00d9ff 0%, #06b6d4 100%)'
                            }}
                          >
                            {message.isUser ? <User size={16} /> : <Bot size={16} />}
                          </div>
                          <div className={`p-3 rounded-2xl ${
                            message.isUser
                              ? 'bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 border border-neon-pink/30'
                              : 'bg-white/5 border border-white/10'
                          }`}>
                            <p className="text-sm text-white whitespace-pre-wrap">{message.text}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ 
                              background: 'linear-gradient(135deg, #00d9ff 0%, #06b6d4 100%)' 
                            }}
                          >
                            <Bot size={16} />
                          </div>
                          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#00d9ff' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#00d9ff' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#00d9ff' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Appu anything..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 transition-colors"
                        disabled={isTyping}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={sendMessage}
                        disabled={isTyping || !inputValue.trim()}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        style={{
                          background: 'linear-gradient(135deg, #00d9ff 0%, #a855f7 100%)'
                        }}
                      >
                        <Send size={16} />
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
