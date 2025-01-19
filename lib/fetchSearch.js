import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

async function fetchSearchResults(searchTerm) {
  const url = `https://real-time-product-search.p.rapidapi.com/search?q=${encodeURIComponent(searchTerm)}`
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key':'0cfc7c25fdmsh4650e00f2123e19p1e54a2jsn2ee1b53ae792',
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
      <Card className="hover:shadow-lg rounded   border-gray-200 transition-shadow">
        <CardContent className="p-4 flex flex-col h-full">
          {(product.product_photos?.[0] || product.product_photo) && (
            <Image
              src={product.product_photos?.[0] || product.product_photo}
              alt={product.product_title}
              width={150}
              height={150}
              className="w-fit h-48 object-contain mx-auto rounded mb-4"
            />
          )}
          <h3 className="font-bold text-lg items-center mb-2 flex-grow">{product.product_title.slice(0, 70) + '...'}</h3>
          <div className="flex justify-between items-center mt-auto">
            {!isSponsored ? (
              product.product_rating && (
                <span className="text-sm font-semibold">
                  <p className="text-yellow-500 items-center text-base">
                    {product.product_rating}
                    <span className="text-gray-500 ml-2 text-base">
                      ({product.product_num_reviews})
                    </span>
                  </p>
                </span>
              )
            ) : (
              <span className="text-sm bg-customYellow rounded  p-2 text-gray-900">Sponsored</span>
            )}
            <span className="text-sm text-black font-semibold">
              {price}
            </span>
          </div>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Sponsored Products</h2>
            <p className="text-lg font-bold text-gray-600">
              Show 01- {sponsoredProducts.length.toString().padStart(2, '0')} Of {sponsoredProducts.length} Product{sponsoredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {sponsoredProducts.map((product, index) => (
              <ProductCard 
                key={`sponsored-${product.product_id || index}`} 
                product={product} 
                isSponsored={true}
              />
            ))}
          </div>
        </div>
      )}
      
      {products.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-lg font-bold text-gray-600">
              Show 01- {products.length.toString().padStart(2, '0')} Of {products.length} Product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard 
                key={`product-${product.product_id || index}`} 
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

