import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-green-200 border-b-4 border-stone-400 shadow-sm">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold text-stone-800 tracking-tight hover:scale-105 transition-transform drop-shadow-sm"
        >
          Game Nook
        </Link>
      </div>

      <nav className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-green-300/30 p-1 rounded-full">
          <NavLink to="/" label="My Shelf" />
          <NavLink to="/friends" label="Friends" />
          <NavLink to="/stickers" label="Stickers" />
        </div>
      </nav>
    </header>
  )
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="px-5 py-2 rounded-full text-lg font-bold text-stone-600 hover:text-stone-800 hover:bg-amber-50/50 transition-all duration-200"
      activeProps={{
        className: "px-5 py-2 rounded-full text-lg font-bold text-stone-800 bg-amber-50 shadow-sm ring-2 ring-amber-50/20"
      }}
    >
      {label}
    </Link>
  )
}
