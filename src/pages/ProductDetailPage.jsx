import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, Link, Navigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import { useCart } from '../context/CartContext'
import { useWebProductCategories } from '../hooks/useSupabase'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [search, setSearch] = useState('')
  const { addToCart, setIsCartOpen } = useCart()
  const { categories: productCategories, loading } = useWebProductCategories()
  const [slideIndex, setSlideIndex] = useState(0)

  const cat = productCategories.find((c) => c.id === id)

  // Derive images before any early return (hooks must run unconditionally)
  const images = cat ? cat.variants.filter((v) => v.image_url).map((v) => ({ url: v.image_url, name: v.name })) : []

  // Auto-advance carousel every 2.5 s
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => setSlideIndex((i) => (i + 1) % images.length), 2500)
    return () => clearInterval(timer)
  }, [images.length])

  if (!loading && !cat) return <Navigate to="/products" replace />
  if (!cat) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const filtered = search
    ? cat.variants.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))
    : cat.variants

  // Other categories for cross-linking
  const others = productCategories.filter((c) => c.id !== id)

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className={`bg-gradient-to-br ${cat.bgClass} pb-16 pt-10`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-body-sm text-gray-500 hover:text-primary-600 mb-8 transition-colors"
          >
            ← Kembali ke Produk
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <p
                className="text-xs font-heading font-bold tracking-widest uppercase"
                style={{ color: cat.accentColor }}
              >
                {cat.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-800 leading-tight">
                {cat.name}
              </h1>
              <p className="text-body-md text-gray-700 leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-3">
                <a href="#variants-grid">
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: cat.accentColor }}
                  >
                    Pilih Produk →
                  </button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              {images.length > 0 ? (
                <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={images[slideIndex].url}
                      src={images[slideIndex].url}
                      alt={images[slideIndex].name}
                      className="w-full h-full object-cover absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  {/* Dot indicators */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === slideIndex ? 'bg-white scale-125' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {/* Current product label */}
                  <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {images[slideIndex].name}
                  </div>
                </div>
              ) : (
                <div className="text-[9rem] drop-shadow-md">{cat.emoji}</div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <p className="text-body-sm text-gray-500">
              <span className="font-bold text-primary-700">{cat.variants.length} varian</span> tersedia
            </p>
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari varian..."
              className="border border-gray-200 rounded-xl px-4 py-2 text-body-sm focus:outline-none focus:border-primary-400 w-56"
            />
          </div>
        </div>
      </div>

      {/* Variants Grid */}
      <div id="variants-grid" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p>Tidak ada varian yang cocok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.06 }}
                className={`bg-gradient-to-br ${cat.bgClass} border ${cat.borderColor} rounded-2xl overflow-hidden flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow`}
              >
                {v.image_url
                  ? <img src={v.image_url} alt={v.name} className="w-full h-36 object-cover" />
                  : <span className="text-4xl pt-5">{v.emoji}</span>
                }
                <div className="px-4 pb-4 flex flex-col items-center gap-3 w-full">
                <p className="font-heading font-bold text-sm text-primary-800 leading-tight">{v.name}</p>
                {v.desc && (
                  <p className="text-xs text-gray-500 leading-snug">{v.desc}</p>
                )}
                {v.price ? (
                  <>
                    <p className={`text-sm font-bold ${cat.textColor} mt-auto`}>
                      Rp {v.price.toLocaleString('id-ID')}
                    </p>
                    <p className={`text-xs font-semibold ${
                      v.stock === 0 ? 'text-red-500' : v.stock <= 5 ? 'text-orange-500' : 'text-gray-400'
                    }`}>
                      {v.stock === 0 ? 'Stok Habis' : `Stok: ${v.stock}`}
                    </p>
                    <button
                      disabled={v.stock === 0}
                      onClick={() =>
                        v.stock > 0 && addToCart({
                          id: `${cat.id}-${v.id}`,
                          dbId: v.dbId,
                          name: v.name,
                          emoji: v.emoji,
                          image_url: v.image_url || null,
                          price: v.price,
                          categoryName: cat.name,
                        })
                      }
                      className={`w-full text-xs font-heading font-semibold py-2 px-3 rounded-xl text-white transition-all ${
                        v.stock === 0
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:opacity-90 active:scale-95'
                      }`}
                      style={{ backgroundColor: cat.accentColor }}
                    >
                      {v.stock === 0 ? 'Habis' : '+ Keranjang'}
                    </button>
                  </>
                ) : (
                  <Link to="/distributor" className={`text-xs font-semibold ${cat.textColor} hover:underline mt-auto`}>
                    Hubungi Kami
                  </Link>
                )}
                </div>
              </motion.div>
            ))}
          </div>
        )}


      </div>

      {/* Other Categories */}
      <div className="bg-background-darker py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-2 flex justify-center"
        >
          <Button variant="primary" onClick={() => setIsCartOpen(true)}>Lihat Keranjang</Button>
        </motion.div>
          <h2 className="font-heading font-bold text-2xl text-primary-800 mb-8">Kategori Lainnya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((o) => (
              <Link
                key={o.id}
                to={`/products/${o.id}`}
                className={`group bg-gradient-to-br ${o.bgClass} rounded-2xl p-6 flex items-center gap-5 border ${o.borderColor} hover:shadow-md transition-shadow`}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">{o.emoji}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: o.accentColor }}>
                    {o.subtitle}
                  </p>
                  <p className="font-heading font-bold text-lg text-primary-800">{o.name}</p>
                  <p className="text-body-sm text-gray-500 mt-0.5">{o.variants.length} varian →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

