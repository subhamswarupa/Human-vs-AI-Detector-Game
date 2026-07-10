import { motion } from 'framer-motion'
import { Mascot } from '@/components/layout/Mascot'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  Play,
  Trophy,
  Settings2,
  BookOpen,
  Info,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'

interface HomeScreenProps {
  onNavigate: (screen: string) => void
}

const features = [
  { icon: Star, label: 'Images', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: BookOpen, label: 'Text', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Zap, label: 'Code', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Sparkles, label: 'Art', color: 'text-pink-500', bg: 'bg-pink-50' },
]

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const menuItems = [
    {
      id: 'game',
      label: 'Play Game',
      desc: 'Test your detection skills',
      icon: Play,
      gradient: 'from-blue-400 to-purple-500',
      shadow: 'shadow-blue-200',
    },
    {
      id: 'instructions',
      label: 'Instructions',
      desc: 'How to play',
      icon: BookOpen,
      gradient: 'from-yellow-400 to-orange-500',
      shadow: 'shadow-yellow-200',
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      desc: 'Your best scores',
      icon: Trophy,
      gradient: 'from-green-400 to-emerald-500',
      shadow: 'shadow-green-200',
    },
    {
      id: 'settings',
      label: 'Settings',
      desc: 'Customize your experience',
      icon: Settings2,
      gradient: 'from-gray-400 to-gray-600',
      shadow: 'shadow-gray-200',
    },
    {
      id: 'about',
      label: 'About',
      desc: 'Learn more about the game',
      icon: Info,
      gradient: 'from-pink-400 to-rose-500',
      shadow: 'shadow-pink-200',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <Mascot size={100} emotion="happy" />
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gradient">Detector Game</h1>
          <p className="text-gray-500 font-semibold">Human vs AI Challenge</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-8"
      >
        {features.map((feat, i) => (
          <motion.div
            key={feat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${feat.bg} border border-white/50`}
          >
            <feat.icon className={`w-4 h-4 ${feat.color}`} />
            <span className="text-sm font-semibold text-gray-700">{feat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full max-w-md space-y-3">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
          >
            <Card
              glass
              onClick={() => onNavigate(item.id)}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
              role="button"
              aria-label={item.label}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${item.gradient} ${item.shadow}`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{item.label}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <motion.div
                  className="text-gray-300 group-hover:text-gray-500 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-center"
      >
        <p className="text-xs text-gray-400">Challenge yourself across 5 categories</p>
      </motion.div>
    </div>
  )
}
