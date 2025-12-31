import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

import GameShelf, { Game } from '../components/GameShelf'

const mockGames: Game[] = [
  {
    id: 'wingspan',
    title: 'Wingspan',
    spineImage: '/wingspan_spine.png',
    coverImage: '/wingspan_cover.png',
    description: 'Wingspan is a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games. You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves.',
    comments: [
      { id: '1', author: 'Dave Lim', avatar: 'DL', text: 'I hate this game', likes: 2 },
      { id: '2', author: 'Allison', avatar: 'A', text: 'So cute! Who wants to play', likes: 5 },
      { id: '3', author: 'Daniel', avatar: 'DR', text: 'birb', likes: 1 }
    ]
  }

]

function App() {
  return (
    <div className="min-h-screen bg-cozy-dots text-stone-800 py-12">
      <GameShelf games={mockGames} />
    </div>
  )
}
