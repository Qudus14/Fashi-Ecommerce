"use client"

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const categories = [
  "Home Appliances",
  "Electronics",
  "Furniture",
  "Clothing",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Toys & Games"
]

const carouselItems = [
  {
    image: "/img/hero-1.jpg?height=600&width=800",
    category: "Summer Collection",
    title: "Refresh Your Wardrobe",
    description: "Discover the hottest trends for the season",
    discount: 25
  },
  {
    image: "/img/hero-2.jpg?height=600&width=800",
    category: "Tech Gadgets",
    title: "Upgrade Your Devices",
    description: "Find the latest innovations in technology",
    discount: 25
  },
  {
    image: "/img/hero-1.jpg?height=600&width=800",
    category: "Home Decoration",
    title: "Transform Your Space",
    description: "Create the perfect ambiance for your home",
    discount: 25
  }
]

export default function Home() {
  const router = useRouter()
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <div className="container mx-auto mb-0 px-2 py-0.5">
      <div className="flex flex-col md:flex-row">
        {/* Categories - Hidden on small screens */}
        <div className="hidden md:block w-1/4 pr-0.5">
          <h2 className="text-2xl font-bold mb-0.5 bg-customYellow text-white p-2">Categories</h2>
          <ul className="space-y-1">
            {categories.map((category) => (
              <li
                key={category}
                className="p-2 hover:bg-customYellow text-base font-medium rounded cursor-pointer transition-colors"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel - Takes majority of the screen */}
        <div className="w-full md:w-3/4">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full h-[60vh] md:h-[80vh]"
          >
            <CarouselContent className="-ml-0">
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="pl-0">
                  <Card className="h-full border-none rounded-none">
                    <CardContent className="flex items-center justify-center p-0 h-full relative">
                      <img
                        src={item.image}
                        alt={`Hero Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                        <div className="container mx-auto px-4">
                          <div className="row">
                            <motion.div 
                              className="col-lg-5 text-white"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                            >
                              <motion.span 
                                className="text-3xl font-medium uppercase tracking-wider"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                              >
                                {item.category}
                              </motion.span>
                              <motion.h1 
                                className="text-lg font-bold my-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                              >
                                {item.title}
                              </motion.h1>
                              <motion.p 
                                className="mb-4 font-semibold text-base"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                              >
                                {item.description}
                              </motion.p>
                                                            
                              <motion.div 
                                className="bg-customYellow hover:bg-customYellow/90 hover:text-gray-100 text-white px-4 py-2 inline-block cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => router.push(`/search?q=${encodeURIComponent(item.category)}`)}
                              >
                                Shop Now
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>
                        <motion.div 
                          className="absolute top-4 right-4 bg-white text-black p-4 rounded-full"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
                        >
                          <h2 className="text-lg font-bold">
                            <span className="text-lg">Use code : <span className='text-red-600'>BFRIDAY</span> to get {item.discount}% OFF</span>
                          </h2>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

