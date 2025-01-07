"use client";
import React from 'react';
import Image from 'next/image';
import womenLarge from '@/public/img/products/women-large.jpg'; // Replace with your actual image paths
import women1 from '@/public/img/products/women-1.jpg';
import women2 from '@/public/img/products/women-2.jpg';
import women3 from '@/public/img/products/women-3.jpg';
import women4 from '@/public/img/products/women-4.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Heart, ShoppingBagIcon } from 'lucide-react';

function MenBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const products = [
  {
    image: women1,
    alt: 'Women Product 1',
    category: 'Coat',
    name: 'Pure Pineapple',
    price: '$14.00',
    originalPrice: '$35.00',
  },
  {
    image: women2,
    alt: 'Women Product 2',
    category: 'Dress',
    name: 'Summer Breeze',
    price: '$20.00',
    originalPrice: '$40.00',
  },
  {
    image: women3,
    alt: 'Women Product 3',
    category: 'Shoes',
    name: 'High Heels',
    price: '$30.00',
    originalPrice: '$50.00',
  },
  {
    image: women4,
    alt: 'Women Product 4',
    category: 'Bag',
    name: 'Tote Bag',
    price: '$25.00',
    originalPrice: '$45.00',
  },
];

return (
  <section className="women-banner spad py-12 md:py-24 lg:py-36">
    <div className="container mx-auto px-1">
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-3/4 xl:w-3/4 p-6 sm:pr-0 lg:pr-56 mt-2"> 
         <div className="filter-control">
            <ul className="flex justify-center font-light ">
              <li className="active">Clothings</li>
              <li>HandBag</li>
              <li>Shoes</li>
              <li>Accessories</li>
            </ul>
          </div>
          <Carousel
          opt={{
            loop:true,
          }}
            plugins={[plugin.current]}
            className="lg:w-[600px] sm:w-full  max-w pl-2"
          >
           <CarouselContent className="-ml-1">
  {products.map((product, index) => (
    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
      <div className="product-item w-full p-1 relative group">
        <div className="pi-pic relative">
          <Image
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover object-center"
          />
          {/* Heart Icon */}
          <div className="icon absolute top-2 right-2 transform translate-y-[-100%] transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <Heart/>
          </div>
          {/* Action Icons */}
          <ul className="flex lg:ml-24 ml-48 mb-5 justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
            <li className="mr-1 transform translate-y-4 transition-transform duration-300 ease-in-out">
              <a href="#"><ShoppingBagIcon fontSize="small" /></a>
            </li>
            <li className="mr-1 transform translate-y-4 transition-transform duration-300 ease-in-out">
              <a className='text-xs font-light' href="#">+View</a>
            </li>
            <li className="mr-1 transform translate-y-4 transition-transform duration-300 ease-in-out">
              <a href="#"><ShoppingBagIcon fontSize="small" /></a>
            </li>
          </ul>
        </div>
        <div className="pi-text">
          <div className="catagory-name">{product.category}</div>
          <a href="#">
            <h5 className="text-lg md:text-lg lg:text-lg">{product.name}</h5>
          </a>
          <div className="product-price text-sm">
            {product.price} <span className='text-lg'>{product.originalPrice}</span>
          </div>
        </div>
      </div>
    </CarouselItem>
  ))}
</CarouselContent>
            <CarouselPrevious className="hidden md:block absolute top-1/2  transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
        <span className="text-gray-900">&lt;</span>
      </CarouselPrevious>
      <CarouselNext className="hidden md:block absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
        <span className="text-gray-900">&gt;</span>
      </CarouselNext>

          </Carousel>
        </div>
        <div className="w-full lg:w-1/4 xl:w-1/4 p-0 lg:pt-8 sm:pt-4">
          <div
            className="product-large set-bg lg:w-[340px]"
            style={{ backgroundImage: `url(${womenLarge.src})` }}
          >
            <h2 className="text-lg md:text-xl lg:text-2xl">Women’s</h2>
            <a href="#" className="text-lg md:text-xl lg:text-2xl">
              Discover More
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}

export default MenBanner;