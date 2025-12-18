import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import clientPromise from "@/lib/mongodb"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  console.log("Webhook received!")
  
  const body = await req.text()
  const sig = headers().get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    console.log("Event type:", event.type)
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    console.log("Checkout session completed:", session.id)
    console.log("Session metadata:", session.metadata)
    
    // Check if clerkUserId exists in metadata
    if (!session.metadata?.clerkUserId) {
      console.error("No clerkUserId found in session metadata!")
      // Continue anyway, but log the warning
    }

    try {
      const client = await clientPromise
      const db = client.db(process.env.MONGODB_DB || "fashi")

      // Check if order already exists to prevent duplicates
      const existingOrder = await db.collection("orders").findOne({ stripeSessionId: session.id })

      if (existingOrder) {
        console.log(`Order for session ${session.id} already exists`)
        return NextResponse.json({ received: true, message: "Order already exists" })
      }

      await createOrderInMongoDB(session, db)
      console.log(`Successfully created order for session ${session.id}`)
    } catch (err) {
      console.error("Error creating order in MongoDB:", err)
      return NextResponse.json({ error: "Error creating order" }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

async function createOrderInMongoDB(session, db) {
  console.log("Creating order in MongoDB for session:", session.id)
  
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ["data.price.product"],
    })
    console.log("Line items retrieved:", lineItems.data.length)

    // Generate a unique order number if not provided in metadata
    const orderNumber =
      session.metadata.orderNumber ||
      `ORD-${Math.floor(Math.random() * 10000)}-${new Date().getTime().toString().slice(-4)}`

    const order = {
      orderNumber: orderNumber,
      stripeSessionId: session.id,
      stripeCustomerId: session.customer,
      clerkUserId: session.metadata.clerkUserId,
      customerName: session.metadata.customerName || session.customer_details?.name || "Customer",
      email: session.metadata.customerEmail || session.customer_details?.email || "No email provided",
      stripePaymentIntentId: session.payment_intent,
      products: lineItems.data.map((item) => ({
        product_title: item.description,
        product_id: item.price.product.id,
        quantity: item.quantity,
        price: item.price.unit_amount / 100,
        product_photos: item.price.product.images,
      })),
      totalPrice: session.amount_total / 100,
      currency: session.currency,
      amountDiscount: session.total_details.amount_discount / 100,
      status: "paid",
      orderDate: new Date(session.created * 1000),
    }

    console.log("Order object created:", order.orderNumber)
    const result = await db.collection("orders").insertOne(order)
    console.log("Order inserted with ID:", result.insertedId)
    return result
  } catch (error) {
    console.error("Error in createOrderInMongoDB:", error)
    throw error
  }
}