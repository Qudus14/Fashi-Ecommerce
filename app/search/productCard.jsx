import AddToCart from "@/components/Public/AddToCart";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  const price =
    product.typical_price_range?.[1] ||
    product.price ||
    product.typical_price_range?.[0];

  return (
    <Link
      className="px-4 py-3"
      href={`/product/${encodeURIComponent(product.product_id)}`}
    >
      <Card className="relative border-0 border-customYellow hover:border-2 hover:border-customYellow shadow-md hover:shadow-lg w-full md:w-[300px] h-[400px] transition-all duration-300 ease-in-out group overflow-hidden">
        <CardContent className="p-2 flex flex-col h-full">
          {(product.product_photos?.[0] || product.product_photo) && (
            <Image
              src={product.product_photos?.[0] || product.product_photo}
              alt={product.product_title}
              width={250}
              height={250}
              className="w-fit h-full object-contain mx-auto rounded mb-1"
            />
          )}
          <h3 className="font-bold text-lg items-center mb-2 flex-grow">
            {product.product_title}
          </h3>
          <div className="flex justify-between items-center mt-auto">
            {product.product_rating && (
              <span className="text-sm font-semibold">
                <p className="text-yellow-500 items-center text-base">
                  {product.product_rating}
                  <span className="text-gray-400 ml-2 text-base font-bold">
                    ({product.product_num_reviews})
                  </span>
                </p>
              </span>
            )}
            <span className="text-lg text-customYellow font-bold">{price}</span>
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
