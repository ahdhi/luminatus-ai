// src/components/sections/Contact.tsx

'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Check, X } from 'lucide-react'
import useWindowSize from '@/hooks/useWindowSize'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@luminatus.ai',
    description: 'Get in touch for partnerships and inquiries',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+61 455 322 272',
    description: 'Speak directly with our AI specialists',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'Melbourne, Australia',
    description: 'Our headquarters in the heart of tech',
    color: 'from-green-500 to-emerald-500',
  },
]

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  
  // Get responsive window information
  const { isMobile, isTablet, isDesktop } = useWindowSize()
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  // Scroll detection for animations
  const isTitleInView = useInView(titleRef, { 
    once: false,
    amount: isMobile ? 0.1 : 0.2,
    margin: isMobile ? "0px 0px -100px 0px" : "0px 0px -150px 0px"
  })
  const isFormInView = useInView(formRef, { 
    once: false,
    amount: isMobile ? 0.05 : 0.1,
    margin: "0px 0px -100px 0px"
  })
  const isInfoInView = useInView(infoRef, { 
    once: false,
    amount: isMobile ? 0.1 : 0.2,
    margin: "0px 0px -50px 0px"
  })
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -25 : -50])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [isMobile ? 15 : 30, isMobile ? -10 : -20])
  
  // Animation variants
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 40 : 60,
      scale: isMobile ? 0.95 : 0.9,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.6 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }
  
  const containerVariants = {
    hidden: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.1 : 0.2,
      },
    },
  }
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 50,
      scale: isMobile ? 0.95 : 0.9,
      filter: "blur(5px)",
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: isMobile ? 0.5 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }
  
  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Random success/error for demo
    const isSuccess = Math.random() > 0.3
    setSubmitStatus(isSuccess ? 'success' : 'error')
    setIsSubmitting(false)
    
    if (isSuccess) {
      setFormData({ name: '', email: '', company: '', message: '' })
    }
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000)
  }

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-12 md:py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full grid-pattern" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-neon-blue/10 rounded-full blur-3xl animate-float animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-neon-pink/10 rounded-full blur-3xl animate-float animation-delay-800" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          style={{ y: titleY }}
          variants={titleVariants}
          initial="hidden"
          animate={isTitleInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: isMobile ? 25 : 50 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 25 : 50 }}
            transition={{ 
              duration: isMobile ? 0.5 : 0.8, 
              delay: isTitleInView ? (isMobile ? 0.1 : 0.2) : 0 
            }}
            className="inline-block px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 text-xs md:text-sm font-medium text-neon-purple border border-neon-purple/30 rounded-full glass-effect"
          >
            GET IN TOUCH
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: isMobile ? 30 : 60 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 30 : 60 }}
            transition={{ 
              duration: isMobile ? 0.6 : 0.8, 
              delay: isTitleInView ? (isMobile ? 0.3 : 0.4) : 0 
            }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold mb-4 md:mb-6"
          >
            Let&apos;s Build the{' '}
            <span className="bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              Future Together
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 40 }}
            transition={{ 
              duration: isMobile ? 0.6 : 0.8, 
              delay: isTitleInView ? (isMobile ? 0.5 : 0.6) : 0 
            }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 md:px-0"
          >
            Ready to transform your business with cutting-edge AI? Let&apos;s discuss how 
            Luminatus can accelerate your journey into the future of technology.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            variants={containerVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="glass-effect rounded-2xl md:rounded-3xl p-6 md:p-8 border border-neon-purple/20 relative overflow-hidden"
            >
              {/* Form Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 rounded-2xl md:rounded-3xl" />
              
              <div className="relative z-10">
                <motion.h3 
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-bold mb-6 md:mb-8"
                >
                  Send us a Message
                </motion.h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300 text-white placeholder-gray-500"
                        placeholder="john@company.com"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300 text-white placeholder-gray-500"
                      placeholder="Your Company"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300 text-white placeholder-gray-500 resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-neon-purple/25 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          <Check className="w-5 h-5" />
                          Message Sent!
                        </>
                      ) : submitStatus === 'error' ? (
                        <>
                          <X className="w-5 h-5" />
                          Failed to Send
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInfoInView ? "visible" : "hidden"}
            className="space-y-6 md:space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: isMobile ? 1.02 : 1.05,
                  x: isMobile ? 5 : 10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="glass-effect rounded-2xl p-6 md:p-8 border border-white/10 hover:border-neon-purple/30 transition-all duration-500 relative overflow-hidden">
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${info.color.replace('from-', '').replace(' to-', ', ')})`,
                    }}
                  />
                  
                  <div className="relative z-10 flex items-start gap-4 md:gap-6">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${info.color} p-0.5 group-hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center">
                        <info.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-neon-purple transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-lg md:text-xl font-semibold text-white mb-2">
                        {info.value}
                      </p>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="glass-effect rounded-2xl p-6 md:p-8 border border-neon-blue/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5" />
              <div className="relative z-10 text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Ready to Start?
                </h3>
                <p className="text-gray-400 mb-6">
                  Book a free consultation with our AI experts and discover 
                  how we can transform your business processes.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-neon-blue/25 transition-all duration-300"
                >
                  Schedule Consultation
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
