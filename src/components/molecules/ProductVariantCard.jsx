import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Single product variant card shown in the ProductDetailPage variants grid.
 *
 * Props:
 *  - variant  — the variant object (name, emoji, image_url, price, stock, desc, weightVariants[])
 *  - category — the parent category (bgClass, borderColor, textColor, accentColor)
 *  - index    — for stagger delay
 *  - onAddToCart(variant, selectedWeightVariant|null) — called when the add button is clicked
 */
export default function ProductVariantCard({ variant: v, category: cat, index, onAddToCart }) {
  const hasWeightVariants = v.weightVariants && v.weightVariants.length > 0
  const [selectedVariant, setSelectedVariant] = useState(null)

  // Derived display values depending on selection
  const displayPrice = selectedVariant ? selectedVariant.price : v.price
  const displayStock = selectedVariant ? selectedVariant.stock : v.stock
  const canAddToCart = hasWeightVariants
    ? selectedVariant !== null && selectedVariant.stock > 0
    : v.stock > 0

  const handleAddToCart = () => {
    if (!canAddToCart) return
    onAddToCart(v, selectedVariant)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 5) * 0.06 }}
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

        {/* Weight variant selector (Shopee-style) */}
        {hasWeightVariants && (
          <div className="flex flex-wrap justify-center gap-1.5 w-full">
            {v.weightVariants.map((wv) => {
              const isSelected = selectedVariant?.id === wv.id
              const isOos = wv.stock === 0
              return (
                <button
                  key={wv.id}
                  disabled={isOos}
                  onClick={() => !isOos && setSelectedVariant(isSelected ? null : wv)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all
                    ${isOos
                      ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed line-through'
                      : isSelected
                        ? 'text-white border-transparent'
                        : 'bg-white/70 border-gray-300 text-gray-600 hover:border-current'
                    }`}
                  style={isSelected && !isOos ? { backgroundColor: cat.accentColor, borderColor: cat.accentColor, color: '#fff' } : {}}
                >
                  {wv.weight_label}
                </button>
              )
            })}
          </div>
        )}

        {(displayPrice > 0 || v.price > 0) ? (
          <>
            <p className={`text-sm font-bold ${cat.textColor} mt-auto transition-all`}>
              {hasWeightVariants && !selectedVariant
                ? <span className="text-gray-400 text-xs">Pilih ukuran</span>
                : `Rp ${displayPrice.toLocaleString('id-ID')}`}
            </p>
            <p className={`text-xs font-semibold ${
              displayStock === 0 ? 'text-red-500' : displayStock <= 5 ? 'text-orange-500' : 'text-green-600'
            }`}>
              {hasWeightVariants && !selectedVariant
                ? null
                : displayStock === 0
                  ? 'Stok Habis'
                  : displayStock <= 5
                    ? 'Hampir Habis'
                    : 'Tersedia ✓'}
            </p>
            <button
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              className={`w-full text-xs font-heading font-semibold py-2 px-3 rounded-xl text-white transition-all ${
                !canAddToCart ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-90 active:scale-95'
              }`}
              style={{ backgroundColor: cat.accentColor }}
            >
              {hasWeightVariants && !selectedVariant
                ? 'Pilih Ukuran'
                : displayStock === 0 ? 'Habis' : '+ Keranjang'}
            </button>
          </>
        ) : (
          <Link
            to="/distributor"
            className={`text-xs font-semibold ${cat.textColor} hover:underline mt-auto`}
          >
            Hubungi Kami
          </Link>
        )}
      </div>
    </motion.div>
  )
}
