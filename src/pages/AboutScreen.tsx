import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Mascot } from '@/components/layout/Mascot'
import { ArrowLeft, Heart, Sparkles, Code2, Palette, Music, FileText, Image } from 'lucide-react'

interface AboutScreenProps {
  onBack: () => void
}

export function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <div className="min-h-screen p-6 pt-12">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
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
        <h1 className="text-3xl md:text-4xl font-black text-gradient mb-1">About</h1>
        <p className="text-gray-500">Human vs AI Detector Game</p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-4">
        <Card>
          <CardContent>
            <h2 className="font-bold text-xl text-gray-800 mb-3">What is this?</h2>
            <p className="text-gray-600 leading-relaxed">
              The <strong>Human vs AI Detector Game</strong> is an interactive challenge that tests your ability
              to distinguish between human-created and AI-generated content across five categories:
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                { icon: Image, label: 'Images', color: 'text-blue-500' },
                { icon: FileText, label: 'Text', color: 'text-yellow-500' },
                { icon: Code2, label: 'Code', color: 'text-purple-500' },
                { icon: Palette, label: 'Art', color: 'text-pink-500' },
                { icon: Music, label: 'Audio', color: 'text-green-500' },
              ].map((cat, i) => (
                <span key={i} className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 border text-sm font-semibold ${cat.color}`}>
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-bold text-xl text-gray-800 mb-3">How It Works</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>Each round presents <strong>10 random questions</strong> from various categories.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>You decide: <strong>Human or AI?</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>Learn from <strong>detailed explanations</strong> and fun facts after each answer.</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>Build <strong>combos and streaks</strong> for bonus points!</span>
              </li>
              <li className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>Unlock <strong>achievements</strong> and track your progress.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="font-bold text-xl text-gray-800 mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React', 'shadcn/ui'].map((tech, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-sm font-semibold text-gray-700">
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="text-center">
            <p className="text-gray-600">
              Built with <Heart className="w-4 h-4 text-red-500 inline" /> for the Hackathon
            </p>
            <p className="text-xs text-gray-400 mt-1">Human vs AI Detector Game v1.0</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
