"use client"

import { useState } from 'react'
import { Command, ShoppingCartIcon, Package , MenuIcon, Home } from 'lucide-react'
import { Business, Storefront } from '@mui/icons-material'
import Link from 'next/link'
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
const data = {
  projects: [
    {
      name: 'Home',
      url: '/',
      icon: Home,
    },
    {
      name: 'Shop',
      url: '/shop',
      icon: Storefront,
    },
    {
      name: 'Contact',
      url: '/contacts',
      icon: Business,
    },
  ],
  navSecondary: [
    {
      title: 'Basket',
      url: '/basket',
      icon: ShoppingCartIcon,
    },
    {
      title: 'Orders',
      url: '/order',
      icon: Package,
    },
  ],
}

const Menu = () => {
  const { user } = useUser ();
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Command className="size-5" />
            </div>
            <div>
              <h2 className="text-lg text-customYellow font-semibold">FASHI</h2>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <ul className="space-y-1">
            {data.projects.map((project) => (
              <li key={project.name}>
                <a href={project.url} className="flex items-center py-1 text-sm text-gray-600 hover:bg-customYellow p-2 transition">
                  <project.icon className="mr-2 h-4 w-4" />
                  <span>{project.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

       <div className="mt-auto pt-2">
          <ul className="space-y-1">
            {data.navSecondary.map((item) => (
              <li key={item.title}>
                <a href={item.url} className="flex items-center py-1 text-sm text-gray-600 hover:bg-customYellow p-2 transition">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
        <Link href="/contact" className="text-gray-800 hover:text-gray-600">
                <ClerkLoaded>
                  {user && (
                    <link href='/'>

                    </link>
                  )}
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <UserButton width={200} height={200} />
                      <div className="hidden sm:block text-xs font-bold">{user.fullName}</div>
                    </div>
                  ) : (
                    <SignInButton className="bg-customYellow text-white p-2"  mode='modal' />
                  )}
                </ClerkLoaded>
        </Link>              
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Main Content */}
      <div className={`flex-1 p-4 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <button onClick={toggleSidebar} className="bg-customYellow flex text-white px-3 py-2 rounded lg:hidden">
          <MenuIcon className="mr-2" />
        </button>
      </div>
    </div>
  )
}

export default Menu