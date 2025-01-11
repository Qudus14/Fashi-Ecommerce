
import Basket from "@/components/Public/Basket";
import Footer from "@/components/public/Footer";
import { ShoppingCartIcon } from "lucide-react";


export default function BasketPage() {
  return (
    <>
    <div className="w-full p-10 max-w-7xl mx-auto">
    <div className="flex items-center space-x-2">
        <ShoppingCartIcon className="w-10 h-10"/>
        <h1 className="text-3xl font-light">Your Cart</h1>
      </div>
      <p>Review the items in your cart and checkout when ready!</p>
      <Basket />
    </div>
    <Footer/>
    </>
  )
}

