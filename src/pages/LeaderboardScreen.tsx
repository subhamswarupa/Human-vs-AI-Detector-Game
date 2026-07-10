import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Mascot } from '@/components/layout/Mascot'
import { getLeaderboard } from '@/utils/storage'
import { achievements as allAchievements, checkAchievements } from '@/data/achievements'
import { getUnlockedAchievements } from '@/utils/storage'
import { ArrowLeft, Trophy, Target, Zap, Clock, Gamepad2, Star, Medal, Sparkles } from 'lucide-react'
import type { LeaderboardEntry } from '@/types'
import { useEffect, useState } from 'react'

interface LeaderboardScreenProps {
  onBack: () => void
}

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const [stats, setStats] = useState<LeaderboardEntry>({ bestScore: 0, highestAccuracy: 0, gamesPlayed: 0, longestStreak: 0, fastestTime: 999 })
  const [unlocked, setUnlocked] = useState<string[]>([])

  useEffect(() => {
    setStats(getLeaderboard())
    setUnlocked(getUnlockedAchievements())
  }, [])

  const statCards = [
    { icon: Trophy, label: 'Best Score', value: stats.bestScore, color: 'text-yellow-500', bg: 'bg-yellow-50', border: 'border-yellow-200' },
    { icon: Target, label: 'Best Accuracy', value: `${stats.highestAccuracy}%`, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' },
    { icon: Gamepad2, label: 'Games Played', value: stats.gamesPlayed, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { icon: Zap, label: 'Longest Streak', value: stats.longestStreak, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200' },
    { icon: Clock, label: 'Fastest Time', value: stats.fastestTime < 999 ? `${stats.fastestTime}s` : '--', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200' },
  ]

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
        <Mascot size={90} emotion="happy" className="mx-auto mb-2" />
        <h1 className="text-3xl md:text-4xl font-black text-gradient mb-1">Leaderboard</h1>
        <p className="text-gray-500">Your personal bests</p>
      </motion.div>

      <div className="max-w-lg mx-auto space-y-4">
        <Card>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {statCards.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-4 rounded-2xl ${stat.bg} border ${stat.border} text-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                  <p className="text-xl font-black text-gray-800">{stat.value}</p>
                  <p className="text-xs font-semibold text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Medal className="w-5 h-5 text-yellow-500" />
              Achievements ({unlocked.length}/{allAchievements.length})
            </h3>
            {unlocked.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No achievements yet. Play to unlock!</p>
            ) : (
              <div className="space-y-2">
                {allAchievements
                  .filter(a => unlocked.includes(a.id))
                  .map((ach, i) => (
                    <motion.div
                      key={ach.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-yellow-50 border border-yellow-200"
                    >
                      <span className="text-xl">{ach.icon}</span>
                      <div>
                        <p className="font-bold text-yellow-800 text-sm">{ach.name}</p>
                        <p className="text-xs text-yellow-600">{ach.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
