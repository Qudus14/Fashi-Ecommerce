"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Image src="/img/footer-logo.png" alt="Domestico Logo" width={90} height={80} className="mb-4" />
            <ul className="space-y-2">
              <li><Link href="/category/new-arrivals"><span className="cursor-pointer hover:text-customYellow">Address: 60-49 Road 11378 New York</span></Link></li>
              <li><Link href="/category/top-rated"><span className="cursor-pointer hover:text-customYellow">Email: hello.colorlib@gmail.com</span></Link></li>
              <li><Link href="/category/sale"><span className="cursor-pointer hover:text-customYellow">Phone: +65 11.188.888</span></Link></li>
            </ul>
            <div className="footer-social flex space-x-5 mt-4">
              <Facebook className="hover:animate-bounce text-blue-600" />
              <Twitter className="hover:animate-bounce text-blue-400" />
              <Instagram className="hover:animate-bounce text-pink-500" />
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-3">Information</h5>
            <ul className="space-y-2">
              <li><Link href="/category/new-arrivals"><span className="cursor-pointer hover:text-customYellow">About Us</span></Link></li>
              <li><Link href="/category/sale"><span className="cursor-pointer hover:text-customYellow">Checkout</span></Link></li>
              <li><Link href="/category/top-rated"><span className="cursor-pointer hover:text-customYellow">Contact</span></Link></li>
              <li><Link href="/category/top-rated"><span className="cursor-pointer hover:text-customYellow">Services</span></Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-3">My Account</h5>
            <ul className="space-y-2">
              <li><Link href="/about"><span className="cursor-pointer hover:text-customYellow">My Account</span></Link></li>
              <li><Link href="/contact"><span className="cursor-pointer hover:text-customYellow">Contact</span></Link></li>
              <li><Link href="/policy"><span className="cursor-pointer hover:text-customYellow">Shopping Cart</span></Link></li>
              <li><Link href="/policy"><span className="cursor-pointer hover:text-customYellow">Shop</span></Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-3">Join Our Newsletter Now</h5>
            <p className="text-gray-400 mb-4">Get E-mail updates about our latest shop and special offers.</p>
            <div className="flex w-full max-w-sm items-center space-x-0">
              <Input type="email" placeholder="Enter Your Mail" className="bg-gray-700 text-customYellow rounded-l-md border-gray-600 focus:outline-none" />
              <Button type='submit' className="bg-customYellow p-1 border-gray-600 rounded-r-md hover:bg-customYellow">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-gray-700 mt-8">
          <p className="text-customYellow mb-4 lg:mb-0">&copy; {new Date().getFullYear()} Copyright All rights reserved.| FASHI</p>
          <Image src="/img/payment-method.png" alt="Payment Method" width={350} height={20} />
        </div>
      </div>
    </footer>
  );
}