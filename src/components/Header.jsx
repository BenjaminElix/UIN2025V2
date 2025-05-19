import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Logo-tekst gjort klikkbar */}
      <Link to="/" className="text-2xl font-bold hover:underline">
        BillettLyst
      </Link>

      {/* Hovednavigasjon */}
      <nav className="flex space-x-6">
        <NavLink 
          to="/category/musikk" 
          className={({ isActive }) => isActive ? 'font-semibold' : 'hover:underline'}
        >
          Musikk
        </NavLink>
        <NavLink 
          to="/category/sport" 
          className={({ isActive }) => isActive ? 'font-semibold' : 'hover:underline'}
        >
          Sport
        </NavLink>
        <NavLink 
          to="/category/teater" 
          className={({ isActive }) => isActive ? 'font-semibold' : 'hover:underline'}
        >
          Teater/Show
        </NavLink>
      </nav>

      {/* Login-lenk */}
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? 'font-semibold' : 'hover:underline'}
      >
        Logg inn
      </NavLink>
    </header>
  )
}
