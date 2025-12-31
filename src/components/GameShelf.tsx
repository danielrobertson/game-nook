import React from 'react'

export default function GameShelf({ children }: { children?: React.ReactNode }) {
  const woodTexture = "url('/wood.png')"
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex justify-center">
      {/* 
         OUTER FRAME (Front Face)
         This is the thick wooden frame facing the user.
      */}
      <div 
        className="relative w-full rounded-t-2xl shadow-2xl overflow-hidden"
        style={{
          backgroundImage: woodTexture,
          backgroundSize: '200px',
          padding: '24px 24px 0 24px', // The generic frame thickness
          border: '1px solid #5D4037'
        }}
      >
        
        {/* 
            PERSPECTIVE CONTAINER (The "Hole")
            This contains the angled inner walls and the backboard.
            We simulate the walls by showing a darker wood background,
            and then placing the Backboard on top.
        */}
        <div className="relative rounded-t-lg overflow-hidden bg-[#5D4037]">
            
            {/* INNER WALLS TEXTURE (Darker Wood) */}
             <div className="absolute inset-0 z-0 opacity-80"
                style={{ backgroundImage: woodTexture, backgroundSize: '150px', filter: 'brightness(0.6)' }}
            ></div>

            {/* 
               THE BACKBOARD (The Back Surface)
               Inset with margins to show the "Inner Walls" around it.
            */}
            <div 
                className="relative z-10 flex flex-col min-h-[600px] border-2 border-[#5D4037]/30"
                style={{
                    backgroundColor: '#E6E1F0', // Lavender Layout
                    margin: '30px 25px 0 25px', // This margin reveals the Inner Walls
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
                }}
            >
                {/* 
                   DIAGONAL CREVICE LINES (Corner Depth)
                   These lines connect the outer frame corners to the backboard corners,
                   creating the definitive "Inset Box" look.
                */}
                {/* Top Left Diagonal */}
                <div 
                    className="absolute h-[2px] bg-[#5D4037]/60"
                    style={{ 
                        width: '50px',
                        top: '-12px', 
                        left: '-12px', 
                        transform: 'rotate(48deg)', 
                        transformOrigin: 'bottom right',
                    }} 
                />
                 {/* Top Right Diagonal */}
                <div 
                    className="absolute h-[2px] bg-[#5D4037]/60"
                    style={{ 
                        width: '50px',
                        top: '-12px', 
                        right: '-12px', 
                        transform: 'rotate(-48deg)', 
                        transformOrigin: 'bottom left',
                    }} 
                />

                {/* Rows */}
                <ShelfRow woodTexture={woodTexture} />
                <ShelfRow woodTexture={woodTexture} />
                <ShelfRow woodTexture={woodTexture} isBottom />
            </div>

        </div>
        
         {/* Bottom moulding */}
         <div className="h-4 w-full bg-black/10 absolute bottom-0 left-0 z-20"></div>
      </div>
    </div>
  )
}

function ShelfRow({ woodTexture, isBottom = false }: { woodTexture: string, isBottom?: boolean }) {
  return (
    <div className="flex-1 relative flex items-end px-4 group min-h-[200px]">
      
      {/* Content Area */}
      <div className="relative z-10 w-full h-full flex items-end justify-center pb-6">
         {/* Games */}
      </div>

       {/* The Shelf PLANK */}
      {!isBottom && (
        <div className="absolute bottom-0 left-[-27px] right-[-27px] z-20">
            {/* 
               1. Top Surface of Shelf 
               Trapezoidal clip-path to match perspective? 
               Or just simple block. Let's do simple block with side borders to match walls.
            */}
            <div 
                className="h-[18px] relative border-y border-[#5D4037]/30"
                style={{
                     backgroundImage: woodTexture,
                     backgroundSize: '200px',
                }}
            >
                <div className="absolute inset-0 bg-[#FFF8E1]/20"></div> {/* Highlight */}
            </div>

             {/* 2. Front Face of Shelf */}
             <div 
                className="h-[10px] relative shadow-lg"
                style={{
                    backgroundImage: woodTexture,
                    backgroundSize: '200px',
                    filter: 'brightness(0.75)',
                    borderBottom: '1px solid #5D4037',
                    borderRadius: '0 0 2px 2px'
                }}
             />
        </div>
      )}
    </div>
  )
}
