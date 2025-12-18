// app/product/[id]/page.jsx
import axiosInstance from "@/Axios";
import requests from "@/lib/requests";
import Footer from "@/components/Public/Footer";
import ProductDetails from "@/lib/fetchProduct";
import LoadingSpinner from "@/components/Public/LoadingPage";

export default async function ProductPage({ params }) {
  // In Next.js 15, params is a Promise
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams.id); // Ensure it's fully decoded for the API

  let product = null;
  let error = null;

  try {
    const url = requests.fetchProducts(id);
    // Log this to your terminal to see the EXACT URL being called
    console.log("Calling URL:", url);

    const res = await axiosInstance.get(url);

    if (res.data?.status === "OK" && res.data?.data) {
      product = res.data.data;
    } else {
      error = "Product not found";
    }
  } catch (err) {
    console.error("Fetch Error:", err.message);
    error = "Failed to fetch product";
  }

  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </>
  );
}
