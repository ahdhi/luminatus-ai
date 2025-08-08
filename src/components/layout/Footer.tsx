// src/components/layout/Footer.tsx

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ArrowUpRight,
  Sparkles
} from 'lucide-react'

const footerLinks = {
  products: [
    { name: 'AI Models', href: '#' },
    { name: 'API Access', href: '#' },
    { name: 'Enterprise Solutions', href: '#' },
    { name: 'Research Lab', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press Kit', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Tutorials', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Support', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Compliance', href: '#' },
  ],
}

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="mb-6">
                <Link href="/" className="inline-flex items-center space-x-3 group">
                  {/* Custom Logo with Spinning Ring */}
                  <div className="relative w-10 h-10">
                    {/* Spinning outer ring */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink rounded-full group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" 
                         style={{ animation: 'spin 8s linear infinite' }} />
                    
                    {/* Inner container for logo */}
                    <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center overflow-hidden">
                      <img 
                        src="/Logo.png" 
                        alt="Luminatus AI Logo" 
                        className="w-6 h-6 object-contain filter brightness-110 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <span className="text-xl sm:text-2xl font-display font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                    LUMINATUS AI
                  </span>
                </Link>
              </div>
              
              <p className="text-gray-400 mb-6 max-w-sm">
                Where Intelligence Becomes Infinite. Pioneering the future of artificial intelligence 
                with cutting-edge solutions that transform possibilities into reality.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neon-blue" />
                  <a href="mailto:hello@luminatus.ai" className="hover:text-white transition-colors">
                    hello@luminatus.ai
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neon-blue" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neon-blue" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg glass-effect border border-white/10 flex items-center justify-center hover:border-neon-blue/50 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:col-span-3 gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="font-semibold text-white mb-4 capitalize">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-gray-400 hover:text-white text-sm flex items-center gap-1 group transition-colors"
                        >
                          {link.name}
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-neon-blue" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Get the latest AI insights and updates delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-neon-blue/50 transition-colors text-white placeholder:text-gray-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-medium hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© 2025 Luminatus AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}