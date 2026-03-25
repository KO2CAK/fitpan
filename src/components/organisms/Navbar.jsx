import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from '../atoms/Button'
import logo from '../../assets/logo.png'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { to: '/products', label: 'Products' },
    { to: '/distributor', label: 'Distributor' },
    { to: '/inspiration', label: 'Inspiration' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Fitpan" className="h-10 w-auto object-contain" />
        </Link>

        {/* Nav Links Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-body-md font-medium transition-colors ${
                  isActive ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <Link to="/distributor">
            <Button variant="primary" size="sm">Beli Sekarang</Button>
          </Link>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} className="text-primary-600" /> : <Menu size={22} className="text-primary-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-lg text-body-md font-medium transition-colors ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/distributor" onClick={() => setMobileOpen(false)} className="block mt-2">
            <Button variant="primary" className="w-full">Beli Sekarang</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
