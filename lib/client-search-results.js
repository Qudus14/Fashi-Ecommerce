"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import AddToCart from "@/components/Public/AddToCart"

function ProductCard({ product }) {
  const price = product.typical_price_range?.[1] || product.price

  return (
    <Link className="px-4 py-3" href={`/product/${encodeURIComponent(product.product_title)}`}>
      <Card className="relative border-0 hover:border-2 hover:border-customYellow shadow-md hover:shadow-lg w-full md:w-[300px] h-[400px] transition-all duration-300 ease-in-out group overflow-hidden">
        <CardContent className="p-2 flex flex-col h-full">
          {(product.product_photos?.[0] || product.product_photo) && (
            <Image
              src={product.product_photos?.[0] || product.product_photo}
              alt={product.product_title}
              width={250}
              height={250}
              className="w-fit h-full object-contain mx-auto rounded mb-1"
            />
          )}
          <h3 className="font-bold text-lg items-center mb-2 flex-grow">
            {product.product_title.length > 70 ? product.product_title.slice(0, 70) + "..." : product.product_title}
          </h3>
          <div className="flex justify-between items-center mt-auto">
            {product.product_rating && (
              <span className="text-sm font-semibold">
                <p className="text-yellow-500 items-center text-base">
                  {product.product_rating}
                  <span className="text-gray-400 ml-2 text-base font-bold">({product.product_num_reviews})</span>
                </p>
              </span>
            )}
            <span className="text-lg text-customYellow font-bold">{price}</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <AddToCart product={product} className="w-full" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

async function fetchMoreProducts(searchTerm, page, limit = 30) {
  const url = `https://real-time-product-search.p.rapidapi.com/search-v2?q=${encodeURIComponent(searchTerm)}&page=${page}&limit=${limit}`
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "dfc93e44d5msh1a2d1e11bc243fcp1dd2acjsnc2e4dbde6a0c",
      "x-rapidapi-host": "real-time-product-search.p.rapidapi.com",
    },
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return {
      products: result.data.products || [],
      hasMore: result.data.has_more || false,
    }
  } catch (error) {
    console.error("Fetch error:", error)
    return { products: [], hasMore: false }
  }
}

function ProductsDisplay({ products, itemsPerPage, totalCount, onLoadMore, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalProducts = totalCount || products.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, products.length)
  const currentProducts = products.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)

      // If we're near the end of our loaded products, fetch more
      if (currentPage + 1 >= Math.ceil(products.length / itemsPerPage) && onLoadMore) {
        onLoadMore()
      }
    }
  }

  const startDisplay = startIndex + 1
  const endDisplay = endIndex

  return (
    <div>
      <div className="hidden md:flex items-center justify-between mb-4">
        <h2 className="ml-5 text-xl font-semibold">Products</h2>
        <p className="mr-5 text-lg font-bold text-gray-600">
          Show {startDisplay.toString().padStart(2, "0")}-{endDisplay.toString().padStart(2, "0")} Of {totalProducts}{" "}
          Product{totalProducts !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 mb-8">
        {currentProducts.map((product, index) => (
          <ProductCard key={`product-${product.product_id || index}`} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6 mb-8">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded bg-customYellow border-none hover:text-white text-white hover:bg-customYellow/90"
          >
            <ChevronLeft className="h-5 w-5" /> Previous
          </Button>
          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
            className="flex items-center gap-1 rounded bg-customYellow border-none hover:text-white text-white hover:bg-customYellow/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading
              </>
            ) : (
              <>
                Next <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

export default function ClientSearchResults({ products, totalRegularProducts, hasMore, searchTerm, itemsPerPage }) {
  const [allProducts, setAllProducts] = useState(products)
  const [isLoading, setIsLoading] = useState(false)
  const [currentApiPage, setCurrentApiPage] = useState(1)
  const [hasMoreProducts, setHasMoreProducts] = useState(hasMore)

  const loadMoreProducts = async () => {
    if (isLoading || !hasMoreProducts) return

    setIsLoading(true)
    const nextPage = currentApiPage + 1

    try {
      const { products: newProducts, hasMore: moreAvailable } = await fetchMoreProducts(searchTerm, nextPage)

      if (newProducts.length > 0) {
        setAllProducts((prev) => [...prev, ...newProducts])
      }

      setCurrentApiPage(nextPage)
      setHasMoreProducts(moreAvailable)
    } catch (error) {
      console.error("Error loading more products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full lg:w-3/4 px-1 order-1 lg:order-2">
      {allProducts.length > 0 && (
        <ProductsDisplay
          products={allProducts}
          itemsPerPage={itemsPerPage}
          totalCount={totalRegularProducts || allProducts.length}
          onLoadMore={loadMoreProducts}
          isLoading={isLoading}
        />
      )}

      {hasMoreProducts && allProducts.length > 0 && (
        <div className="flex justify-center my-8">
          <Button onClick={loadMoreProducts} disabled={isLoading} className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Loading More Products
              </>
            ) : (
              "Load More Products"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

