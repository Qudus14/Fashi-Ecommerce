"use client";

import React,{useState} from "react";
import { ChevronDownIcon } from 'lucide-react';
import { CategorySelectorComponent } from "../ui/category-selector"
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs"

export default function Navbar(){
    const [openDropdown, setOpenDropdown] = useState(null);
    const pathname = usePathname();
    const { user } = useUser ();
    const router=useRouter();
    const isActive = (path) => pathname === path;
    const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  
    return(
        <nav className="lg:sticky hidden md:block md:top-16 z-50 bg-gray-900 shadow-md p-1 mb-0">
            <div className="flex justify-between items-center px-28">
              <div className="hidden md:flex space-x-10 font-bold text-lg">
            <Link href="/" className={`px-4 py-2 text-white hover:bg-customYellow/95 ${isActive('/') ? 'bg-customYellow' : ''}`}>
              Home
              </Link>
            <Link href="/about" className={`px-4 py-2 text-white hover:bg-customYellow/95 ${isActive('/about') ? 'bg-customYellow' : ''}`}>
              About Us
              </Link>
            <Link href="/contacts" className={`px-4 py-2 text-white hover:bg-customYellow/95 ${isActive('/contact') ? 'bg-customYellow' : ''}`}>
              Contact
              </Link>
            <div className="relative group">
              <button
                className="flex items-center px-4 py-2 text-white hover:bg-customYellow/95 transition-colors duration-200"
              >
                <span>Pages</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <ul className="absolute z-10 left-0 mt-1 w-44 bg-gray-800 hidden group-hover:block">
                <li className="px-4 py-2 hover:bg-customYellow text-white hover:text-white cursor-pointer">
                  <Link href="/basket">Basket</Link>
                </li>
                <li className="px-4 py-2 hover:bg-customYellow text-white hover:text-white cursor-pointer">
                  <Link href="/orders">My Order</Link>
                </li>
              </ul>
            </div>
              </div>
              <div className="flex items-center h-full">
              <Link href="/contact" className="text-gray-800 hover:text-gray-600">
                <ClerkLoaded>
                  {user && (
                    <link href='/'>
                    </link>
                  )}
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <UserButton width={200} height={200} />
                      <div className="hidden text-gray-200 sm:block text-lg font-bold">{user.fullName}</div>
                    </div>
                  ) : (
                    <SignInButton className="bg-customYellow text-white p-2 font-bold text-lg rounded"  mode='modal' />
                  )}
                </ClerkLoaded>
              </Link>
            </div>
            </div>
          </nav>
    );
}
