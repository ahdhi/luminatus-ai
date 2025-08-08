// src/components/animations/TextReveal.tsx

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function TextReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = ''
}: TextRevealProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  }

  // Handle React elements - if children contains JSX, just return it without letter animation
  if (typeof children !== 'string') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration, delay: delay }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  // For string children, split into characters for letter-by-letter animation
  const letters = children.split('')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
      style={{ perspective: '1000px' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block"
          style={{
            transformOrigin: 'center bottom',
            display: letter === ' ' ? 'inline' : 'inline-block',
            minWidth: letter === ' ' ? '0.25em' : 'auto',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  )
}