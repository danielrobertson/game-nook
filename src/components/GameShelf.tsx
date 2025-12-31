import React from 'react'

export default function GameShelf({ children }: { children?: React.ReactNode }) {
  const woodTexture = "url('/wood.png')"

  return (
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
            <ShelfRow woodTexture={woodTexture} />
            <ShelfRow woodTexture={woodTexture} />
            <ShelfRow woodTexture={woodTexture} isBottom />
          </div>

        </div>

        {/* Bottom moulding/floor */}
        <div className="h-6 w-full absolute bottom-0 left-0 right-0 z-20 border-t border-[#5D4037]/30"
          style={{ backgroundImage: woodTexture, filter: 'brightness(0.4)' }}></div>
      </div>
    </div>
  )
}

function ShelfRow({ woodTexture, isBottom = false }: { woodTexture: string, isBottom?: boolean }) {
  return (
    <div className="flex-1 relative flex items-end px-2 group min-h-[200px]">

      {/* Content Area */}
      <div className="relative z-10 w-full h-full flex items-end justify-center pb-5">
        {/* Games would go here */}
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
