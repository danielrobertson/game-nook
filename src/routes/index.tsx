import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

import GameShelf from '../components/GameShelf'

function App() {

  return (
    <div className="min-h-screen bg-cozy-dots text-stone-800 py-12">
      <GameShelf />
    </div>
  )
}
