import { getMyOrders } from "@/lib/getMyOrders"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function OrdersPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  const orders = await getMyOrders(userId)

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingBag className="h-6 w-6" />
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No orders found</h3>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

function OrderCard({ order }) {
  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "shipped":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "delivered":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{formatDate(new Date(order.orderDate))}</span>
            <Badge className={getStatusColor(order.status)} variant="outline">
              {order.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <div className="p-4">
              <h3 className="font-medium mb-2">Items</h3>
              <div className="space-y-3">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {product.product_photos && product.product_photos[0] && (
                        <div className="h-12 w-12 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={product.product_photos[0] || "/placeholder.svg"}
                            alt={product.product_title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{product.product_title}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {product.quantity} × {formatCurrency(product.price)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(product.price * product.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="p-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span>{formatCurrency(order.totalPrice + (order.amountDiscount || 0))}</span>
                </div>
                {order.amountDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Discount</span>
                    <span className="text-green-600">-{formatCurrency(order.amountDiscount)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(order.totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-1">Customer</h3>
              <p>{order.customerName}</p>
              <p>{order.email}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Order Details</h3>
              <p>Order ID: {order.stripeSessionId.substring(0, 14)}...</p>
              <p>Payment: Stripe</p>
              {order.receiptUrl && (
                <p className="mt-1">
                  <Link
                    href={order.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    View Receipt <ExternalLink className="h-3 w-3" />
                  </Link>
                </p>
              )}
              {order.lastUpdated && (
                <p className="text-xs text-gray-500 mt-1">Last updated: {formatDate(new Date(order.lastUpdated))}</p>
              )}
            </div>
          </div>

          {order.chargeHistory && order.chargeHistory.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Payment History</h3>
              <div className="text-sm space-y-1">
                {order.chargeHistory.map((charge, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{formatDate(new Date(charge.updatedAt))}</span>
                    <Badge variant="outline">{charge.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
