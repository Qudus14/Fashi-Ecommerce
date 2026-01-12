import { getMyOrders } from "@/lib/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// Import shadcn table components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function OrdersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const orders = await getMyOrders(userId);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-teal-100 text-teal-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto pt-4 pb-20 px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            My Orders
          </h1>
          <p className="text-gray-500 mt-1">Manage and track your purchases</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-lg font-semibold text-gray-500">
            Total Orders:{" "}
          </span>
          <span className="font-bold">{orders.length}</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed rounded-xl">
          <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium">No orders found</h3>
          <p className="text-gray-500 mb-6">
            Start shopping to see your orders here!
          </p>
          <Link
            href="/"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="border-gray-500 bg-gray-50/50 shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Order & Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                // Get the first product's image for the table preview
                const firstProductImage =
                  order.products[0]?.product_photos?.[0] || "/placeholder.svg";

                return (
                  <TableRow key={order._id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 relative overflow-hidden bg-gray-50 flex-shrink-0">
                          <Image
                            src={firstProductImage}
                            alt="Order Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-xs font-bold text-primary uppercase">
                            #{order.orderNumber.slice(0, 8)}
                          </span>
                          <span className="text-xs text-gray-500 truncate max-w-[150px]">
                            {order.products[0]?.product_title}
                            {order.products.length > 1 &&
                              ` + ${order.products.length - 1} more`}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      className="text-sm text-gray-600"
                      suppressHydrationWarning
                    >
                      {formatDate(new Date(order.orderDate))}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(order.status)} hover:bg-green-700 hover:text-white text-right text-sm px-4 py-1 uppercase`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {order.products.reduce((acc, p) => acc + p.quantity, 0)}{" "}
                      items
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(order.totalPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/orders/${order._id}`}
                        className="inline-flex items-center text-sm font-semibold"
                      >
                        <Button
                          variant="link"
                          className="p-2 inline-flex items-center bg-customYellow hover:bg-customYellow/90 text-white hover:text-white rounded-xl"
                        >
                          <Eye className="h-4 w-4" />
                          See Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
