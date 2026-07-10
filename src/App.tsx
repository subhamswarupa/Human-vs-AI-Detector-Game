import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AnimatedBackground } from '@/components/layout/AnimatedBackground'
import { PageTransition } from '@/components/layout/PageTransition'
import { SplashScreen } from '@/pages/SplashScreen'
import { HomeScreen } from '@/pages/HomeScreen'
import { GameScreen } from '@/pages/GameScreen'
import { FinalScoreScreen } from '@/pages/FinalScoreScreen'
import { InstructionsScreen } from '@/pages/InstructionsScreen'
import { LeaderboardScreen } from '@/pages/LeaderboardScreen'
import { SettingsScreen } from '@/pages/SettingsScreen'
import { AboutScreen } from '@/pages/AboutScreen'
import type { GameScreen as GameScreenType } from '@/types'

type AppScreen = GameScreenType | 'game' | 'final'

interface GameResults {
  score: number
  accuracy: number
  streak: number
  longestStreak: number
  maxCombo: number
  hintsUsed: number
  answers: any[]
  timeTaken: number
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('splash')
  const [gameResults, setGameResults] = useState<GameResults | null>(null)

  const handleNavigate = useCallback((s: string) => {
    setScreen(s as AppScreen)
  }, [])

  const handleSplashStart = useCallback(() => {
    setScreen('home')
  }, [])

  const handleGameFinish = useCallback((results: GameResults) => {
    setGameResults(results)
    setScreen('final')
  }, [])

  const handleReplay = useCallback(() => {
    setGameResults(null)
    setScreen('game')
  }, [])

  const handleHome = useCallback(() => {
    setGameResults(null)
    setScreen('home')
  }, [])

  return (
    <>
      <AnimatedBackground />
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <PageTransition key="splash">
            <SplashScreen onStart={handleSplashStart} />
          </PageTransition>
        )}
        {screen === 'home' && (
          <PageTransition key="home">
            <HomeScreen onNavigate={handleNavigate} />
          </PageTransition>
        )}
        {screen === 'game' && (
          <PageTransition key="game">
            <GameScreen onFinish={handleGameFinish} onBack={handleHome} />
          </PageTransition>
        )}
        {screen === 'final' && gameResults && (
          <PageTransition key="final">
            <FinalScoreScreen
              {...gameResults}
              totalQuestions={10}
              onReplay={handleReplay}
              onHome={handleHome}
            />
          </PageTransition>
        )}
        {screen === 'instructions' && (
          <PageTransition key="instructions">
            <InstructionsScreen onBack={handleHome} />
          </PageTransition>
        )}
        {screen === 'leaderboard' && (
          <PageTransition key="leaderboard">
            <LeaderboardScreen onBack={handleHome} />
          </PageTransition>
        )}
        {screen === 'settings' && (
          <PageTransition key="settings">
            <SettingsScreen onBack={handleHome} />
          </PageTransition>
        )}
        {screen === 'about' && (
          <PageTransition key="about">
            <AboutScreen onBack={handleHome} />
          </PageTransition>
        )}
      </AnimatePresence>
    </>
  )
}
