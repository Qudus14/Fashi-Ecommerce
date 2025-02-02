import { NextResponse } from "next/server"
import Stripe from "stripe"
import { backendClient } from "@/lib/backendClient"
import { headers } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const body = await req.text()
  const sig = headers().get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    try {
      await createOrderInSanity(session)
    } catch (err) {
      console.error("Error creating order in Sanity:", err)
      return NextResponse.json({ error: "Error creating order" }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

async function createOrderInSanity(session) {
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
  })

  const order = {
    _type: "order",
    orderNumber: session.metadata.orderNumber,
    stripeCheckoutSession: session.id,
    stripeSessionId: session.id,
    stripeCustomerId: session.customer,
    clerkUserId: session.metadata.clerkUserId,
    customerName: session.metadata.customerName,
    email: session.metadata.customerEmail,
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
    orderDate: new Date(session.created * 1000).toISOString(),
  }

  await backendClient.create(order)
}

