import { Suspense } from "react"
import ClientSearchResults from "./client-search-results"
import Loading from "@/app/search/loading"

async function fetchSearchResults(searchTerm, page = 1, limit = 30) {
  // Add pagination parameters to the API call
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

    // Get the total count if available from the API
    const totalCount = result.data.total_results || result.data.products?.length || 0

    return {
      products: result.data.products || [],
      sponsoredProducts: result.data.sponsored_products || [],
      totalProducts: totalCount,
      currentPage: page,
      hasMore: result.data.has_more || false,
    }
  } catch (error) {
    console.error("Fetch error:", error)
    return {
      products: [],
      sponsoredProducts: [],
      totalProducts: 0,
      currentPage: 1,
      hasMore: false,
    }
  }
}

export default async function SearchResults({ searchTerm }) {
  // Fetch a larger number of products initially
  const { products, sponsoredProducts, totalProducts, hasMore } = await fetchSearchResults(searchTerm, 1, 30)

  if (products.length === 0 && sponsoredProducts.length === 0) {
    return <p>No products found.</p>
  }

  return (
    <Suspense fallback={<Loading/>}>
      <ClientSearchResults
        products={products}
        sponsoredProducts={sponsoredProducts}
        totalRegularProducts={totalProducts}
        hasMore={hasMore}
        searchTerm={searchTerm}
        itemsPerPage={12}
      />
    </Suspense>
  )
}

