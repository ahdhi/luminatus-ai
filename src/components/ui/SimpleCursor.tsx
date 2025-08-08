'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface CursorState {
  variant: 'default' | 'button' | 'text' | 'link' | 'dragging'
  text?: string
  scale: number
}

export default function SimpleCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
    scale: 1
  })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // High-performance mouse tracking with RAF
  const updatePosition = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    
    animationRef.current = requestAnimationFrame(() => {
      setPosition({ x, y })
      
      // Direct DOM manipulation for better performance
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isClicking ? 0.8 : cursorState.scale})`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${cursorState.scale * 0.7})`
      }
    })
  }, [cursorState.scale, isClicking])

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    
    // Button elements
    if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('cursor-button')) {
      setCursorState({
        variant: 'button',
        scale: 1.5,
        text: target.getAttribute('data-cursor-text') || '✨'
      })
    }
    // Link elements
    else if (target.tagName === 'A' || target.closest('a') || target.classList.contains('cursor-link')) {
      setCursorState({
        variant: 'link',
        scale: 1.3,
        text: '→'
      })
    }
    // Text/input elements
    else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.classList.contains('cursor-text')) {
      setCursorState({
        variant: 'text',
        scale: 1.2,
        text: '|'
      })
    }
    // Draggable elements
    else if (target.draggable || target.classList.contains('cursor-drag')) {
      setCursorState({
        variant: 'dragging',
        scale: 1.4,
        text: '✋'
      })
    }
    // Default state
    else {
      setCursorState({
        variant: 'default',
        scale: 1
      })
    }
  }, [])

  useEffect(() => {
    // Add event listeners with passive option for better performance
    document.addEventListener('mousemove', updatePosition, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseover', handleElementHover, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    // Hide default cursor
    document.body.style.cursor = 'none'
    document.documentElement.style.cursor = 'none'

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleElementHover)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'auto'
      document.documentElement.style.cursor = 'auto'
    }
  }, [updatePosition, handleMouseEnter, handleMouseLeave, handleElementHover, handleMouseDown, handleMouseUp])

  if (!isVisible) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 999999 }}>
      {/* Trail Effect */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          width: '24px',
          height: '24px',
          background: `radial-gradient(circle, ${getCursorColor(cursorState.variant)}40 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${cursorState.scale * 0.7})`,
          transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
      />

      {/* Main Cursor - Pointed Arrow */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '0',
          height: '0',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isClicking ? 0.8 : cursorState.scale})`,
          transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
          // Pointed cursor using CSS borders
          borderLeft: `12px solid ${getCursorColor(cursorState.variant)}`,
          borderTop: '8px solid transparent',
          borderBottom: '8px solid transparent',
          filter: `drop-shadow(0 0 8px ${getCursorColor(cursorState.variant)}80) drop-shadow(0 0 4px white)`,
        }}
      />

      {/* Text/Emoji Display */}
      {cursorState.text && (
        <div
          style={{
            position: 'fixed',
            transform: `translate3d(${position.x + 20}px, ${position.y - 15}px, 0)`,
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,1)',
            pointerEvents: 'none',
            zIndex: 999999,
            transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        >
          {cursorState.text}
        </div>
      )}

      {/* Glow Effect for Special States */}
      {(cursorState.variant === 'button' || cursorState.variant === 'dragging') && (
        <div
          style={{
            position: 'fixed',
            width: '40px',
            height: '40px',
            background: `radial-gradient(circle, ${getCursorColor(cursorState.variant)}30 0%, transparent 70%)`,
            borderRadius: '50%',
            transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
            animation: 'pulse 1.5s ease-in-out infinite',
            willChange: 'transform',
          }}
        />
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(1.2); }
        }
      `}</style>
    </div>
  )
}

// Optimized color function
function getCursorColor(variant: string): string {
  switch (variant) {
    case 'button': return '#ec4899' // pink
    case 'link': return '#a855f7'   // purple
    case 'text': return '#22c55e'   // green
    case 'dragging': return '#fbbf24' // yellow
    default: return '#3b82f6'       // blue
  }
}
