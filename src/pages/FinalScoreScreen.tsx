import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { Mascot } from '@/components/layout/Mascot'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { updateLeaderboard, getUnlockedAchievements, saveAchievements } from '@/utils/storage'
import { achievements as allAchievements, checkAchievements } from '@/data/achievements'
import questionsData from '@/data/questions.json'
import type { Question } from '@/types'
import { Flame, Zap, Trophy, Clock, Target, Repeat, Home, Star, Medal } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FinalScoreScreenProps {
  score: number
  accuracy: number
  streak: number
  longestStreak: number
  maxCombo: number
  hintsUsed: number
  answers: any[]
  timeTaken: number
  totalQuestions: number
  onReplay: () => void
  onHome: () => void
}

function getRank(score: number, totalQ: number): { title: string; emoji: string; color: string } {
  const maxPossible = totalQ * 300 * 3
  const ratio = score / maxPossible
  if (ratio >= 0.9) return { title: 'Legendary Detective', emoji: '👑', color: 'from-yellow-400 to-orange-500' }
  if (ratio >= 0.7) return { title: 'Master Detective', emoji: '🥇', color: 'from-blue-400 to-purple-500' }
  if (ratio >= 0.5) return { title: 'Skilled Investigator', emoji: '🥈', color: 'from-green-400 to-emerald-500' }
  if (ratio >= 0.3) return { title: 'Rookie Detective', emoji: '🥉', color: 'from-gray-400 to-gray-500' }
  return { title: 'Apprentice', emoji: '🔰', color: 'from-orange-400 to-red-400' }
}

export function FinalScoreScreen({
  score, accuracy, streak, longestStreak, maxCombo, hintsUsed,
  answers, timeTaken, totalQuestions, onReplay, onHome,
}: FinalScoreScreenProps) {
  const [newAchievements, setNewAchievements] = useState<string[]>([])
  const questions = questionsData as Question[]
  const categoryStats: Record<string, { correct: number; total: number }> = {}

  answers.forEach(a => {
    const q = questions.find(q => q.id === a.questionId)
    const cat = q?.category ?? 'unknown'
    if (!categoryStats[cat]) {
      categoryStats[cat] = { correct: 0, total: 0 }
    }
    categoryStats[cat].total++
    if (a.isCorrect) categoryStats[cat].correct++
  })

  const rank = getRank(score, totalQuestions)

  useEffect(() => {
    const existing = getUnlockedAchievements()
    const unlocked = checkAchievements(
      score,
      answers.filter(a => a.isCorrect).length,
      totalQuestions,
      longestStreak,
      maxCombo,
      hintsUsed,
      timeTaken,
      categoryStats,
      0
    )

    const trulyNew = unlocked.filter(a => !existing.includes(a.id))
    if (trulyNew.length > 0) {
      setNewAchievements(trulyNew.map(a => a.id))
      saveAchievements([...existing, ...trulyNew.map(a => a.id)])
    }
  }, [])

  useEffect(() => {
    updateLeaderboard(score, accuracy, longestStreak, timeTaken)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-4"
        >
          <Mascot size={140} emotion="excited" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black mb-1"
        >
          Game Over!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-500"
        >
          Let's see how you did!
        </motion.p>
      </motion.div>

      {/* Rank Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.4 }}
        className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${rank.color} text-white font-bold text-xl shadow-lg mb-6`}
      >
        {rank.emoji} {rank.title}
      </motion.div>

      {/* Score Card */}
      <Card className="w-full max-w-md mb-6" delay={0.2}>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-2xl bg-blue-50 border border-blue-100">
              <Trophy className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-2xl font-black text-blue-600">
                <AnimatedNumber value={score} />
              </p>
              <p className="text-xs font-semibold text-blue-500">Score</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-green-50 border border-green-100">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-2xl font-black text-green-600">
                <AnimatedNumber value={accuracy} suffix="%" />
              </p>
              <p className="text-xs font-semibold text-green-500">Accuracy</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-purple-50 border border-purple-100">
              <Zap className="w-6 h-6 text-purple-500 mx-auto mb-1" />
              <p className="text-2xl font-black text-purple-600">
                x<AnimatedNumber value={maxCombo} />
              </p>
              <p className="text-xs font-semibold text-purple-500">Best Combo</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-orange-50 border border-orange-100">
              <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-2xl font-black text-orange-600">
                <AnimatedNumber value={longestStreak} />
              </p>
              <p className="text-xs font-semibold text-orange-500">Best Streak</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time</span>
              <span className="font-bold text-gray-700">{timeTaken}s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Correct</span>
              <span className="font-bold text-green-600">{answers.filter(a => a.isCorrect).length}/{totalQuestions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Hints Used</span>
              <span className="font-bold text-gray-700">{hintsUsed}</span>
            </div>
          </div>

          <ProgressBar
            value={accuracy}
            max={100}
            className="mt-4"
            barClassName="bg-gradient-to-r from-green-400 to-emerald-500"
            showLabel
            label="Accuracy"
          />
        </CardContent>
      </Card>

      {/* Achievements */}
      {newAchievements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-md mb-6"
        >
          <Card>
            <CardContent>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Achievements Unlocked!
              </h3>
              <div className="space-y-2">
                {allAchievements
                  .filter(a => newAchievements.includes(a.id))
                  .map(ach => (
                    <motion.div
                      key={ach.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-yellow-50 border border-yellow-200"
                    >
                      <span className="text-2xl">{ach.icon}</span>
                      <div>
                        <p className="font-bold text-yellow-800 text-sm">{ach.name}</p>
                        <p className="text-xs text-yellow-600">{ach.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <Button size="lg" onClick={onReplay}>
          <Repeat className="w-5 h-5" />
          Play Again
        </Button>
        <Button variant="secondary" size="lg" onClick={onHome}>
          <Home className="w-5 h-5" />
          Back to Home
        </Button>
      </motion.div>
    </div>
  )
}
