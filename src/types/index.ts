export type Category = 'image' | 'text' | 'code' | 'art' | 'audio'

export interface Question {
  id: number
  category: Category
  difficulty: 'easy' | 'medium' | 'hard'
  title: string
  content: string
  file?: string
  answer: 'Human' | 'AI'
  confidence: string
  explanation: string
  funFact: string
  hints: string[]
  points: number
}

export interface GameState {
  currentQuestionIndex: number
  questions: Question[]
  score: number
  combo: number
  maxCombo: number
  correctCount: number
  totalAnswered: number
  streak: number
  longestStreak: number
  timeTaken: number
  roundStartTime: number
  answers: AnswerRecord[]
  isGameOver: boolean
  isPaused: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  hintsUsed: number
  hintsRemaining: number
}

export interface AnswerRecord {
  questionId: number
  userAnswer: 'Human' | 'AI'
  correctAnswer: 'Human' | 'AI'
  isCorrect: boolean
  timeTaken: number
  pointsEarned: number
}

export interface LeaderboardEntry {
  bestScore: number
  highestAccuracy: number
  gamesPlayed: number
  longestStreak: number
  fastestTime: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: number
}

export interface Settings {
  musicEnabled: boolean
  soundEnabled: boolean
  darkMode: boolean
  animationsEnabled: boolean
}

export type GameScreen = 'splash' | 'home' | 'game' | 'result' | 'final' | 'instructions' | 'leaderboard' | 'settings' | 'about'
