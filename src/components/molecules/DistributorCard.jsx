import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const CATEGORY_CONFIG = {
  all:         { label: 'Semua Mitra',  emoji: '🌐', badge: 'bg-primary-100 text-primary-700',  border: 'border-l-gray-300'    },
  distributor: { label: 'Distributor', emoji: '🏭', badge: 'bg-amber-100 text-amber-700',     border: 'border-l-amber-500'   },
  reseller:    { label: 'Reseller',    emoji: '🛍️', badge: 'bg-primary-100 text-primary-700', border: 'border-l-primary-500' },
  franchise:   { label: 'Franchise',   emoji: '⭐', badge: 'bg-purple-100 text-purple-700',   border: 'border-l-purple-500'  },
}

function buildWaLink(contact) {
  if (!contact) return null
  const digits = contact.replace(/\D/g, '')
  if (!digits) return null
  const normalized = digits.startsWith('0') ? '62' + digits.slice(1) : digits
  return `https://wa.me/${normalized}`
}

/**
 * Expandable card for a single distributor/reseller/franchise entry.
 */
export default function DistributorCard({ d, index }) {
  const [expanded, setExpanded] = useState(false)
  const catCfg = CATEGORY_CONFIG[d.category] || CATEGORY_CONFIG.reseller
  const waLink = buildWaLink(d.contact)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className={`bg-white rounded-2xl border border-gray-100 border-l-4 ${catCfg.border} p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-3 cursor-pointer group`}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        {d.logo_url ? (
          <img
            src={d.logo_url}
            alt={d.name}
            className="w-12 h-12 rounded-xl object-cover border border-gray-100 flex-shrink-0"
          />
        ) : (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${catCfg.badge}`}>
            {d.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-bold text-primary-900 leading-tight">{d.name}</h3>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${catCfg.badge}`}>
            {catCfg.emoji} {catCfg.label}
          </span>
        </div>
        <span className={`text-gray-400 group-hover:text-gray-600 transition-transform duration-200 text-xs ${expanded ? 'rotate-180' : ''}`}>▾</span>
      </div>

      {/* Location */}
      {(d.city || d.province) && (
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <span>📍</span>
          <span>{[d.city, d.province].filter(Boolean).join(', ')}</span>
        </p>
      )}

      {/* Expanded: contact actions */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              {waLink && (
                <a
                  href={`${waLink}?text=Halo%20${encodeURIComponent(d.name)}%2C%20saya%20tertarik%20dengan%20produk%20Fitpan`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
                >
                  <span>💬</span> Hubungi via WhatsApp
                </a>
              )}
              {!waLink && d.contact && (
                <p className="text-sm text-gray-500 text-center">{d.contact}</p>
              )}
              {d.email && (
                <a
                  href={`mailto:${d.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm text-primary-600 hover:underline text-center"
                >
                  ✉️ {d.email}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
