'use client'

import { useState, useEffect } from 'react'

interface WindowSize {
  width: number | undefined
  height: number | undefined
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export default function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}