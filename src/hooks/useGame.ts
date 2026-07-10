import { useState, useCallback, useMemo } from 'react'
import type { Question, GameState, AnswerRecord, Category } from '@/types'
import questionsData from '@/data/questions.json'

const QUESTIONS_PER_GAME = 10

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const initialState: GameState = {
  currentQuestionIndex: 0,
  questions: [],
  score: 0,
  combo: 0,
  maxCombo: 0,
  correctCount: 0,
  totalAnswered: 0,
  streak: 0,
  longestStreak: 0,
  timeTaken: 0,
  roundStartTime: Date.now(),
  answers: [],
  isGameOver: false,
  isPaused: false,
  difficulty: 'medium',
  hintsUsed: 0,
  hintsRemaining: 3,
}

export function useGame() {
  const [state, setState] = useState<GameState>(initialState)

  const currentQuestion = useMemo(
    () => state.questions[state.currentQuestionIndex] ?? null,
    [state.questions, state.currentQuestionIndex]
  )

  const totalQuestions = state.questions.length
  const progress = totalQuestions > 0 ? (state.currentQuestionIndex / totalQuestions) * 100 : 0
  const accuracy = state.totalAnswered > 0
    ? Math.round((state.correctCount / state.totalAnswered) * 100)
    : 0

  const startGame = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    const questions = questionsData as Question[]
    let filtered = [...questions]

    if (difficulty === 'easy') {
      filtered = questions.filter(q => q.difficulty === 'easy')
    } else if (difficulty === 'hard') {
      filtered = questions.filter(q => q.difficulty === 'hard')
    }

    if (filtered.length < QUESTIONS_PER_GAME) {
      filtered = shuffleArray(questions)
    } else {
      filtered = shuffleArray(filtered)
    }

    const selected = filtered.slice(0, QUESTIONS_PER_GAME)

    setState({
      ...initialState,
      questions: selected,
      difficulty,
      roundStartTime: Date.now(),
    })
  }, [])

  const submitAnswer = useCallback((answer: 'Human' | 'AI', timeTaken: number) => {
    setState(prev => {
      if (!prev.questions[prev.currentQuestionIndex]) return prev

      const q = prev.questions[prev.currentQuestionIndex]
      const isCorrect = answer === q.answer
      const pointsEarned = isCorrect ? q.points * (1 + prev.combo * 0.5) : 0
      const newCombo = isCorrect ? prev.combo + 1 : 0
      const newStreak = isCorrect ? prev.streak + 1 : 0

      const record: AnswerRecord = {
        questionId: q.id,
        userAnswer: answer,
        correctAnswer: q.answer,
        isCorrect,
        timeTaken,
        pointsEarned: Math.round(pointsEarned),
      }

      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1

      return {
        ...prev,
        score: prev.score + Math.round(pointsEarned),
        combo: newCombo,
        maxCombo: Math.max(prev.maxCombo, newCombo),
        correctCount: prev.correctCount + (isCorrect ? 1 : 0),
        totalAnswered: prev.totalAnswered + 1,
        streak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        answers: [...prev.answers, record],
        currentQuestionIndex: isLastQuestion ? prev.currentQuestionIndex : prev.currentQuestionIndex + 1,
        isGameOver: isLastQuestion,
        hintsUsed: prev.hintsUsed,
        hintsRemaining: prev.hintsRemaining,
      }
    })
  }, [])

  const useHint = useCallback(() => {
    setState(prev => {
      if (prev.hintsRemaining <= 0) return prev
      return {
        ...prev,
        hintsUsed: prev.hintsUsed + 1,
        hintsRemaining: prev.hintsRemaining - 1,
      }
    })
  }, [])

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }))
  }, [])

  const resetGame = useCallback(() => {
    setState(initialState)
  }, [])

  const lastAnswer = useMemo(
    () => state.answers[state.answers.length - 1] ?? null,
    [state.answers]
  )

  return {
    ...state,
    currentQuestion,
    totalQuestions,
    progress,
    accuracy,
    lastAnswer,
    startGame,
    submitAnswer,
    useHint,
    togglePause,
    resetGame,
  }
}
