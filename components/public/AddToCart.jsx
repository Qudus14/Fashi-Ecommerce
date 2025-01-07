"use client";


import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store'

export default function AddToCart({ product }) {
  const { cart, addToCart, removeFromCart } = useCartStore()
  const [quantityInCart, setQuantityInCart] = useState(0)

  useEffect(() => {
    const item = cart.find(item => item.product_id === product.product_id)
    setQuantityInCart(item ? item.quantity : 0)
  }, [cart, product.product_id])

  const handleAddToCart = () => addToCart(product)
  const handleRemoveFromCart = () => removeFromCart(product.product_id)

  return (
    <div className="flex items-center space-x-2">
      {quantityInCart > 0 ? (
        <>
          <Button className="bg-customYellow hover:bg-customYellow/90 text-white hover:text-white
          " onClick={handleRemoveFromCart} variant="outline" size="icon">
            -
          </Button>
          <span className="text-lg font-semibold">{quantityInCart}</span>
          <Button className="bg-customYellow hover:bg-customYellow/90 text-white hover:text-white" onClick={handleAddToCart} variant="outline" size="icon">
            +
          </Button>
        </>
      ) : (
        <Button className="bg-customYellow hover:bg-customYellow/90 text-white" onClick={handleAddToCart} variant="default">
          Add to Cart
        </Button>
      )}
    </div>
  )
}

