"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  ArrowRight,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { StarFilledIcon } from "@sanity/icons";
import { productApi } from "../service/api";

// ========== FIXED: Match actual API categories ==========
const categories = [
  { id: "Fashion", label: "Fashion" },
  { id: "Shoes", label: "Shoes" },
  { id: "Appliances", label: "Appliances" },
  { id: "Furniture", label: "Furniture" },
];

// ========== SUB-COMPONENTS ==========

// Product Card Skeleton
const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded-xl aspect-[4/5] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
    </div>
    <div className="mt-3 space-y-2">
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/5" />
      </div>
    </div>
  </div>
);

// Quick View Modal
const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-4 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src={product.imageUrls?.[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-customYellow font-medium">
              {product.categories?.[0] || "Product"}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <StarFilledIcon className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold">4.5</span>
              </div>
              <span className="text-gray-400 text-sm">(0 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-gray-900">
                ₦{product.price?.toLocaleString()}
              </span>
            </div>

            <p className="text-gray-600 mt-4 leading-relaxed">
              {product.description ||
                "Discover this stunning piece from our collection. Crafted with premium materials for lasting comfort and style."}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Availability:</span>
                <span className="text-green-600">In Stock</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Category:</span>
                <span>{product.categories?.join(", ") || "General"}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <AddToCart product={product} className="flex-1" />
              <button className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full hover:border-customYellow hover:bg-customYellow hover:text-white transition-all font-medium">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========

const WomenBanner = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Fashion");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const categoryScrollRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productApi.getProduct();

        if (response.success) {
          setAllProducts(response.data);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
        setError("Products temporarily unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (allProducts.length > 0) {
      const filtered = allProducts.filter((item) => {
        const product = item?.product || item;
        return product.categories?.includes(activeCategory);
      });
      setFilteredProducts(filtered);
    }
  }, [activeCategory, allProducts]);

  const handleViewAll = () => {
    router.push(`/search?q=${encodeURIComponent(activeCategory)}`);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // Scroll selected category into view on mobile
    const container = categoryScrollRef.current;
    if (container) {
      const selectedButton = container.querySelector(
        `[data-category="${categoryId}"]`,
      );
      if (selectedButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();
        const scrollLeft =
          buttonRect.left - containerRect.left + container.scrollLeft - 16;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  };

  // Render product card - FIXED: Removed max-w-[260px]
  const renderProductCard = useCallback(
    (item, index) => {
      const product = item?.product || item;

      const imageUrl = product.imageUrls?.find(
        (url) => typeof url === "string" && url.trim() !== "",
      );

      if (!imageUrl) return null;

      const primaryCategory = product.categories?.[0] || "General";
      const categoryDisplay =
        primaryCategory.length > 15
          ? primaryCategory.substring(0, 14) + "…"
          : primaryCategory;

      return (
        <CarouselItem
          key={product.productId || `${product.name}-${index}`}
          className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4"
        >
          <Card className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full w-full">
            <CardContent className="p-0 flex-shrink-0 relative">
              <div className="relative aspect-[4/5] w-full bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={product.name || "Product"}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority={index < 3}
                  quality={75}
                />

                {/* Badge System */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.discount_percent && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                      -{product.discount_percent}%
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      if (product?.productId) {
                        router.push(`/product/${product.productId}`);
                      }
                    }}
                    className="bg-white text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-customYellow hover:text-white transition-all transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-customYellow hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    Quick View
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 hover:scale-110"
                  aria-label="Add to wishlist"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-3.5 h-3.5 text-gray-600 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start p-3 gap-1 bg-white flex-grow">
              <div className="w-full">
                <span
                  className="inline-block text-[10px] font-medium text-customYellow bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-200 max-w-full truncate"
                  title={product.categories?.[0] || "General"}
                >
                  {categoryDisplay}
                </span>
              </div>

              <Link
                href={`/product/${product.productId}`}
                className="font-semibold text-gray-800 text-sm hover:text-customYellow transition-colors line-clamp-2 min-h-[2.5rem]"
              >
                {product.name || "Untitled Product"}
              </Link>

              <div className="flex items-center justify-between w-full mt-0.5">
                <span className="text-base font-bold text-gray-900">
                  ₦{product.price?.toLocaleString()}
                </span>

                <div className="flex items-center gap-0.5">
                  <StarFilledIcon className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-xs font-medium text-gray-700">4.5</span>
                </div>
              </div>

              <div className="w-full mt-1 md:hidden">
                <AddToCart
                  product={product}
                  className="w-full text-xs py-1.5"
                />
              </div>
            </CardFooter>
          </Card>
        </CarouselItem>
      );
    },
    [router],
  );

  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-3 md:px-4">
        {/* ===== CATEGORY NAVIGATION - FIXED with horizontal scroll ===== */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Category Tabs - Horizontal scroll on mobile */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="w-full md:w-auto">
              {/* Mobile: Scrollable tabs with left/right shadows */}
              <div className="relative">
                {/* Left gradient fade - mobile only */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 md:hidden pointer-events-none" />

                {/* Right gradient fade - mobile only */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 md:hidden pointer-events-none" />

                <div
                  ref={categoryScrollRef}
                  className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide py-1 px-2 -mx-2 md:mx-0 scroll-smooth"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      data-category={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`
                        flex-shrink-0 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300
                        ${
                          activeCategory === category.id
                            ? "bg-customYellow text-white shadow-lg shadow-customYellow/30 scale-105"
                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }
                      `}
                      role="tab"
                      aria-selected={activeCategory === category.id}
                    >
                      {category.label}
                      {activeCategory === category.id && (
                        <span className="ml-1.5 md:ml-2 bg-white/20 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs">
                          {filteredProducts.length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleViewAll}
              className="hidden md:block flex-shrink-0 text-customYellow font-semibold text-xs md:text-sm hover:underline flex items-center gap-1 transition-all group bg-yellow-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-customYellow hover:text-white hover:no-underline w-full md:w-auto justify-center md:justify-start"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ===== PRODUCTS SECTION ===== */}
        <div className="relative mt-4 md:mt-8">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 bg-red-50 rounded-2xl">
              <h3 className="text-lg font-semibold text-red-600 mb-1">
                Oops! Something went wrong
              </h3>
              <p className="text-sm text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 px-5 py-1.5 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-1">
                No Products Found
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                No products available in this category. Check back soon!
              </p>
            </div>
          )}

          {/* Carousel - FIXED: Added overflow-visible and container */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="relative -mx-3 md:mx-0">
              <Carousel
                ref={carouselRef}
                plugins={[
                  Autoplay({
                    delay: 3000,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full overflow-visible"
                opts={{
                  align: "start",
                  loop: true,
                  skipSnaps: false,
                  dragFree: false,
                  slidesToScroll: 1,
                  containScroll: "trimSnaps",
                }}
                setApi={(api) => {
                  if (api) {
                    api.on("select", () => {
                      setActiveIndex(api.selectedScrollSnap());
                    });
                  }
                }}
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {filteredProducts.map((item, index) =>
                    renderProductCard(item, index),
                  )}
                </CarouselContent>

                {/* Navigation Controls - Hidden on mobile */}
                {filteredProducts.length > 4 && (
                  <div className="hidden md:block">
                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-customYellow hover:text-white border-0 shadow-xl transition-all hover:scale-110" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-customYellow hover:text-white border-0 shadow-xl transition-all hover:scale-110" />
                  </div>
                )}
              </Carousel>
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};

export default WomenBanner;
