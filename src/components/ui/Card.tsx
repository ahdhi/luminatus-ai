// src/components/ui/Card.tsx

'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export default function Card({ 
  children, 
  className,
  onClick,
  hover = true
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative glass-effect rounded-2xl p-6 border border-white/10',
        hover && 'hover:border-neon-blue/30 transition-all duration-300',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}