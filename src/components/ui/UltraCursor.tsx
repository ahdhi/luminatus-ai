'use client'

import { useEffect, useRef, useCallback } from 'react'

export default function UltraCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const isHoveringInteractive = useRef(false)
  const currentText = useRef('')

  const updateCursor = useCallback((e: MouseEvent) => {
    const x = e.clientX
    const y = e.clientY
    
    // Ultra-fast direct style manipulation
    if (cursorRef.current) {
      cursorRef.current.style.left = x + 'px'
      cursorRef.current.style.top = y + 'px'
    }
    if (glowRef.current) {
      glowRef.current.style.left = (x - 12) + 'px'
      glowRef.current.style.top = (y - 12) + 'px'
    }
    if (textRef.current && currentText.current) {
      textRef.current.style.left = (x + 20) + 'px'
      textRef.current.style.top = (y - 15) + 'px'
    }
  }, [])

  const handleHover = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const isInteractive = !!(target.tagName === 'BUTTON' || 
                           target.closest('button') || 
                           target.classList.contains('cursor-button') ||
                           target.tagName === 'A' ||
                           target.closest('a') ||
                           target.classList.contains('cursor-link') ||
                           target.tagName === 'INPUT' ||
                           target.tagName === 'TEXTAREA' ||
                           target.classList.contains('cursor-text') ||
                           target.role === 'button' ||
                           target.onclick ||
                           target.style.cursor === 'pointer')

    if (isInteractive !== isHoveringInteractive.current) {
      isHoveringInteractive.current = isInteractive
      
      if (cursorRef.current && glowRef.current) {
        if (isInteractive) {
          cursorRef.current.className = 'ultra-cursor interactive'
          glowRef.current.className = 'cursor-glow interactive'
          currentText.current = target.getAttribute('data-cursor-text') || 
                               (target.tagName === 'A' ? '→' : 
                                target.tagName === 'BUTTON' ? '✨' : 
                                target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ? '|' : '✨')
          if (textRef.current) {
            textRef.current.textContent = currentText.current
            textRef.current.style.display = 'block'
          }
        } else {
          cursorRef.current.className = 'ultra-cursor'
          glowRef.current.className = 'cursor-glow'
          currentText.current = ''
          if (textRef.current) {
            textRef.current.style.display = 'none'
          }
        }
      }
    }
  }, [])

  const handleClick = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = 'scale(0.8)'
      setTimeout(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(1)'
        }
      }, 100)
    }
  }, [])

  useEffect(() => {
    // Force cursor visibility throughout the viewport
    const forceCursorVisibility = () => {
      if (cursorRef.current && glowRef.current) {
        cursorRef.current.style.display = 'block'
        cursorRef.current.style.opacity = '1'
        cursorRef.current.style.visibility = 'visible'
        glowRef.current.style.display = 'block'
        glowRef.current.style.opacity = '1'
        glowRef.current.style.visibility = 'visible'
      }
    }

    // Show cursor initially
    forceCursorVisibility()

    const handleMouseEnter = () => {
      forceCursorVisibility()
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) cursorRef.current.style.display = 'none'
      if (glowRef.current) glowRef.current.style.display = 'none'
    }

    // Enhanced mouse move with bounds checking
    const enhancedUpdateCursor = (e: MouseEvent) => {
      updateCursor(e)
      forceCursorVisibility()
      
      // Ensure cursor stays visible across all sections
      if (cursorRef.current) {
        const isInBounds = e.clientX >= 0 && e.clientX <= window.innerWidth && 
                          e.clientY >= 0 && e.clientY <= window.innerHeight
        
        if (isInBounds) {
          cursorRef.current.style.display = 'block'
          glowRef.current!.style.display = 'block'
        }
      }
    }

    // Global event listeners
    document.addEventListener('mousemove', enhancedUpdateCursor, { passive: true })
    document.addEventListener('mouseover', handleHover, { passive: true })
    document.addEventListener('click', handleClick, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // Comprehensive cursor hiding
    const hideSystemCursor = () => {
      document.body.style.cursor = 'none'
      document.documentElement.style.cursor = 'none'
      
      // Also hide cursor on all existing elements
      const allElements = document.querySelectorAll('*')
      allElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'none'
      })
    }

    hideSystemCursor()

    // Enhanced global style for cursor hiding
    const style = document.createElement('style')
    style.id = 'ultra-cursor-global-hide'
    style.textContent = `
      *, *::before, *::after { 
        cursor: none !important; 
      }
      
      html, body {
        cursor: none !important;
      }
      
      /* All interactive elements */
      a, button, input, textarea, select, label, [role="button"], [onclick], 
      .cursor-pointer, [data-cursor], nav, header, footer, section, article, 
      aside, div, span, p, h1, h2, h3, h4, h5, h6, ul, ol, li, table, tr, td, th,
      img, svg, canvas, video, audio, form, fieldset, legend {
        cursor: none !important;
      }
      
      /* Hover states */
      :hover, :focus, :active {
        cursor: none !important;
      }
      
      /* System areas - prevent taskbar cursor interference */
      :root { cursor: none !important; }
      :host { cursor: none !important; }
      body:hover { cursor: none !important; }
      html:hover { cursor: none !important; }
    `
    
    if (!document.getElementById('ultra-cursor-global-hide')) {
      document.head.appendChild(style)
    }

    // Enhanced observer for dynamic elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement
            element.style.cursor = 'none'
            // Also hide cursor on all children
            const children = element.querySelectorAll('*')
            children.forEach(child => {
              (child as HTMLElement).style.cursor = 'none'
            })
          }
        })
      })
      
      // Re-apply cursor hiding after DOM changes
      hideSystemCursor()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    })

    // Periodic visibility enforcement to combat system interference
    const visibilityInterval = setInterval(() => {
      forceCursorVisibility()
      hideSystemCursor()
    }, 50) // More frequent checks

    // Handle window focus/blur to maintain cursor state
    const handleFocus = () => {
      setTimeout(() => {
        hideSystemCursor()
        forceCursorVisibility()
      }, 10)
    }

    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleFocus)

    return () => {
      document.removeEventListener('mousemove', enhancedUpdateCursor)
      document.removeEventListener('mouseover', handleHover)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleFocus)
      observer.disconnect()
      clearInterval(visibilityInterval)
      
      // Restore cursor
      document.body.style.cursor = 'auto'
      document.documentElement.style.cursor = 'auto'
      
      const styleEl = document.getElementById('ultra-cursor-global-hide')
      if (styleEl) {
        document.head.removeChild(styleEl)
      }
    }
  }, [updateCursor, handleHover, handleClick])

  return (
    <>
      <style jsx global>{`
        .ultra-cursor {
          position: fixed;
          width: 0;
          height: 0;
          border-left: 16px solid #3b82f6;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
          pointer-events: none;
          z-index: 2147483647; /* Maximum z-index */
          filter: drop-shadow(0 0 10px #3b82f6) drop-shadow(0 0 4px white) drop-shadow(0 0 2px rgba(0,0,0,0.8));
          transition: transform 0.1s ease-out, border-left-color 0.2s ease;
          will-change: transform;
          display: block;
          transform-origin: 0 50%;
        }
        
        .ultra-cursor.interactive {
          border-left-color: #ec4899;
          filter: drop-shadow(0 0 15px #ec4899) drop-shadow(0 0 6px white) drop-shadow(0 0 3px rgba(0,0,0,0.8));
          transform: scale(1.3);
        }
        
        .cursor-glow {
          position: fixed;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle, #3b82f650 0%, #3b82f620 50%, transparent 100%);
          pointer-events: none;
          z-index: 2147483646;
          transition: background 0.2s ease, opacity 0.2s ease;
          will-change: transform;
          display: block;
          opacity: 0.7;
        }
        
        .cursor-glow.interactive {
          background: radial-gradient(circle, #ec489950 0%, #ec489920 50%, transparent 100%);
          opacity: 0.9;
        }
        
        .cursor-text {
          position: fixed;
          color: white;
          font-size: 16px;
          font-weight: bold;
          text-shadow: 
            0 0 10px rgba(0,0,0,0.9),
            0 0 5px rgba(0,0,0,1),
            1px 1px 2px rgba(0,0,0,0.8);
          pointer-events: none;
          z-index: 2147483647;
          display: none;
          will-change: transform;
          background: rgba(0,0,0,0.3);
          padding: 2px 6px;
          border-radius: 4px;
          backdrop-filter: blur(4px);
        }
        
        /* Ensure cursor visibility everywhere */
        @media (min-width: 1px) {
          .ultra-cursor, .cursor-glow, .cursor-text {
            visibility: visible !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <div ref={glowRef} className="cursor-glow" />
      <div ref={cursorRef} className="ultra-cursor" />
      <div ref={textRef} className="cursor-text" />
    </>
  )
}
