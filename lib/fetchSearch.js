// SearchResults.jsx (server component)
import axiosInstance from "@/Axios";
import requests from "@/lib/requests";
import ClientSearchResults from "./client-search-results";

export default async function SearchResults({ searchTerm }) {
  let products = [];
  let totalProducts = 0;
  let hasMore = false;

  try {
    const url = requests.fetchSearch(searchTerm, 1, 12); // first page
    const res = await axiosInstance.get(url);

    if (res.data?.status === "OK") {
      products = res.data.data.products || [];
      totalProducts = products.length;
      hasMore = res.data.data.has_more || false;
    }
  } catch (err) {
    console.error("Failed to fetch search results:", err);
  }

  return (
    <ClientSearchResults
      products={products}
      totalRegularProducts={totalProducts}
      hasMore={hasMore}
      searchTerm={searchTerm}
      itemsPerPage={12}
    />
  );
}
