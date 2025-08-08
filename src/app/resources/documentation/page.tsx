'use client'

import { motion } from 'framer-motion'
import { Book, Code, FileText, Zap, ArrowRight, Search, Filter, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const categories = ['All', 'API Reference', 'Guides', 'Examples', 'SDKs', 'Tutorials']

const docSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Quick start guides and basic concepts',
    icon: Zap,
    items: [
      { title: 'Quick Start Guide', description: 'Get up and running in 5 minutes', type: 'guide' },
      { title: 'Authentication', description: 'API keys and security best practices', type: 'guide' },
      { title: 'Making Your First Request', description: 'Step-by-step API call tutorial', type: 'tutorial' },
      { title: 'Rate Limits & Quotas', description: 'Understanding API usage limits', type: 'reference' }
    ]
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    description: 'Complete API documentation and endpoints',
    icon: Code,
    items: [
      { title: 'Text Generation API', description: 'Generate human-like text with our LLMs', type: 'reference' },
      { title: 'Image Analysis API', description: 'Computer vision and image understanding', type: 'reference' },
      { title: 'Chat Completions', description: 'Build conversational AI applications', type: 'reference' },
      { title: 'Embeddings API', description: 'Vector representations for semantic search', type: 'reference' }
    ]
  },
  {
    id: 'sdks',
    title: 'SDKs & Libraries',
    description: 'Official SDKs for popular programming languages',
    icon: FileText,
    items: [
      { title: 'Python SDK', description: 'Official Python library with examples', type: 'sdk' },
      { title: 'JavaScript SDK', description: 'Node.js and browser-compatible library', type: 'sdk' },
      { title: 'Go SDK', description: 'Lightweight Go client library', type: 'sdk' },
      { title: 'REST API', description: 'Direct HTTP API integration guide', type: 'reference' }
    ]
  },
  {
    id: 'examples',
    title: 'Code Examples',
    description: 'Real-world examples and use cases',
    icon: Book,
    items: [
      { title: 'Chatbot Integration', description: 'Build a customer support chatbot', type: 'example' },
      { title: 'Content Generation', description: 'Automated blog post and article writing', type: 'example' },
      { title: 'Data Analysis', description: 'AI-powered data insights and reporting', type: 'example' },
      { title: 'Image Classification', description: 'Custom image recognition system', type: 'example' }
    ]
  }
]

const quickLinks = [
  { title: 'API Playground', description: 'Test API calls in your browser', href: '#', external: true },
  { title: 'Postman Collection', description: 'Ready-to-use API collection', href: '#', external: true },
  { title: 'Status Page', description: 'Real-time API status and uptime', href: '#', external: true },
  { title: 'Community Forum', description: 'Get help from developers like you', href: '#', external: true }
]

export default function DocumentationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

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
              API{' '}
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Everything you need to integrate AI into your applications. 
              Complete guides, API references, and code examples.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue/50 transition-colors text-white placeholder:text-gray-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.a
                key={link.title}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 border border-white/10 hover:border-neon-blue/30 transition-all duration-300 group block"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold group-hover:text-neon-blue transition-colors">
                    {link.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-neon-blue transition-colors" />
                </div>
                <p className="text-gray-400 text-sm">{link.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {docSections.map((section, sectionIndex) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{section.title}</h2>
                    <p className="text-gray-400">{section.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      className="glass-effect rounded-xl p-6 border border-white/10 hover:border-neon-blue/20 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold group-hover:text-neon-blue transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.type === 'guide' ? 'bg-neon-blue/20 text-neon-blue' :
                            item.type === 'tutorial' ? 'bg-neon-purple/20 text-neon-purple' :
                            item.type === 'reference' ? 'bg-neon-cyan/20 text-neon-cyan' :
                            item.type === 'sdk' ? 'bg-neon-pink/20 text-neon-pink' :
                            'bg-white/10 text-gray-400'
                          }`}>
                            {item.type}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-neon-blue group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                      <p className="text-gray-400">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">Quick Start Example</h2>
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-xl overflow-hidden border border-white/10">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-gray-400 text-sm">example.js</span>
                </div>
                <Button variant="secondary" size="sm">
                  Copy Code
                </Button>
              </div>
              <div className="p-6 bg-black/50 font-mono text-sm">
                <pre className="text-gray-300">
{`import { LuminatusAI } from '@luminatus/ai';

const client = new LuminatusAI({
  apiKey: process.env.LUMINATUS_API_KEY
});

async function generateText() {
  const response = await client.completions.create({
    model: 'luminatus-gpt-4',
    prompt: 'Write a creative story about AI',
    max_tokens: 500
  });
  
  console.log(response.data.text);
}

generateText();`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Help?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Our team is here to help you succeed. Get support through our community forum, 
            documentation, or direct contact with our technical team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Join Community
            </Button>
            <Button variant="secondary" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
