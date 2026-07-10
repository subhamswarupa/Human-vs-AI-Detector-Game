import { useCallback, useEffect } from 'react'
import { playSound, preloadSounds } from '@/utils/audio'
import { getSettings } from '@/utils/storage'

export function useSound() {
  useEffect(() => {
    preloadSounds()
  }, [])

  const play = useCallback((name: string) => {
    const settings = getSettings()
    if (settings.soundEnabled) {
      playSound(name)
    }
  }, [])

  return { playSound: play }
}
