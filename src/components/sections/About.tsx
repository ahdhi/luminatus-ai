// src/components/sections/About.tsx

'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Brain, Cpu, Globe, Layers, Shield, Zap } from 'lucide-react'
import GlowingText from '@/components/ui/GlowingText'
import FadeIn from '@/components/animations/FadeIn'
import AITextReveal from '@/components/animations/AITextReveal'

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
  const isInView = useInView(containerRef, { once: false, amount: 0.2, margin: "-50px" })
  
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
        <FadeIn duration={0.4} delay={0} once={false}>
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium text-neon-blue border border-neon-blue/30 rounded-full glass-effect"
            >
              ABOUT LUMINATUS
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block"
              >
                Redefining the Boundaries of
              </motion.span>
              <AITextReveal 
                text="Artificial Intelligence" 
                className="block mt-2 text-4xl md:text-5xl lg:text-6xl font-display font-bold"
                delay={0.2}
              />
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We&apos;re not just building AI systems; we&apos;re crafting the cognitive infrastructure 
              that will power tomorrow&apos;s innovations and unlock human potential at an unprecedented scale.
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
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
                  { value: '2024', label: 'Founded' },
                  { value: '50+', label: 'AI Engineers' },
                  { value: '100+', label: 'Users Worldwide' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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