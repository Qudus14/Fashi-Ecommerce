"use server";

import stripe from '@/lib/stripe';

export async function createCheckoutSession(items, metadata) {
  try {
    // Check if any grouped items don't have a price
    const itemsWithoutPrice = items.filter(item => !item.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Search for existing customer by email
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/basket`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => {
        console.log(`Item: ${item.product_title}, Price: ${item.price}`);
        const unitAmount = Math.round(item.price * 100);
        if (isNaN(unitAmount)) {
          throw new Error(`Invalid price for item: ${item.product_title}`);
        }
        return {
          price_data: {
            currency: "gbp",
            unit_amount: unitAmount,
            product_data: {
              name: item.product_title || "Unnamed Product",
              description: `Product ID: ${item.product_id}`,
              metadata: {
                id: item.product_id,
              },
              images: item.product_photos
                ? [item.product_photos[0]]
                : undefined,
            },
          },
          quantity: item.quantity,
        };
      }),
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
