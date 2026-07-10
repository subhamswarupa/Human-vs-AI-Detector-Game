import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

interface AnimatedNumberProps {
  value: number
  className?: string
  suffix?: string
  prefix?: string
  decimals?: number
}

export function AnimatedNumber({ value, className, suffix = '', prefix = '', decimals = 0 }: AnimatedNumberProps) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 20, stiffness: 100 })
  const display = useTransform(spring, current => `${prefix}${current.toFixed(decimals)}${suffix}`)

  useEffect(() => {
    motionValue.set(value)
  }, [value, motionValue])

  return <motion.span className={className}>{display}</motion.span>
}
