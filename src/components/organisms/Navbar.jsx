import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import Button from '../atoms/Button'
import logo from '../../assets/logo.png'

const productSubLinks = [
  { to: '/products/buah',  label: 'Fitpan Buah',  emoji: '🍎' },
  { to: '/products/sayur', label: 'Fitpan Sayur', emoji: '🥦' },
  { to: '/products/mix',   label: 'Fitpan Mix',   emoji: '🥗' },
]

function ProductsDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-body-md font-medium text-gray-600 hover:text-primary-600 transition-colors"
      >
        Products
        <ChevronDown size={15} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
          {/* arrow */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
          <NavLink
            to="/products"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 text-body-sm font-semibold transition-colors border-b border-gray-100 mb-1 ${
                isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
              }`
            }
          >
            Semua Produk →
          </NavLink>
          {productSubLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-body-sm font-medium transition-colors rounded-xl mx-1 ${
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                }`
              }
            >
              <span className="text-base">{link.emoji}</span>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
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
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-body-md font-medium transition-colors ${
                isActive ? 'text-primary-600 font-semibold' : 'text-gray-600 hover:text-primary-600'
              }`
            }
          >
            Home
          </NavLink>

          <ProductsDropdown />

          {navLinks.filter((l) => l.to !== '/').map((link) => (
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
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          <NavLink
            to="/"
            end
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `block py-2 px-3 rounded-lg text-body-md font-medium transition-colors ${
                isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            Home
          </NavLink>

          {/* Products accordion */}
          <div>
            <button
              onClick={() => setMobileProductsOpen((v) => !v)}
              className="w-full flex items-center justify-between py-2 px-3 rounded-lg text-body-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Products
              <ChevronDown size={15} className={`transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProductsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary-100 pl-3">
                <NavLink
                  to="/products"
                  end
                  onClick={() => { setMobileOpen(false); setMobileProductsOpen(false) }}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-lg text-body-sm font-semibold transition-colors ${
                      isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
                    }`
                  }
                >
                  Semua Produk
                </NavLink>
                {productSubLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => { setMobileOpen(false); setMobileProductsOpen(false) }}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2 px-3 rounded-lg text-body-sm font-medium transition-colors ${
                        isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <span>{link.emoji}</span>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {navLinks.filter((l) => l.to !== '/').map((link) => (
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

          <Link to="/distributor" onClick={() => setMobileOpen(false)} className="block mt-2 pt-2">
            <Button variant="primary" className="w-full">Beli Sekarang</Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
