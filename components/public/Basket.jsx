"use client";

import { useCartStore } from '@/store'
import { getCartTotal, groupByProduct } from '@/lib/util'
import Image from 'next/image';
import AddToCart from './AddToCart';
import { useState, useEffect } from 'react';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { loadStripe } from '@stripe/stripe-js';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '@/actions/createCheckoutSession';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Basket() {
  const cart = useCartStore(state => state.cart)
  const groupedCart = groupByProduct(cart)
  const basketTotal = getCartTotal(groupedCart)
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [isCLient, setIsClient] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isCLient) {
    return <Loader />;
  }

  const getItemPrice = (item) => {
    if (item.isSponsored) {
      return parseFloat(item.price.replace(/[^0-9.]/g, ''));
    } else if (item.typical_price_range && Array.isArray(item.typical_price_range) && item.typical_price_range.length > 1) {
      return parseFloat(item.typical_price_range[1].replace(/[^0-9.]/g, ''));
    } else {
      return 65.9; // fallback price
    }
  };

  if (groupedCart.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-lg text-gray-600">Your basket is empty.</p>
      </div>
    )
  };

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user.id,
      };

      const cartWithPrices = cart.map(item => ({
        ...item,
        price: getItemPrice(item)
      }));

      const checkoutUrl = await createCheckoutSession(cartWithPrices, metadata);

      console.log("Checkout URL:", checkoutUrl);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error("Checkout URL is not defined");
      }

    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="flex-grow">
          {groupedCart.map(item => {
            const itemPrice = getItemPrice(item);
            const totalItemPrice = itemPrice * item.quantity;
            return (
              <div key={item.product_id} className="mb-4 p-4 border rounded flex items-center justify-between">
                <div className='flex items-center cursor-pointer flex-1 min-w-0'>
                  <div className='w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4'>
                    <Image
                      className='w-full h-full object-cover rounded'
                      src={item.product_photos[0]}
                      alt={item.product_title}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                      {item.product_title}
                    </h2>
                    <p className="text-sm sm:text-base"> 
                      Price: £
                      {isNaN(totalItemPrice) ? "0.00" : totalItemPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className='flex items-center ml-4 flex-shrink-0'> 
                  <AddToCart product={item} isSponsored={item.isSponsored} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
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
              className='mt-4 w-full bg-customYellow text-white px-4 py-2 rounded hover:bg-customYellow/95 disabled:bg-gray-400'
              disabled={isLoading}>
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className='mt-4 w-full bg-customYellow text-white px-4 py-2 rounded hover:bg-customYellow/95'>
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>
        <div className='h-64 lg:h-0'>
        </div>
      </div>
    </div>
  )
}

