"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import requests from "@/lib/requests";
import axiosInstance from "@/Axios";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; // Added missing import
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import dynamic from "next/dynamic";

const DealTimer = dynamic(() => import("../ui/countdown-timer"), {
  loading: () => <div className="text-center text-gray-400">Loading...</div>,
  ssr: false,
});

function DealSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = requests.fetchDeals;
        const response = await axiosInstance.get(url);
        if (response.data?.status === "OK" && response.data?.data?.products) {
          setProducts(response.data?.data?.products);
        } else {
          setError(`Failed to fetch deals`);
        }
      } catch (err) {
        console.error(err);
        setError("Deal's products temporarily unavailable");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Pick a random featured product if products exist
  const featured =
    Array.isArray(products) && products.length > 0
      ? products[Math.floor(Math.random() * products.length)]
      : null;

  return (
    <div className="container mx-auto px-2">
      <div className="flex flex-col md:flex-row py-2 gap-4">
        <div className="relative w-full overflow-hidden rounded-xl bg-slate-50">
          <Card className="w-full border-none shadow-lg">
            <CardContent className="p-0">
              {" "}
              {/* Changed ml-0 to p-0 for flush fit */}
              {!loading && !error && featured ? (
                <FeaturedCard item={featured} />
              ) : (
                <div className="h-[450px] md:h-[500px] flex flex-col items-center justify-center text-customYellow">
                  {loading ? (
                    <p className="animate-pulse font-bold text-2xl">
                      Loading Deals...
                    </p>
                  ) : (
                    <p className="text-gray-400 text-xl">No Deals Available</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ item }) {
  const router = useRouter();

  return (
    <div className="relative flex flex-col md:flex-row min-h-[450px] md:h-[500px] w-full overflow-hidden">
      {/* Image Area */}
      <div className="relative w-full md:w-3/5 h-[300px] md:h-full bg-white">
        {item?.product_photos?.[0] && (
          <Image
            src={item.product_photos[0]}
            alt={item.product_title || "Product Image"}
            fill
            className="object-contain p-8" // Contain works better for product shots on plain backgrounds
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-zinc-900/20 md:to-zinc-900" />
      </div>

      {/* Content Area */}
      <div className="flex w-full flex-col justify-center bg-zinc-900 px-6 py-10 md:w-2/5 md:px-10 lg:px-12">
        <div className="z-10">
          <div className="flex justify-between items-start mb-4">
            {item?.offer?.store_name && (
              <Badge className="bg-customYellow text-white border-none px-3 py-1">
                {item.offer.store_name}
              </Badge>
            )}
            {/* Optional: Add the countdown timer here */}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white lg:text-3xl leading-tight line-clamp-2">
            {item.product_title}
          </h2>

          <p className="mt-4 text-zinc-400 text-sm lg:text-base leading-relaxed max-w-md line-clamp-3">
            {item.product_description}
          </p>

          <div className="flex flex-col lg:flex-row md:space-x-4 gap-2 lg:gap-0 my-1 lg:items-center">
            {item?.offer?.price && (
              <div className="mt-6">
                <span className="text-zinc-500 text-sm uppercase font-bold tracking-widest">
                  Limited Offer
                </span>
                <p className="text-customYellow font-serif text-4xl font-black">
                  {item.offer.price}
                </p>
              </div>
            )}

            <div className="justify-self-start py-1">
              <button
                onClick={() =>
                  router.push(
                    `/search?q=${encodeURIComponent(item.product_title)}`
                  )
                }
                className="flex justify-items-start items-center justify-center gap-3 bg-customYellow hover:bg-yellow-500 font-bold py-4 px-6 text-white rounded-full shadow-lg transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timer area absolute */}
      <div className="absolute bottom-3 right-52">
        <DealTimer />
      </div>
    </div>
  );
}

export default DealSection;
