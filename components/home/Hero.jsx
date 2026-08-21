"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
  Cpu,
  Sofa,
  ShirtIcon,
  ShoppingCart,
  Monitor,
  Baby,
  Dumbbell,
  Home,
  Sparkles,
  Gamepad2,
  ChevronRight,
  TrendingUp,
  Zap,
  Clock,
  Shield,
  Truck,
  Star,
  Eye,
  Heart,
  Share2,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { productApi } from "../service/api";

// ===== CATEGORY DATA =====
const categories = [
  {
    name: "Appliances",
    icon: Tv,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
    count: 18,
  },
  {
    name: "Phones & Tablets",
    icon: Smartphone,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
    count: 12,
  },
  {
    name: "Furniture",
    icon: Sofa,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-100",
    count: 24,
  },
  {
    name: "Fashion",
    icon: ShirtIcon,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    hoverColor: "hover:bg-pink-100",
    count: 32,
  },
  {
    name: "Computing",
    icon: Monitor,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    hoverColor: "hover:bg-cyan-100",
    count: 8,
  },
  {
    name: "Sports & Outdoors",
    icon: Dumbbell,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    hoverColor: "hover:bg-green-100",
    count: 15,
  },
  {
    name: "Beauty & Personal Care",
    icon: Sparkles,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50",
    hoverColor: "hover:bg-rose-100",
    count: 10,
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    hoverColor: "hover:bg-indigo-100",
    count: 6,
  },
];

// ===== FALLBACK CAROUSEL ITEMS (if API fails) =====
const fallbackCarouselItems = [
  {
    image: "/img/hero-1.jpg",
    category: "Appliances",
    title: "Premium Kitchen Appliances",
    description: "Discover the best kitchen appliances for your home",
    discount: "50% OFF",
    badge: "🔥 Trending Now",
    ctaText: "Shop Appliances",
    ctaLink: "/search?q=Appliances",
    secondaryCta: "View All",
    secondaryLink: "/search?q=Appliances",
  },
  {
    image: "/img/hero-2.jpg",
    category: "Appliances",
    title: "Smart Home Technology",
    description: "Upgrade your home with the latest smart appliances",
    discount: "25% OFF",
    badge: "⚡ Limited Time",
    ctaText: "Shop Smart",
    ctaLink: "/search?q=Appliances",
    secondaryCta: "View All",
    secondaryLink: "/search?q=Appliances",
  },
  {
    image: "/img/hero-3.jpg",
    category: "Appliances",
    title: "Energy Efficient Appliances",
    description: "Save money with our energy-efficient appliance collection",
    discount: "30% OFF",
    badge: "🏠 New Arrivals",
    ctaText: "Shop Now",
    ctaLink: "/search?q=Appliances",
    secondaryCta: "Explore",
    secondaryLink: "/search?q=Appliances",
  },
];

// ===== MAP PRODUCT TO CAROUSEL ITEM =====
const mapProductToCarouselItem = (product, index) => {
  const p = product?.product || product;

  // Get first valid image URL
  let imageUrl = "/placeholder-product.jpg";
  if (p.imageUrls && Array.isArray(p.imageUrls) && p.imageUrls.length > 0) {
    const validUrl = p.imageUrls.find(
      (url) =>
        typeof url === "string" && url.trim() !== "" && url.startsWith("http"),
    );
    if (validUrl) {
      imageUrl = validUrl;
    }
  }

  // Get category - should be "Appliances"
  const category = p.categories?.[0] || "Appliances";

  // Calculate discount
  let discountPercent = 0;
  const price = p.variants?.[0]?.price || p.price || 0;
  const discountPrice = p.variants?.[0]?.discountPrice || 0;
  if (price > 0 && discountPrice > 0) {
    discountPercent = Math.round(((price - discountPrice) / price) * 100);
  }

  // Appliances-specific badges
  const badges = [
    "🔥 Kitchen Essential",
    "⭐ Top Rated Appliance",
    "🆕 New Arrival",
    "⚡ Energy Saver",
    "🎉 Smart Home Deal",
    "🏠 Home Essential",
    "💪 Heavy Duty",
    "✨ Premium Quality",
  ];
  const randomBadge = badges[Math.floor(Math.random() * badges.length)];

  // Appliances-specific discounts
  const discounts = [
    "20% OFF",
    "30% OFF",
    "40% OFF",
    "50% OFF",
    "25% OFF",
    "35% OFF",
    "15% OFF",
  ];
  const randomDiscount =
    discounts[Math.floor(Math.random() * discounts.length)];

  // Appliances-specific descriptions
  const descriptions = [
    `Discover the amazing ${p.name || "appliance"} at an unbeatable price. Perfect for your home!`,
    `Get the best deal on ${p.name || "this appliance"} today. Limited stock available!`,
    `Experience premium quality with ${p.name || "this appliance"}. Order now for free delivery!`,
    `Don't miss out on this incredible offer for ${p.name || "this appliance"}!`,
    `Upgrade your home with the ${p.name || "latest appliance"}. Smart, efficient, and stylish.`,
  ];
  const randomDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)];

  // Appliances-specific titles
  const titlePrefixes = [
    "Premium",
    "Smart",
    "Energy Efficient",
    "Professional",
    "Modern",
    "Compact",
    "Stainless Steel",
    "Digital",
  ];
  const randomPrefix =
    titlePrefixes[Math.floor(Math.random() * titlePrefixes.length)];

  return {
    id: p.productId,
    image: imageUrl,
    category: "Appliances",
    title: p.name || `${randomPrefix} Appliance`,
    description: p.description || randomDescription,
    discount: discountPercent > 0 ? `${discountPercent}% OFF` : randomDiscount,
    badge: randomBadge,
    ctaText: "Shop Now",
    ctaLink: `/product/${p.productId}`,
    secondaryCta: "View Details",
    secondaryLink: `/product/${p.productId}`,
    gradient: "from-black/70 via-black/50 to-transparent",
    price: `₦${price.toLocaleString()}`,
    originalPrice:
      discountPrice > 0 ? `₦${discountPrice.toLocaleString()}` : null,
  };
};

export default function Hero() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [carouselItems, setCarouselItems] = useState(fallbackCarouselItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  // Fetch products and build carousel items - FILTER BY APPLIANCES
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productApi.getProduct();

        if (response.success && response.data && response.data.length > 0) {
          // Filter products to only include Appliances
          const appliancesProducts = response.data.filter((item) => {
            const product = item?.product || item;
            const categories = product.categories || [];
            return categories.includes("Appliances");
          });

          if (appliancesProducts.length === 0) {
            setError("No appliances available");
            setCarouselItems(fallbackCarouselItems);
            setLoading(false);
            return;
          }

          // Shuffle appliances products for random selection
          const shuffled = [...appliancesProducts].sort(
            () => Math.random() - 0.5,
          );

          // Take first 3-5 products for carousel
          const selectedProducts = shuffled.slice(0, 5);

          // Map to carousel items
          const mappedItems = selectedProducts.map((product, index) =>
            mapProductToCarouselItem(product, index),
          );

          setCarouselItems(mappedItems);
        } else {
          setError("No products available");
          setCarouselItems(fallbackCarouselItems);
        }
      } catch (err) {
        console.error("Error fetching products for carousel:", err);
        setError("Failed to load products");
        setCarouselItems(fallbackCarouselItems);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  // Loading state for carousel
  if (loading) {
    return (
      <div className="bg-gray-50">
        <div className="w-full p-2">
          <div className="flex flex-col lg:flex-row">
            {/* Categories Sidebar Skeleton */}
            <div className="hidden lg:block lg:w-[280px] xl:w-[320px] flex-shrink-0">
              <div className="bg-white shadow-sm border border-gray-100 overflow-hidden sticky top-4">
                <div className="bg-[#1f2937] px-5 py-3.5">
                  <div className="h-4 w-32 bg-white/20 rounded animate-pulse" />
                </div>
                <ul className="p-2 space-y-0.5">
                  {[...Array(8)].map((_, i) => (
                    <li key={i} className="px-3.5 py-2.5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Carousel Skeleton */}
            <div className="flex-1 min-w-0">
              <div className="relative overflow-hidden shadow-xl">
                <div className="h-[420px] md:h-[500px] bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-customYellow border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-500">Loading...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="w-full p-2">
        {/* ===== MAIN CONTENT ===== */}
        <div className="flex flex-col lg:flex-row">
          {/* ===== CATEGORIES SIDEBAR ===== */}
          <motion.div
            className="hidden lg:block lg:w-[280px] xl:w-[320px] flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white shadow-sm border border-gray-100 overflow-hidden sticky top-4">
              <div className="bg-[#1f2937] px-5 py-3.5">
                <h3 className="text-white font-bold text-sm flex items-center gap-2.5">
                  <ShoppingCart className="w-4 h-4" />
                  All Categories
                </h3>
              </div>
              <ul className="p-2 space-y-0.5 max-h-[500px] overflow-y-auto">
                {categories.map((category) => (
                  <li
                    key={category.name}
                    className={`group relative px-3.5 py-2.5 text-sm font-medium rounded-xl hover:text-white cursor-pointer transition-all duration-200 flex items-center justify-between hover:shadow-md ${
                      category.name === "Appliances"
                        ? "bg-customYellow/10 text-customYellow"
                        : "hover:bg-customYellow"
                    }`}
                    onClick={() =>
                      router.push(
                        `/search?q=${encodeURIComponent(category.name)}`,
                      )
                    }
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${
                          category.name === "Appliances"
                            ? "bg-customYellow/20"
                            : ""
                        }`}
                      >
                        <category.icon
                          className={`h-4 w-4 ${
                            category.name === "Appliances"
                              ? "text-customYellow"
                              : "group-hover:text-white"
                          }`}
                        />
                      </div>
                      <span
                        className={`${
                          category.name === "Appliances"
                            ? "text-customYellow"
                            : "text-gray-700 group-hover:text-white"
                        } transition-colors`}
                      >
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                        {category.count}
                      </span>
                    </div>
                    <ChevronRight
                      className={`h-3.5 w-3.5 ${
                        category.name === "Appliances"
                          ? "text-customYellow"
                          : "text-gray-400"
                      } opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ===== CAROUSEL ===== */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative overflow-hidden shadow-xl">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[plugin.current]}
                onMouseEnter={() => {
                  plugin.current.stop();
                  setIsHovered(true);
                }}
                onMouseLeave={() => {
                  plugin.current.reset();
                  setIsHovered(false);
                }}
                className="w-full"
                setApi={(api) => {
                  if (api) {
                    api.on("select", () => {
                      handleSlideChange(api.selectedScrollSnap());
                    });
                  }
                }}
              >
                <CarouselContent className="-ml-0">
                  {carouselItems.map((item, index) => (
                    <CarouselItem key={item.id || index} className="pl-0">
                      <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden">
                        {/* Background Image */}
                        <Image
                          src={item.image || "/placeholder-product.jpg"}
                          alt={item.title}
                          fill
                          className="object-contain scale-105 hover:scale-100 transition-transform duration-700"
                          priority={index === 0}
                          sizes="(max-width: 500px) 100vw, 75vw"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-product.jpg";
                          }}
                        />

                        {/* Gradient Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.gradient || "from-black/70 via-black/50 to-transparent"}`}
                        />

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-2/5 h-full bg-gradient-to-l from-customYellow/10 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-customYellow/10 rounded-full blur-3xl" />
                        <div className="absolute top-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center">
                          <div className="container mx-auto px-6 md:px-10">
                            <motion.div
                              className="max-w-xl"
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                            >
                              {/* Category */}
                              <motion.span
                                className="text-customYellow font-medium text-lg uppercase tracking-wider bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                              >
                                {item.category}
                              </motion.span>

                              {/* Title */}
                              <motion.h1
                                className="text-2xl md:text-3xl font-bold text-white mt-3 leading-tight drop-shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                              >
                                {item.title}
                              </motion.h1>

                              {/* Description */}
                              <motion.p
                                className="text-gray-200 text-base md:text-lg mt-3 max-w-lg drop-shadow"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                              >
                                {item.description}
                              </motion.p>

                              {/* Price */}
                              {item.price && (
                                <motion.div
                                  className="mt-4"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.65 }}
                                >
                                  <span className="text-2xl md:text-3xl font-bold text-customYellow">
                                    {item.price}
                                  </span>
                                  {item.originalPrice && (
                                    <span className="ml-3 text-gray-400 line-through text-sm md:text-base">
                                      {item.originalPrice}
                                    </span>
                                  )}
                                </motion.div>
                              )}

                              {/* CTA Buttons */}
                              <motion.div
                                className="flex flex-wrap gap-3 mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                              >
                                <button
                                  onClick={() => router.push(item.ctaLink)}
                                  className="group bg-customYellow hover:bg-customYellow/95 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                >
                                  {item.ctaText}
                                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                  onClick={() =>
                                    router.push(item.secondaryLink)
                                  }
                                  className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-full border border-white/20 transition-all hover:scale-105"
                                >
                                  {item.secondaryCta}
                                </button>
                              </motion.div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Discount Badge */}
                        <motion.div
                          className="absolute top-6 right-6 bg-white rounded-2xl p-4 shadow-2xl hidden md:block"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: 0.8,
                            type: "spring",
                            bounce: 0.5,
                          }}
                        >
                          <div className="text-center">
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                              Flash Sale
                            </div>
                            <div className="text-2xl font-bold text-customYellow">
                              {item.discount || "50% OFF"}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Use code: BFRIDAY
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Navigation Arrows */}
                <div className="hidden md:block">
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-md hover:bg-customYellow hover:text-white border-0 text-white transition-all shadow-lg hover:shadow-customYellow/30" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-md hover:bg-customYellow hover:text-white border-0 text-white transition-all shadow-lg hover:shadow-customYellow/30" />
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {carouselItems.map((_, idx) => (
                    <button
                      key={idx}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeIndex === idx
                          ? "w-10 bg-customYellow shadow-lg shadow-customYellow/50"
                          : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                      onClick={() => {
                        // Navigate to specific slide
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </Carousel>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
