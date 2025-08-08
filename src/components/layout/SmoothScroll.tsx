'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 for faster response
      easing: (t) => 1 - Math.pow(1 - t, 3), // Smoother, more responsive easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for more responsive scrolling
      touchMultiplier: 1.5, // Reduced from 2 for better touch control
      infinite: false,
      syncTouch: true, // Better touch synchronization
      syncTouchLerp: 0.1, // Smoother touch interpolation
      touchInertiaMultiplier: 20, // Better touch momentum
    })

    lenisRef.current = lenis

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Add resize listener for better responsiveness
    const handleResize = () => {
      lenis.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}