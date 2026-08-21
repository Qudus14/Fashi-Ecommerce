// services/api.js
const BASE_URL = "https://fashi-ecommerce-api.onrender.com/api";

// Helper function to handle API responses
async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  // Handle non-OK responses
  if (!response.ok) {
    const errorMessage =
      data.message || data.title || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

// Generic fetch function with error handling
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Auth API service
export const authAPI = {
  // Signup/Register
  register: async (userData) => {
    const { firstName, lastName, email, password, phoneNumber, role } =
      userData;

    return fetchWithErrorHandling(`${BASE_URL}/Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role: role || "Customer",
      }),
    });
  },

  // Login
  login: async (email, password) => {
    return fetchWithErrorHandling(`${BASE_URL}/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  },

  // Get user profile
  getProfile: async (token) => {
    return fetchWithErrorHandling(`${BASE_URL}/Auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  },
};

// Product API service
export const productApi = {
  // Get all products
  getProduct: async () => {
    return fetchWithErrorHandling(`${BASE_URL}/Product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  },

  // Get single product by ID
  getProductById: async (sku) => {
    return fetchWithErrorHandling(`${BASE_URL}/Product/${sku}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  },

  // Search products by name or category
  searchProducts: async (searchTerm, page = 1, limit = 12) => {
    // If no search term, return all products
    if (!searchTerm || searchTerm.trim() === "") {
      return productApi.getProduct();
    }

    // Get all products and filter client-side (since API doesn't have search endpoint)
    const allProducts = await productApi.getProduct();

    if (!allProducts.success || !allProducts.data) {
      return { success: false, data: [], message: "No products found" };
    }

    const searchLower = searchTerm.toLowerCase().trim();

    // Filter products by name or categories
    const filtered = allProducts.data.filter((item) => {
      const product = item?.product || item;
      const name = product.name?.toLowerCase() || "";
      const categories = product.categories || [];

      // Check if search term matches product name or any category
      const matchesName = name.includes(searchLower);
      const matchesCategory = categories.some((cat) =>
        cat.toLowerCase().includes(searchLower),
      );

      return matchesName || matchesCategory;
    });

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filtered.slice(startIndex, endIndex);
    const hasMore = endIndex < filtered.length;

    return {
      success: true,
      data: paginatedProducts,
      total: filtered.length,
      hasMore: hasMore,
      message: "Products retrieved successfully.",
    };
  },
};
