import React, { useState } from 'react'
import { X, ChevronDown, ChevronUp, Users, Clock, Brain } from 'lucide-react'

// Define the types
export interface Friend {
  id: string
  name: string
  avatar: string // Initials or image URL
}

export interface Comment {
  id: string
  author: string
  avatar: string
  text: string
  likes?: number
  owns?: boolean
}

export interface Game {
  id: string
  title: string
  spineImage: string
  coverImage: string
  description: string
  players?: string
  difficulty?: string
  time?: string
  owners: Friend[]
  comments: Comment[]
}

// Props for the GameShelf
interface GameShelfProps {
  games?: Game[]
}

const woodTexture_horizontal = "url('/wood-horizontal.png')"
const woodTexture_vertical = "url('/wood-vertical.png')"

// Adjust this value (0-1) to warm up the wood tone. 
// Higher values = more amber/orange influence.
const woodWarmthOpacity = 0.35

export default function GameShelf({ games = [] }: GameShelfProps) {
  const [debug, setDebug] = React.useState({
    mainContainer: true,
    room: true,
    backboard: true,
    leftWall: true,
    rightWall: true,
    topWall: true,
    shelf1: true,
    shelf2: true,
    shelf3: true
  })

  // Zoom state
  const [zoom, setZoom] = useState(1)
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.0))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.4))

  const toggle = (key: keyof typeof debug) => setDebug(p => ({ ...p, [key]: !p[key] }))

  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  // Distribute games across rows (simple logic for now: 5 per row)
  const itemsPerRow = 5
  const rows = [
    games.slice(0, itemsPerRow),
    games.slice(itemsPerRow, itemsPerRow * 2),
    games.slice(itemsPerRow * 2, itemsPerRow * 3)
  ]

  return (
    <div className="w-full max-w-[1500px] mx-auto p-4 flex flex-col items-center">
      {/* Zoom Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-[#5D4037] hover:bg-white hover:scale-110 transition-all border border-[#E0D8C0]"
          aria-label="Zoom In"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="p-3 bg-white/90 backdrop-blur shadow-lg rounded-full text-[#5D4037] hover:bg-white hover:scale-110 transition-all border border-[#E0D8C0]"
          aria-label="Zoom Out"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      </div>

      {/* 
         OUTER FRAME CONTAINER
         Removed padding/bg, now using separate divs for the frame parts
      */}
      <div
        className={`relative w-full rounded-t-lg shadow-2xl overflow-hidden transition-transform duration-300 ease-out origin-top ${debug.mainContainer ? 'bg-[#C69A80]' : ''}`} // bg is fallback
        style={{
          // border: '1px solid #5D4037',
          borderRadius: '12px 12px 0 0',
          transform: `scale(${zoom})`
        }}
      >

        {/* --- OUTER FRAME PARTS --- */}
        {/* Top Wall (Outer + Inner) */}
        <TopWall debugShow={debug.topWall} />

        {/* Left Wall (Outer + Inner) */}
        <LeftWall debugShow={debug.leftWall} />

        {/* Right Wall (Outer + Inner) */}
        <RightWall debugShow={debug.rightWall} />

        {/* 
            THE "ROOM" (Inner Recess) 
            Pushed in by 24px margin to sit inside the outer frame
        */}
        <div className={`relative flex flex-col min-h-[1000px] ${debug.room ? 'bg-[#5D4037]' : ''} m-[40px]`}>

          {/* THE BACKBOARD */}
          <div
            className={`relative z-20 flex-1 flex flex-col ${debug.backboard ? 'bg-[#BEB4A4]' : ''}`}
            style={{
              // backgroundColor: '#C4A484',
              marginTop: '55px', // Matches Height of Top Wall
              marginLeft: '40px', // Matches Width of Left Wall
              marginRight: '40px', // Matches Width of Right Wall
              // If we add boxShadow here we'll have to add it to the inside of every wall as well..
              // boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15)',
            }}
          >
            {/* Rows */}
            {debug.shelf1 && <ShelfRow games={rows[0]} onGameClick={setSelectedGame} />}
            {debug.shelf2 && <ShelfRow games={rows[1]} onGameClick={setSelectedGame} />}
            {debug.shelf3 && <ShelfRow games={rows[2]} onGameClick={setSelectedGame} />}
          </div>

        </div>
      </div>

      {/* DEBUG CONTROLS */}
      <div className="grid grid-cols-4 gap-2 mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="col-span-4 font-bold text-center mb-2">Debug Shelf Parts</h3>
        {Object.keys(debug).map((key) => (
          <button
            key={key}
            onClick={() => toggle(key as keyof typeof debug)}
            className={`px-3 py-1 text-md rounded border ${debug[key as keyof typeof debug]
              ? 'bg-blue-600 text-white border-blue-700'
              : 'bg-gray-200 text-gray-500 border-gray-300'
              } `}
          >
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Game Details Modal */}
      {selectedGame && (
        <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div >
  )
}

function ShelfRow({ games = [], onGameClick }: { games: Game[], onGameClick: (game: Game) => void }) {
  // Dimensions for the top surface perspective
  const height = 25
  const inset = 40

  // Calculate angle in degrees: tan(angle) = opposite/adjacent = inset/height
  const skewAngle = Math.atan(inset / height) * (180 / Math.PI)
  const topSurfaceDarkness = 0.2 // Adjust opacity (0-1) to make the top surface darker

  return (
    <div className="flex-1 relative flex items-end px-2 group min-h-[350px]">
      <div className="absolute z-30 w-[calc(100%+80px)] -ml-10 h-full flex items-end justify-center px-6 pb-[45px] gap-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onGameClick(game)}
            className="relative transition-transform hover:-translate-y-3 hover:scale-110 focus:outline-none"
          >
            <img
              src={game.spineImage}
              alt={`${game.title} spine`}
              className="h-[340px] w-auto object-contain drop-shadow-2xl rounded-[1px]"
            />
          </button>
        ))}
      </div>

      {/* The Shelf PLANK */}
      <div className="absolute bottom-0 left-[-40px] right-[-40px] z-20">
        {/* 1. Top Surface of Shelf */}
        <div
          className="relative border-[#5D4037]/40"
          style={{
            height: `${height}px`,
            backgroundImage: woodTexture_horizontal,
            backgroundSize: '200px',
            borderTop: '1px solid #5D4037',
            // Trapezoid perspective matching inner wall depth
            clipPath: `polygon(${inset}px 0, calc(100% - ${inset}px) 0, 100% 100%, 0 100%)`
          }}
        >
          {/* Warmth Overlay */}
          <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
          {/* Darkness Overlay */}
          <div className="absolute inset-0 bg-black" style={{ opacity: topSurfaceDarkness }}></div>
        </div>

        {/* Slanted Borders for Top Surface */}
        {/* Left Edge */}
        <div
          className="absolute top-0 w-0 z-30 pointer-events-none"
          style={{
            left: `${inset}px`,
            height: `${height}px`,
            borderLeft: '1px solid #5D4037',
            transform: `skewX(-${skewAngle}deg)`,
            transformOrigin: 'top left'
          }}
        />
        {/* Right Edge */}
        <div
          className="absolute top-0 w-0 z-30 pointer-events-none"
          style={{
            right: `${inset}px`,
            height: `${height}px`,
            borderRight: '1px solid #5D4037',
            transform: `skewX(${skewAngle}deg)`,
            transformOrigin: 'top right'
          }}
        />

        {/* 2. Front Face of Shelf (Thicker) */}
        <div
          className="h-[35px] relative shadow-lg"
          style={{
            // Match outer frame style
            backgroundImage: woodTexture_horizontal,
            backgroundSize: '200px',
            borderTop: '1px solid #5D4037',
            borderBottom: '1px solid #5D4037',
            // borderRadius: '0 0 2px 2px'
          }}
        >
          {/* Warmth Overlay */}
          <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
        </div>
      </div>
    </div>
  )
}

function GameDetailModal({ game, onClose }: { game: Game, onClose: () => void }) {
  const [showOwners, setShowOwners] = useState(false)

  // Explicitly check if owners array exists and calculate length properly
  const ownersCount = game.owners?.length || 0
  const hasOwners = ownersCount > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F6] rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border-4 border-[#F3E5AB] max-h-[90vh]">

        {/* HEADER: Cover + Info Side-by-Side */}
        <div className="relative p-6 bg-amber-50/50 border-b border-[#E0D8C0] flex gap-5 items-start shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/50 hover:bg-white rounded-full text-[#5D4037] transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Cover Image */}
          <div className="shrink-0">
            <img
              src={game.coverImage}
              alt={game.title}
              className="w-24 h-24 object-cover rounded-lg shadow-md rotate-[-2deg]"
            />
          </div>

          {/* Title & Stats */}
          <div className="flex-1 pt-1 min-w-0">
            <h2 className="text-xl font-bold text-[#5D4037] font-display leading-tight mb-3 truncate">{game.title}</h2>

            <div className="flex flex-wrap gap-3 mt-1">
              {game.players && (
                <span className="text-xs text-[#6D5A50] font-bold flex items-center gap-1.5">
                  <Users size={14} className="text-[#8D7F75]" />
                  {game.players}
                </span>
              )}
              {game.time && (
                <span className="text-xs text-[#6D5A50] font-bold flex items-center gap-1.5 border-l border-[#E0D8C0] pl-3">
                  <Clock size={14} className="text-[#8D7F75]" />
                  {game.time}
                </span>
              )}
              {game.difficulty && (
                <span className="text-xs text-[#6D5A50] font-bold flex items-center gap-1.5 border-l border-[#E0D8C0] pl-3">
                  <Brain size={14} className="text-[#8D7F75]" />
                  {game.difficulty}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">

          {/* Short Description */}
          <div className="mb-6">
            <p className="text-[#6D5A50] text-sm leading-relaxed line-clamp-3">
              {game.description}
            </p>
          </div>

          {/* OWNERS SECTION */}
          <div className="mb-6">
            {hasOwners ? (
              <>
                <h3 className="text-xs font-bold text-[#8D7F75] uppercase tracking-widest mb-3">Owned by {ownersCount} Friends</h3>
                <div
                  className="flex items-center gap-3 cursor-pointer p-3 bg-white border border-[#E0D8C0] rounded-xl hover:bg-[#F5F1E8] transition-colors"
                  onClick={() => setShowOwners(!showOwners)}
                >
                  {/* Avatar Stack */}
                  <div className="flex -space-x-3">
                    {game.owners.slice(0, 5).map(owner => (
                      <div key={owner.id} className="w-8 h-8 rounded-full border-2 border-white bg-[#D6A886] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                        {owner.avatar}
                      </div>
                    ))}
                    {ownersCount > 5 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-[#E0D8C0] flex items-center justify-center text-[#5D4037] text-[10px] font-bold shadow-sm">
                        +{ownersCount - 5}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#5D4037] flex items-center gap-1">
                      View Friends
                      {showOwners ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </p>
                  </div>
                </div>

                {/* Expandable Owners List */}
                {showOwners && (
                  <div className="mt-2 bg-white/50 border border-[#E0D8C0] rounded-xl p-2 animate-in slide-in-from-top-2">
                    {game.owners.map(owner => (
                      <div key={owner.id} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg transition-colors">
                        <div className="w-6 h-6 rounded-full bg-[#D6A886] flex items-center justify-center text-white text-[10px] font-bold">
                          {owner.avatar}
                        </div>
                        <span className="text-[#5D4037] font-medium text-sm">{owner.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-[#8D7F75] italic">No friends own this game yet.</p>
            )}
          </div>

          {/* COMMENTS SECTION */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E0D8C0]">
            <h3 className="text-sm font-bold text-[#5D4037] mb-4 flex items-center gap-2">
              <span>Friends' Thoughts</span>
            </h3>

            <div className="space-y-4">
              {game.comments.length > 0 ? game.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm text-xs">
                      {comment.avatar}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#5D4037] text-sm">{comment.author}</span>
                        {comment.owns && (
                          <span className="px-1.5 py-0.5 bg-[#C1E8CE] text-[#2C4834] text-[9px] font-bold uppercase tracking-wider rounded-sm border border-[#A3D9B5]">Owns</span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8D7F75]">2h</span>
                    </div>
                    {comment.text && (
                      <div className="bg-[#F5F1E8] p-2.5 rounded-lg rounded-tl-none text-[#5D4037] text-sm leading-relaxed relative">
                        "{comment.text}"
                      </div>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-center py-4">
                  <p className="text-[#8D7F75] text-xs italic">No thoughts yet.</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E0D8C0]">
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full px-3 py-2.5 rounded-lg bg-[#F5F1E8] border-none focus:ring-2 focus:ring-[#C1E8CE] text-[#5D4037] placeholder-[#8D7F75] text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LeftWall({ debugShow = true }: { debugShow?: boolean }) {
  const borderColor = '#5D4037'
  const topSurfaceDarkness = 0.2

  return debugShow && (
    <>
      {/* Front Wall */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[40px] z-30"
        style={{
          backgroundImage: woodTexture_vertical,
          borderLeft: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          borderRight: `1px solid ${borderColor}`,
          borderTopLeftRadius: '12px',
          overflow: 'hidden'
        }}
      >
        {/* Warmth Overlay */}
        <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
      </div>
      {/* Inner Wall */}
      <div
        className="absolute top-0 bottom-0 left-[40px] w-[40px] z-10"
        style={{
          // backgroundColor: '#D7A785',
          backgroundImage: woodTexture_vertical,
          // Trapezoid narrowing rightwards - precise miter
          clipPath: 'polygon(0 0, 100% 55px, 100% 100%, 0 100%)',
          borderRight: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >

        {/* Warmth Overlay */}
        <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
        {/* Darkness Overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: topSurfaceDarkness }}></div>
      </div>
    </>
  )
}

function RightWall({ debugShow = true }: { debugShow?: boolean }) {
  const borderColor = '#5D4037'
  const topSurfaceDarkness = 0.2

  return debugShow && (
    <>
      <div
        className="absolute top-0 bottom-0 right-0 w-[40px] z-30"
        style={{
          backgroundImage: woodTexture_vertical,
          borderLeft: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          borderRight: `1px solid ${borderColor}`,
          borderTopRightRadius: '12px',
          overflow: 'hidden'
        }}
      >
        {/* Warmth Overlay */}
        <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
      </div>
      <div
        className="absolute top-0 bottom-0 right-[40px] w-[40px] z-10"
        style={{
          // backgroundColor: '#D7A785',
          backgroundImage: woodTexture_vertical,
          // Trapezoid narrowing leftwards - precise miter
          clipPath: 'polygon(0 55px, 100% 0, 100% 100%, 0 100%)',
          borderLeft: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >

        {/* Warmth Overlay */}
        <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
        {/* Darkness Overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: topSurfaceDarkness }}></div>
      </div>
    </>
  )
}

function TopWall({ debugShow = true }: { debugShow?: boolean }) {
  const borderColor = '#5D4037'
  const height = 55
  const inset = 38
  const skewAngle = Math.atan(inset / height) * (180 / Math.PI)
  const topSurfaceDarkness = 0.2

  return debugShow && (
    <>
      {/* Outer Top */}
      <div
        className="absolute top-0 left-[40px] right-[40px] h-[40px] z-30"
        style={{
          backgroundImage: woodTexture_horizontal,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          // borderRight: `1px solid ${borderColor}`,
        }}
      >
        {/* Warmth Overlay */}
        <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
      </div>

      {/* Inner Top */}
      <div
        className="absolute top-[40px] left-[40px] right-[40px] z-15"
        style={{
          height: `${height}px`,
          // backgroundColor: '#D7A785',
          backgroundImage: woodTexture_horizontal,
          backgroundSize: '200px',
          // Trapezoid narrowing downwards - precise miter
          clipPath: `polygon(0 0, 100% 0, calc(100% - ${inset}px) 100%, ${inset}px 100%)`,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >

        {/* Warmth Overlay */}
        <div className="absolute inset-0 bg-amber-500 mix-blend-overlay pointer-events-none" style={{ opacity: woodWarmthOpacity }}></div>
        {/* Darkness Overlay */}
        <div className="absolute inset-0 bg-black" style={{ opacity: topSurfaceDarkness }}></div>
      </div>

      {/* Slanted Border Lines overlay */}
      {/* We need these because the clipPath doesn't allow us to use a border on the slanted sides */}
      {/* Left Slant */}
      <div
        className="absolute top-[40px] w-0 z-20 pointer-events-none"
        style={{
          left: `40px`, // 40px offset from parent container
          height: `${height}px`,
          borderLeft: `1px solid ${borderColor}`,
          transform: `skewX(${skewAngle}deg)`,
          transformOrigin: 'top left'
        }}
      />

      {/* Right Slant */}
      <div
        className="absolute top-[40px] w-0 z-20 pointer-events-none"
        style={{
          right: `40px`, // 40px offset from parent container
          height: `${height}px`,
          borderRight: `1px solid ${borderColor}`,
          transform: `skewX(-${skewAngle}deg)`,
          transformOrigin: 'top right'
        }}
      />
    </>
  )
}
