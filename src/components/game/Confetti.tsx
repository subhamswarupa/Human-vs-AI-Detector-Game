import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  scale: number
}

const colors = ['#F8BBD0', '#BBDEFB', '#C8E6C9', '#E1BEE7', '#FFF9C4', '#FFE0B2', '#81D4FA', '#CE93D8']

interface ConfettiProps {
  active: boolean
  duration?: number
}

export function Confetti({ active, duration = 2500 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!active) {
      setPieces([])
      return
    }

    const newPieces: ConfettiPiece[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: 0.5 + Math.random() * 0.8,
    }))

    setPieces(newPieces)

    const timer = setTimeout(() => setPieces([]), duration)
    return () => clearTimeout(timer)
  }, [active, duration])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map(piece => (
          <motion.div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${piece.x}%`,
              backgroundColor: piece.color,
              rotate: `${piece.rotation}deg`,
              scale: piece.scale,
            }}
            initial={{ top: -20, opacity: 1 }}
            animate={{ top: '100vh', opacity: 0, rotate: `${piece.rotation + 360}deg` }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5 + Math.random() * 1.5,
              ease: 'easeIn',
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
