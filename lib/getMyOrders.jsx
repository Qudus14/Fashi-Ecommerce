import { backendClient } from "@/lib/backendClient"

export async function getMyOrders(userId) {
  if (!userId) {
    throw new Error("User ID is required")
  }

  try {
    const orders = await backendClient.fetch(
      `*[_type=="order" && clerkUserId == $userId] | order(orderDate desc) {
        orderNumber,
        customerName,
        email,
        products,
        totalPrice,
        currency,
        amountDiscount,
        status,
        orderDate
      }`,
      { userId },
    )
    console.log("Orders fetched from Sanity:", orders)
    return orders || []
  } catch (error) {
    console.error("Error fetching orders:", error)
    throw new Error("Error fetching orders")
  }
}

