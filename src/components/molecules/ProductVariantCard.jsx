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
      className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
    >
      {/* Product Image */}
      <div className="bg-gray-50/50 p-6 flex justify-center items-center h-48 sm:h-56 relative group">
        {v.image_url ? (
          <img src={v.image_url} alt={v.name} className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <span className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform duration-500">{v.emoji}</span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <p className="font-heading font-bold text-lg text-primary-900 leading-tight mb-1">{v.name}</p>
          {v.desc && (
            <p className="text-xs text-gray-500 line-clamp-2">{v.desc}</p>
          )}
        </div>

        {/* Weight variant selector */}
        {hasWeightVariants && (
          <div className="flex flex-wrap gap-2 w-full mb-4">
            {v.weightVariants.map((wv) => {
              const isSelected = selectedVariant?.id === wv.id
              const isOos = wv.stock === 0
              return (
                <button
                  key={wv.id}
                  disabled={isOos}
                  onClick={() => !isOos && setSelectedVariant(isSelected ? null : wv)}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all pointer-events-auto
                    ${isOos
                      ? 'bg-gray-100 border-gray-100 text-gray-400 cursor-not-allowed line-through opacity-70'
                      : isSelected
                        ? 'bg-primary-600 border-primary-600 text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-primary-400'
                    }`}
                >
                  {wv.weight_label}
                </button>
              )
            })}
          </div>
        )}

        <div className="mt-auto pt-2 border-t border-gray-50/80 flex items-center justify-between">
          <div className="flex flex-col">
            {(displayPrice > 0 || v.price > 0) ? (
              <p className="text-primary-800 font-bold text-lg">
                {hasWeightVariants && !selectedVariant
                  ? <span className="text-gray-400 text-sm font-medium">Pilih ukuran</span>
                  : `Rp ${(displayPrice || v.price).toLocaleString('id-ID')}`}
              </p>
            ) : (
              <Link to="/distributor" className="text-sm font-semibold text-primary-600 hover:underline">
                Hubungi Kami
              </Link>
            )}
            
            <p className={`text-[10px] font-bold tracking-wide uppercase mt-0.5 ${
              displayStock === 0 ? 'text-red-500' : displayStock <= 5 ? 'text-orange-500' : 'text-green-500'
            }`}>
              {hasWeightVariants && !selectedVariant
                ? null
                : displayStock === 0
                  ? 'Stok Habis'
                  : displayStock <= 5
                    ? `Sisa ${displayStock}`
                    : 'Tersedia'}
            </p>
          </div>

          {(displayPrice > 0 || v.price > 0) && (
            <button
              disabled={!canAddToCart}
              onClick={handleAddToCart}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all flex-shrink-0 ${
                !canAddToCart 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg active:scale-95'
              }`}
              title={hasWeightVariants && !selectedVariant ? "Pilih Ukuran" : (displayStock === 0 ? "Habis" : "Tambah ke Keranjang")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
