"use client"

import { useCartStore } from "@/store"
import { getCartTotal, groupByProduct } from "@/lib/util"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import { loadStripe } from "@stripe/stripe-js"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { createCheckoutSession } from "@/actions/createCheckoutSession"
import AddToCart from "@/components/Public/AddToCart"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Basket() {
  const cart = useCartStore((state) => state.cart)
  const groupedCart = groupByProduct(cart)
  const basketTotal = getCartTotal(groupedCart)
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const [isCLient, setIsClient] = useState(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const orderSummaryRef = useRef(null)
  const contentRef = useRef(null)

  // Function to update padding based on order summary height
  const updatePadding = () => {
    if (orderSummaryRef.current && contentRef.current) {
      const summaryHeight = orderSummaryRef.current.offsetHeight
      // Use a moderate padding (80px) to ensure visibility without excessive space
      contentRef.current.style.paddingBottom = `${summaryHeight + 110}px`
    }
  }

  useEffect(() => {
    setIsClient(true)

    // Initial update with a slight delay to ensure DOM is fully rendered
    setTimeout(() => {
      updatePadding()
      // Ensure we're scrolled to the top initially
      if (contentRef.current) {
        contentRef.current.scrollTop = 0
      }
    }, 100)

    // Update padding whenever window resizes
    window.addEventListener("resize", updatePadding)

    // Clean up event listener
    return () => window.removeEventListener("resize", updatePadding)
  }, [])

  // Update padding whenever cart changes
  useEffect(() => {
    // Update with a slight delay to ensure DOM is fully rendered
    setTimeout(() => {
      updatePadding()

      // No auto-scrolling to last item to avoid pushing first item out of view
    }, 100)
  }, [groupedCart])

  if (!isCLient) {
    return <Loader />
  }

  const getItemPrice = (item) => {
    if (item.typical_price_range && Array.isArray(item.typical_price_range) && item.typical_price_range.length > 1) {
      return Number.parseFloat(item.typical_price_range[1].replace(/[^0-9.]/g, ""))
    } else if (item.price) {
      return Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
    } else {
      return 65.9 // fallback price
    }
  }

  if (groupedCart.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-lg text-gray-600">Your basket is empty.</p>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return
    setIsLoading(true)
    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user.id,
      }

      const cartWithPrices = cart.map((item) => ({
        ...item,
        price: getItemPrice(item),
      }))

      const checkoutUrl = await createCheckoutSession(cartWithPrices, metadata)

      console.log("Checkout URL:", checkoutUrl)

      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        console.error("Checkout URL is not defined")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="container mx-auto p-4 h-screen flex flex-col">
    <div
      ref={contentRef}
      className="flex-grow overflow-y-auto pt-2 pr-2
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-customYellow/10
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-customYellow/90
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb:hover]:bg-customYelow/95
        scrollbar-thin
        scrollbar-track-gray-100
        scrollbar-thumb-customYellow"
    >
      {groupedCart.map((item, index) => {
        const itemPrice = getItemPrice(item)
        const totalItemPrice = itemPrice * item.quantity

        return (
          <div
            key={item.product_id}
            className="mb-4 p-4 border border-gray-200 rounded flex items-center justify-between hover:border-customYellow transition-colors duration-200"
          >
            <div className="flex items-center cursor-pointer flex-1 min-w-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
                <Image
                  className="w-full h-full object-cover rounded"
                  src={item.product_photos?.[0] || "/placeholder.svg"}
                  alt={item.product_title}
                  width={100}
                  height={100}
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">
                  {item.product_title.slice(0, 25) + "..."}
                </h2>
                <p className="text-sm sm:text-base">
                  Price: ${isNaN(totalItemPrice) ? "0.00" : totalItemPrice.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center ml-4 flex-shrink-0">
              <AddToCart product={item} />
            </div>
          </div>
        )
      })}
      <div className="h-4"></div>
    </div>
    <div ref={orderSummaryRef} className="w-full bg-white p-6 border-t fixed bottom-0 left-0 z-10 shadow-lg">
      <h3 className="text-xl font-semibold">Order Summary</h3>
      <div className="mt-4 space-y-2">
        <p className="flex justify-between">
          <span>Items:</span>
          <span>{groupedCart.length}</span>
        </p>
        <p className="flex justify-between text-2xl font-bold border-t pt-2">
          <span>Total:</span>
          <span>£{isNaN(basketTotal) ? "0.00" : basketTotal.toFixed(2)}</span>
        </p>
      </div>

      {isSignedIn ? (
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-customYellow text-white px-4 py-2 rounded hover:bg-customYellow/95 disabled:bg-gray-400 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Checkout"}
        </button>
      ) : (
        <SignInButton mode="modal">
          <button className="mt-4 w-full bg-customYellow text-white px-4 py-2 rounded hover:bg-customYellow/95 transition-colors duration-200">
            Sign in to Checkout
          </button>
        </SignInButton>
      )}
    </div>
  </div>
  )
}

