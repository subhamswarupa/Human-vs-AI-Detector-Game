import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { getSettings, saveSettings, resetProgress } from '@/utils/storage'
import type { Settings } from '@/types'
import { ArrowLeft, Music, Volume2, Moon, Sun, Sparkles, Trash2 } from 'lucide-react'

interface SettingsScreenProps {
  onBack: () => void
}

function Toggle({ enabled, onChange, label, icon: Icon }: {
  enabled: boolean
  onChange: (v: boolean) => void
  label: string
  icon: any
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${enabled ? 'text-purple-500' : 'text-gray-400'}`} />
        <span className="font-semibold text-gray-700">{label}</span>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-7 rounded-full transition-colors duration-200 ${
          enabled ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </div>
  )
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [settings, setSettings] = useState<Settings>(getSettings())

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  const update = (key: keyof Settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress()
      setSettings({
        musicEnabled: false,
        soundEnabled: true,
        darkMode: false,
        animationsEnabled: true,
      })
    }
  }

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
        <h1 className="text-3xl md:text-4xl font-black text-gradient mb-1">Settings</h1>
        <p className="text-gray-500">Customize your experience</p>
      </motion.div>

      <div className="max-w-md mx-auto space-y-4">
        <Card>
          <CardContent>
            <div className="divide-y divide-gray-100">
              <Toggle
                enabled={settings.soundEnabled}
                onChange={v => update('soundEnabled', v)}
                label="Sound Effects"
                icon={Volume2}
              />
              <Toggle
                enabled={settings.musicEnabled}
                onChange={v => update('musicEnabled', v)}
                label="Background Music"
                icon={Music}
              />
              <Toggle
                enabled={settings.darkMode}
                onChange={v => update('darkMode', v)}
                label="Dark Mode"
                icon={Moon}
              />
              <Toggle
                enabled={settings.animationsEnabled}
                onChange={v => update('animationsEnabled', v)}
                label="Animations"
                icon={Sparkles}
              />
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="danger"
            onClick={handleReset}
            className="w-full"
          >
            <Trash2 className="w-5 h-5" />
            Reset Progress
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
