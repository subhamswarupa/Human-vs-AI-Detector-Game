import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  label?: string
}

export function ProgressBar({ value, max = 100, className, barClassName, showLabel = false, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-semibold text-gray-600">{label}</span>}
          {showLabel && <span className="text-sm font-bold text-gray-700">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-3 bg-white/50 rounded-full overflow-hidden border border-white/30 shadow-inner">
        <motion.div
          className={cn('h-full rounded-full bg-gradient-to-r from-pastel-blue-dark to-pastel-purple-dark', barClassName)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
