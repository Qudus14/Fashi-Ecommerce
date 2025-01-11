"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddToCart from "@/components/Public/AddToCart";

export default function ProductDetail({ product, isSponsored }) {
  if (!product) {
    return <p>No product details available.</p>;
  }

  const images = product.product_photos || [];
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  
  const price = isSponsored ? product.price : (product.typical_price_range
    ? product.typical_price_range[0] || product.typical_price_range[1]
    : "Price not available");

  return (
    <div className="container mx-auto flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 p-4">
      {/* Container 1 */}
      <div className="hidden lg:block space-y-4 w-1/3">
        {images.slice(0, 4).map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${product.title} ${index}`}
            width={100}
            height={100}
            className="w-fit h-auto mx-auto object-contain border rounded-sm"
          />
        ))}
      </div>

      {/* Container 2 */}
      <div className="w-1/3 mb-10 lg:mb-0 lg:w-1/3 self-start max-w-xl mx-auto lg:mx-20 mt-0 pt-0 !pb-0">
        <Carousel 
          opts={{ loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}>
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
                      className="w-fit h-48 object-contain mx-auto rounded-md"
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

      {/* Container 3 */}
      <div className="flex-1 border rounded-md p-5 space-y-5">
        <h1 className="text-3xl font-bold">{product.product_title}</h1>

        <div className="text-gray-600 py-5">
          {product.product_description.slice(0, 750) + "..."}
        </div>

        <ul className="list-disc list-inside text-gray-600">
          {product.product_attributes &&
            Object.entries(product.product_attributes).map(([key, value]) => (
              <li key={key} className="mb-1">
                <span className="font-semibold">
                  {key.replace(/_/g, " ")}:
                </span>{" "}
                {value}
              </li>
            ))}
        </ul>

        {product.product_rating && (
          <p className="text-yellow-500 items-center text-base">
            {product.product_rating}⭐
            <span className="text-gray-500 ml-2">
               ({product.product_num_reviews} reviews)
            </span>
          </p>
        )}

        <p className="text-2xl font-bold mt-2">{typeof price === "number" ? price.toFixed(2) : price}</p>

        <div className="mt-4 mb-4">
          <AddToCart product={product} isSponsored={isSponsored} />
        </div>

        <hr/>

        <h3 className="font-bold text-xl mt-4">Specifications</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Specification</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product?.product_specs
              ? Object.entries(product.product_specs).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-bold">{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))
              : (
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
  );
}

