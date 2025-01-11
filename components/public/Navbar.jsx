"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';
import { CategorySelectorComponent } from '../ui/category-selector';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className="md:bg-gray-800 bg-none">
      <div className="container mx-auto px-2">
        <div className="flex items-center justify-between h-12">
          {/* All Departments Dropdown */}
          <div className="w-full md:ml-20 ml-0 sm:w-[200px]">
            <CategorySelectorComponent />
          </div>
          <div className="hidden md:flex space-x-4 font-bold">
            <Link href="/" className={`px-4 py-2 text-white hover:bg-customYellow/95 ${isActive('/') ? 'bg-customYellow' : ''}`}>
              Home
            </Link>
            <Link href="/shop" className={`px-4 py-2 text-white hover:bg-customYellow/95 ${isActive('/shop') ? 'bg-customYellow' : ''}`}>
              Shop
            </Link>
            <Link href="/contacts" className={`px-4 py-2 text-white hover:bg-customYellow/95 ${isActive('/contact') ? 'bg-customYellow' : ''}`}>
              Contact
            </Link>
            <div className="w-px h-10 bg-gray-300 self-center"></div>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
