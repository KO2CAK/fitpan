import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toast, setToast] = useState(null) // { id, item } — latest added item

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...item, qty: 1 }]
    })
    // Show fly-to-cart toast, NOT the full modal
    setToast({ id: Date.now(), item })
  }

  const dismissToast = () => setToast(null)

  const updateQty = (id, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id))
    } else {
      setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
    }
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, clearCart, isCartOpen, setIsCartOpen, totalItems, toast, dismissToast }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
