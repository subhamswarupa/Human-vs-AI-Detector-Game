# Human vs AI Detector Game

An interactive game that challenges players to determine whether a piece of content — images, text, code, artwork, or audio — was created by a **Human** or an **AI**.

Built entirely for offline use with no external APIs, no backend, and no authentication.

## Features

- **5 Categories**: Images, Text, Code Snippets, Artwork, Audio Clips
- **20+ Unique Questions** randomly selected each game
- **Real-time Timer** with countdown animation
- **Combo & Streak System** for bonus points
- **Detailed Feedback** with explanations and fun facts for each answer
- **Achievement System** with unlockable badges
- **Leaderboard** with personal stats (LocalStorage)
- **Animated UI** with Framer Motion throughout
- **Responsive Design** — desktop, tablet, and mobile
- **Dark/Light Mode** support
- **Sound Effects** with toggle
- **Keyboard Accessible** with ARIA labels

## Tech Stack

- **React 19** + **TypeScript 6**
- **Vite 8** (fast dev server & builds)
- **Tailwind CSS 4** (utility-first styling)
- **Framer Motion 12** (animations)
- **Lucide React** (icons)
- **Radix UI** (accessible primitives)
- **shadcn/ui** patterns (component design)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd human-vs-ai-detector-game

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
human-vs-ai-detector-game/
├── public/
│   └── assets/
│       ├── images/       # Image question SVGs
│       ├── audio/        # Audio question files
│       ├── art/          # Art question SVGs
│       ├── code/         # Code snippet examples
│       └── text/         # Text content examples
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── layout/       # Layout components
│   │   └── game/         # Game-specific components
│   ├── pages/            # Screen pages
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── data/             # Questions & achievements data
│   ├── App.tsx           # Main app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles & Tailwind config
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## How to Play

1. **Start**: Click "Start Game" on the splash screen
2. **Choose Category**: Questions are randomly selected from 5 categories
3. **Examine**: Look at the content — it could be an image, text, code, artwork, or audio
4. **Decide**: Click "Human" or "AI" to make your guess
5. **Learn**: Get instant feedback with the correct answer, explanation, and fun fact
6. **Score**: Build combos and streaks for higher scores
7. **Achieve**: Unlock badges based on your performance

## Scoring

- Base points per question vary by difficulty (100-300)
- Combo multiplier increases points for consecutive correct answers
- Streak bonuses for maintaining long correct streaks
- Hint usage reduces potential achievement unlocks

## License

MIT

---

Built for Hackathon
