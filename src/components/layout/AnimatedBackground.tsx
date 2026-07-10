import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { getSettings } from '@/utils/storage'

interface Cloud {
  id: number
  x: number
  y: number
  size: number
  speed: number
  delay: number
  opacity: number
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

interface Hill {
  id: number
  level: number
  color: string
  width: number
  height: number
}

const starColors = ['#FFF9C4', '#FFF176', '#FFD54F', '#FFE082']
const particleColors = ['#F8BBD0', '#BBDEFB', '#C8E6C9', '#E1BEE7', '#FFF9C4', '#FFE0B2']

const hills = [
  { id: 1, level: 0, color: 'rgba(200, 230, 201, 0.3)', width: 120, height: 60 },
  { id: 2, level: 1, color: 'rgba(165, 214, 167, 0.35)', width: 140, height: 70 },
  { id: 3, level: 2, color: 'rgba(129, 199, 132, 0.25)', width: 100, height: 50 },
  { id: 4, level: 3, color: 'rgba(200, 230, 201, 0.3)', width: 130, height: 55 },
  { id: 5, level: 4, color: 'rgba(165, 214, 167, 0.3)', width: 110, height: 65 },
]

export function AnimatedBackground() {
  const clouds = useMemo<Cloud[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 5 + Math.random() * 25,
      size: 60 + Math.random() * 100,
      speed: 30 + Math.random() * 40,
      delay: Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.3,
    })), []
  )

  const stars = useMemo<Star[]>(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []
  )

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 50 + Math.random() * 50,
      size: 3 + Math.random() * 6,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    })), []
  )

  const settings = getSettings()
  const animationsEnabled = settings.animationsEnabled

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-pastel-sky via-pastel-sky/80 to-pastel-green/30" />

      {animationsEnabled && stars.map(star => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: starColors[Math.floor(Math.random() * starColors.length)],
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {animationsEnabled && clouds.map(cloud => (
        <motion.div
          key={`cloud-${cloud.id}`}
          className="absolute"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: cloud.size,
            height: cloud.size * 0.6,
            opacity: cloud.opacity,
          }}
          animate={{ x: ['-20vw', '120vw'] }}
          transition={{
            duration: cloud.speed,
            delay: cloud.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 200 120" className="w-full h-full">
            <ellipse cx="100" cy="80" rx="90" ry="40" fill="white" opacity="0.9" />
            <ellipse cx="60" cy="65" rx="50" ry="35" fill="white" opacity="0.9" />
            <ellipse cx="140" cy="65" rx="45" ry="30" fill="white" opacity="0.9" />
            <ellipse cx="100" cy="50" rx="55" ry="35" fill="white" opacity="0.95" />
          </svg>
        </motion.div>
      ))}

      {hills.map(hill => (
        <div
          key={`hill-${hill.id}`}
          className="absolute bottom-0"
          style={{
            left: `${hill.level * 20}%`,
            width: `${hill.width}%`,
            height: `${hill.height}%`,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <ellipse
              cx="50"
              cy="100"
              rx="50"
              ry="40"
              fill={hill.color}
            />
          </svg>
        </div>
      ))}

      {animationsEnabled && particles.map(particle => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            y: [-20, -200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
