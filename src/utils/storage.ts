import type { LeaderboardEntry, Settings } from '@/types'

const KEYS = {
  LEADERBOARD: 'hvai_leaderboard',
  SETTINGS: 'hvai_settings',
  ACHIEVEMENTS: 'hvai_achievements',
  GAME_HISTORY: 'hvai_game_history',
} as const

export const defaultSettings: Settings = {
  musicEnabled: false,
  soundEnabled: true,
  darkMode: false,
  animationsEnabled: true,
}

export function getSettings(): Settings {
  try {
    const data = localStorage.getItem(KEYS.SETTINGS)
    return data ? JSON.parse(data) : defaultSettings
  } catch {
    return defaultSettings
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings))
}

export function getLeaderboard(): LeaderboardEntry {
  try {
    const data = localStorage.getItem(KEYS.LEADERBOARD)
    return data ? JSON.parse(data) : { bestScore: 0, highestAccuracy: 0, gamesPlayed: 0, longestStreak: 0, fastestTime: 999 }
  } catch {
    return { bestScore: 0, highestAccuracy: 0, gamesPlayed: 0, longestStreak: 0, fastestTime: 999 }
  }
}

export function saveLeaderboard(entry: LeaderboardEntry): void {
  localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(entry))
}

export function updateLeaderboard(score: number, accuracy: number, streak: number, time: number): LeaderboardEntry {
  const current = getLeaderboard()
  const updated: LeaderboardEntry = {
    bestScore: Math.max(current.bestScore, score),
    highestAccuracy: Math.max(current.highestAccuracy, accuracy),
    gamesPlayed: current.gamesPlayed + 1,
    longestStreak: Math.max(current.longestStreak, streak),
    fastestTime: Math.min(current.fastestTime, time),
  }
  saveLeaderboard(updated)
  return updated
}

export function getUnlockedAchievements(): string[] {
  try {
    const data = localStorage.getItem(KEYS.ACHIEVEMENTS)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveAchievements(ids: string[]): void {
  localStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(ids))
}

export function resetProgress(): void {
  localStorage.removeItem(KEYS.LEADERBOARD)
  localStorage.removeItem(KEYS.ACHIEVEMENTS)
  localStorage.removeItem(KEYS.GAME_HISTORY)
}
