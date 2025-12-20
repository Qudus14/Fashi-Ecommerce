import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export async function getMyOrders(userId) {
  if (!userId) {
    return []
  }

  try {
    console.log("Connecting to MongoDB...")
    const client = await clientPromise
    console.log("Connected to MongoDB successfully")

    const db = client.db(process.env.MONGODB_DB || "fashi")
    console.log(`Using database: ${process.env.MONGODB_DB || "fashi"}`)

    // Query MongoDB for orders that match the clerkUserId
    console.log(`Fetching orders for user: ${userId}`)
    const orders = await db.collection("orders").find({ clerkUserId: userId }).sort({ orderDate: -1 }).toArray()
    console.log(`Found ${orders.length} orders`)

    // Convert MongoDB ObjectId to string for serialization
    return orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
      // Ensure dates are properly formatted
      orderDate: order.orderDate instanceof Date ? order.orderDate.toISOString() : order.orderDate,
      lastUpdated: order.lastUpdated instanceof Date ? order.lastUpdated.toISOString() : order.lastUpdated,
      chargeHistory: Array.isArray(order.chargeHistory)
        ? order.chargeHistory.map((charge) => ({
            ...charge,
            updatedAt: charge.updatedAt instanceof Date ? charge.updatedAt.toISOString() : charge.updatedAt,
          }))
        : [],
    }))
  } catch (error) {
    console.error("Error fetching orders:", error)
    // Add more detailed error logging
    if (error.stack) {
      console.error("Stack trace:", error.stack)
    }
    if (error.code) {
      console.error("Error code:", error.code)
    }
    return []
  }
}

// Get a single order by ID
export async function getOrderById(orderId) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "fashi")

    const order = await db.collection("orders").findOne({ _id: new ObjectId(orderId) })

    if (!order) return null

    return {
      ...order,
      _id: order._id.toString(),
      // Ensure dates are properly formatted
      orderDate: order.orderDate instanceof Date ? order.orderDate.toISOString() : order.orderDate,
      lastUpdated: order.lastUpdated instanceof Date ? order.lastUpdated.toISOString() : order.lastUpdated,
      chargeHistory: Array.isArray(order.chargeHistory)
        ? order.chargeHistory.map((charge) => ({
            ...charge,
            updatedAt: charge.updatedAt instanceof Date ? charge.updatedAt.toISOString() : charge.updatedAt,
          }))
        : [],
    }
  } catch (error) {
    console.error("Error fetching order:", error)
    return null
  }
}
