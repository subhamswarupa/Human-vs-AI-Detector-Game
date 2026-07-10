import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  animate?: boolean
  delay?: number
  glass?: boolean
  onClick?: () => void
  role?: string
  'aria-label'?: string
}

export function Card({ children, className, animate = true, delay = 0, glass = true, onClick, ...aria }: CardProps) {
  const Comp = animate ? motion.div : 'div'

  return (
    <Comp
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      onClick={onClick}
      className={cn(
        'rounded-3xl p-6',
        glass && 'glass',
        onClick && 'cursor-pointer hover:scale-[1.02] transition-transform duration-200',
        className
      )}
      {...aria}
    >
      {children}
    </Comp>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mt-4 flex items-center gap-3', className)}>{children}</div>
}
