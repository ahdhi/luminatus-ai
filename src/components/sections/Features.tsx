// src/components/sections/Features.tsx

'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { 
  Brain, 
  Zap, 
  Shield, 
  Bot, 
  Sparkles, 
  Eye,
  Network,
  Clock,
  Cpu,
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const features = [
  {
    id: 'neural-processing',
    icon: Brain,
    title: 'Advanced Neural Processing',
    description: 'State-of-the-art neural networks that learn and adapt in real-time.',
    color: 'from-blue-500 to-cyan-500',
    details: [
      'Deep learning algorithms',
      'Real-time adaptation',
      'Pattern recognition',
      'Predictive analytics'
    ],
    demo: {
      type: 'neural',
      nodes: 12,
      connections: 28
    }
  },
  {
    id: 'lightning-speed',
    icon: Zap,
    title: 'Lightning-Fast Processing',
    description: 'Process millions of data points in milliseconds with our optimized architecture.',
    color: 'from-yellow-500 to-orange-500',
    details: [
      'Sub-millisecond response times',
      'Parallel processing',
      'Edge computing',
      'Optimized algorithms'
    ],
    demo: {
      type: 'speed',
      requests: 50000,
      latency: '< 1ms'
    }
  },
  {
    id: 'enterprise-security',
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Military-grade encryption and security protocols protect your data.',
    color: 'from-green-500 to-emerald-500',
    details: [
      'End-to-end encryption',
      'Zero-trust architecture',
      'Compliance ready',
      'Audit trails'
    ],
    demo: {
      type: 'security',
      encryption: 'AES-256',
      compliance: '99.9%'
    }
  },
  {
    id: 'intelligent-automation',
    icon: Bot,
    title: 'Intelligent Automation',
    description: 'Automate complex workflows with AI-powered decision making.',
    color: 'from-purple-500 to-pink-500',
    details: [
      'Workflow automation',
      'Smart decision trees',
      'Process optimization',
      'Error handling'
    ],
    demo: {
      type: 'automation',
      tasks: 1000,
      efficiency: '95%'
    }
  },
  {
    id: 'predictive-insights',
    icon: Eye,
    title: 'Predictive Insights',
    description: 'Forecast trends and outcomes with machine learning predictions.',
    color: 'from-indigo-500 to-purple-500',
    details: [
      'Trend analysis',
      'Anomaly detection',
      'Risk assessment',
      'Forecasting models'
    ],
    demo: {
      type: 'prediction',
      accuracy: '98.5%',
      timeframe: '30 days'
    }
  },
  {
    id: 'scalable-infrastructure',
    icon: Network,
    title: 'Infinitely Scalable',
    description: 'Scale from startup to enterprise with our cloud-native architecture.',
    color: 'from-teal-500 to-blue-500',
    details: [
      'Auto-scaling',
      'Load balancing',
      'Global distribution',
      'Cost optimization'
    ],
    demo: {
      type: 'scale',
      capacity: 'Unlimited',
      regions: 15
    }
  }
]

const additionalFeatures = [
  { icon: Clock, title: '24/7 Monitoring', description: 'Continuous system monitoring and health checks' },
  { icon: Globe, title: 'Global CDN', description: 'Worldwide content delivery for optimal performance' },
  { icon: Cpu, title: 'Edge Computing', description: 'Process data closer to the source for reduced latency' },
  { icon: Sparkles, title: 'AI Optimization', description: 'Self-optimizing algorithms that improve over time' }
]

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-gray-900/50" />
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl animate-float animation-delay-400" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass-effect rounded-full border border-neon-blue/30"
            >
              <Sparkles className="w-4 h-4 text-neon-blue" />
              <span className="text-sm text-gray-300">Revolutionary Features</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-white">Powerful </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                AI Features
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the next generation of artificial intelligence with features designed for the future
            </p>
          </div>
        </FadeIn>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
              >
                <Card className="h-full hover:border-neon-blue/50 transition-all duration-500 overflow-hidden">
                  {/* Icon and Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-neon-blue transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <div className="space-y-2 mb-6">
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: hoveredCard === index ? 1 : 0.7,
                          x: hoveredCard === index ? 0 : -10
                        }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Demo Stats */}
                  <div className="glass-effect rounded-lg p-4 border border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      {feature.demo.type === 'neural' && (
                        <>
                          <div>
                            <div className="text-xl font-bold text-neon-blue">{feature.demo.nodes}</div>
                            <div className="text-xs text-gray-400">Neural Nodes</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-neon-purple">{feature.demo.connections}</div>
                            <div className="text-xs text-gray-400">Connections</div>
                          </div>
                        </>
                      )}
                      {feature.demo.type === 'speed' && (
                        <>
                          <div>
                            <div className="text-xl font-bold text-yellow-400">{(feature.demo as { requests?: number }).requests?.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Req/sec</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-orange-400">{(feature.demo as { latency?: string }).latency}</div>
                            <div className="text-xs text-gray-400">Latency</div>
                          </div>
                        </>
                      )}
                      {feature.demo.type === 'security' && (
                        <>
                          <div>
                            <div className="text-xl font-bold text-green-400">{feature.demo.encryption}</div>
                            <div className="text-xs text-gray-400">Encryption</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-emerald-400">{feature.demo.compliance}</div>
                            <div className="text-xs text-gray-400">Uptime</div>
                          </div>
                        </>
                      )}
                      {feature.demo.type === 'automation' && (
                        <>
                          <div>
                            <div className="text-xl font-bold text-purple-400">{(feature.demo as { tasks?: number }).tasks?.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">Tasks/day</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-pink-400">{(feature.demo as { efficiency?: string }).efficiency}</div>
                            <div className="text-xs text-gray-400">Efficiency</div>
                          </div>
                        </>
                      )}
                      {feature.demo.type === 'prediction' && (
                        <>
                          <div>
                            <div className="text-xl font-bold text-indigo-400">{feature.demo.accuracy}</div>
                            <div className="text-xs text-gray-400">Accuracy</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-purple-400">{feature.demo.timeframe}</div>
                            <div className="text-xs text-gray-400">Forecast</div>
                          </div>
                        </>
                      )}
                      {feature.demo.type === 'scale' && (
                        <>
                          <div>
                            <div className="text-xl font-bold text-teal-400">{feature.demo.capacity}</div>
                            <div className="text-xs text-gray-400">Capacity</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-blue-400">{feature.demo.regions}</div>
                            <div className="text-xs text-gray-400">Regions</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`} />
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-3xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Plus Many More Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8 mx-auto text-neon-blue group-hover:text-neon-purple transition-colors" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Experience the Future?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using our AI platform to transform their business
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" className="group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg">
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}