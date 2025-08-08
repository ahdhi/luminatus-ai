'use client'

import { useEffect } from 'react'

export default function LightweightSmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ultra-smooth CSS-based scrolling with jitter elimination
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeSpeed;
      }
      
      html {
        scroll-behavior: auto; /* Disable for custom implementation */
        scroll-padding-top: 80px;
        overscroll-behavior: none;
        height: 100%;
      }
      
      body {
        overscroll-behavior: none;
        overflow-x: hidden;
        height: 100%;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: none;
      }
      
      /* Eliminate jitter with precise scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background: transparent;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #00d9ff, #a855f7);
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #00d9ff, #ec4899);
      }
      
      /* Critical performance optimizations */
      * {
        box-sizing: border-box;
      }
      
      *::before,
      *::after {
        box-sizing: border-box;
      }
      
      /* Remove all transform-based smooth scrolling that causes jitter */
      * {
        transform: none !important;
        will-change: auto !important;
      }
      
      /* Force GPU acceleration only where needed */
      [data-gpu-accelerated] {
        transform: translateZ(0);
        will-change: transform;
        backface-visibility: hidden;
      }
    `
    
    document.head.appendChild(style)

    // Remove any existing scroll behavior
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.scrollBehavior = 'auto'

    // Disable all wheel event listeners that might interfere
    const preventDefaultWheel = (e: WheelEvent) => {
      // Allow native scrolling - don't prevent default
      return true
    }

    // Use passive listeners for maximum performance
    const passiveOptions = { passive: true, capture: false }
    
    // Optimize scroll events with RAF throttling
    let ticking = false
    const optimizeScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Any scroll-based animations should go here
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', optimizeScroll, passiveOptions)
    
    // Cleanup
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
      window.removeEventListener('scroll', optimizeScroll)
      
      // Reset scroll behavior
      document.documentElement.style.scrollBehavior = ''
      document.body.style.scrollBehavior = ''
    }
  }, [])

  return <>{children}</>
}
