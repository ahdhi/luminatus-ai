// src/components/sections/Services.tsx

'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Sparkles, 
  Cpu, 
  Eye, 
  MessageSquare, 
  Database,
  ArrowRight,
  Check
} from 'lucide-react'
import GlowingText from '@/components/ui/GlowingText'

const services = [
  {
    id: 'nlp',
    icon: MessageSquare,
    title: 'Natural Language Processing',
    shortDesc: 'Advanced language understanding and generation',
    description: 'Transform unstructured text into actionable insights with our state-of-the-art NLP models.',
    features: [
      'Multi-language support (100+ languages)',
      'Sentiment analysis & emotion detection',
      'Named entity recognition',
      'Text summarization & generation',
      'Real-time translation',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'vision',
    icon: Eye,
    title: 'Computer Vision',
    shortDesc: 'See and understand the visual world',
    description: 'Unlock visual intelligence with cutting-edge image recognition and analysis capabilities.',
    features: [
      'Object detection & tracking',
      'Facial recognition & analysis',
      'Image segmentation',
      'Video analysis & processing',
      'OCR & document processing',
    ],
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    id: 'ml',
    icon: Brain,
    title: 'Machine Learning Platform',
    shortDesc: 'Build, train, and deploy custom AI models',
    description: 'End-to-end ML platform for developing and deploying intelligent applications at scale.',
    features: [
      'AutoML capabilities',
      'Model versioning & management',
      'Distributed training',
      'A/B testing framework',
      'Real-time inference',
    ],
    gradient: 'from-green-500 to-emerald-500',
    bgGradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 'predictive',
    icon: Sparkles,
    title: 'Predictive Analytics',
    shortDesc: 'Forecast trends and behaviors',
    description: 'Harness the power of predictive modeling to anticipate future outcomes and trends.',
    features: [
      'Time series forecasting',
      'Anomaly detection',
      'Risk assessment',
      'Customer behavior prediction',
      'Demand forecasting',
    ],
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 'quantum',
    icon: Cpu,
    title: 'Quantum AI',
    shortDesc: 'Next-generation quantum computing',
    description: 'Leverage quantum computing for solving complex optimization and simulation problems.',
    features: [
      'Quantum optimization',
      'Cryptography solutions',
      'Drug discovery acceleration',
      'Financial modeling',
      'Climate simulations',
    ],
    gradient: 'from-indigo-500 to-purple-500',
    bgGradient: 'from-indigo-500/20 to-purple-500/20',
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data Intelligence',
    shortDesc: 'Transform data into insights',
    description: 'Comprehensive data processing and analytics platform for enterprise-scale operations.',
    features: [
      'Real-time data streaming',
      'ETL pipeline automation',
      'Data quality monitoring',
      'Advanced analytics',
      'Data governance',
    ],
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-500/20 to-orange-500/20',
  },
]

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [selectedService, setSelectedService] = useState(services[0])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/5 to-black" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-neon-purple border border-neon-purple/30 rounded-full glass-effect">
            OUR SERVICES
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            AI Solutions for Every
            <GlowingText className="block mt-2">Challenge</GlowingText>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From natural language processing to quantum computing, our comprehensive suite 
            of AI services empowers businesses to innovate and scale.
          </p>
        </motion.div>

        {/* Services Grid & Details */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedService(service)}
                className={`
                  relative p-6 rounded-2xl cursor-pointer transition-all duration-300
                  ${selectedService.id === service.id 
                    ? 'glass-effect border-2 border-neon-blue/50' 
                    : 'glass-effect border border-white/10 hover:border-white/20'
                  }
                `}
              >
                {/* Hover Glow */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.bgGradient} -z-10`}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.gradient} p-0.5 mb-4`}>
                  <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400">{service.shortDesc}</p>

                {/* Selection Indicator */}
                {selectedService.id === service.id && (
                  <motion.div
                    layoutId="service-indicator"
                    className="absolute top-2 right-2 w-2 h-2 bg-neon-blue rounded-full"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Service Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="glass-effect rounded-3xl p-8 h-full border border-white/10">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedService.gradient} p-0.5`}>
                    <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                      <selectedService.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{selectedService.title}</h3>
                    <p className="text-gray-400">{selectedService.description}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Key Features
                  </h4>
                  {selectedService.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                        <Check className="w-3 h-3 text-black" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-full py-3 rounded-lg font-medium
                    bg-gradient-to-r ${selectedService.gradient}
                    hover:shadow-lg transition-all duration-300
                    flex items-center justify-center gap-2 group
                  `}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Decorative Elements */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${selectedService.bgGradient} rounded-full blur-3xl opacity-30`} />
                <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br ${selectedService.bgGradient} rounded-full blur-3xl opacity-30`} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}