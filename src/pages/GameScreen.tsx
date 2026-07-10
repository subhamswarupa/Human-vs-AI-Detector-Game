import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuestionCard } from '@/components/game/QuestionCard'
import { Confetti } from '@/components/game/Confetti'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { Badge } from '@/components/ui/Badge'
import { useGame } from '@/hooks/useGame'
import { useTimer } from '@/hooks/useTimer'
import { useSound } from '@/hooks/useSound'
import {
  Pause,
  Play,
  Lightbulb,
  Clock,
  Zap,
  Flame,
  X,
  ChevronLeft,
  Sparkles,
} from 'lucide-react'

interface GameScreenProps {
  onFinish: (results: {
    score: number
    accuracy: number
    streak: number
    longestStreak: number
    maxCombo: number
    hintsUsed: number
    answers: any[]
    timeTaken: number
  }) => void
  onBack: () => void
}

const TIME_PER_QUESTION: Record<string, number> = {
  easy: 30,
  medium: 25,
  hard: 20,
}

export function GameScreen({ onFinish, onBack }: GameScreenProps) {
  const game = useGame()
  const { playSound } = useSound()
  const [showResult, setShowResult] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<'Human' | 'AI' | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [showHint, setShowHint] = useState(false)

  const handleTimeUp = useCallback(() => {
    if (!showResult && game.currentQuestion) {
      handleAnswer('AI', true)
    }
  }, [showResult, game.currentQuestion])

  const timer = useTimer(handleTimeUp)

  const handleAnswer = useCallback((answer: 'Human' | 'AI', timedOut = false) => {
    if (showResult) return
    timer.stop()

    const timeSpent = (Date.now() - questionStartTime) / 1000
    game.submitAnswer(answer, timeSpent)

    const q = game.currentQuestion
    if (q) {
      const correct = answer === q.answer
      setIsCorrect(correct)
      setLastAnswer(answer)
      setShowResult(true)

      if (correct) {
        playSound('correct')
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2500)
      } else {
        playSound('wrong')
      }
    }
  }, [showResult, timer, questionStartTime, game])

  const handleNextQuestion = useCallback(() => {
    setShowResult(false)
    setLastAnswer(null)
    setShowHint(false)
    setQuestionStartTime(Date.now())

    if (game.isGameOver) {
      const totalTime = Math.round((Date.now() - game.roundStartTime) / 1000)
      playSound('victory')
      onFinish({
        score: game.score,
        accuracy: game.accuracy,
        streak: game.streak,
        longestStreak: game.longestStreak,
        maxCombo: game.maxCombo,
        hintsUsed: game.hintsUsed,
        answers: game.answers,
        timeTaken: totalTime,
      })
    } else {
      timer.start(TIME_PER_QUESTION[game.difficulty])
    }
  }, [game.isGameOver, game.score, game.accuracy, game.streak, game.longestStreak,
      game.maxCombo, game.hintsUsed, game.answers, game.roundStartTime, game.difficulty,
      game.currentQuestionIndex, onFinish, timer, playSound])

  useEffect(() => {
    game.startGame('medium')
  }, [])

  useEffect(() => {
    if (game.questions.length > 0 && !showResult) {
      timer.start(TIME_PER_QUESTION[game.difficulty])
      setQuestionStartTime(Date.now())
    }
  }, [game.currentQuestionIndex, game.questions.length])

  const q = game.currentQuestion
  const difficultyLabel = game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1)

  if (!q) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-8 h-8 text-pastel-purple-dark" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6">
      <Confetti active={showConfetti} />

      {/* Top Bar */}
      <div className="w-full max-w-2xl mx-auto mb-4">
        <div className="flex items-center justify-between mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>

          <div className="flex items-center gap-3">
            <Badge variant="info">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {timer.timeLeft}s
            </Badge>
            <Badge variant="purple">
              <Flame className="w-3.5 h-3.5 mr-1" />
              x{game.combo}
            </Badge>
            <Badge variant="warning">{difficultyLabel}</Badge>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              game.togglePause()
              if (!game.isPaused) timer.pause()
              else timer.resume()
            }}
            className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
            aria-label={game.isPaused ? 'Resume game' : 'Pause game'}
          >
            {game.isPaused ? (
              <Play className="w-5 h-5 text-gray-600" />
            ) : (
              <Pause className="w-5 h-5 text-gray-600" />
            )}
          </motion.button>
        </div>

        {/* Timer bar */}
        <div className="h-2 bg-white/40 rounded-full overflow-hidden mb-2">
          <motion.div
            className={`h-full rounded-full transition-colors duration-300 ${
              timer.timeLeft <= 5 ? 'bg-red-400' : timer.timeLeft <= 10 ? 'bg-yellow-400' : 'bg-gradient-to-r from-pastel-blue-dark to-pastel-purple-dark'
            }`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timer.timeLeft / TIME_PER_QUESTION[game.difficulty]) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-gray-600">
            Question {game.currentQuestionIndex + 1}/{game.totalQuestions}
          </span>
          <div className="flex items-center gap-4">
            <span className="font-bold text-gray-700">
              <AnimatedNumber value={game.score} prefix="" suffix="" /> pts
            </span>
            <span className="text-gray-500">
              {game.accuracy}%
            </span>
          </div>
        </div>
        <ProgressBar
          value={game.currentQuestionIndex}
          max={game.totalQuestions}
          className="mt-1"
        />
      </div>

      {/* Pause Overlay */}
      <AnimatePresence>
        {game.isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="glass-strong rounded-3xl p-8 text-center"
            >
              <h2 className="text-2xl font-black text-gray-800 mb-2">Game Paused</h2>
              <p className="text-gray-500 mb-6">Take a breath, then continue!</p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    game.togglePause()
                    timer.resume()
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold"
                >
                  <Play className="w-5 h-5 inline mr-2" />
                  Resume
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    game.togglePause()
                    onBack()
                  }}
                  className="px-6 py-3 rounded-2xl bg-white/80 text-gray-600 font-bold border border-gray-200"
                >
                  <X className="w-5 h-5 inline mr-2" />
                  Quit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Content */}
      <div className="flex-1 flex items-center justify-center">
        {!showResult ? (
          <div className="w-full">
            <QuestionCard
              question={q}
              onAnswer={handleAnswer}
              showHint={showHint}
              hintContent={showHint && game.hintsRemaining > 0 ? q.hints[0] : undefined}
              disabled={showResult}
              timeLeft={timer.timeLeft}
            />
            {game.hintsRemaining > 0 && !showHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5 }}
                className="flex justify-center mt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowHint(true)
                    game.useHint()
                    playSound('click')
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-100 border border-yellow-200 text-yellow-700 font-semibold text-sm"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hint ({game.hintsRemaining})
                </motion.button>
              </motion.div>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`result-${q.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mx-auto"
            >
              <div className={`glass-strong rounded-3xl p-6 md:p-8 text-center ${
                isCorrect ? 'border-green-200/50' : 'border-red-200/50'
              }`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="text-6xl mb-4"
                >
                  {isCorrect ? '🎉' : '😅'}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-2xl font-black mb-2 ${isCorrect ? 'text-green-600' : 'text-red-500'}`}
                >
                  {isCorrect ? 'Correct!' : 'Wrong!'}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3"
                >
                  <p className="text-gray-700">
                    <span className="font-bold">Answer: </span>
                    <span className={q.answer === 'AI' ? 'text-purple-600' : 'text-blue-600'}>
                      {q.answer === 'AI' ? '🤖 AI' : '🧑 Human'}
                    </span>
                  </p>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-sm text-blue-800 font-medium">{q.explanation}</p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="purple">
                      Confidence: {q.confidence}
                    </Badge>
                    <Badge variant={isCorrect ? 'success' : 'warning'}>
                      +{isCorrect ? Math.round(q.points * (1 + game.combo * 0.5)) : 0} pts
                    </Badge>
                  </div>

                  <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100">
                    <p className="text-xs text-purple-700">
                      <span className="font-bold">💡 Fun Fact: </span>
                      {q.funFact}
                    </p>
                  </div>

                  {game.combo >= 2 && isCorrect && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.4 }}
                      className="flex items-center justify-center gap-2 text-orange-500 font-bold"
                    >
                      <Flame className="w-5 h-5" />
                      Combo x{game.combo}!
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextQuestion}
                    className={`px-8 py-4 rounded-2xl font-extrabold text-lg text-white ${
                      game.isGameOver
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        : 'bg-gradient-to-r from-blue-400 to-purple-500'
                    } shadow-lg transition-all duration-200`}
                  >
                    {game.isGameOver ? '🎊 See Final Results!' : '➡️ Next Question'}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-2xl mx-auto mt-4"
      >
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            Combo: x{game.combo}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            Streak: {game.streak}
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Score: {game.score}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
