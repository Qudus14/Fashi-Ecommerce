"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useCartStore } from '@/store'
import AddToCart from '../public/AddToCart'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

const categories = ['Electronics', 'Watches', 'Shoes', 'Sports and fitness']

const MenBanner = () => {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('Electronics')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { cart } = useCartStore()

  const handleClick = () => {
    router.push(`/search?q=${encodeURIComponent("Men's")}`)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      const url = `https://real-time-product-search.p.rapidapi.com/search?q=${activeCategory}&country=uk&language=en&page=1&limit=10&sort_by=BEST_MATCH&product_condition=ANY&min_rating=ANY`
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '0cfc7c25fdmsh4650e00f2123e19p1e54a2jsn2ee1b53ae792',
          'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
        }
      }

      try {
        const response = await fetch(url, options)
        const result = await response.json()
        if (result.status === "OK" && result.data && result.data.products) {
          setProducts(result.data.products)
        } else {
          setError("Failed to fetch products")
        }
      } catch (error) {
        console.error(error)
        setError("An error occurred while fetching products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [activeCategory])

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
  }

  return (
    <section className="py-16 px-14">
      <div className="container mx-auto">
        <div className="flex md:ml-12 ml-0 mb-8">
          <div className="filter-control">
            <ul className="flex items-center space-x-4">
              {categories.map((category, index) => (
                <li 
                  key={index} 
                  className={`cursor-pointer ${category === activeCategory ? 'text-customYellow font-bold' : 'text-gray-600 text-lg hover:text-customYellow'}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && (
              <Carousel plugins={[
                Autoplay({
                  delay: 2000,
                }),
              ]}  className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {products.map((product) => (
                    <CarouselItem key={product.product_id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden border-gray-200">
                        <CardContent className="p-0">
                          <div className="relative overflow-hidden group">
                            <Image 
                              src={product.product_photos[0] || '/placeholder.svg?height=300&width=300'} 
                              alt={product.product_title} 
                              width={300} 
                              height={300} 
                              className="w-full h-[250px] object-cover"
                            />
                            <div className="absolute top-0 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-full group-hover:translate-y-4">
                              <Heart className="w-5 h-5 text-gray-600" />
                            </div>
                            <ul className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
                              <li>
                                <AddToCart product={product} />
                              </li>
                              <li className="bg-white px-3 py-2 rounded-full text-bold cursor-pointer" onClick={() => router.push(`/product/${encodeURIComponent(product.product_title)}`)}>
                                + Quick View
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start p-4">
                          <div className="text-sm font-semibold flex items-center justify-between w-full text-gray-500">
                             <span>{activeCategory}</span>
                             <span className="text-customYellow">{product.offer && product.offer.price ? product.offer.price : 'Price not available'}</span>
                          </div>
                          <Link href="#" className="block font-semibold text-lg mb-2 hover:text-customYellow">
                          {product.product_title.slice(0, 70) + '...'}
                          </Link>
                      </CardFooter>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                         <span className="text-gray-900">&lt;</span>
                       </CarouselPrevious>
                       <CarouselNext className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                         <span className="text-gray-900">&gt;</span>
                       </CarouselNext>
              </Carousel>
            )}
          </div>
          <div 
            className="w-full lg:w-1/3 px-4 mt-8 lg:mt-0 cursor-pointer group"
            onClick={handleClick}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            tabIndex={0}
            role="button"
            aria-label="Discover Men's Collection"
          >
            <div 
              className="product-large relative h-[500px] bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover:opacity-90" 
              style={{backgroundImage: "url('img/products/man-large.jpg?height=500&width=400')"}}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white transition-all duration-300 group-hover:bg-opacity-50">
                <h2 className="text-4xl font-bold mb-4">Men's</h2>
                <span className="inline-block bg-white text-black px-6 py-2 rounded-full group-hover:bg-gray-200 transition-colors">
                  Discover More
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MenBanner

