'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Tag, Search, Filter } from 'lucide-react'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const categories = ['All', 'AI Research', 'Product Updates', 'Industry Insights', 'Company News', 'Tutorials']

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Large Language Models: What to Expect in 2025',
    excerpt: 'Exploring the latest advancements in LLMs and their implications for businesses and developers.',
    author: 'Dr. Sarah Chen',
    date: '2025-01-15',
    category: 'AI Research',
    readTime: '8 min read',
    image: '/api/placeholder/400/200',
    featured: true
  },
  {
    id: 2,
    title: 'Introducing Luminatus API v2.0: Enhanced Performance and New Features',
    excerpt: 'Our latest API update brings 40% faster response times and powerful new endpoints.',
    author: 'Marcus Rodriguez',
    date: '2025-01-10',
    category: 'Product Updates',
    readTime: '5 min read',
    image: '/api/placeholder/400/200',
    featured: false
  },
  {
    id: 3,
    title: 'Building Ethical AI: Our Approach to Responsible Development',
    excerpt: 'How we ensure our AI systems are fair, transparent, and beneficial for all users.',
    author: 'Dr. Amira Hassan',
    date: '2025-01-08',
    category: 'Company News',
    readTime: '6 min read',
    image: '/api/placeholder/400/200',
    featured: false
  },
  {
    id: 4,
    title: 'Getting Started with AI Integration: A Developer\'s Guide',
    excerpt: 'Step-by-step tutorial on integrating AI capabilities into your applications.',
    author: 'James Park',
    date: '2025-01-05',
    category: 'Tutorials',
    readTime: '12 min read',
    image: '/api/placeholder/400/200',
    featured: false
  },
  {
    id: 5,
    title: 'The Impact of AI on Small Businesses: Case Studies and Insights',
    excerpt: 'Real-world examples of how small businesses are leveraging AI to grow and compete.',
    author: 'Lisa Wong',
    date: '2025-01-03',
    category: 'Industry Insights',
    readTime: '7 min read',
    image: '/api/placeholder/400/200',
    featured: false
  },
  {
    id: 6,
    title: 'Multi-Modal AI: Understanding Images, Text, and Audio Together',
    excerpt: 'Exploring the latest developments in AI systems that can process multiple types of data.',
    author: 'Dr. Sarah Chen',
    date: '2024-12-28',
    category: 'AI Research',
    readTime: '10 min read',
    image: '/api/placeholder/400/200',
    featured: false
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

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
              AI{' '}
              <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Discover the latest trends, research, and insights from the world of artificial intelligence. 
              Stay ahead with expert analysis and practical guides.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue/50 transition-colors text-white placeholder:text-gray-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && !searchTerm && (
        <section className="py-12">
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
                    <Tag className="w-4 h-4 text-neon-blue" />
                    <span className="text-neon-blue text-sm">{featuredPost.category}</span>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-400 mb-6">{featuredPost.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString()}
                      </div>
                      <span>{featuredPost.readTime}</span>
                    </div>
                    
                    <Button variant="secondary" size="sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                
                <div className="glass-effect rounded-xl p-4 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                  <div className="h-48 bg-gradient-to-br from-neon-blue/40 to-neon-purple/40 rounded-lg flex items-center justify-center">
                    <span className="text-gray-300">Featured Article Image</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-effect rounded-xl overflow-hidden border border-white/10 hover:border-neon-blue/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                  <span className="text-gray-400">Article Image</span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-neon-blue" />
                    <span className="text-neon-blue text-sm">{post.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-neon-blue transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest AI insights, research updates, and industry trends.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue/50 transition-colors text-white placeholder:text-gray-500"
            />
            <Button variant="primary" size="md">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
