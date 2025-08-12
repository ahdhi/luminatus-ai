// src/components/animations/FadeIn.tsx

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
  once?: boolean
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  direction = 'up',
  className = '',
  once = true,
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    amount: 0.1, 
    margin: "150px 0px -50px 0px" 
  })

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  const { x, y } = directions[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        x, 
        y,
        filter: 'blur(10px)',
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: 'blur(0px)',
      } : {}}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}