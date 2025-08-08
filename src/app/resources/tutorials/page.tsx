'use client'

import { motion } from 'framer-motion'
import { Play, BookOpen, Code, Users, Clock, Star, ArrowRight, Download } from 'lucide-react'
import Button from '@/components/ui/Button'

const tutorials = [
  {
    id: 'getting-started',
    title: 'Getting Started with Luminatus AI',
    description: 'Learn the basics of our AI platform in under 10 minutes',
    duration: '8 min',
    difficulty: 'Beginner',
    type: 'video',
    tags: ['API', 'Setup', 'Basics'],
    views: '12.5k'
  },
  {
    id: 'api-integration',
    title: 'API Integration Best Practices',
    description: 'Advanced techniques for integrating our AI models into your applications',
    duration: '15 min',
    difficulty: 'Intermediate',
    type: 'tutorial',
    tags: ['API', 'Integration', 'Best Practices'],
    views: '8.3k'
  },
  {
    id: 'custom-models',
    title: 'Building Custom AI Models',
    description: 'Step-by-step guide to training and deploying custom models',
    duration: '25 min',
    difficulty: 'Advanced',
    type: 'course',
    tags: ['Custom Models', 'Training', 'Deployment'],
    views: '5.7k'
  },
  {
    id: 'chatbot-development',
    title: 'Creating Intelligent Chatbots',
    description: 'Build conversational AI applications using our chat completion API',
    duration: '18 min',
    difficulty: 'Intermediate',
    type: 'tutorial',
    tags: ['Chatbots', 'Conversation AI', 'NLP'],
    views: '9.2k'
  },
  {
    id: 'image-analysis',
    title: 'Computer Vision Integration',
    description: 'Implement image recognition and analysis in your applications',
    duration: '12 min',
    difficulty: 'Intermediate',
    type: 'video',
    tags: ['Computer Vision', 'Image Analysis', 'ML'],
    views: '6.8k'
  },
  {
    id: 'embeddings-search',
    title: 'Semantic Search with Embeddings',
    description: 'Build powerful search functionality using AI embeddings',
    duration: '20 min',
    difficulty: 'Advanced',
    type: 'tutorial',
    tags: ['Embeddings', 'Search', 'Semantic'],
    views: '4.5k'
  }
]

const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'API', 'Custom Models', 'Computer Vision']

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Learn{' '}
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                AI Development
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Master AI integration with our comprehensive tutorials, guides, and hands-on examples. 
              From beginner basics to advanced implementations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 hover:border-neon-blue/30"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutorial */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-effect rounded-2xl p-8 border border-neon-blue/30 relative overflow-hidden"
          >
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Play className="w-5 h-5 text-neon-blue" />
                  <span className="text-neon-blue text-sm">Video Tutorial</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Getting Started with Luminatus AI</h2>
                <p className="text-gray-400 mb-6">
                  Learn the fundamentals of AI integration with our comprehensive getting started guide. 
                  Perfect for developers new to AI development.
                </p>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>8 minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>12.5k views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>Beginner</span>
                  </div>
                </div>
                
                <Button variant="primary" size="lg">
                  <Play className="w-5 h-5 mr-2" />
                  Start Tutorial
                </Button>
              </div>
              
              <div className="glass-effect rounded-xl p-6 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                <div className="h-64 bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 rounded-lg flex items-center justify-center">
                  <Play className="w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">All Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-neon-blue/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center relative">
                  {tutorial.type === 'video' && <Play className="w-12 h-12 text-white/80" />}
                  {tutorial.type === 'tutorial' && <BookOpen className="w-12 h-12 text-white/80" />}
                  {tutorial.type === 'course' && <Code className="w-12 h-12 text-white/80" />}
                  
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tutorial.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      tutorial.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 bg-black/50 rounded text-xs text-white">
                      {tutorial.duration}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-neon-blue transition-colors">
                    {tutorial.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tutorial.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      {tutorial.views} views
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-neon-blue group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">Recommended Learning Path</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                { step: 1, title: 'API Basics', description: 'Learn authentication and making your first API call' },
                { step: 2, title: 'Integration Patterns', description: 'Understand common integration patterns and best practices' },
                { step: 3, title: 'Advanced Features', description: 'Explore custom models, fine-tuning, and optimization' },
                { step: 4, title: 'Production Deployment', description: 'Scale your AI applications for production use' }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-6 glass-effect rounded-xl p-6 border border-white/10"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Start
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Download,
                title: 'Code Samples',
                description: 'Download working code examples for common use cases',
                action: 'Download'
              },
              {
                icon: BookOpen,
                title: 'Documentation',
                description: 'Comprehensive API reference and developer guides',
                action: 'Read Docs'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Join our developer community for support and discussions',
                action: 'Join Now'
              }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-effect rounded-xl p-8 border border-white/10 text-center hover:border-neon-blue/30 transition-all group"
              >
                <resource.icon className="w-12 h-12 text-neon-blue mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-gray-400 mb-6">{resource.description}</p>
                <Button variant="secondary" size="sm" className="group-hover:scale-105 transition-transform">
                  {resource.action}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
