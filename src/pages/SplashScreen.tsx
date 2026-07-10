import { motion } from 'framer-motion'
import { Mascot } from '@/components/layout/Mascot'
import { Button } from '@/components/ui/Button'
import { Play, Sparkles } from 'lucide-react'

interface SplashScreenProps {
  onStart: () => void
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {['⭐', '✨', '🌟', '💫', '🎈', '🌸'][i % 6]}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', type: 'spring' }}
        className="mb-8"
      >
        <Mascot size={180} emotion="excited" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-6xl font-black mb-3">
          <span className="text-gradient">Human vs AI</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl text-gray-600 font-semibold"
        >
          Detector Game
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-base text-gray-500 mt-2 max-w-sm mx-auto"
        >
          Can you tell what's made by humans and what's created by AI?
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <Button size="xl" onClick={onStart} className="relative group">
          <Sparkles className="w-5 h-5 text-yellow-200" />
          Start Game
          <Play className="w-5 h-5 ml-1" />
          <motion.div
            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pastel-blue-dark/30 to-pastel-purple-dark/30 -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 text-center"
      >
        <p className="text-xs text-gray-400">Press Enter or click to start</p>
      </motion.div>
    </div>
  )
}
