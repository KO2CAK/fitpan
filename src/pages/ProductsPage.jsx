import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'
import { useBeliCounter, useWebProductCategories } from '../hooks/useSupabase'

// ─── Category Card ─────────────────────────────────────────────────────────

function CategoryCard({ cat, index }) {
  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <Link to={`/products/${cat.id}`} className="group block h-full">
        <div className={`bg-gradient-to-br ${cat.bgClass} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
          {/* Visual header */}
          <div className="relative h-52 flex items-center justify-center overflow-hidden">
            {cat.variants[0]?.image_url
              ? <img src={cat.variants[0].image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              : <span className="text-[7rem] group-hover:scale-110 transition-transform duration-500">{cat.emoji}</span>
            }
            <div
              className="absolute top-4 right-4 text-xs font-heading font-bold px-3 py-1.5 rounded-full text-white shadow-sm"
              style={{ backgroundColor: cat.accentColor }}
            >
              {cat.variants.length} Varian
            </div>
          </div>

          {/* Content */}
          <div className="p-7 flex flex-col flex-1">
            <p className="text-xs font-heading font-bold tracking-widest uppercase mb-1" style={{ color: cat.accentColor }}>
              {cat.subtitle}
            </p>
            <h2 className="font-heading font-bold text-2xl text-primary-800 mb-3">{cat.name}</h2>
            <p className="text-body-sm text-gray-600 leading-relaxed mb-5 flex-1">{cat.tagline}</p>

            {/* Variant chips preview */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {cat.variants.slice(0, 5).map((v) => (
                <span
                  key={v.id}
                  className={`${cat.badgeBg} ${cat.textColor} text-xs font-semibold px-2.5 py-1 rounded-full`}
                >
                  {v.emoji} {v.name}
                </span>
              ))}
              {cat.variants.length > 5 && (
                <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                  +{cat.variants.length - 5} lagi
                </span>
              )}
            </div>

            <div
              className="flex items-center justify-between py-3 px-4 rounded-2xl text-white font-heading font-semibold text-sm transition-all group-hover:opacity-90"
              style={{ backgroundColor: cat.accentColor }}
            >
              <span>Lihat Semua Varian</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── ProductsPage ──────────────────────────────────────────────────────────
export default function ProductsPage() {
  const { count } = useBeliCounter()
  const { categories: productCategories } = useWebProductCategories()
  return (
    <div className="min-h-screen bg-background-light">
      {/* Page Header */}
      <div className="bg-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-300 text-xs font-heading font-bold tracking-widest uppercase mb-3"
          >
            Produk Kami
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4"
          >
            Keripik Sehat <span className="text-accent-400">Fitpan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-200 text-body-lg max-w-xl mx-auto mb-8"
          >
            Diproses secara alami, tanpa pengawet, tanpa MSG. Nikmati kelezatan buah dan sayuran dalam setiap gigitan renyah.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {/* <Link to="/distributor">
              <Button variant="accent">Beli Sekarang</Button>
            </Link> */}
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { label: 'Kategori', value: '3' },
              { label: 'Total Varian', value: `${productCategories.reduce((a, c) => a + c.variants.length, 0)}+` },
              { label: 'Tanpa Pengawet', value: '100%' },
              { label: 'Pelanggan Puas', value: `${count.toLocaleString('id-ID')}+` },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-heading font-bold text-primary-700">{s.value}</p>
                <p className="text-body-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-primary-800 py-14 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🌿', title: 'Tanpa MSG', desc: 'Bebas MSG & bahan kimia berbahaya' },
              { icon: '🚫', title: 'Tanpa Pengawet', desc: 'Alami 100%, tanpa bahan pengawet' },
              { icon: '⚡', title: 'Vacuum Frying', desc: 'Proses vakum, high quality of packaging' },
              { icon: '✅', title: 'Tanpa Minyak', desc: 'Proses tanpa minyak tambahan' },
            ].map((f) => (
              <div key={f.title} className="space-y-2">
                <div className="text-3xl">{f.icon}</div>
                <p className="font-heading font-bold">{f.title}</p>
                <p className="text-primary-300 text-body-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order CTA */}
      <div className="py-16 bg-background-darker text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-h3 text-primary-800 mb-3">Siap Memesan?</h2>
          <p className="text-body-md text-gray-600 mb-6">
            Hubungi distributor resmi kami atau pilih produk di atas untuk melihat daftar harga.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/distributor">
              <Button variant="primary">Hubungi Kami</Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}

