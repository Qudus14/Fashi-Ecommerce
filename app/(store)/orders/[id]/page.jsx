import { getOrderById } from "@/lib/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Package,
  Calendar,
  CreditCard,
  User,
  ArrowLeft,
  List,
  ReceiptTextIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const order = await getOrderById(id);

  // Security check: Ensure the order belongs to the logged-in user
  if (!order || order.clerkUserId !== userId) {
    return notFound();
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className=" mx-auto py-4 max-w-4xl border-gray-500 bg-gray-50/50 rounded-lg shadow-md">
      <Link
        href="/orders"
        className="flex items-center justify-between p-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
      >
        <aside className="flex items-center">
          <ArrowLeft className="h-5 w-8 mr-1" />
          <h1 className="text-lg font-bold">Order Details</h1>
        </aside>
        <Badge
          className={`${getStatusColor(order.status)} hover:bg-green-700 hover:text-white text-right text-sm px-4 py-1 uppercase`}
        >
          {order.status}
        </Badge>
      </Link>

      <div className="w-full my-2 text-gray-300 border-b" />

      <div className="p-2 flex-col md:flex-row md:items-center justify-between gap-4 mb-5 px-5">
        <p className="text-gray-500 font-mono text-sm">
          <span className="font-semibold text-base">Order ID: </span>
          <span>{order.stripeSessionId}</span>
        </p>
        <p className="text-gray-500 font-mono text-sm ">
          <span className="font-semibold text-base"></span>
          {order.products.reduce((acc, p) => acc + p.quantity, 0)} items
        </p>
        <p className="text-gray-500 font-mono text-sm">
          <span className="font-semibold text-base">Total : </span>
          <span>{formatCurrency(order.totalPrice)}</span>
        </p>
      </div>

      <div className="my-2 border-b text-gray-300" />

      <div className="p-2 grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-8">
        {/* Left Column: Product List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50">
              <h2 className="font-semibold uppercase flex items-center gap-2">
                <Package className="h-5 w-5" />
                Items in your order
              </h2>
            </div>
            <div className="mb-1">
              {order.products.map((product, idx) => (
                <div
                  key={idx}
                  className="p-6 flex items-center border border-gray-400 gap-4"
                >
                  <div className="h-20 w-20 relative overflow-hidden flex-shrink-0">
                    <Image
                      src={product.product_photos?.[0] || "/placeholder.svg"}
                      alt={product.product_title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {product.product_title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      QTY: {product.quantity}
                    </p>
                    <p className="font-semibold">
                      {formatCurrency(product.price * product.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-900">Subtotal</span>
                <span>
                  {formatCurrency(
                    order.totalPrice + (order.amountDiscount || 0)
                  )}
                </span>
              </div>
              {order.amountDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount</span>
                  <span className="text-green-600">
                    -{formatCurrency(order.amountDiscount)}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Info */}
        <div className="space-y-6 w-full">
          <div className="bg-white border border-gray-200 shadow-sm space-y-2">
            <h3 className="flex gap-2 items-center text-sm font-semibold text-gray-900 uppercase text-left p-3">
              <ReceiptTextIcon className="h-4 w-4" />
              Order Information
            </h3>
            <div className="my-3 border-gray-200 border-b w-full" />

            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Order Date
              </h3>
              <p className="p-1 text-gray-900" suppressHydrationWarning>
                {formatDate(new Date(order.orderDate))}
              </p>
            </div>

            <div className="my-3 border-gray-200 border-b w-full" />

            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase flex items-center gap-2">
                <User className="h-4 w-4" /> Customer
              </h3>
              <p className="p-1 text-gray-900 font-medium">
                {order.customerName}
              </p>
              <p className="p-1 text-sm text-gray-500">{order.email}</p>
            </div>

            <div className="my-3 border-gray-200 border-b w-full" />

            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> Payment
              </h3>
              <p className="p-1 text-gray-900">Stripe Secure Payment</p>
              <p className="p-1 text-xs text-gray-500 mt-1 uppercase">
                Currency: {order.currency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
