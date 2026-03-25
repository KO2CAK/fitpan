import { Link } from 'react-router-dom'
import { Instagram, Youtube } from 'lucide-react'
import logo from '../../assets/logo.png'

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center mb-4">
              <img src={logo} alt="Fitpan" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-primary-200 text-body-sm leading-relaxed">
              Snack sehat premium untuk gaya hidup aktif. Tinggi serat, rendah gula, energi stabil sepanjang hari.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h5 className="font-heading font-bold text-accent-300 uppercase tracking-widest text-xs mb-4">Explore</h5>
            <ul className="space-y-2 text-body-sm text-primary-200">
              <li><Link to="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/inspiration" className="hover:text-white transition-colors">Inspiration</Link></li>
              <li><Link to="/distributor" className="hover:text-white transition-colors">Distributor</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h5 className="font-heading font-bold text-accent-300 uppercase tracking-widest text-xs mb-4">Shop</h5>
            <ul className="space-y-2 text-body-sm text-primary-200">
              <li><Link to="/distributor" className="hover:text-white transition-colors">Distributor Resmi</Link></li>
              <li>
                <a href="https://shopee.co.id" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Shopee
                </a>
              </li>
              <li>
                <a href="https://tokopedia.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Tokopedia
                </a>
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h5 className="font-heading font-bold text-accent-300 uppercase tracking-widest text-xs mb-4">Follow</h5>
            <ul className="space-y-2 text-body-sm text-primary-200">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Instagram size={14} /> Instagram
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="text-xs font-bold">TT</span> TikTok
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Youtube size={14} /> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-600 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-primary-300 text-body-xs">
          <p>&copy; 2026 Fitpan Indonesia. All rights reserved.</p>
          <p>Balikpapan, Kalimantan Timur, Indonesia</p>
        </div>
      </div>
    </footer>
  )
}
