import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

async function fetchSearchResults(searchTerm) {
  const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(searchTerm)}`
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
    return {
      products: result.data.products || [],
      sponsoredProducts: result.data.sponsored_products || []
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return { products: [], sponsoredProducts: [] }
  }
}

function ProductCard({ product, isSponsored }) {
  const price = isSponsored ? product.price : product.typical_price_range?.[1];

  return (
    <Link 
      className="px-4 py-3" 
      href={`/product/${encodeURIComponent(product.product_title)}?isSponsored=${isSponsored}`}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4 items-start">
          {(product.product_photos?.[0] || product.product_photo) && (
            <Image
              src={product.product_photos?.[0] || product.product_photo}
              alt={product.product_title}
              width={200}
              height={200}
              className="w-fit h-48 object-contain mx-auto rounded"
            />
          )}
          <h3 className="font-light text-sm mb-2">{product.product_title.slice(0, 70) + '...'}</h3>
          <div className="flex justify-between items-center">
            {!isSponsored && product.product_rating && (
              <span className="text-sm font-semibold">
                Rating: 
                <p className="text-yellow-500 items-center text-base">
                  {product.product_rating}⭐
                  <span className="text-gray-500 ml-2">
                    ({product.product_num_reviews} reviews)
                  </span>
                </p>
              </span>
            )}
            <span className="text-sm font-semibold">
              Price: {price}
            </span>
          </div>
          {isSponsored && (
            <span className='text-xs text-gray-500 mt-2 block'>Sponsored</span>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function SearchResults({ searchTerm }) {
  const { products, sponsoredProducts } = await fetchSearchResults(searchTerm)

  if (products.length === 0 && sponsoredProducts.length === 0) {
    return <p>No products found.</p>
  }

  return (
    <div className="w-full lg:w-3/4 px-1 order-1 lg:order-2">
      {sponsoredProducts.length > 0 && (
        <div>
          <div className="flex flex-wrap items-center justify-between mb-2">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-4">Sponsored Products</h2>
            </div>
            <p className="text-md text-gray-600">Show 01- 09 Of 36 Product</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sponsoredProducts.map((product) => (
              <ProductCard 
                key={`sponsored-${product.product_id}`} 
                product={product} 
                isSponsored={true}
              />
            ))}
          </div>
        </div>
      )}
      
      {products.length > 0 && (
        <div>
          <div className="flex flex-wrap items-center justify-between mb-2">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-4">Products</h2>
            </div>
            <p className="text-md text-gray-600">Show 01- 09 Of 36 Product</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={`product-${product.product_id}`} 
                product={product} 
                isSponsored={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
