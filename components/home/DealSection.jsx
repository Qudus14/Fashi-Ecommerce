"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import requests from "@/lib/requests";
import axiosInstance from "@/Axios";
import Image from "next/image";
import deal from "@/public/img/black-friday-alarm-yellow-background.jpg";
import { Button } from "../ui/button";
import DealLoading from "../loading/dealLoading";
import dynamic from "next/dynamic";

const Deal = dynamic(() => import("../ui/countdown-timer"), {
  loading: () => <div className="text-center text-gray-400">Loading...</div>,
  ssr: false,
});

function DealSection() {
  const router = useRouter();
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

        console.log("Deals Response:", response.data);
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

  const featured =
    Array.isArray(products) && products.length > 0
      ? products[Math.floor(Math.random() * products.length)]
      : null;

  return (
    <section className="container px-2 mx-auto bg-cover bg-center py-16 relative">
      {loading && <DealLoading />}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && featured && (
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={deal}
            alt="Deal background"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 container flex flex-col items-center justify-center px-4 py-16 mx-auto">
            <div className="max-w-lg text-center">
              <div className="section-title mb-8">
                <h2 className="text-3xl font-bold mb-4">Deal Of The Week</h2>
                <div className="flex items-center space-x-7 mb-6">
                  {featured?.product_photos?.[0] && (
                    <Image
                      src={featured.product_photos[0]}
                      alt="Deal product"
                      width={170}
                      height={170}
                      className="object-contain"
                    />
                  )}
                  <p className="mb-8 text-gray-700 line-clamp-4 text-start">
                    {featured?.product_description ||
                      "Exclusive deals available now!"}
                  </p>
                </div>
                <div className="text-xl font-bold text-primary mb-8 line-clamp-1">
                  {featured?.product_title || "Deal Item"}{" "}
                  <span className="text-4xl font-normal text-gray-700">
                    / {featured?.offer?.price || "$--"}{" "}
                  </span>
                </div>
              </div>
              <div
                className="countdown-timer flex justify-center space-x-4 mb-8"
                id="countdown"
              >
                <Deal />
              </div>

              <Button
                className="bg-white hover:bg-customYellow/90 hover:text-white text-customYellow font-semibold py-3 px-6 transition duration-300 hover:bg-opacity-80 cursor-pointer w-full text-lg rounded-xl"
                onClick={() =>
                  router.push(`/search?q=${encodeURIComponent("Laptop")}`)
                }
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DealSection;
