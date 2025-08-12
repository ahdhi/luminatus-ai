// src/components/sections/About.tsx

'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Brain, Cpu, Globe, Layers, Shield, Zap } from 'lucide-react'
import GlowingText from '@/components/ui/GlowingText'
import FadeIn from '@/components/animations/FadeIn'

const features = [
  {
    icon: Brain,
    title: 'Advanced Neural Networks',
    description: 'Cutting-edge deep learning models that adapt and evolve with your data.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cpu,
    title: 'Quantum Processing',
    description: 'Leveraging quantum computing principles for unprecedented processing power.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Infrastructure designed to handle billions of operations across the globe.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Layers,
    title: 'Multi-Layer Architecture',
    description: 'Sophisticated layered systems that ensure reliability and performance.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Military-grade encryption and security protocols protect your data.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized algorithms deliver results in milliseconds, not minutes.',
    color: 'from-yellow-500 to-orange-500',
  },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const isInView = useInView(containerRef, { 
    once: false, 
    amount: 0.1, 
    margin: "200px 0px -100px 0px" 
  })

  // Generate stable particle positions on client-side only
  const [particlePositions] = useState(() => {
    if (typeof window === 'undefined') return []
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }))
  })

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Remove scroll-based animations that might cause layout issues
  // const { scrollYProgress } = useScroll({
  //   target: containerRef,
  //   offset: ['start end', 'end start']
  // })

  // const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  // const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-16 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full grid-pattern" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium text-neon-blue border border-neon-blue/30 rounded-full glass-effect"
            >
              ABOUT LUMINATUS
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="block"
              >
                Redefining the Boundaries of
              </motion.span>
              
              <motion.div 
                className="block mt-2 relative"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {/* Glowing background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-blue/30 via-neon-purple/30 to-neon-pink/30 blur-2xl rounded-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { 
                    scale: [0, 1.2, 1], 
                    opacity: [0, 0.8, 0.5] 
                  } : {}}
                  transition={{ 
                    duration: 1.5, 
                    delay: 0.7,
                    ease: "easeOut"
                  }}
                />
                
                {/* Particle effects */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {isClient && particlePositions.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute w-1 h-1 bg-neon-blue rounded-full"
                      style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        y: [0, -20],
                      }}
                      transition={{
                        duration: 2,
                        delay: 1.2 + particle.id * 0.1,
                        repeat: Infinity,
                        repeatDelay: particle.id * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
                
                {/* Main text with enhanced effects */}
                <motion.span
                  className="relative z-10"
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    rotateX: -15,
                    filter: "blur(10px)"
                  }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1, 
                    rotateX: 0,
                    filter: "blur(0px)"
                  } : {}}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.4))',
                      textShadow: '0 0 30px rgba(236, 72, 153, 0.5)'
                    }}
                  >
                    <motion.span
                      animate={isInView ? {
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      } : {}}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5
                      }}
                      style={{
                        backgroundSize: '200% 200%',
                        background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      Artificial Intelligence
                    </motion.span>
                  </span>
                </motion.span>

                {/* Energy burst effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0, 1, 0] } : {}}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-px h-12 bg-gradient-to-t from-transparent via-neon-blue to-transparent"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'bottom',
                        rotate: `${i * 45}deg`,
                      }}
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={isInView ? { 
                        scaleY: [0, 1.5, 0], 
                        opacity: [0, 1, 0] 
                      } : {}}
                      transition={{
                        duration: 1,
                        delay: 1.6 + i * 0.1,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're not just building AI systems; we're crafting the cognitive infrastructure 
              that will power tomorrow's innovations and unlock human potential at an unprecedented scale.
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-full glass-effect rounded-2xl p-8 border border-white/10 hover:border-neon-blue/30 transition-all duration-500">
                {/* Icon Container */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-blue transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/10 group-hover:to-neon-purple/10 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="glass-effect rounded-3xl p-12 border border-neon-blue/20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-float animation-delay-400" />
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                At Luminatus AI, we believe that artificial intelligence should amplify human creativity, 
                not replace it. Our mission is to democratize access to advanced AI technologies while 
                ensuring they remain ethical, transparent, and aligned with human values.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  { value: '2021', label: 'Founded' },
                  { value: '500+', label: 'AI Engineers' },
                  { value: '10M+', label: 'Users Worldwide' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}