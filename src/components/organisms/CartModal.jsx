import { useState } from 'react'
import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { tryCreateWebOrder } from '../../hooks/useSupabase'

export default function CartModal() {
  const { cartItems, updateQty, clearCart, isCartOpen, setIsCartOpen } = useCart()
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)

  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '62813xxxxxxxx'

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0)

  const handleCheckout = async () => {
    if (!name.trim()) {
      setNameError(true)
      return
    }
    setNameError(false)

    // Record order in Supabase (gracefully — WhatsApp flow still works if this fails)
    const txNumber = await tryCreateWebOrder({
      customerName: name.trim(),
      cartItems,
      total,
    })

    const itemLines = cartItems
      .map((i) => `- ${i.name} x${i.qty} - Rp ${(i.price * i.qty).toLocaleString('id-ID')}`)
      .join('\n')

    const orderRef = txNumber ? `\n\n*Order Ref: ${txNumber}*` : ''
    const message =
      `Halo Fitpan! Saya *${name.trim()}* ingin memesan:\n\n` +
      `*Pesanan:*\n${itemLines}\n\n` +
      `*Total: Rp ${total.toLocaleString('id-ID')}*${orderRef}\n\n` +
      `Mohon bantu proses pesanan saya. Terima kasih!`

    const phone = whatsappPhone.replace(/\D/g, '')
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')

    clearCart()
    setIsCartOpen(false)
    setName('')
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary-600" />
            <h2 className="font-heading font-bold text-lg text-primary-800">Keranjang Belanja</h2>
            {cartItems.length > 0 && (
              <span className="bg-primary-100 text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((s, i) => s + i.qty, 0)} item
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-14 text-gray-400">
              <ShoppingCart size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">Keranjang kamu masih kosong</p>
              <p className="text-sm mt-1">Yuk pilih produk favoritmu!</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3"
                >
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-sm text-primary-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.categoryName}</p>
                    {item.price && (
                      <p className="text-xs font-bold text-accent-600 mt-0.5">
                        Rp {(item.price * item.qty).toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <p className="font-heading font-semibold text-gray-700">Total</p>
                <p className="font-heading font-bold text-xl text-primary-800">
                  Rp {total.toLocaleString('id-ID')}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 space-y-3 flex-shrink-0">
            <div>
              <label className="block text-sm font-heading font-semibold text-gray-700 mb-1.5">
                Nama Kamu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setNameError(false)
                }}
                placeholder="Masukkan nama kamu..."
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary-400 transition-colors ${
                  nameError ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {nameError && (
                <p className="text-xs text-red-500 mt-1">Harap masukkan nama kamu sebelum checkout.</p>
              )}
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-heading font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <span>💬</span>
              Checkout via WhatsApp
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors py-1"
            >
              Lanjutkan Belanja
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
