"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, Clock, ChevronRight } from "lucide-react";

const statusColors: Record<string, string> = {
  processing: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  shipped: "bg-purple-500/10 text-purple-600",
  delivered: "bg-green-500/10 text-green-600",
  cancelled: "bg-destructive/10 text-destructive",
  "return-requested": "bg-orange-500/10 text-orange-600",
  refunded: "bg-muted text-muted-foreground",
};

const Orders = () => {
  const { orders } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          My Orders
        </h1>

        <p className="text-muted-foreground mb-8">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </p>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto text-border mb-4" />

            <p className="text-muted-foreground mb-4">No orders yet</p>

            <Link href="/shop" className="btn-hero inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-card rounded-lg border border-border p-5 hover:border-primary/50 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display font-bold text-foreground">
                        {order.id}
                      </span>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          statusColors[order.status] || ""
                        }`}
                      >
                        {order.status.replace("-", " ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>

                      <span>
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </span>

                      <span className="font-semibold text-foreground">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item: any, i: number) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-md bg-secondary border-2 border-card overflow-hidden relative"
                        >
                          <Image
                            src={item.product.image}
                            alt={item.product.name || "Product"}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                      ))}

                      {order.items.length > 3 && (
                        <div className="w-10 h-10 rounded-md bg-secondary border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    <ChevronRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Orders;
