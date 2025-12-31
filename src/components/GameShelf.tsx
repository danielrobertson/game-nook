import React, { useState } from 'react'
import { X } from 'lucide-react'

// Define the Game type
export interface Game {
  id: string
  title: string
  spineImage: string
  coverImage: string
  description: string
  comments: Comment[]
}

export interface Comment {
  id: string
  author: string
  avatar: string
  text: string
  likes?: number
}

// Props for the GameShelf
interface GameShelfProps {
  games?: Game[]
}

export default function GameShelf({ games = [] }: GameShelfProps) {
  const woodTexture = "url('/wood.png')"
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  
  // Distribute games across rows (simple logic for now: 5 per row)
  const itemsPerRow = 5
  const rows = [
    games.slice(0, itemsPerRow),
    games.slice(itemsPerRow, itemsPerRow * 2),
    games.slice(itemsPerRow * 2, itemsPerRow * 3)
  ]

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-4 flex justify-center">
        {/* 
           OUTER FRAME (Front Face)
        */}
        <div
          className="relative w-full rounded-t-lg shadow-2xl overflow-hidden"
          style={{
            // Main Frame Color/Texture (Darkened)
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), ${woodTexture}`,
            backgroundSize: '200px',
            padding: '24px', // Frame Thickness
            border: '2px solid #5D4037',
            borderRadius: '12px 12px 0 0'
          }}
        >

          {/* 
              THE "ROOM" (Inner Recess) 
              We construct this using 3 visually distinct walls (Top, Left, Right)
              plus the Backboard.
          */}
          <div className="relative flex flex-col min-h-[600px] bg-[#5D4037]">

            {/* INNER TOP WALL (Ceiling) */}
            <div
              className="absolute top-0 left-0 right-0 h-[30px] z-10"
              style={{
                backgroundColor: '#D6A886',
                // Trapezoid narrowing downwards - precise miter
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 24px) 100%, 24px 100%)',
              }}
            >
              {/* Inner shadow */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* INNER LEFT WALL */}
            <div
              className="absolute top-0 bottom-0 left-0 w-[24px] z-10"
              style={{
                backgroundColor: '#D6A886',
                // Trapezoid narrowing rightwards - precise miter
                clipPath: 'polygon(0 0, 100% 30px, 100% 100%, 0 100%)',
              }}
            >
              {/* Gradient to darken the deeper part */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"></div>
            </div>

            {/* INNER RIGHT WALL */}
            <div
              className="absolute top-0 bottom-0 right-0 w-[24px] z-10"
              style={{
                backgroundColor: '#D6A886',
                // Trapezoid narrowing leftwards - precise miter
                clipPath: 'polygon(0 30px, 100% 0, 100% 100%, 0 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/30"></div>
            </div>


            {/* 
                  THE BACKBOARD 
                  Pushed in by margins to sit "behind" the inner walls
              */}
            <div
              className="relative z-20 flex-1 flex flex-col"
              style={{
                backgroundColor: '#C6987F',
                marginTop: '30px', // Matches Height of Top Wall
                marginLeft: '24px', // Matches Width of Left Wall
                marginRight: '24px', // Matches Width of Right Wall
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15)',
              }}
            >
              {/* Rows */}
              <ShelfRow woodTexture={woodTexture} games={rows[0]} onGameClick={setSelectedGame} />
              <ShelfRow woodTexture={woodTexture} games={rows[1]} onGameClick={setSelectedGame} />
              <ShelfRow woodTexture={woodTexture} isBottom games={rows[2]} onGameClick={setSelectedGame} />
            </div>

          </div>

          {/* Bottom moulding/floor */}
          <div className="h-6 w-full absolute bottom-0 left-0 right-0 z-20 border-t border-[#5D4037]/30"
            style={{ backgroundImage: woodTexture, filter: 'brightness(0.4)' }}></div>
        </div>
      </div>

      {/* Game Details Modal */}
      {selectedGame && (
        <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </>
  )
}

function ShelfRow({ woodTexture, isBottom = false, games = [], onGameClick }: { woodTexture: string, isBottom?: boolean, games: Game[], onGameClick: (game: Game) => void }) {
  return (
    <div className="flex-1 relative flex items-end px-2 group min-h-[200px]">

      {/* Content Area */}
      <div className="relative z-10 w-full h-full flex items-end justify-start px-8 pb-5 gap-2">
         {games.map((game) => (
           <button 
             key={game.id} 
             onClick={() => onGameClick(game)}
             className="relative transition-transform hover:-translate-y-2 hover:scale-105 focus:outline-none"
           >
             <img 
               src={game.spineImage} 
               alt={`${game.title} spine`} 
               className="h-40 w-auto object-contain drop-shadow-md rounded-sm"
               style={{ maxWidth: '60px' }} 
             />
           </button>
         ))}
      </div>

      {/* The Shelf PLANK */}
      {!isBottom && (
        <div className="absolute bottom-0 left-[-24px] right-[-24px] z-20">
          {/* 1. Top Surface of Shelf */}
          <div
            className="h-[14px] relative border-y border-[#5D4037]/40"
            style={{
              backgroundColor: '#D6A886', // Top surface matches inner walls
              // Trapezoid perspective matching inner wall depth (24px)
              clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 100%, 0 100%)'
            }}
          >
            <div className="absolute inset-0 bg-[#FFF8E1]/30"></div>
          </div>

          {/* 2. Front Face of Shelf (Thicker) */}
          <div
            className="h-[20px] relative shadow-lg"
            style={{
              // Match outer frame style
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), ${woodTexture}`,
              backgroundSize: '200px',
              borderBottom: '1px solid #5D4037',
              borderRadius: '0 0 2px 2px'
            }}
          />
        </div>
      )}
    </div>
  )
}

function GameDetailModal({ game, onClose }: { game: Game, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-200 border-4 border-[#F3E5AB]">
         {/* Left Side: Game Cover & Basics */}
         <div className="p-8 bg-amber-50/50 flex flex-col items-center justify-center md:w-1/3 border-r border-[#E0D8C0]">
            <img 
              src={game.coverImage} 
              alt={game.title} 
              className="w-full max-w-[250px] rounded-lg shadow-xl rotate-[-2deg] mb-6 hover:rotate-0 transition-transform duration-300"
            />
            <h2 className="text-2xl font-bold text-[#5D4037] text-center font-display">{game.title}</h2>
            
            <div className="mt-4 flex gap-2">
               <span className="px-3 py-1 bg-[#C1E8CE] text-[#2C4834] rounded-full text-xs font-bold uppercase tracking-wider">Strategy</span>
               <span className="px-3 py-1 bg-[#F3E5AB] text-[#5D4037] rounded-full text-xs font-bold uppercase tracking-wider">Family</span>
            </div>
         </div>

         {/* Right Side: Details & Community */}
         <div className="relative md:w-2/3 flex flex-col h-[600px]">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full text-[#5D4037] transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
              <h3 className="text-lg font-bold text-[#5D4037] mb-2">About this game</h3>
              <p className="text-[#6D5A50] leading-relaxed mb-8">
                {game.description}
              </p>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E0D8C0]">
                <h3 className="text-lg font-bold text-[#5D4037] mb-4 flex items-center gap-2">
                  <span>Friends' Shelves</span>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">{game.comments.length} Friends</span>
                </h3>
                
                <div className="space-y-6">
                  {game.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                           {comment.author.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#5D4037]">On {comment.author}'s Shelf</span>
                          <span className="text-xs text-[#8D7F75]">2h ago</span>
                        </div>
                        <div className="bg-[#F5F1E8] p-3 rounded-lg rounded-tl-none text-[#5D4037] text-sm leading-relaxed relative">
                           {/* Little triangle for speech bubble */}
                           <div className="absolute top-0 left-[-6px] w-0 h-0 border-t-[6px] border-t-[#F5F1E8] border-l-[6px] border-l-transparent"></div>
                          "{comment.text}"
                        </div>
                        {comment.likes && (
                          <button className="text-xs text-[#8D7F75] font-semibold mt-1 hover:text-[#5D4037]">
                            Like ({comment.likes})
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-[#E0D8C0]">
                   <input 
                     type="text" 
                     placeholder="Write a comment..." 
                     className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] border-none focus:ring-2 focus:ring-[#C1E8CE] text-[#5D4037] placeholder-[#8D7F75]"
                   />
                </div>
              </div>
            </div>
         </div>
      </div>
    </div>
  )
}
