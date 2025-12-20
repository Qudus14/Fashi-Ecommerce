"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Heart, Minus, Plus, Truck } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AddToCart from "@/components/Public/AddToCart";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductDetails({ product, isSponsored }) {
  // Add a fallback for when product is not available
  const [mockProduct, setMockProduct] = useState({
    product_title: "Havic HV G-92 Gamepad",
    product_photos: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    product_rating: "4.5",
    product_num_reviews: "150",
    product_description:
      "PlayStation 5 Controller skin high quality vinyl with air-channel adhesive for easy bubble free install & mess free removal. Pressure sensitive.",
    typical_price_range: ["$192.00", "$199.99"],
    offer: {
      price: "$192.00",
      shipping: "Free Shipping",
      store_name: "GameStore",
      payment_methods: "Credit Card, PayPal",
    },
  });

  // Use the provided product or fallback to mock data
  const displayProduct = product || mockProduct;

  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeThumb, setActiveThumb] = useState(0);
  const [emblaApi, setEmblaApi] = useState(null);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const price = isSponsored
    ? displayProduct.price
    : displayProduct.typical_price_range
      ? displayProduct.typical_price_range[0] ||
        displayProduct.typical_price_range[1]
      : "Price not available";

  const images = displayProduct.product_photos || [];

  // Handle thumbnail click to change active slide
  const handleThumbClick = (index) => {
    setActiveThumb(index);
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  };

  // Update active thumb when carousel changes
  const handleCarouselChange = (api) => {
    const currentIndex = api?.selectedScrollSnap();
    if (currentIndex !== undefined) {
      setActiveThumb(currentIndex);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-4 w-24">
          {images.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={cn(
                "bg-gray-100 rounded-md overflow-hidden border cursor-pointer h-24 w-24 flex items-center justify-center",
                activeThumb === index ? "border-gray-800" : "border-gray-200"
              )}
              onClick={() => handleThumbClick(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${displayProduct.product_title || "Product"} ${index + 1}`}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Main Image Carousel */}
        <div className="w-full mb-10 lg:mb-0 lg:w-1/3 self-start max-w-xl mx-auto lg:mx-20 mt-0 pt-0 !pb-0">
          <Carousel
            opts={{ loop: true }}
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="flex aspect-square items-center justify-center p-2 relative">
                      <Image
                        src={image}
                        alt={`${product.product_title} - Image ${index + 1}`}
                        width={250}
                        height={250}
                        className="w-fit h-48 object-fill mx-auto rounded-md"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
              <span className="text-gray-900">&lt;</span>
            </CarouselPrevious>
            <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
              <span className="text-gray-900">&gt;</span>
            </CarouselNext>
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 border border-gray-400 bg-gray-50 rounded p-5">
          <h1 className="text-2xl font-bold mb-2">
            {displayProduct.product_title}
          </h1>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex font-semibold text-base">
              {product.product_rating}⭐
            </div>
            <span className="text-base font-sembold text-gray-500">
              ({displayProduct.product_num_reviews} Reviews)
            </span>
          </div>

          <div className="flex mb-2 items-center gap-2">
            <span className="text-2xl font-bold">{product.offer.price}</span>
            {product.offer.on_sale && (
              <>
                <span
                  className="text-gray-500 font-semibold"
                  style={{ textDecoration: "line-through" }}
                >
                  {product.offer.original_price}
                </span>
                <span className="text-red-500 font-medium">
                  {product.offer.percent_off}
                </span>
              </>
            )}
          </div>

          <p className="text-lg font-semibold text-gray-700 mb-6">
            {displayProduct.product_description}
          </p>

          <div className="flex gap-2 mb-6">
            <div className="flex">
              <AddToCart product={product} isSponsored={isSponsored} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-400 rounded-md p-4 flex items-start gap-3">
              <div>
                <div className="flex items-center gap-2">
                  {product.offer.store_favicon && (
                    <img
                      src={product.offer.store_favicon || "/placeholder.svg"}
                      alt={product.offer.store_name}
                      className="w-15 h-15"
                    />
                  )}
                  <span className="font-bold text-xl">
                    {product.offer.store_name}
                  </span>
                </div>

                {product.offer.payment_methods && (
                  <div className="text-md font-semibold text-gray-600">
                    {product.offer.payment_methods}
                  </div>
                )}
                <div className="text-lg font-semibold text-gray-600">
                  {product.offer.shipping}
                </div>
              </div>
            </div>
          </div>

          <Table className="border-gray-400">
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-xl">
                  Specification
                </TableHead>
                <TableHead className="font-bold text-xl">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Product Specs */}
              {product?.product_specs &&
                Object.entries(product.product_specs).map(([key, value]) => (
                  <TableRow key={`spec-${key}`}>
                    <TableCell className="font-bold">
                      {key.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell className="font-medium">{value}</TableCell>
                  </TableRow>
                ))}

              {/* Product Attributes */}
              {product?.product_attributes &&
                Object.entries(product.product_attributes).map(
                  ([key, value]) => (
                    <TableRow key={`attr-${key}`}>
                      <TableCell className="font-bold">
                        {key.replace(/_/g, " ")}
                      </TableCell>
                      <TableCell className="font-medium">{value}</TableCell>
                    </TableRow>
                  )
                )}

              {/* No data available message */}
              {(!product?.product_specs ||
                Object.keys(product.product_specs).length === 0) &&
                (!product?.product_attributes ||
                  Object.keys(product.product_attributes).length === 0) && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No specifications available.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
