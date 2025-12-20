"use client";

import { useState, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import axiosInstance from "@/Axios";
import requests from "./requests";
import ProductCard from "@/app/search/productCard";

async function fetchProducts(searchTerm, page = 1, limit = 12) {
  const url = requests.fetchSearch(searchTerm, page, limit);
  try {
    const res = await axiosInstance.get(url);
    if (res.data?.status !== "OK") throw new Error("Failed to fetch products");

    return {
      products: res.data.data.products || [],
      hasMore: res.data.data.has_more || false,
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return { products: [], hasMore: false };
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
  const [currentPage, setCurrentPage] = useState(1); // already loaded page 1
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(initialHasMore);
  const observer = useRef();

  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMoreProducts) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;

    const { products: newProducts, hasMore } = await fetchProducts(
      searchTerm,
      nextPage,
      itemsPerPage
    );

    if (newProducts.length > 0) {
      setAllProducts((prev) => [
        ...prev,
        ...newProducts.filter(
          (p) => !prev.some((ap) => ap.product_id === p.product_id)
        ),
      ]);
    }

    setCurrentPage(nextPage);
    setHasMoreProducts(hasMore);
    setIsLoading(false);
  }, [isLoading, hasMoreProducts, currentPage, searchTerm, itemsPerPage]);

  const lastProductRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreProducts) {
          loadMoreProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreProducts, loadMoreProducts]
  );

  // Add this before the return
  if (allProducts.length === 0 && !isLoading) {
    return (
      <div className="text-center py-20 w-full">
        <h2 className="text-2xl font-semibold text-gray-600">
          No products found for "{searchTerm}"
        </h2>
        <p className="text-gray-400">
          Try checking your spelling or using more general terms.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-3/4 px-1 order-1 lg:order-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-8">
        {allProducts.map((item, index) => {
          const isLast = index === allProducts.length - 1;
          const productData = item.product || item;

          // Create a truly unique key by combining ID and index
          const uniqueKey = `${productData.product_id || "no-id"}-${index}`;

          return (
            <div key={uniqueKey} ref={isLast ? lastProductRef : null}>
              <ProductCard product={productData} />
            </div>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex justify-center my-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
    </div>
  );
}
