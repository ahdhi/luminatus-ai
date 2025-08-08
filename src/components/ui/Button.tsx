import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-medium transition-all duration-300',
          'before:absolute before:inset-0 before:rounded-lg before:transition-all',
          {
            'primary': 'text-white bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]',
            'secondary': 'text-white border border-neon-blue/50 hover:bg-neon-blue/10',
            'ghost': 'text-gray-400 hover:text-white',
          }[variant],
          {
            'sm': 'px-4 py-2 text-sm',
            'md': 'px-6 py-3 text-base',
            'lg': 'px-8 py-4 text-lg',
          }[size],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button