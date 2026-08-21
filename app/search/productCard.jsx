// app/search/productCard.jsx
import AddToCart from "@/components/Public/AddToCart";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  // Handle both API response formats
  const productId = product.productId || product.id;
  const name = product.name || product.product_title || "Product";
  const price = product.price || product.typical_price_range?.[1] || 0;
  const imageUrl =
    product.imageUrls?.[0] ||
    product.product_photos?.[0] ||
    product.product_photo ||
    "/placeholder-product.jpg";
  const categories = product.categories || [];
  const rating = product.rating || product.product_rating || 4.5;
  const reviews = product.reviews || product.product_num_reviews || 0;

  return (
    <Link className="px-4 py-3" href={`/product/${encodeURIComponent(sku)}`}>
      <Card className="relative border-0 border-customYellow hover:border-2 hover:border-customYellow shadow-md hover:shadow-lg w-full md:w-[300px] h-[400px] transition-all duration-300 ease-in-out group overflow-hidden">
        <CardContent className="p-2 flex flex-col h-full">
          {imageUrl && (
            <div className="relative w-full h-[200px]">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-contain mx-auto rounded mb-1"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>
          )}

          <h3 className="font-bold text-lg items-center mb-2 flex-grow line-clamp-2">
            {name}
          </h3>

          <div className="flex justify-between items-center mt-auto">
            {rating && (
              <span className="text-sm font-semibold">
                <p className="text-yellow-500 items-center text-base">
                  ★ {rating}
                  <span className="text-gray-400 ml-2 text-base font-bold">
                    ({reviews})
                  </span>
                </p>
              </span>
            )}
            <span className="text-lg text-customYellow font-bold">
              ₦{Number(price).toLocaleString()}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-white p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <AddToCart product={product} className="w-full" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ProductCard;
