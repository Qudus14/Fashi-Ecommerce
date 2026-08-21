// lib/requests.js
const BASE_URL = "https://fashi-ecommerce-api.onrender.com/api";

export default {
  // Search products using the product API
  fetchSearch: (searchTerm, page = 1, limit = 12) => {
    // Since we're doing client-side filtering, we just return the product endpoint
    // The actual filtering happens in the productApi.searchProducts method
    return `${BASE_URL}/Product`;
  },

  // Get product by ID
  fetchProductById: (sku) => {
    return `${BASE_URL}/Product/${sku}`;
  },

  // Get all products
  fetchProducts: () => {
    return `${BASE_URL}/Product`;
  },
};
