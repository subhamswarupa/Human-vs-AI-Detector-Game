import type { Achievement } from '@/types'

export const achievements: Achievement[] = [
  { id: 'first_win', name: 'First Steps', description: 'Win your first game', icon: '🎯' },
  { id: 'perfect', name: 'Perfect Detective', description: 'Get 10/10 correct', icon: '🏆' },
  { id: 'ai_hunter', name: 'AI Hunter', description: 'Correctly identify 5 AI-generated pieces', icon: '🎯' },
  { id: 'sharp_eyes', name: 'Sharp Eyes', description: 'Perfect score on image questions', icon: '👁️' },
  { id: 'code_expert', name: 'Code Expert', description: 'Perfect score on code questions', icon: '💻' },
  { id: 'art_critic', name: 'Art Critic', description: 'Perfect score on art questions', icon: '🎨' },
  { id: 'text_master', name: 'Text Master', description: 'Perfect score on text questions', icon: '📝' },
  { id: 'audio_detective', name: 'Audio Detective', description: 'Perfect score on audio questions', icon: '🎵' },
  { id: 'streak_3', name: 'On Fire', description: 'Get 3 correct in a row', icon: '🔥' },
  { id: 'streak_5', name: 'Unstoppable', description: 'Get 5 correct in a row', icon: '⚡' },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Answer in under 5 seconds', icon: '⏱️' },
  { id: 'no_hints', name: 'Pure Skill', description: 'Complete a game without hints', icon: '🧠' },
  { id: 'combo_king', name: 'Combo King', description: 'Achieve a 3x combo multiplier', icon: '👑' },
  { id: 'veteran', name: 'Veteran Detective', description: 'Play 10 games', icon: '⭐' },
]

export const checkAchievements = (
  score: number,
  correctCount: number,
  totalQuestions: number,
  streak: number,
  maxCombo: number,
  hintsUsed: number,
  fastestTime: number,
  categoryStats: Record<string, { correct: number; total: number }>,
  totalGamesPlayed: number
): Achievement[] => {
  const unlocked: Achievement[] = []

  if (correctCount === totalQuestions) {
    const perfect = achievements.find(a => a.id === 'perfect')
    if (perfect) unlocked.push(perfect)
  }

  if (streak >= 5) {
    const s5 = achievements.find(a => a.id === 'streak_5')
    if (s5) unlocked.push(s5)
  } else if (streak >= 3) {
    const s3 = achievements.find(a => a.id === 'streak_3')
    if (s3) unlocked.push(s3)
  }

  if (maxCombo >= 3) {
    const combo = achievements.find(a => a.id === 'combo_king')
    if (combo) unlocked.push(combo)
  }

  if (fastestTime > 0 && fastestTime < 5) {
    const speed = achievements.find(a => a.id === 'speed_demon')
    if (speed) unlocked.push(speed)
  }

  if (hintsUsed === 0) {
    const noHints = achievements.find(a => a.id === 'no_hints')
    if (noHints) unlocked.push(noHints)
  }

  if (totalGamesPlayed >= 10) {
    const vet = achievements.find(a => a.id === 'veteran')
    if (vet) unlocked.push(vet)
  }

  for (const [cat, stats] of Object.entries(categoryStats)) {
    if (stats.total > 0 && stats.correct === stats.total) {
      const map: Record<string, string> = {
        image: 'sharp_eyes',
        code: 'code_expert',
        art: 'art_critic',
        text: 'text_master',
        audio: 'audio_detective',
      }
      const id = map[cat]
      if (id) {
        const ach = achievements.find(a => a.id === id)
        if (ach) unlocked.push(ach)
      }
    }
  }

  const aiCorrect = Object.entries(categoryStats)
    .filter(([cat]) => cat !== 'human')
    .reduce((sum, [, stats]) => sum + stats.correct, 0)

  if (aiCorrect >= 5) {
    const hunter = achievements.find(a => a.id === 'ai_hunter')
    if (hunter) unlocked.push(hunter)
  }

  if (unlocked.length > 0) {
    const firstWin = achievements.find(a => a.id === 'first_win')
    if (firstWin) unlocked.unshift(firstWin)
  }

  return unlocked
}
