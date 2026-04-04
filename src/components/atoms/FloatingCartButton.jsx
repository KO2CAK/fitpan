import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function FloatingCartButton() {
  const { totalItems, setIsCartOpen, toast, dismissToast } = useCart()
  const prevTotal = useRef(totalItems)
  const cartBtnRef = useRef(null)

  // Auto-dismiss toast after 2.8s
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(dismissToast, 2800)
    return () => clearTimeout(timer)
  }, [toast, dismissToast])

  // Record previous total to trigger bounce on change
  useEffect(() => {
    prevTotal.current = totalItems
  }, [totalItems])

  return (
    <>
      {/* ── Fly-to-cart Toast Notification ──────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            // Start above the cart button (bottom-[260px] ≈ 260px from bottom)
            style={{ position: 'fixed', right: '1.5rem', bottom: '260px', zIndex: 60 }}
            initial={{ opacity: 0, x: 60, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 180,       // slide DOWN toward the cart button
              x: 0,
              scale: 0.15,
            }}
            transition={{
              enter: { duration: 0.3, ease: 'easeOut' },
              exit: { duration: 0.5, ease: 'easeIn' },
            }}
            className="bg-white border border-gray-100 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 max-w-[210px]"
          >
            <span className="text-2xl flex-shrink-0">{toast.item.emoji}</span>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 leading-none mb-0.5">Ditambahkan!</p>
              <p className="font-heading font-bold text-sm text-primary-800 truncate">{toast.item.name}</p>
            </div>
            {/* small arrow tail pointing down toward button */}
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Cart Button ─────────────────────────── */}
      <motion.button
        ref={cartBtnRef}
        onClick={() => setIsCartOpen(true)}
        // Sits above the email button (bottom-24 = 96px) → place at bottom-44 = 176px
        className="fixed bottom-44 right-6 w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        title="Keranjang Belanja"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={
          totalItems > 0 && totalItems !== prevTotal.current
            ? { scale: [1, 1.25, 0.9, 1.1, 1] }
            : {}
        }
        transition={{ duration: 0.4 }}
      >
        <ShoppingCart size={22} />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {totalItems > 9 ? '9+' : totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
