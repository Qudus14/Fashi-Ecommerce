import ProductDetail from "@/lib/fetchProduct"
async function fetchProductDetails(productTitle) {
  const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(productTitle)}`
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cf7320b6d2msh8734c6317a1bd89p1c468ejsn4b0d0f62e427',
      'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
    }
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    
    if (result.data && result.data.products && result.data.products.length > 0) {
      // Find the product with the matching title
      const product = result.data.products.find(p => p.product_title === decodeURIComponent(productTitle))
      return product || result.data.products[0] // Return the first product if no exact match is found
    } else {
      console.error('No product data found in the API response')
      return null
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return null
  }
}

export default async function ProductPage({ params }) {
  const productTitle = params.title
  const productData = await fetchProductDetails(productTitle)
  
  if (!productData) {
    return <div>Product not found</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <ProductDetail product={productData} />
    </main>
  )
}

