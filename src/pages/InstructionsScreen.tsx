import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Mascot } from '@/components/layout/Mascot'
import {
  ArrowLeft, Image, FileText, Code2, Palette, Music,
  Search, Brain, Trophy, Zap, Star, Target
} from 'lucide-react'

interface InstructionsScreenProps {
  onBack: () => void
}

const steps = [
  {
    icon: Search,
    title: 'Examine the Content',
    desc: 'You will be shown images, text, code, artwork, or audio clips.',
    color: 'text-blue-500', bg: 'bg-blue-50',
  },
  {
    icon: Brain,
    title: 'Decide: Human or AI?',
    desc: 'Use your intuition and knowledge to decide who created it.',
    color: 'text-purple-500', bg: 'bg-purple-50',
  },
  {
    icon: Target,
    title: 'Get Instant Feedback',
    desc: 'Learn the correct answer with detailed explanations and fun facts.',
    color: 'text-green-500', bg: 'bg-green-50',
  },
  {
    icon: Trophy,
    title: 'Earn Points & Achievements',
    desc: 'Build combos, streaks, and unlock badges as you improve!',
    color: 'text-yellow-500', bg: 'bg-yellow-50',
  },
]

const categories = [
  { icon: Image, label: 'Images', desc: 'Spot AI-generated images by looking at lighting, shadows, and textures.', color: 'text-blue-500' },
  { icon: FileText, label: 'Text', desc: 'Detect AI writing by spotting buzzwords and formulaic structures.', color: 'text-yellow-500' },
  { icon: Code2, label: 'Code', desc: 'Find AI code through over-commenting and unnecessary checks.', color: 'text-purple-500' },
  { icon: Palette, label: 'Artwork', desc: 'Identify AI art by examining composition and structural logic.', color: 'text-pink-500' },
  { icon: Music, label: 'Audio', desc: 'Listen for unnatural perfection in AI-generated audio.', color: 'text-green-500' },
]

export function InstructionsScreen({ onBack }: InstructionsScreenProps) {
  return (
    <div className="min-h-screen p-6 pt-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Mascot size={100} emotion="happy" className="mx-auto mb-3" />
        <h1 className="text-3xl md:text-4xl font-black text-gradient mb-2">How to Play</h1>
        <p className="text-gray-500">Master the art of AI detection!</p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-6">
        <Card>
          <h2 className="font-bold text-xl text-gray-800 mb-4">Game Rules</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className={`p-3 rounded-2xl ${step.bg} flex-shrink-0`}>
                  <step.icon className={`w-6 h-6 ${step.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-bold text-xl text-gray-800 mb-4">Categories</h2>
          <div className="space-y-3">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <cat.icon className={`w-5 h-5 ${cat.color} mt-0.5`} />
                <div>
                  <span className="font-bold text-gray-700">{cat.label}:</span>
                  <span className="text-sm text-gray-500 ml-1">{cat.desc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-bold text-xl text-gray-800 mb-3">Scoring System</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span><strong>Combo Multiplier:</strong> Each correct answer increases your combo, multiplying points!</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-purple-500" />
              <span><strong>Difficulty:</strong> Harder questions are worth more points.</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-orange-500" />
              <span><strong>Achievements:</strong> Unlock badges by completing special challenges!</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
