'use client'

import { useEffect } from 'react'

export default function UltraSmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply critical performance fixes
    const rootStyle = document.createElement('style')
    rootStyle.textContent = `
      /* Critical jitter elimination */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: auto !important;
        overscroll-behavior: none;
        scroll-snap-type: none;
        height: 100%;
        -webkit-text-size-adjust: 100%;
      }

      body {
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: none;
        height: 100%;
        overflow-x: hidden;
      }

      /* Disable all transforms that cause jitter */
      * {
        will-change: auto !important;
        transform: none !important;
        backface-visibility: visible !important;
        perspective: none !important;
      }

      /* Ultra-smooth scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
        background: transparent;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #00d9ff, #a855f7);
        border-radius: 3px;
      }

      /* Force immediate rendering */
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeSpeed;
      }

      /* Eliminate layout thrashing */
      img, video, iframe, canvas {
        max-width: 100%;
        height: auto;
        display: block;
      }

      /* Only GPU acceleration for specific elements */
      [data-scroll-element] {
        transform: translateZ(0);
        will-change: transform;
      }
    `
    
    document.head.appendChild(rootStyle)

    // Ultra-light scroll optimization
    let rafId: number
    let lastScrollTop = 0
    
    const optimizeRender = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // Only update if scroll position actually changed
      if (scrollTop !== lastScrollTop) {
        lastScrollTop = scrollTop
        
        // Add any scroll-based updates here (very minimal)
        document.documentElement.style.setProperty('--scroll-y', `${scrollTop}px`)
      }
      
      rafId = requestAnimationFrame(optimizeRender)
    }

    // Start the optimization loop
    rafId = requestAnimationFrame(optimizeRender)

    // Prevent any scroll event interference
    const preventScrollJitter = (e: Event) => {
      e.stopPropagation()
    }

    // Use minimal event handling
    window.addEventListener('scroll', preventScrollJitter, { 
      passive: true, 
      capture: true 
    })

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', preventScrollJitter, true)
      
      if (document.head.contains(rootStyle)) {
        document.head.removeChild(rootStyle)
      }
    }
  }, [])

  return <div data-scroll-root>{children}</div>
}
