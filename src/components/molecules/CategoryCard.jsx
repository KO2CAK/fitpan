import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Product category card linking to /products/:id.
 * `maxVariants` controls how many variant chips are shown before the "+N lagi" badge.
 */
export default function CategoryCard({ cat, index, maxVariants = 5 }) {
  return (
    <motion.div
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
            <p
              className="text-xs font-heading font-bold tracking-widest uppercase mb-1"
              style={{ color: cat.accentColor }}
            >
              {cat.subtitle}
            </p>
            <h2 className="font-heading font-bold text-2xl text-primary-800 mb-3">{cat.name}</h2>
            <p className="text-body-sm text-gray-600 leading-relaxed mb-5 flex-1">{cat.tagline}</p>

            {/* Variant chips preview */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {cat.variants.slice(0, maxVariants).map((v) => (
                <span
                  key={v.id}
                  className={`${cat.badgeBg} ${cat.textColor} text-xs font-semibold px-2.5 py-1 rounded-full`}
                >
                  {v.emoji} {v.name}
                </span>
              ))}
              {cat.variants.length > maxVariants && (
                <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                  +{cat.variants.length - maxVariants} lagi
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
