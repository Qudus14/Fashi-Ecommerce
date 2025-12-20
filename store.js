import { create } from 'zustand'

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.product_id === product.product_id)
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
    } else {
      return { cart: [...state.cart, { ...product, quantity: 1 }] }
    }
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.map(item =>
      item.product_id === productId
        ? { ...item, quantity: Math.max(0, item.quantity - 1) }
        : item
    ).filter(item => item.quantity > 0)
  })),
  clearCart: () => set({ cart: [] }),
}))

