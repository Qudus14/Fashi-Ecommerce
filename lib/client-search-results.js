"use client";

import { useState, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "@/app/search/productCard";
import { productApi } from "@/components/service/api";

async function fetchProducts(searchTerm, page = 1, limit = 12) {
  console.log("🚀 Fetching products for:", searchTerm, "page:", page);

  try {
    const response = await productApi.searchProducts(searchTerm, page, limit);

    console.log("✅ Received:", response);

    if (response.success) {
      return {
        products: response.data || [],
        hasMore: response.hasMore || false,
        total: response.total || 0,
      };
    }

    return {
      products: [],
      hasMore: false,
      total: 0,
    };
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return {
      products: [],
      hasMore: false,
      total: 0,
    };
  }
}

export default function ClientSearchResults({
  products: initialProducts = [],
  sponsoredProducts = [],
  hasMore: initialHasMore = false,
  searchTerm,
  itemsPerPage = 12,
}) {
  const [allProducts, setAllProducts] = useState([
    ...sponsoredProducts,
    ...initialProducts,
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(initialHasMore);

  const observer = useRef(null);

  const loadMoreProducts = useCallback(async () => {
    console.log("🔥 loadMoreProducts called");

    if (isLoading || !hasMoreProducts) {
      console.log("🚫 Request blocked");
      return;
    }

    setIsLoading(true);

    const nextPage = currentPage + 1;

    console.log("🚀 Fetching page:", nextPage);

    try {
      const { products: newProducts, hasMore } = await fetchProducts(
        searchTerm,
        nextPage,
        itemsPerPage,
      );

      console.log("📦 New products:", newProducts.length);
      console.log("➡️ Has more:", hasMore);

      if (newProducts.length > 0) {
        setAllProducts((prev) => {
          const existingIds = new Set(
            prev.map((product) => product.productId || product.id),
          );

          const uniqueProducts = newProducts.filter(
            (product) => !existingIds.has(product.productId || product.id),
          );

          return [...prev, ...uniqueProducts];
        });

        setCurrentPage(nextPage);
      }

      setHasMoreProducts(hasMore);
    } catch (error) {
      console.error("❌ Load more failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMoreProducts, currentPage, searchTerm, itemsPerPage]);

  const lastProductRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          console.log("👀 Sentinel visible:", entries[0].isIntersecting);

          if (entries[0].isIntersecting && hasMoreProducts && !isLoading) {
            loadMoreProducts();
          }
        },
        {
          rootMargin: "300px",
        },
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMoreProducts, loadMoreProducts],
  );

  console.log("📊 Search state:", {
    products: allProducts.length,
    currentPage,
    hasMoreProducts,
    isLoading,
  });

  if (allProducts.length === 0 && !isLoading) {
    return (
      <div className="text-center py-20 w-full">
        <h2 className="text-2xl font-semibold text-gray-600">
          No products found for "{searchTerm}"
        </h2>
        <p className="text-gray-400 mt-2">
          Try checking your spelling or using more general terms.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-3/4 px-1 order-1 lg:order-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-8">
        {allProducts.map((item, index) => {
          const productData = item.product || item;

          // Use productId for key
          const uniqueKey = `${productData.productId || productData.id || "no-id"}-${index}`;

          return (
            <div key={uniqueKey}>
              <ProductCard product={productData} />
            </div>
          );
        })}
      </div>

      {/* Infinite scroll trigger */}
      {hasMoreProducts && <div ref={lastProductRef} className="h-10 w-full" />}

      {isLoading && (
        <div className="flex justify-center my-4">
          <Loader2 className="h-6 w-6 animate-spin text-customYellow" />
        </div>
      )}

      {!hasMoreProducts && allProducts.length > 0 && (
        <p className="text-center text-gray-400 py-6">
          No more products to load
        </p>
      )}
    </div>
  );
}
