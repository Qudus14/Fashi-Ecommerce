"use client";

import { useCartStore } from '@/store';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { Search,ShoppingCartIcon, Package } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import Menu from './Menu';

function Header_2() {
  const[searchTerm, setSearchTerm]= useState('')
  const router = useRouter(); // Correct position for router definition
  const cart = useCartStore((state) => state.cart)
  const [itemCount, setItemCount] = useState(0)
  const {isSignedIn} = useAuth();


  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    setItemCount(count)
  }, [cart])


  const handleClick=()=>{
    router.push('/basket', {scroll: false})
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  };

  return (
    <div className="w-full pt-4 justify-between sm:px-6 px-5 lg:px-8">
    <div className="sm:pt-0 sm:pb-2 pb-1 md:pb-3 md:pt-0 flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
      
      {/* Logo section */}
      <div className="w-full text-center">
        <div className="logo mx-auto">
          <Link href="/">
            <Image src="/img/logo.png" alt="Logo" width={80} height={95} className="mx-auto sm:pt-0" />
          </Link>
        </div>
      </div>

      {/* Search section */}
      <div className="w-full px-4 md:px-0 text-center">
        <form onSubmit={handleSubmit} className="flex items-center border-gray-400 border rounded-full w-full flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="What do you need?"
            className="flex-1 px-4 rounded-l-full outline-none placeholder:text-sm"
          />
          <button type="submit">
            <Search className="rounded-full h-10 px-2 w-10 bg-customYellow cursor-pointer" />
          </button>
        </form>
      </div>

      {/* Icons and Menu Section */}
      <div className="w-full text-center flex items-center justify-between">
        {/* Icon section */}
        <ul className="ml-6 md:ml-14 flex items-center space-x-3">
          <li className="relative">
            <Link href="/basket" onClick={handleClick} className="flex border space-x-2 bg-customYellow hover:bg-customYellow/85 text-red font-bold py-2 px-4 rounded">
              <ShoppingCartIcon className="w-6 h-6 items-center text-white" />
              {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
    )}
              <span className="text-white">My Basket</span>
            </Link>
          </li>
          <li className="relative group flex items-center">
          {isSignedIn ? (
            <Link href="/orders" className="flex border space-x-2 bg-customYellow hover:bg-customYellow/85 text-red font-bold py-2 px-4 rounded">
              <Package className="w-6 h-6 items-center text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
              <span className="text-white">My Orders</span>
            </Link>
            ) : (
              <SignInButton mode="modal">
                   <Link href="/orders" className="flex border space-x-2 bg-customYellow hover:bg-customYellow/85 text-red font-bold py-2 px-4 rounded">
                   <span className="text-white">Sign in to View Orders</span>
            </Link>
              </SignInButton>
            )}
          </li>
        </ul>
        {/* Menu button */}
        {/* <Menu /> */}
      </div>
    </div>
  </div>
  );
}

export default Header_2
