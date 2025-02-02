import { getMyOrders } from "@/lib/getMyOrders"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }

  const orders = await getMyOrders(userId)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.map((order) => (
        <div key={order.orderNumber} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-semibold">Order #{order.orderNumber}</h2>
          <p>Total: ${order.totalPrice.toFixed(2)}</p>
          <p>Status: {order.status}</p>
          <h3 className="font-bold mt-2">Items:</h3>
          <ul>
            {order.products.map((product) => (
              <li key={product._key}>
                {product.product_title} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

