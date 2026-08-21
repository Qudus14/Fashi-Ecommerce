"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  Clock,
  Tag,
  Star,
  Eye,
  ImageIcon,
  Shield,
  Truck,
  Award,
  ChevronRight,
  Zap,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import dynamic from "next/dynamic";
import { productApi } from "../service/api";

const DealTimer = dynamic(() => import("../ui/countdown-timer"), {
  loading: () => (
    <div className="flex items-center gap-2 text-gray-400">
      <Clock className="w-4 h-4 animate-pulse" />
      <span className="text-sm">Loading...</span>
    </div>
  ),
  ssr: false,
});

// ========== Map API data to deal format ==========
const mapProductToDeal = (product) => {
  const p = product?.product || product;

  let imageUrl = null;

  if (p.imageUrls && Array.isArray(p.imageUrls) && p.imageUrls.length > 0) {
    const validUrl = p.imageUrls.find(
      (url) =>
        typeof url === "string" && url.trim() !== "" && url.startsWith("http"),
    );
    if (validUrl) {
      imageUrl = validUrl;
    }
  }

  if (!imageUrl) {
    const category = p.categories?.[0]?.toLowerCase() || "";
    if (category.includes("phone") || category.includes("tablet")) {
      imageUrl = "/placeholder-phone.jpg";
    } else if (category.includes("watch")) {
      imageUrl = "/placeholder-watch.jpg";
    } else if (category.includes("shoe")) {
      imageUrl = "/placeholder-shoe.jpg";
    } else if (category.includes("fashion") || category.includes("cloth")) {
      imageUrl = "/placeholder-fashion.jpg";
    } else if (category.includes("electronic")) {
      imageUrl = "/placeholder-electronics.jpg";
    } else {
      imageUrl = "/placeholder-product.jpg";
    }
  }

  const price = p.variants?.[0]?.price || p.price || 0;
  const discountPrice = p.variants?.[0]?.discountPrice || 0;

  let discountPercent = 0;
  if (price > 0 && discountPrice > 0) {
    discountPercent = Math.round(((price - discountPrice) / price) * 100);
  }

  const category = p.categories?.[0] || "General";

  return {
    id: p.productId,
    title: p.name || "Untitled Product",
    description:
      p.description || "Discover this amazing product from our collection.",
    image: imageUrl,
    price: `₦${price.toLocaleString()}`,
    originalPrice:
      discountPrice > 0 ? `₦${discountPrice.toLocaleString()}` : null,
    discountPercent: discountPercent,
    category: category,
    inStock: p.stockQuantity > 0,
    stockQuantity: p.stockQuantity || 0,
    rating: 4.5,
    reviews: 0,
  };
};

function DealSection() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredDeal, setFeaturedDeal] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productApi.getProduct();

        if (response.success && response.data?.length > 0) {
          const mappedProducts = response.data
            .map(mapProductToDeal)
            .filter((p) => p.image);

          setProducts(mappedProducts);

          if (mappedProducts.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * mappedProducts.length,
            );
            setFeaturedDeal(mappedProducts[randomIndex]);
          }
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Products temporarily unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="py-4 md:py-6 lg:py-8">
      <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-lg md:shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <Card className="w-full border-none shadow-none bg-transparent">
          <CardContent className="p-0">
            {!loading && !error && featuredDeal ? (
              <FeaturedCard deal={featuredDeal} />
            ) : (
              <div className="h-[300px] md:h-[400px] lg:h-[450px] flex flex-col items-center justify-center p-6">
                {loading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-4 border-customYellow border-t-transparent mx-auto mb-3 md:mb-4" />
                    <p className="text-gray-400 text-sm md:text-base font-medium">
                      Loading amazing deals...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center">
                    <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-red-400 mx-auto mb-3" />
                    <p className="text-red-400 text-base md:text-lg mb-2">
                      {error}
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 md:px-6 md:py-2.5 bg-customYellow text-white rounded-full text-sm md:text-base hover:bg-yellow-500 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400 text-lg md:text-xl font-semibold">
                      No Deals Available
                    </p>
                    <p className="text-gray-500 text-sm md:text-base mt-1">
                      Check back soon for exciting offers!
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ========== ENHANCED: Featured Card with Full Responsiveness ==========
function FeaturedCard({ deal }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!deal) return null;

  return (
    <div
      className="relative flex flex-col md:flex-row min-h-[380px] md:min-h-[420px] lg:min-h-[480px] w-full overflow-hidden bg-white group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===== IMAGE SECTION - With Dark Gradient Overlay ===== */}
      <div className="relative w-full md:w-2/5 lg:w-1/2 h-[220px] sm:h-[280px] md:h-[420px] lg:h-[480px] bg-gradient-to-br from-gray-50 via-white to-gray-100 flex-shrink-0 overflow-hidden">
        {deal.image && !imageError ? (
          <div className="relative w-full h-full group/image">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              className="object-contain p-4 sm:p-6 md:p-8 lg:p-10 transition-transform duration-700 group-hover/image:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              priority
              onError={() => setImageError(true)}
            />

            {/* ===== DARK GRADIENT OVERLAY ON IMAGE ===== */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

            {/* Dark gradient from bottom - stronger */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Shimmer overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-700" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mb-2 sm:mb-3">
              <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-500">
              {deal.category}
            </span>
          </div>
        )}

        {/* ===== BADGE SYSTEM - Responsive ===== */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-col gap-1.5 sm:gap-2">
          {deal.discountPercent > 0 && (
            <div className="animate-bounce-slow">
              <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5">
                <span className="text-xs sm:text-base">🔥</span>-
                {deal.discountPercent}% OFF
              </span>
            </div>
          )}
          {deal.inStock &&
            deal.stockQuantity < 10 &&
            deal.stockQuantity > 0 && (
              <span className="bg-yellow-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg animate-pulse">
                ⚡ Only {deal.stockQuantity} left!
              </span>
            )}
        </div>

        {/* Category Badge - Bottom Left */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
          <Badge className="bg-white/90 backdrop-blur-sm text-customYellow border-customYellow/20 px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 text-[10px] sm:text-xs font-medium rounded-full shadow-lg">
            <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" />
            {deal.category}
          </Badge>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-32 h-32 sm:w-40 sm:h-40 bg-customYellow/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-32 h-32 sm:w-40 sm:h-40 bg-purple-500/5 rounded-full blur-2xl" />
      </div>

      {/* ===== CONTENT SECTION - Fully Responsive ===== */}
      <div className="flex w-full flex-col justify-center bg-white px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10 md:w-3/5 lg:w-1/2 relative">
        {/* Decorative line */}
        <div className="absolute top-0 left-0 w-1 h-12 sm:h-16 md:h-20 bg-gradient-to-b from-customYellow to-transparent" />

        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          {/* Title - Responsive */}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 tracking-tight leading-tight line-clamp-2 hover:text-customYellow transition-colors">
            {deal.title}
          </h2>

          {/* Description - Responsive */}
          <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 border-l-2 border-customYellow/30 pl-2 sm:pl-3 md:pl-4">
            {deal.description}
          </p>

          {/* Rating - Responsive */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 ${
                      i < Math.floor(deal.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < deal.rating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-700 font-semibold text-xs sm:text-sm ml-0.5">
                {deal.rating}
              </span>
            </div>
            <span className="text-gray-400 text-[10px] sm:text-xs">
              ({deal.reviews || 0} reviews)
            </span>
            <div className="w-px h-3 sm:h-4 bg-gray-200 hidden xs:block" />
            <span className="text-green-600 text-[10px] sm:text-xs font-medium hidden xs:inline">
              ★ Top Rated
            </span>
          </div>

          {/* ===== PRICE AND BUY NOW - SIDE BY SIDE ===== */}
          <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            {/* Price */}
            <div className="flex-shrink-0">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-customYellow font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  {deal.price}
                </span>
                {deal.originalPrice && (
                  <span className="text-gray-400 text-xs sm:text-sm line-through">
                    {deal.originalPrice}
                  </span>
                )}
              </div>
              {deal.discountPercent > 0 && (
                <span className="text-green-600 text-xs sm:text-sm font-medium block">
                  Save {deal.discountPercent}%
                </span>
              )}
            </div>

            {/* Buy Now Button - Flex grow to take remaining space */}
            <button
              onClick={() => router.push(`/product/${deal.id}`)}
              className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-customYellow to-yellow-500 hover:from-yellow-500 hover:to-customYellow text-white font-semibold py-2.5 px-4 sm:py-3 sm:px-6 md:py-3.5 md:px-8 rounded-full shadow-lg shadow-customYellow/30 transition-all hover:scale-105 hover:shadow-customYellow/50 active:scale-95 text-sm sm:text-base min-w-[100px]"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* ===== TIMER - Enhanced Responsive ===== */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-1.5 sm:mb-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-customYellow" />
              <span>Hurry up! Offer ends in</span>
            </div>
            <div className="scale-90 sm:scale-100 origin-left">
              <DealTimer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealSection;
