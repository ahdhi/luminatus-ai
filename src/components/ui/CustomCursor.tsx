'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CursorState {
  variant: 'default' | 'button' | 'text' | 'link' | 'dragging' | 'loading'
  text?: string
  size: number
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
    size: 20
  })
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  // Smooth cursor movement with spring physics
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Handle different cursor states based on element interactions
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Button elements
      if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('cursor-button')) {
        setCursorState({
          variant: 'button',
          size: 50,
          text: target.getAttribute('data-cursor-text') || ''
        })
      }
      // Link elements
      else if (target.tagName === 'A' || target.closest('a') || target.classList.contains('cursor-link')) {
        setCursorState({
          variant: 'link',
          size: 40,
          text: '→'
        })
      }
      // Text/input elements
      else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.classList.contains('cursor-text')) {
        setCursorState({
          variant: 'text',
          size: 30
        })
      }
      // Draggable elements
      else if (target.draggable || target.classList.contains('cursor-drag')) {
        setCursorState({
          variant: 'dragging',
          size: 35,
          text: '✋'
        })
      }
      // Loading states
      else if (target.classList.contains('cursor-loading')) {
        setCursorState({
          variant: 'loading',
          size: 40
        })
      }
      // Default state
      else {
        setCursorState({
          variant: 'default',
          size: 20
        })
      }
    }

    // Click effects
    const handleClick = () => {
      setCursorState(prev => ({ ...prev, size: prev.size * 0.8 }))
      setTimeout(() => {
        setCursorState(prev => ({ ...prev, size: prev.size / 0.8 }))
      }, 150)
    }

    // Add event listeners
    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleElementHover)
    document.addEventListener('click', handleClick)

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleElementHover)
      document.removeEventListener('click', handleClick)
      document.body.style.cursor = 'auto'
    }
  }, [cursorX, cursorY])

  const getCursorVariants = () => {
    const baseVariants = {
      default: {
        scale: 1,
        backgroundColor: 'rgba(59, 130, 246, 0.9)', // neon-blue
        border: '2px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 15px rgba(59, 130, 246, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.2)',
      },
      button: {
        scale: 1.5,
        backgroundColor: 'rgba(236, 72, 153, 0.95)', // neon-pink
        border: '3px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 0 25px rgba(236, 72, 153, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)',
      },
      link: {
        scale: 1.3,
        backgroundColor: 'rgba(168, 85, 247, 0.95)', // neon-purple
        border: '2px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.2)',
      },
      text: {
        scale: 0.8,
        backgroundColor: 'rgba(34, 197, 94, 0.9)', // neon-green
        border: '1px solid rgba(255, 255, 255, 0.7)',
        borderRadius: '2px',
        boxShadow: '0 0 15px rgba(34, 197, 94, 0.7)',
      },
      dragging: {
        scale: 1.4,
        backgroundColor: 'rgba(251, 191, 36, 0.95)', // neon-yellow
        border: '3px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 0 30px rgba(251, 191, 36, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.3)',
      },
      loading: {
        scale: 1.2,
        backgroundColor: 'rgba(6, 182, 212, 0.9)', // neon-cyan
        border: '2px solid rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.2)',
      }
    }

    return baseVariants[cursorState.variant]
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[99999]">
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed rounded-full flex items-center justify-center text-white font-bold text-xs"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: cursorState.size,
          height: cursorState.size,
          x: -cursorState.size / 2,
          y: -cursorState.size / 2,
          zIndex: 99999,
        }}
        animate={getCursorVariants()}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        {cursorState.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="text-white font-semibold drop-shadow-lg"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>

      {/* Cursor trail/glow effect */}
      <motion.div
        className="fixed rounded-full opacity-20"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: cursorState.size * 2,
          height: cursorState.size * 2,
          x: -cursorState.size,
          y: -cursorState.size,
          background: `radial-gradient(circle, ${getCursorVariants().backgroundColor} 0%, transparent 70%)`,
          zIndex: 99998,
        }}
        animate={{
          scale: cursorState.variant === 'loading' ? [1, 1.5, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 1,
            repeat: cursorState.variant === 'loading' ? Infinity : 0,
            ease: 'easeInOut'
          }
        }}
      />

      {/* Particle effects for special states */}
      {(cursorState.variant === 'button' || cursorState.variant === 'dragging') && (
        <div className="fixed" style={{ zIndex: 99997 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-1 h-1 rounded-full"
              style={{
                left: cursorXSpring,
                top: cursorYSpring,
                backgroundColor: getCursorVariants().backgroundColor,
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 30],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 30],
                opacity: [0.8, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
