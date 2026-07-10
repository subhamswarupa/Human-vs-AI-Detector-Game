const audioCache = new Map<string, HTMLAudioElement>()

export function playSound(name: string): void {
  try {
    let audio = audioCache.get(name)
    if (!audio) {
      audio = new Audio(`/assets/audio/${name}.mp3`)
      audio.volume = 0.5
      audioCache.set(name, audio)
    }
    audio.currentTime = 0
    audio.play().catch(() => {})
  } catch {
    // Silently fail - audio is optional
  }
}

export function preloadSounds(): void {
  const sounds = ['click', 'correct', 'wrong', 'victory', 'countdown', 'achievement']
  sounds.forEach(name => {
    try {
      const audio = new Audio(`/assets/audio/${name}.mp3`)
      audio.volume = 0
      audio.load()
      audioCache.set(name, audio)
    } catch {}
  })
}
