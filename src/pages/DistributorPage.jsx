import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'

export default function DistributorPage() {
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 pt-8 w-full">
        <Link to="/" className="inline-flex items-center gap-1 text-body-sm text-gray-500 hover:text-primary-600 transition-colors">
          ← Kembali ke Beranda
        </Link>
      </div>

      {/* Main Coming Soon */}
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <span className="text-6xl">📦</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary-500 text-xs font-heading font-bold tracking-widest uppercase mb-3"
          >
            Distributor Resmi
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-heading font-bold text-primary-800 mb-6"
          >
            Coming <span className="text-accent-500">Soon</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-body-lg text-gray-600 mb-8 leading-relaxed"
          >
            Halaman distributor resmi Fitpan sedang dalam pengembangan. Kami sedang memperluas jaringan
            distributor ke seluruh Indonesia. Hubungi kami sementara melalui WhatsApp untuk informasi pembelian.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/628983487706?text=Halo%20Fitpan%2C%20saya%20ingin%20membeli%20produk%20Fitpan"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="lg">
                💬 Hubungi via WhatsApp
              </Button>
            </a>
            <Link to="/products">
              <Button variant="outline" size="lg">Lihat Produk</Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Info cards */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-heading font-bold tracking-widest uppercase text-primary-500 mb-8">
            Juga tersedia di
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Shopee', emoji: '🛍️', href: 'https://shopee.co.id', color: 'bg-orange-50 text-orange-700' },
              { name: 'Tokopedia', emoji: '🟢', href: 'https://tokopedia.com', color: 'bg-green-50 text-green-700' },
              { name: 'TikTok Shop', emoji: '🎵', href: 'https://tiktok.com', color: 'bg-pink-50 text-pink-700' },
            ].map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${s.color} border border-transparent hover:border-current transition-all shadow-sm`}
              >
                <span className="text-3xl">{s.emoji}</span>
                <span className="font-heading font-bold text-sm">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
