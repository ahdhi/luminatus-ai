// src/components/ui/GlowingText.tsx

'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface GlowingTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export default function GlowingText({ 
  children, 
  className,
  delay = 0,
  duration = 0.8 
}: GlowingTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
      }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={cn(
        'relative inline-block',
        className
      )}
    >
      {/* Background glow */}
      <span
        className="absolute inset-0 animate-pulse blur-2xl opacity-50"
        style={{
          background: 'linear-gradient(90deg, #00d9ff, #a855f7, #ec4899)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {children}
      </span>

      {/* Main text with gradient */}
      <span 
        className="relative z-10 animate-gradient bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent"
        style={{
          backgroundSize: '200% 200%',
          filter: 'drop-shadow(0 0 30px rgba(0, 217, 255, 0.5))',
        }}
      >
        {children}
      </span>

      {/* Additional glow layers */}
      <motion.span
        className="absolute inset-0 z-0"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </motion.span>
  )
}