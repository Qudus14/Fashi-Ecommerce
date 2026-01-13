const requests = {
  fetchWears: (category) =>
    `/search-v2?q=${encodeURIComponent(category)}&country=uk&language=en&page=1&limit=10&sort_by=BEST_MATCH&product_condition=ANY&min_rating=ANY`,

  fetchReviews: `/product-reviews-v2?product_id=catalogid:8425421641323327810,gpcid:1261873578657646759,headlineOfferDocid:6367138647863486978,rds:PC_1261873578657646759|PROD_PC_1261873578657646759,imageDocid:17958223083723421156,mid:576462516936404275,pvt:hg,pvf:&limit=10&sort_by=MOST_RELEVANT&country=us&language=en`,

  fetchDeals: `/deals-v2?q=Laptop`,

  fetchSearch: (searchTerm, page = 1, limit = 12) =>
    `/search-v2?q=${encodeURIComponent(searchTerm)}&country=us&language=en&page=${page}&limit=${limit}&sort_by=BEST_MATCH&product_condition=ANY&return_filters=true`,
  fetchAccessories: "trivia",
  fetchProducts: (productId) =>
    `/product-details-v2?product_id=${productId}&country=us&language=en`,
  fetchBannerDeal: `/deals-v2?q=Laptop&country=us&language=en&page=1&limit=10&sort_by=BEST_MATCH&product_condition=ANY`,
};

export default requests;
