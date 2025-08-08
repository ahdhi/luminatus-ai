'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface CursorState {
  variant: 'default' | 'button' | 'text' | 'link' | 'dragging'
  text?: string
}

export default function PerformanceCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default'
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // High-performance mouse tracking
  const updatePosition = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY
    
    // Direct DOM manipulation for maximum performance
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) ${isClicking ? 'scale(0.8)' : 'scale(1)'}`
    }
    if (trailRef.current) {
      trailRef.current.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`
    }
    if (textRef.current) {
      textRef.current.style.transform = `translate3d(${x + 20}px, ${y - 15}px, 0)`
    }
  }, [isClicking])

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseDown = useCallback(() => setIsClicking(true), [])
  const handleMouseUp = useCallback(() => setIsClicking(false), [])

  const handleElementHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    
    if (target.tagName === 'BUTTON' || target.closest('button') || target.classList.contains('cursor-button')) {
      setCursorState({
        variant: 'button',
        text: target.getAttribute('data-cursor-text') || '✨'
      })
    } else if (target.tagName === 'A' || target.closest('a') || target.classList.contains('cursor-link')) {
      setCursorState({
        variant: 'link',
        text: '→'
      })
    } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.classList.contains('cursor-text')) {
      setCursorState({
        variant: 'text',
        text: '|'
      })
    } else if (target.draggable || target.classList.contains('cursor-drag')) {
      setCursorState({
        variant: 'dragging',
        text: '✋'
      })
    } else {
      setCursorState({
        variant: 'default'
      })
    }
  }, [])

  useEffect(() => {
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
    <>
      <style jsx>{`
        .cursor-pointer {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 999999;
          will-change: transform;
        }
        
        .cursor-main {
          width: 0;
          height: 0;
          border-left: 12px solid var(--cursor-color);
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          filter: drop-shadow(0 0 8px var(--cursor-color)) drop-shadow(0 0 4px white);
          transition: transform 0.1s ease-out;
        }
        
        .cursor-trail {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--cursor-color-fade) 0%, transparent 70%);
          transition: transform 0.15s ease-out;
        }
        
        .cursor-text {
          color: white;
          font-size: 14px;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,1);
          transition: transform 0.1s ease-out;
        }
        
        .cursor-button {
          --cursor-color: #ec4899;
          --cursor-color-fade: #ec489940;
        }
        
        .cursor-link {
          --cursor-color: #a855f7;
          --cursor-color-fade: #a855f740;
        }
        
        .cursor-text-mode {
          --cursor-color: #22c55e;
          --cursor-color-fade: #22c55e40;
        }
        
        .cursor-dragging {
          --cursor-color: #fbbf24;
          --cursor-color-fade: #fbbf2440;
        }
        
        .cursor-default {
          --cursor-color: #3b82f6;
          --cursor-color-fade: #3b82f640;
        }
      `}</style>

      {/* Trail Effect */}
      <div
        ref={trailRef}
        className={`cursor-pointer cursor-trail cursor-${cursorState.variant === 'text' ? 'text-mode' : cursorState.variant}`}
      />

      {/* Main Cursor - Pointed Arrow */}
      <div
        ref={cursorRef}
        className={`cursor-pointer cursor-main cursor-${cursorState.variant === 'text' ? 'text-mode' : cursorState.variant}`}
      />

      {/* Text/Emoji Display */}
      {cursorState.text && (
        <div
          ref={textRef}
          className="cursor-pointer cursor-text"
        >
          {cursorState.text}
        </div>
      )}
    </>
  )
}
