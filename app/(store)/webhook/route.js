import { backendClient } from "@/lib/backendClient";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server"; 

export async function POST(req) {
    const body = await req.text();
    const headerList = await headers();
    const sig = headerList.get("stripe-signature");

    console.log("HIT WEBHOOK");

    if (!sig) {
        return NextResponse.json({error: "No signature"}, {status: 400});
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.log("Stripe webhook secret is not set.");
        return NextResponse.json(
            {error: "Stripe webhook secret is not set"},
            {status: 400}
        );
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
            {error: `Webhook Error: ${err}`},
            {status: 400}
        );
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity:", order);
        } catch (err) {
            console.error("Error creating order in Sanity:", err);
            return NextResponse.json(
                {error: "Error creating order"},
                {status: 500}
            );
        }   
    }

    return NextResponse.json({received: true});
}

async function createOrderInSanity(session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details
    } = session;

    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata;

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"],
        }
    );

    const sanityProducts = lineItemsWithProduct.data.map(({ price }) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: price?.product?.metadata?.id,
        },
        quantity: price?.quantity || 0,
    }));

    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount
            ? total_details.amount_discount / 100
            : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
    });

    return order;
}

