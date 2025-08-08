'use client'

import { useEffect, useRef, useState } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
  speed?: number
  smoothness?: number
}

export default function OptimizedSmoothScroll({ 
  children, 
  speed = 1.2, 
  smoothness = 0.1 
}: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [targetScrollY, setTargetScrollY] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    
    if (!container || !content) return

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    // Set initial height
    const updateHeight = () => {
      if (content) {
        document.body.style.height = `${content.scrollHeight}px`
      }
    }

    // Optimized scroll handler with throttling
    const handleScroll = () => {
      isScrolling = true
      setTargetScrollY(window.scrollY)
      
      // Clear existing timeout
      clearTimeout(scrollTimeout)
      
      // Set a timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 100)
    }

    // Smooth animation loop
    const animate = () => {
      setScrollY(prev => {
        const diff = targetScrollY - prev
        const newY = prev + diff * smoothness
        
        // Apply transform with hardware acceleration
        if (content) {
          content.style.transform = `translate3d(0, ${-newY}px, 0)`
        }
        
        return Math.abs(diff) < 0.1 ? targetScrollY : newY
      })
      
      rafRef.current = requestAnimationFrame(animate)
    }

    // Optimized wheel handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY * speed
      setTargetScrollY(prev => {
        const maxScroll = document.body.scrollHeight - window.innerHeight
        return Math.max(0, Math.min(maxScroll, prev + delta))
      })
    }

    // Touch handling for mobile
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const touchY = e.touches[0].clientY
      const delta = (touchStartY - touchY) * speed * 2
      setTargetScrollY(prev => {
        const maxScroll = document.body.scrollHeight - window.innerHeight
        return Math.max(0, Math.min(maxScroll, prev + delta))
      })
      touchStartY = touchY
    }

    // Initialize
    updateHeight()
    animate()

    // Event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('resize', updateHeight)

    // ResizeObserver for dynamic content
    const resizeObserver = new ResizeObserver(updateHeight)
    if (content) {
      resizeObserver.observe(content)
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      clearTimeout(scrollTimeout)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', updateHeight)
      resizeObserver.disconnect()
      
      // Reset styles
      document.body.style.height = 'auto'
    }
  }, [speed, smoothness, targetScrollY])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={contentRef}
        className="will-change-transform"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          minHeight: '100vh',
          transform: 'translate3d(0, 0, 0)', // Enable hardware acceleration
          backfaceVisibility: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}
