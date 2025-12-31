import React from 'react'

const woodTexture_horizontal = "url('/wood-horizontal.png')"
const woodTexture_vertical = "url('/wood-vertical.png')"

export default function GameShelf({ children }: { children?: React.ReactNode }) {
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

  const toggle = (key: keyof typeof debug) => setDebug(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
      {/* 
         OUTER FRAME CONTAINER
         Removed padding/bg, now using separate divs for the frame parts
      */}
      <div
        className={`relative w-full rounded-t-lg shadow-2xl overflow-hidden ${debug.mainContainer ? 'bg-[#C69A80]' : ''}`} // bg is fallback
        style={{
          // border: '1px solid #5D4037',
          borderRadius: '12px 12px 0 0'
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
        <div className={`relative flex flex-col min-h-[600px] ${debug.room ? 'bg-[#5D4037]' : ''} m-[24px]`}>

          {/* THE BACKBOARD */}
          <div
            className={`relative z-20 flex-1 flex flex-col ${debug.backboard ? 'bg-[#BEB4A4]' : ''}`}
            style={{
              // backgroundColor: '#C4A484',
              marginTop: '30px', // Matches Height of Top Wall
              marginLeft: '24px', // Matches Width of Left Wall
              marginRight: '24px', // Matches Width of Right Wall
              // If we add boxShadow here we'll have to add it to the inside of every wall as well..
              // boxShadow: 'inset 0 0 40px rgba(0,0,0,0.15)',
            }}
          >
            {/* Rows */}
            {debug.shelf1 && <ShelfRow />}
            {debug.shelf2 && <ShelfRow />}
            {debug.shelf3 && <ShelfRow />}
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
    </div >
  )
}

function ShelfRow() {
  // Dimensions for the top surface perspective
  const height = 14
  const inset = 24

  // Calculate angle in degrees: tan(angle) = opposite/adjacent = inset/height
  const skewAngle = Math.atan(inset / height) * (180 / Math.PI)
  const topSurfaceDarkness = 0.2 // Adjust opacity (0-1) to make the top surface darker

  return (
    <div className="flex-1 relative flex items-end px-2 group min-h-[200px]">

      {/* Content Area */}
      <div className="relative z-10 w-full h-full flex items-end justify-center pb-5">
        {/* Games would go here */}
      </div>

      {/* The Shelf PLANK */}
      <div className="absolute bottom-0 left-[-24px] right-[-24px] z-20">
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
          className="h-[20px] relative shadow-lg"
          style={{
            // Match outer frame style
            backgroundImage: woodTexture_horizontal,
            backgroundSize: '200px',
            borderTop: '1px solid #5D4037',
            borderBottom: '1px solid #5D4037',
            // borderRadius: '0 0 2px 2px'
          }}
        />
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
        className="absolute top-0 bottom-0 left-0 w-[24px] z-30"
        style={{
          backgroundImage: woodTexture_vertical,
          borderLeft: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          borderRight: `1px solid ${borderColor}`,
        }}
      />
      {/* Inner Wall */}
      <div
        className="absolute top-0 bottom-0 left-[24px] w-[24px] z-10"
        style={{
          // backgroundColor: '#D7A785',
          backgroundImage: woodTexture_vertical,
          // Trapezoid narrowing rightwards - precise miter
          clipPath: 'polygon(0 0, 100% 30px, 100% 100%, 0 100%)',
          borderRight: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" style={{ opacity: topSurfaceDarkness }}></div> */}
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
        className="absolute top-0 bottom-0 right-0 w-[24px] z-30"
        style={{
          backgroundImage: woodTexture_vertical,
          borderLeft: `1px solid ${borderColor}`,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          borderRight: `1px solid ${borderColor}`,
        }}
      />
      <div
        className="absolute top-0 bottom-0 right-[24px] w-[24px] z-10"
        style={{
          // backgroundColor: '#D7A785',
          backgroundImage: woodTexture_vertical,
          // Trapezoid narrowing leftwards - precise miter
          clipPath: 'polygon(0 30px, 100% 0, 100% 100%, 0 100%)',
          borderLeft: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black" style={{ opacity: topSurfaceDarkness }}></div> */}
        <div className="absolute inset-0 bg-black" style={{ opacity: topSurfaceDarkness }}></div>
      </div>
    </>
  )
}

function TopWall({ debugShow = true }: { debugShow?: boolean }) {
  const borderColor = '#5D4037'
  const height = 30
  const inset = 23
  const skewAngle = Math.atan(inset / height) * (180 / Math.PI)
  const topSurfaceDarkness = 0.2

  return debugShow && (
    <>
      {/* Outer Top */}
      <div
        className="absolute top-0 left-[24px] right-[24px] h-[24px] z-30"
        style={{
          backgroundImage: woodTexture_horizontal,
          borderTop: `1px solid ${borderColor}`,
          borderBottom: `1px solid ${borderColor}`,
          // borderLeft: `1px solid ${borderColor}`,
          // borderRight: `1px solid ${borderColor}`,
        }}
      />

      {/* Inner Top */}
      <div
        className="absolute top-[24px] left-[24px] right-[24px] z-15"
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
        <div className="absolute inset-0 bg-black" style={{ opacity: topSurfaceDarkness }}></div>
      </div>

      {/* Slanted Border Lines overlay */}
      {/* We need these because the clipPath doesn't allow us to use a border on the slanted sides */}
      {/* Left Slant */}
      <div
        className="absolute top-[24px] w-0 z-20 pointer-events-none"
        style={{
          left: `24px`, // 24px offset from parent container
          height: `${height}px`,
          borderLeft: `1px solid ${borderColor}`,
          transform: `skewX(${skewAngle}deg)`,
          transformOrigin: 'top left'
        }}
      />

      {/* Right Slant */}
      <div
        className="absolute top-[24px] w-0 z-20 pointer-events-none"
        style={{
          right: `24px`, // 24px offset from parent container
          height: `${height}px`,
          borderRight: `1px solid ${borderColor}`,
          transform: `skewX(-${skewAngle}deg)`,
          transformOrigin: 'top right'
        }}
      />
    </>
  )
}
