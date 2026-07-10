import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Image, Code2, FileText, Palette, Music, HelpCircle, Lightbulb } from 'lucide-react'
import type { Question, Category } from '@/types'
import { useState, useEffect } from 'react'

interface QuestionCardProps {
  question: Question
  onAnswer: (answer: 'Human' | 'AI') => void
  showHint: boolean
  hintContent?: string
  disabled?: boolean
  timeLeft: number
}

const categoryIcons: Record<Category, typeof Image> = {
  image: Image,
  text: FileText,
  code: Code2,
  art: Palette,
  audio: Music,
}

const categoryLabels: Record<Category, string> = {
  image: 'Image',
  text: 'Text',
  code: 'Code',
  art: 'Artwork',
  audio: 'Audio',
}

const categoryColors: Record<Category, string> = {
  image: 'bg-blue-100 text-blue-700 border-blue-200',
  text: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  code: 'bg-purple-100 text-purple-700 border-purple-200',
  art: 'bg-pink-100 text-pink-700 border-pink-200',
  audio: 'bg-green-100 text-green-700 border-green-200',
}

function ContentRenderer({ question }: { question: Question }) {
  if (question.file) {
    const ext = question.file.split('.').pop()?.toLowerCase()
    if (ext === 'svg') {
      return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/50 border border-white/30 flex items-center justify-center p-4">
          <img
            src={`/${question.file}`}
            alt={question.title}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        </div>
      )
    }
    if (ext === 'mp3') {
      return (
        <div className="w-full p-6 rounded-2xl bg-white/50 border border-white/30">
          <audio controls className="w-full">
            <source src={`/${question.file}`} type="audio/mpeg" />
          </audio>
          <p className="text-sm text-gray-500 mt-2 text-center">Listen to the audio clip</p>
        </div>
      )
    }
  }

  if (question.category === 'code') {
    return (
      <div className="w-full rounded-2xl overflow-hidden bg-[#1e1e2e] border border-white/10">
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#2d2d3d]">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-xs text-gray-400">code snippet</span>
        </div>
        <pre className="p-4 text-sm font-mono text-gray-200 overflow-x-auto">
          <code>{question.content}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className="w-full p-6 rounded-2xl bg-white/50 border border-white/30">
      <p className="text-gray-700 leading-relaxed text-lg">{question.content}</p>
    </div>
  )
}

export function QuestionCard({ question, onAnswer, showHint, hintContent, disabled, timeLeft }: QuestionCardProps) {
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    setAnimKey(prev => prev + 1)
  }, [question.id])

  const Icon = categoryIcons[question.category]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`q-${question.id}-${animKey}`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="info" className={categoryColors[question.category]}>
              <Icon className="w-3.5 h-3.5 mr-1" />
              {categoryLabels[question.category]}
            </Badge>
            <Badge variant={question.difficulty === 'easy' ? 'success' : question.difficulty === 'medium' ? 'warning' : 'danger'}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">{question.title}</h3>

          <ContentRenderer question={question} />

          <AnimatePresence>
            {showHint && hintContent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-800">{hintContent}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={() => !disabled && onAnswer('Human')}
            disabled={disabled}
            className={`flex-1 max-w-xs px-8 py-5 rounded-2xl font-extrabold text-xl text-white transition-all duration-200 ${
              disabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 cursor-pointer'
            }`}
            aria-label="Answer: Content was created by a Human"
          >
            <span className="block text-2xl mb-1">🧑</span>
            Human
          </motion.button>

          <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={() => !disabled && onAnswer('AI')}
            disabled={disabled}
            className={`flex-1 max-w-xs px-8 py-5 rounded-2xl font-extrabold text-xl text-white transition-all duration-200 ${
              disabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 cursor-pointer'
            }`}
            aria-label="Answer: Content was created by AI"
          >
            <span className="block text-2xl mb-1">🤖</span>
            AI
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
