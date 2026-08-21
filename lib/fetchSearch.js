// app/search/SearchResults.jsx (server component)
import { productApi } from "@/components/service/api";
import ClientSearchResults from "./client-search-results";

export default async function SearchResults({ searchTerm }) {
  let products = [];
  let hasMore = false;
  let total = 0;

  try {
    // Use the product API to search
    const response = await productApi.searchProducts(searchTerm, 1, 12);

    if (response.success) {
      products = response.data || [];
      total = response.total || products.length;
      hasMore = response.hasMore || false;
    }
  } catch (err) {
    console.error("Failed to fetch search results:", err);
  }

  return (
    <ClientSearchResults
      products={products}
      totalRegularProducts={total}
      hasMore={hasMore}
      searchTerm={searchTerm}
      itemsPerPage={12}
    />
  );
}
