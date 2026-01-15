"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tv,
  Smartphone,
  Sofa,
  ShirtIcon,
  Monitor,
  Dumbbell,
  Sparkles,
  Gamepad2,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import axiosInstance from "@/Axios";
import requests from "@/lib/requests";
import HeroLoading from "../loading/heroLoadivg";

export default function Hero() {
  const router = useRouter();
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const fetchBannerDeal = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = requests.fetchBannerDeal;
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

    fetchBannerDeal();
  }, []);

  const banner =
    Array.isArray(products) && products.length > 0
      ? products[Math.floor(Math.random() * products.length)]
      : null;

  const scrollTo = useCallback((index) => api?.scrollTo(index), [api]);

  return (
    <div className="container mx-auto px-2">
      <div className="flex flex-col md:flex-row py-2 gap-4">
        {/* Hero Carousel */}
        <div className="relative w-full overflow-hidden bg-slate-50">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {/* FIX: If you want to slide through ALL products, use .map()
         If you only want to show the ONE random 'banner', remove the loop.
      */}
              {!loading && !error && products.length > 0 ? (
                products.map((product, idx) => (
                  <CarouselItem
                    key={`${product.product_id || "prod"}-${idx}`}
                    className="pl-0"
                  >
                    <FeaturedSlide item={product} />
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="pl-0">
                  <div className="flex items-center text-5xl justify-center text-customYellow ">
                    {loading ? "Loading Deals..." : <HeroLoading />}
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/20 border-none text-white hover:bg-customYellow transition-all" />
            <CarouselNext className="right-4 bg-white/20 border-none text-white hover:bg-customYellow transition-all" />
          </Carousel>

          {/* Indicators */}
          {count > 0 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    current === index
                      ? "w-6 bg-customYellow"
                      : "w-2 bg-white/50"
                  }`}
                  onClick={() => scrollTo(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FeaturedSlide({ item }) {
  const router = useRouter();

  return (
    <div className="relative flex flex-col md:flex-row min-h-[450px] md:h-[500px] w-full overflow-hidden">
      {/* Image Area */}
      <div className="relative w-full md:w-3/5 h-[300px] md:h-full">
        {item?.product_photos?.[0] && (
          <Image
            src={item.product_photos[0]}
            alt={item.product_title}
            fill
            // Changed from object-contain to object-cover to fill the space
            className="object-contain object-center"
            sizes="(max-width: 100px) 50vw, 50vw"
            priority
          />
        )}

        {/* The Overlay: 
            Mobile: Fades bottom to top to make text readable.
            Desktop: Fades left to right to blend into the black text box.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-zinc-900/20 md:to-zinc-900" />
      </div>

      {/* Content Area */}
      <div className="flex w-full flex-col justify-center bg-zinc-900 px-6 py-10 md:w-2/5 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          {item?.offer?.store_name && (
            <Badge className="mb-4 bg-customYellow text-white hover:bg-customYellow/80 border-none px-3 py-1">
              {item.offer.store_name}
            </Badge>
          )}

          {item?.product_title && (
            <h2 className="text-xl font-extrabold tracking-tight text-white lg:text-xl leading-tight line-clamp-2">
              {item.product_title}
            </h2>
          )}

          {item?.product_description && (
            <p className="mt-4 text-zinc-400 text-sm lg:text-lg leading-relaxed max-w-md line-clamp-3">
              {item.product_description}
            </p>
          )}

          {item?.offer?.price && (
            <p className="mt-4 font-serif text-zinc-400 text-3xl font-bold leading-relaxed max-w-md line-clamp-3">
              {item.offer.price}
            </p>
          )}

          {item?.store_name && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                router.push(`/search?q=${encodeURIComponent(item.store_name)}`)
              }
              className="mt-8 flex items-center justify-center gap-3 bg-customYellow px-10 py-4 font-bold text-white rounded-full shadow-lg shadow-customYellow/20 transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              Shop Now
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
