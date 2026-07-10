import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

const variants = {
  primary: 'bg-gradient-to-r from-pastel-blue-dark to-pastel-purple-dark text-white shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300',
  secondary: 'bg-white/80 backdrop-blur-sm border border-pastel-blue-dark/30 text-gray-700 shadow-lg hover:bg-white/90 hover:shadow-xl',
  ghost: 'bg-transparent text-gray-600 hover:bg-white/50 hover:text-gray-900',
  danger: 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg shadow-red-200 hover:shadow-xl',
  success: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-200 hover:shadow-xl',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, disabled, onClick, type, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pastel-blue-dark',
            variants[variant],
            sizes[size],
            disabled ? 'opacity-50 cursor-not-allowed' : '',
            className
          )}
          onClick={onClick}
          {...props as any}
        >
          {children}
        </Slot>
      )
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.03 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-2xl font-bold transition-all duration-200 cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pastel-blue-dark',
          variants[variant],
          sizes[size],
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          className
        )}
        disabled={disabled}
        onClick={onClick}
        type={type ?? 'button'}
        {...props as any}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
