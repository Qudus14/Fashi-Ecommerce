"use client";

import Link from 'next/link'
import { Email, Instagram, PhoneOutlined, X } from '@mui/icons-material';
import { Pinterest } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import { ClerkLoaded, SignInButton, UserButton, useUser  } from '@clerk/nextjs';
import Header_2 from './Header_2';
import Navbar from './Navbar';
function Header() {
    const { user } = useUser ();

  return (
  <div className="sticky top-0 z-50 bg-white">
      <header className="w-full border-b border-gray-200">
        <div className="container mx-auto px-1 ">
          <div className="flex items-center justify-between h-11">
            {/* First item - hidden on small screens */}
            <Link href="/" className="hidden sm:flex items-center text-gray-400 hover:text-gray-600">
              <div className='flex items-center space-x-1'><Email fontSize='small' /><span>maqsoa2004@gmail.com</span></div>
            </Link>
            <div className="hidden sm:flex items-center border-r border-gray-200 h-full"></div>

            <Link href="/about" className="hidden sm:flex items-center space-x-10 text-gray-400 hover:text-gray-600">
              <div className='flex items-center space-x-1 '><PhoneOutlined fontSize='small' /><span>maqsoa2004@gmail.com</span></div>
              <div className="flex space-x-5">
                <Facebook className="hover:animate-bounce text-blue-600" />
                <X className="hover:animate-bounce text-blue-400" />
                <Instagram className="hover:animate-bounce text-pink-500" />
                <Pinterest className="hover:animate-bounce text-red-600" />
              </div>
            </Link>
            <div className="hidden sm:flex items-center border-r border-gray-200 h-full"></div>

            <Link href="/" className="hidden sm:flex items-center text-gray-400 hover:text-gray-600">
              <option
                value="yt"
                data-image="/img/flag-1.jpg"
                data-imagecss="flag yt"
                data-title="English"
              >
                English
              </option>
            </Link>
            <div className="flex items-center border-r border-gray-200 h-full"></div>

            {/* Fourth item - visible on all screens */}
            <div className="flex items-center h-full pl-4 pr-3 md:pr-0 ">
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
                    <SignInButton mode='modal' />
                  )}
                </ClerkLoaded>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Header_2 />
      <Navbar />
    </div>
  )
}

export default Header
