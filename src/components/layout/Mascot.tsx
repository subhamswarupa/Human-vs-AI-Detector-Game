import { motion } from 'framer-motion'

interface MascotProps {
  size?: number
  animate?: boolean
  className?: string
  emotion?: 'neutral' | 'happy' | 'sad' | 'excited'
}

export function Mascot({ size = 200, animate = true, className = '', emotion = 'neutral' }: MascotProps) {
  const eyeBrowVariants = {
    neutral: { rotate: 0 },
    happy: { rotate: -10, y: -2 },
    sad: { rotate: 10, y: 2 },
    excited: { rotate: -15, y: -4, scale: 1.1 },
  }

  const mouthVariants = {
    neutral: { d: 'M 70 130 Q 100 145 130 130' },
    happy: { d: 'M 65 130 Q 100 160 135 130' },
    sad: { d: 'M 70 130 Q 100 115 130 130' },
    excited: { d: 'M 60 125 Q 100 165 140 125' },
  }

  return (
    <motion.div
      className={className}
      animate={animate ? {
        y: [0, -8, 0],
        rotate: [0, 2, -2, 0],
      } : undefined}
      transition={animate ? {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Detective mascot"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Body */}
        <ellipse cx="100" cy="150" rx="55" ry="40" fill="#81D4FA" opacity="0.8" />

        {/* Head */}
        <circle cx="100" cy="85" r="55" fill="#FFE0B2" />

        {/* Hair */}
        <ellipse cx="100" cy="45" rx="58" ry="30" fill="#8D6E63" />
        <ellipse cx="100" cy="50" rx="55" ry="25" fill="#A1887F" />

        {/* Ears */}
        <ellipse cx="48" cy="80" rx="12" ry="18" fill="#FFE0B2" />
        <ellipse cx="152" cy="80" rx="12" ry="18" fill="#FFE0B2" />

        {/* Eyes - white */}
        <ellipse cx="80" cy="85" rx="16" ry="18" fill="white" />
        <ellipse cx="120" cy="85" rx="16" ry="18" fill="white" />

        {/* Eyes - iris */}
        <circle cx="82" cy="87" r="9" fill="#4E342E" />
        <circle cx="122" cy="87" r="9" fill="#4E342E" />

        {/* Eyes - highlight */}
        <circle cx="86" cy="82" r="3.5" fill="white" />
        <circle cx="126" cy="82" r="3.5" fill="white" />

        {/* Eyebrows */}
        <motion.path
          d="M 62 70 Q 80 63 95 70"
          stroke="#4E342E"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={eyeBrowVariants[emotion]}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          d="M 105 70 Q 120 63 138 70"
          stroke="#4E342E"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={eyeBrowVariants[emotion]}
          transition={{ duration: 0.3 }}
        />

        {/* Blush */}
        <ellipse cx="58" cy="105" rx="12" ry="7" fill="#FFAB91" opacity="0.4" />
        <ellipse cx="142" cy="105" rx="12" ry="7" fill="#FFAB91" opacity="0.4" />

        {/* Mouth */}
        <motion.path
          d="M 70 130 Q 100 145 130 130"
          stroke="#E53935"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={mouthVariants[emotion]}
          transition={{ duration: 0.3 }}
        />

        {/* Detective Hat */}
        <ellipse cx="100" cy="38" rx="60" ry="10" fill="#5D4037" />
        <ellipse cx="100" cy="30" rx="38" ry="22" fill="#6D4C41" />
        <rect x="78" y="28" width="44" height="6" rx="3" fill="#5D4037" />

        {/* Magnifying glass */}
        <motion.g
          animate={animate ? { rotate: [0, 15, 0, -10, 0] } : undefined}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="155" cy="60" r="14" fill="none" stroke="#90A4AE" strokeWidth="3" />
          <circle cx="155" cy="60" r="10" fill="#E3F2FD" opacity="0.3" />
          <line x1="165" y1="70" x2="180" y2="85" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" />
        </motion.g>

        {/* Collar */}
        <path d="M 60 125 L 75 145 L 100 130 L 125 145 L 140 125" fill="white" stroke="#E0E0E0" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}

export function SmallMascot({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -4, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Detective mascot"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="85" r="55" fill="#FFE0B2" />
        <ellipse cx="100" cy="45" rx="58" ry="30" fill="#8D6E63" />
        <ellipse cx="80" cy="85" rx="14" ry="16" fill="white" />
        <ellipse cx="120" cy="85" rx="14" ry="16" fill="white" />
        <circle cx="82" cy="87" r="8" fill="#4E342E" />
        <circle cx="122" cy="87" r="8" fill="#4E342E" />
        <circle cx="85" cy="83" r="3" fill="white" />
        <circle cx="125" cy="83" r="3" fill="white" />
        <path d="M 70 130 Q 100 145 130 130" stroke="#E53935" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="100" cy="38" rx="55" ry="8" fill="#5D4037" />
        <ellipse cx="100" cy="30" rx="35" ry="20" fill="#6D4C41" />
      </svg>
    </motion.div>
  )
}
