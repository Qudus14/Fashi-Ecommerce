import { backendClient } from "@/lib/backendClient";

export async function getMyOrders(userId) {
    if (!userId) {
        throw new Error("User ID is required");
    }

    try {
        const orders = await backendClient.fetch(
            `*[_type=="order" && clerkUserId == $userId] | order(orderDate desc) {
            ...,
            products[] {
            ...,
            product->
            }
            }`,{userId}
        );
        return orders || [];
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Error fetching orders");
    }
}

