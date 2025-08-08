// src/components/sections/Hero.tsx
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Zap, Brain } from 'lucide-react'
import Button from '@/components/ui/Button'
import GlowingText from '@/components/ui/GlowingText'
import TextReveal from '@/components/animations/TextReveal'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-triggered animations that respond to scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end center']
  })

  // Parallax effects - optimized to prevent blank space
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const titleOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0])
  const titleScale = useTransform(scrollYProgress, [0.6, 1], [1, 0.98])
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, -25])
  const taglineOpacity = useTransform(scrollYProgress, [0.4, 1], [1, 0])
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const buttonsOpacity = useTransform(scrollYProgress, [0.3, 1], [1, 0])
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -15])
  const statsOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0])
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -35])
  const badgeOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0])

  // Background parallax - minimal movement
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Floating Elements */}
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-neon-pink/20 rounded-full blur-2xl animate-float animation-delay-1000" />
        <div className="absolute top-20 left-1/3 w-16 h-16 bg-neon-cyan/25 rounded-full blur-xl animate-float animation-delay-300" />
        <div className="absolute bottom-1/3 right-20 w-20 h-20 bg-neon-blue/20 rounded-full blur-xl animate-float animation-delay-700" />
        <div className="absolute top-2/3 left-20 w-12 h-12 bg-neon-purple/30 rounded-full blur-xl animate-float animation-delay-900" />

        {/* Animated Pulsing Points */}
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-neon-blue rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-1/2 left-1/4 w-6 h-6 bg-neon-purple rounded-full animate-pulse opacity-40 animation-delay-500" />
        <div className="absolute top-1/4 right-1/2 w-4 h-4 bg-neon-pink rounded-full animate-pulse opacity-80 animation-delay-800" />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-10" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 container mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          style={{
            y: badgeY,
            opacity: badgeOpacity
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-effect rounded-full border border-neon-blue/30"
        >
          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Enterprise AI Solutions</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          style={{
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
        >
          <TextReveal>
            <span className="text-white">LUMINATUS </span>
            <GlowingText className="inline">AI</GlowingText>
          </TextReveal>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          style={{
            y: taglineY,
            opacity: taglineOpacity
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Where Intelligence Becomes
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink ml-2">
            Infinite
          </span>
        </motion.p>

        {/* Description */}
        <motion.p
          style={{
            y: taglineY,
            opacity: taglineOpacity
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
        >
          Pioneering the next generation of artificial intelligence solutions
          that transform possibilities into reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          style={{
            y: buttonsY,
            opacity: buttonsOpacity
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="primary" size="lg" className="group min-w-[200px]">
            <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Explore Solutions
          </Button>
          <Button variant="secondary" size="lg" className="group min-w-[200px]">
            <Brain className="w-5 h-5 mr-2" />
            Learn More
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          style={{
            y: statsY,
            opacity: statsOpacity
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { label: 'AI Models', value: '100+', icon: Brain },
            { label: 'Data Processed', value: '50TB+', icon: Zap },
            { label: 'Accuracy Rate', value: '99.9%', icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-neon-blue/30 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-neon-blue mb-3 mx-auto" />
              <div className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
