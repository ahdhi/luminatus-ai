'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AITextRevealProps {
  text: string
  className?: string
  delay?: number
}

export default function AITextReveal({ text, className = '', delay = 0 }: AITextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.5, margin: "-100px" })

  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  }

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -90,
      scale: 0.9,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 150,
        duration: 0.4,
      },
    },
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Holographic Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: delay }}
        className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 blur-3xl"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-blue rounded-full"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: [0, 1, 0.5, 0],
              scale: [0, 1, 0.5, 0],
              y: [0, -30, -60, -100],
            } : {}}
            transition={{
              duration: 2,
              delay: delay + 0.2 + (i * 0.1),
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Neural Network Lines */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.1 }}
      >
        <motion.path
          d="M 0,50 Q 50,20 100,50 T 200,50"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Main Text Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 text-center"
        style={{ perspective: '1000px' }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-4 relative"
            style={{ transformOrigin: 'center bottom' }}
          >
            {/* Glow effect behind each word */}
            <motion.span
              className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink blur-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              transition={{ delay: delay + 0.1 + index * 0.1 }}
              aria-hidden="true"
            >
              {word}
            </motion.span>

            {/* Main word */}
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              {word}
            </span>

            {/* Word reveal particle burst */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: [0, 2, 0] } : {}}
              transition={{ 
                duration: 0.6,
                delay: delay + 0.1 + index * 0.1,
                ease: "easeOut"
              }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-blue rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, (Math.cos(i * 60 * Math.PI / 180) * 50)],
                    y: [0, (Math.sin(i * 60 * Math.PI / 180) * 50)],
                    opacity: [1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: delay + 0.1 + index * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.span>
        ))}
      </motion.div>

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay }}
      >
        <motion.div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          style={{ top: '50%' }}
          initial={{ x: '-100%' }}
          animate={isInView ? { x: '100%' } : {}}
          transition={{
            duration: 1.5,
            delay: delay + 0.2,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  )
}
