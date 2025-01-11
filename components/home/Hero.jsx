"use client";

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { motion, AnimatePresence } from "framer-motion"
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

  const heroItems = [
    {
      image: '/img/hero-1.jpg',
      category: 'Bag,kids',
      title: 'Black friday',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
    {
      image: '/img/hero-2.jpg',
      category: 'Bag,kids',
      title: 'Black friday',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore',
    },
  ]

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="hero-section relative">
      <div className="embla" ref={emblaRef}>
        <Carousel className="w-full">
          <CarouselContent className="-ml-0">
            {heroItems.map((item, index) => (
              <CarouselItem key={index} className="pl-0 relative w-full">
                <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen">
                  <Image
                    src={item.image}
                    alt={`Hero ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="absolute inset-0 container mx-auto px-4 flex items-center">
                    <AnimatePresence>
                      {currentIndex === index && (
                        <motion.div 
                          className="w-full md:w-2/3 lg:w-1/2 space-y-4 md:space-y-6"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={contentVariants}
                          key={index}
                        >
                          <motion.span variants={itemVariants} className="text-white text-sm md:text-lg inline-block">{item.category}</motion.span>
                          <motion.h1 variants={itemVariants} className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">{item.title}</motion.h1>
                          <motion.p variants={itemVariants} className="text-white text-sm md:text-base lg:text-lg">{item.description}</motion.p>
                          <motion.div variants={itemVariants}>
                            <Link href="#" className="inline-block bg-white text-black py-2 px-4 md:py-3 md:px-8 rounded-full hover:bg-gray-200 transition duration-300 text-sm md:text-base">
                              Shop Now
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <motion.div 
                    className="absolute top-4 right-4 md:top-10 md:right-10 bg-red-600 text-white p-2 md:p-4 rounded-lg"
                    initial={{ rotate: 0, scale: 0.8 }}
                    animate={currentIndex === index ? { rotate: 12, scale: 1 } : { rotate: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h2 className="text-lg md:text-2xl font-bold">
                      Sale <span className="text-xl md:text-3xl">50%</span>
                    </h2>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  )
}

export default Hero

