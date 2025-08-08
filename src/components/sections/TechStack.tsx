// src/components/sections/TechStack.tsx

'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Brain, 
  Database, 
  Cloud, 
  Code, 
  Cpu, 
  Network,
  Shield,
  Zap,
  Bot,
  GitBranch
} from 'lucide-react'
import FadeIn from '@/components/animations/FadeIn'
import Card from '@/components/ui/Card'

const techCategories = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    technologies: [
      { name: 'TensorFlow', logo: '🧠', description: 'Deep learning framework' },
      { name: 'PyTorch', logo: '🔥', description: 'Neural network library' },
      { name: 'OpenAI GPT', logo: '🤖', description: 'Large language models' },
      { name: 'Hugging Face', logo: '🤗', description: 'Transformer models' },
      { name: 'LangChain', logo: '⛓️', description: 'LLM applications' },
      { name: 'Vector DBs', logo: '🗃️', description: 'Semantic search' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: Database,
    color: 'from-purple-500 to-pink-500',
    technologies: [
      { name: 'Node.js', logo: '🟢', description: 'Runtime environment' },
      { name: 'Python', logo: '🐍', description: 'Programming language' },
      { name: 'FastAPI', logo: '⚡', description: 'Modern web framework' },
      { name: 'GraphQL', logo: '📊', description: 'Query language' },
      { name: 'REST APIs', logo: '🔗', description: 'Web services' },
      { name: 'WebSockets', logo: '🔌', description: 'Real-time communication' }
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    color: 'from-green-500 to-teal-500',
    technologies: [
      { name: 'AWS', logo: '☁️', description: 'Cloud platform' },
      { name: 'Google Cloud', logo: '🌤️', description: 'AI/ML services' },
      { name: 'Docker', logo: '🐳', description: 'Containerization' },
      { name: 'Kubernetes', logo: '⚙️', description: 'Orchestration' },
      { name: 'Terraform', logo: '🏗️', description: 'Infrastructure as code' },
      { name: 'GitHub Actions', logo: '🚀', description: 'CI/CD pipeline' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    icon: Code,
    color: 'from-orange-500 to-red-500',
    technologies: [
      { name: 'React', logo: '⚛️', description: 'UI library' },
      { name: 'Next.js', logo: '▲', description: 'Full-stack framework' },
      { name: 'TypeScript', logo: '📘', description: 'Type-safe JavaScript' },
      { name: 'Tailwind CSS', logo: '🎨', description: 'Utility-first CSS' },
      { name: 'Three.js', logo: '🎮', description: '3D graphics' },
      { name: 'Framer Motion', logo: '🎭', description: 'Animation library' }
    ]
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    icon: Network,
    color: 'from-indigo-500 to-purple-500',
    technologies: [
      { name: 'PostgreSQL', logo: '🐘', description: 'Relational database' },
      { name: 'MongoDB', logo: '🍃', description: 'Document database' },
      { name: 'Redis', logo: '🔴', description: 'In-memory cache' },
      { name: 'Apache Kafka', logo: '📡', description: 'Event streaming' },
      { name: 'Elasticsearch', logo: '🔍', description: 'Search engine' },
      { name: 'Grafana', logo: '📈', description: 'Data visualization' }
    ]
  },
  {
    id: 'security',
    title: 'Security & DevOps',
    icon: Shield,
    color: 'from-cyan-500 to-blue-500',
    technologies: [
      { name: 'OAuth 2.0', logo: '🔐', description: 'Authentication' },
      { name: 'JWT', logo: '🎫', description: 'Token-based auth' },
      { name: 'SSL/TLS', logo: '🛡️', description: 'Encryption' },
      { name: 'Nginx', logo: '🌐', description: 'Web server' },
      { name: 'Monitoring', logo: '👁️', description: 'System observability' },
      { name: 'Load Balancing', logo: '⚖️', description: 'Traffic distribution' }
    ]
  }
]

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('ai-ml')

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
    <section id="tech" className="py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      <div className="absolute inset-0 grid-pattern opacity-5" />

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
              <Cpu className="w-4 h-4 text-neon-blue" />
              <span className="text-sm text-gray-300">Cutting-Edge Technology</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-white">Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                Tech Stack
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powered by the most advanced technologies in AI, cloud computing, and modern development
            </p>
          </div>
        </FadeIn>

        {/* Category Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {techCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'glass-effect border border-neon-blue/50 text-white'
                    : 'glass-effect border border-white/10 text-gray-400 hover:border-neon-blue/30 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-5 h-5" />
                <span className="font-medium">{category.title}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Technologies Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techCategories
            .find(cat => cat.id === activeCategory)
            ?.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="group hover:border-neon-blue/30 transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{tech.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </Card>
              </motion.div>
            ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { icon: Brain, label: 'AI Models', value: '50+', color: 'text-blue-400' },
            { icon: Zap, label: 'APIs', value: '100+', color: 'text-purple-400' },
            { icon: Bot, label: 'Automations', value: '1000+', color: 'text-green-400' },
            { icon: GitBranch, label: 'Deployments', value: '24/7', color: 'text-orange-400' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="glass-effect rounded-2xl p-6 border border-white/10 hover:border-neon-blue/30 transition-all duration-300 text-center group"
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}