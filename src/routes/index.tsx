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
    players: '1-5 Players',
    time: '40-70 Min',
    difficulty: 'Medium',
    owners: [
      { id: '1', name: 'Dave Lim', avatar: 'DL' },
      { id: '2', name: 'Daniel', avatar: 'DR' },
      { id: '3', name: 'Tom', avatar: 'T' },
      { id: '4', name: 'Sarah', avatar: 'S' },
      { id: '5', name: 'Mike', avatar: 'M' }
    ],
    comments: [
      { id: '1', author: 'Dave Lim', avatar: 'DL', text: 'I hate this game', likes: 2 },
      { id: '2', author: 'Allison', avatar: 'A', text: 'So cute! Who wants to play', likes: 5 },
      { id: '3', author: 'Daniel', avatar: 'DR', text: 'birb', likes: 1 }
    ]
  }, 
  { 
    id: "terraforming-mars", 
    title: "Terraforming Mars",
    spineImage: '/terraformingmars_spine.png',
    coverImage: '/terraformingmars_cover.png',
    description: 'Terraforming Mars is a strategy board game where players race to terraform Mars by developing technologies, managing resources, and building habitats. The game features a unique deck-building system and a dynamic board that changes with each game.',
    players: '1-5 Players',
    time: '120 Min',
    difficulty: 'Hard',
    owners: [
       { id: '1', name: 'Paul Milla', avatar: 'P' }
    ],
    comments: [
      { id: '1', author: 'Paul Milla', avatar: 'P', text: 'Fantastic, lots of playability', likes: 2 },
    ]
  }, 
  { 
    id: "agricola", 
    title: "Agricola",
    spineImage: '/agricola_spine.png',
    coverImage: '/agricola_cover.png',
    description: 'In Agricola, you\'re a farmer in a wooden shack with your spouse and little else. At first, on a turn, your family gets to take only two actions. Over time, you\'ll build a farm, raise livestock, and collect resources to improve your family\'s quality of life.',
    players: '1-4 Players',
    time: '90 Min',
    difficulty: 'Hard',
    owners: [
       { id: '1', name: 'Dave Lim', avatar: 'DL' }
    ],
    comments: [
      { id: '1', author: 'Dave Lim', avatar: 'D', text: 'I LOVE THIS GAME', likes: 2 },
    ]
  }, 

]

function App() {
  return (
    <div className="min-h-screen bg-cozy-dots text-stone-800 py-12">
      <GameShelf games={mockGames} />
    </div>
  )
}
