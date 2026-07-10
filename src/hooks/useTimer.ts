import { useState, useEffect, useRef, useCallback } from 'react'

interface UseTimerReturn {
  timeLeft: number
  isRunning: boolean
  start: (seconds: number) => void
  pause: () => void
  resume: () => void
  stop: () => void
  reset: (seconds?: number) => void
}

export function useTimer(onTimeUp?: () => void): UseTimerReturn {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const callbackRef = useRef(onTimeUp)

  callbackRef.current = onTimeUp

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const start = useCallback((seconds: number) => {
    clearTimer()
    setTimeLeft(seconds)
    setIsRunning(true)
  }, [clearTimer])

  const pause = useCallback(() => {
    setIsRunning(false)
    clearTimer()
  }, [clearTimer])

  const resume = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true)
    }
  }, [timeLeft])

  const stop = useCallback(() => {
    setIsRunning(false)
    clearTimer()
  }, [clearTimer])

  const reset = useCallback((seconds?: number) => {
    clearTimer()
    setTimeLeft(seconds ?? 30)
    setIsRunning(false)
  }, [clearTimer])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && isRunning) {
        setIsRunning(false)
        callbackRef.current?.()
      }
      return
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer()
          setIsRunning(false)
          callbackRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return clearTimer
  }, [isRunning, timeLeft, clearTimer])

  return { timeLeft, isRunning, start, pause, resume, stop, reset }
}
