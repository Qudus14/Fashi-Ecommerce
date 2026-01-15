"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useCartStore } from "@/store";
import AddToCart from "../Public/AddToCart";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../Public/LoadingPage";
import requests from "@/lib/requests";
import axiosInstance from "@/Axios";
import CarouselLoading from "../loading/carouselLoading";
import person from "../../public/img/products/man-large.jpg";
import { StarFilledIcon } from "@sanity/icons";

const categories = ["Electronics", "Watches", "Shoes", "Sports"];

const MenBanner = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { cart } = useCartStore();

  const handleClick = () => {
    router.push(`/search?q=${encodeURIComponent("Men's")}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = requests.fetchWears(activeCategory);
        const response = await axiosInstance.get(url);

        console.log("API Response:", response.data);

        if (response.data?.status === "OK" && response.data?.data?.products) {
          setProducts(response.data.data.products);
        } else {
          setError(`Failed to fetch men's product for ${activeCategory}`);
        }
      } catch (err) {
        console.error(err);
        setError("Men's products temporarily unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <section className="md:py-16 py-4 md:px-10 px-4">
      <div className="container mx-auto">
        <div className="flex md:ml-12 ml-0 mb-4">
          <div className="ml-8 md:ml-36 lg:ml-48 justify-self-center">
            <ul className="flex items-center space-x-4">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    category === activeCategory
                      ? "text-customYellow font-bold text-xl"
                      : "font-semibold text-gray-600 text-xl hover:text-customYellow"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 md:px-4 px-3">
            {loading && <CarouselLoading />}

            {error && <div className="text-center text-red-500">{error}</div>}

            {!loading && !error && (
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 2000,
                    loop: true,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent className="ml-2 md:ml-4">
                  {products.map((item, index) => {
                    const product = item?.product || item;

                    const imageUrl = product.product_photos.find(
                      (url) => typeof url === "string" && url.trim() !== ""
                    );

                    if (!imageUrl) return null;
                    return (
                      <CarouselItem
                        key={product?.product_id || index}
                        className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                      >
                        <Card className="bg-gray-300 overflow-hidden rounded-2xl border-gray-200 w-full h-[390px] flex flex-col">
                          <CardContent className="p-0 flex-shrink-0">
                            <div className="relative overflow-hidden group">
                              <div className="relative flex justify-center items-center w-full h-[250px] bg-gray-50 border-b-gray-500 overflow-hidden">
                                <Image
                                  src={imageUrl}
                                  alt={product?.product_title || "Product"}
                                  width={250}
                                  height={250}
                                  className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 relative"
                                  sizes="(max-width: 768px) 100vw, 250px"
                                />
                                {/* <span className="absolute bg- text-white font-bold text-sm top-2 left-2 px-2 py-1 rounded-full bg-customYellow">
                                  {product?.discount_percent}
                                </span> */}
                              </div>

                              <div className="absolute top-0 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-full group-hover:translate-y-4">
                                <Heart className="w-5 h-5 text-gray-600" />
                              </div>

                              <ul className="absolute bottom-1 left-0 right-0 flex flex-row md:flex-col lg:flex-row justify-center md:space-y-2 lg:space-y-0 space-y-0 space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0">
                                <li>
                                  <AddToCart product={product} />
                                </li>

                                <li
                                  className="bg-white px-3 py-2 rounded-full text-bold cursor-pointer text-center"
                                  onClick={() => {
                                    if (product?.product_id) {
                                      // Pass the raw string, Next.js will handle the URL safety
                                      router.push(
                                        `/product/${product.product_id}`
                                      );
                                    } else {
                                      console.error(
                                        "No product ID found for this item",
                                        product
                                      );
                                    }
                                  }}
                                >
                                  + Quick View
                                </li>
                              </ul>
                            </div>
                          </CardContent>

                          <CardFooter className="flex flex-col items-start p-4">
                            <div className="text-sm font-semibold text-gray-500">
                              <span className="text-customYellow font-semibold text-sm bg-white p-1 border border-customYellow rounded-xl">
                                {activeCategory}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="flex items-center text-sm font-bold">
                                {product?.product_rating}
                                <StarFilledIcon
                                  size={13}
                                  className="text-customYellow"
                                />
                              </span>
                              <span className="text-gray-700 font-semibold text-xs">
                                ({product?.product_num_reviews} review)
                              </span>
                            </div>

                            <Link
                              href="#"
                              className="block font-bold text-gray-900 text-base mb-2 hover:text-customYellow line-clamp-3"
                            >
                              {product?.product_title || "Untitled Product"}
                            </Link>
                          </CardFooter>
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>

                <CarouselPrevious className="left-4 bg-white/20 border-none text-white hover:bg-customYellow transition-all" />
                <CarouselNext className="right-4 bg-white/20 border-none text-white hover:bg-customYellow transition-all" />
              </Carousel>
            )}
          </div>

          <div
            className="lg:block md:hidden hidden w-full lg:w-1/3 mt-4 lg:mt-0 cursor-pointer"
            onClick={handleClick}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            tabIndex={0}
            role="button"
            aria-label="Discover Men's Collection"
          >
            <div className="product-large relative h-[500px] bg-cover bg-center bg-no-repeat cursor-pointer transition-transform duration-300 hover:scale-95 group-hover:opacity-90">
              <Image
                src={person}
                alt="Men's Collection"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0  flex flex-col justify-center items-center text-white transition-all duration-300 group-hover:bg-opacity-50">
                <h2 className="text-4xl font-bold mb-4">Men's</h2>
                <span className="inline-block hover:bg-customYellow bg-white text-black px-6 py-2 rounded-full hover:text-white transition-colors">
                  Discover More
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenBanner;
