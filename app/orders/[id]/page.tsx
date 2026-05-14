"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useStore, SHIPPING_RATES } from "@/context/StoreContext";
import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import {
  Truck,
  MapPin,
  CreditCard,
  Download,
  X,
  RotateCcw,
  Check,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const statusSteps = ["processing", "confirmed", "shipped", "delivered"];

const statusColors: Record<string, string> = {
  processing: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  shipped: "bg-purple-500/10 text-purple-600",
  delivered: "bg-green-500/10 text-green-600",
  cancelled: "bg-destructive/10 text-destructive",
  "return-requested": "bg-orange-500/10 text-orange-600",
  refunded: "bg-muted text-muted-foreground",
};

const OrderDetail = () => {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const { orders, cancelOrder, requestReturn } = useStore();

  const order = orders.find((o) => o.id === id);

  const [showCancel, setShowCancel] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [returnReason, setReturnReason] = useState("");

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarWrapper />

        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground mb-4">Order not found</p>

          <Link href="/orders" className="btn-hero inline-block">
            View Orders
          </Link>
        </div>

        <Footer />
      </div>
    );
  }

  const currentStepIndex = statusSteps.indexOf(order.status);

  const canCancel = ["processing", "confirmed"].includes(order.status);

  const canReturn = order.status === "delivered";

  const handleCancel = () => {
    cancelOrder(order.id);
    setShowCancel(false);
  };

  const handleReturn = () => {
    if (!returnReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }

    requestReturn(order.id, returnReason);

    setShowReturn(false);
    setReturnReason("");
  };

  const handleDownloadInvoice = () => {
    const invoiceContent = `
OMEGA COLLECTIONS - INVOICE
================================
Order: ${order.id}
Date: ${new Date(order.createdAt).toLocaleDateString()}

Ship To:
${order.shippingAddress.fullName}
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}

Items:
${order.items
  .map(
    (i) =>
      `  ${i.product.name} (Size ${i.size}) x${i.quantity} - $${(
        i.price * i.quantity
      ).toFixed(2)}`,
  )
  .join("\n")}

Subtotal: $${order.subtotal.toFixed(2)}
${order.discount > 0 ? `Discount: -$${order.discount.toFixed(2)}` : ""}
Shipping: ${
      order.shippingCost === 0 ? "Free" : `$${order.shippingCost.toFixed(2)}`
    }
Tax: $${order.tax.toFixed(2)}
================================
TOTAL: $${order.total.toFixed(2)}

Payment: ${order.paymentMethod}
Status: ${order.status.toUpperCase()}
${order.trackingNumber ? `Tracking: ${order.trackingNumber}` : ""}
    `.trim();

    const blob = new Blob([invoiceContent], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `invoice-${order.id}.txt`;

    a.click();

    URL.revokeObjectURL(url);

    toast.success("Invoice downloaded");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarWrapper />

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/orders")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          All Orders
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Order {order.id}
            </h1>

            <p className="text-sm text-muted-foreground mt-1">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                statusColors[order.status] || ""
              }`}
            >
              {order.status.replace("-", " ")}
            </span>
          </div>
        </div>

        {!["cancelled", "return-requested", "refunded"].includes(
          order.status,
        ) && (
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Truck size={16} />
              Order Tracking
            </h3>

            {order.trackingNumber && (
              <p className="text-sm text-muted-foreground mb-4">
                Tracking:{" "}
                <span className="font-mono text-foreground">
                  {order.trackingNumber}
                </span>
              </p>
            )}

            <div className="flex items-center justify-between mb-2">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex-1 flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      i <= currentStepIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i <= currentStepIndex ? <Check size={14} /> : i + 1}
                  </div>

                  {i < statusSteps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        i < currentStepIndex ? "bg-primary" : "bg-secondary"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-muted-foreground capitalize">
              {statusSteps.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Estimated delivery:{" "}
              <span className="font-medium text-foreground">
                {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Items ({order.items.length})
              </h3>

              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <Link href={`/product/${item.product.id}`}>
                      <div className="w-16 h-16 bg-secondary rounded-md overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors text-sm"
                      >
                        {item.product.name}
                      </Link>

                      <p className="text-xs text-muted-foreground">
                        Size: {item.size} · Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-foreground text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status history */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock size={16} />
                Status History
              </h3>

              <div className="space-y-3">
                {order.statusHistory.map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />

                    <div>
                      <p className="text-sm font-medium text-foreground capitalize">
                        {entry.status.replace("-", " ")}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {entry.note}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Summary */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-3">Summary</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>

                {order.discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>
                      Discount
                      {order.couponCode ? ` (${order.couponCode})` : ""}
                    </span>

                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>

                  <span>
                    {order.shippingCost === 0
                      ? "Free"
                      : `$${order.shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <MapPin size={14} />
                Shipping
              </h3>

              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.address}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zipCode}
              </p>

              <p className="text-xs text-muted-foreground mt-2">
                {SHIPPING_RATES[order.shippingMethod]?.label}
              </p>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <CreditCard size={14} />
                Payment
              </h3>

              <p className="text-sm text-muted-foreground capitalize">
                {order.paymentMethod.replace("-", " ")}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={handleDownloadInvoice}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Download size={16} />
                Download Invoice
              </button>

              {canCancel && (
                <button
                  onClick={() => setShowCancel(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-destructive/30 text-sm font-medium text-destructive hover:bg-destructive/5 transition-colors"
                >
                  <X size={16} />
                  Cancel Order
                </button>
              )}

              {canReturn && (
                <button
                  onClick={() => setShowReturn(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <RotateCcw size={16} />
                  Request Return / Refund
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-sm w-full mx-4"
          >
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Cancel Order?
            </h3>

            <p className="text-sm text-muted-foreground mb-6">
              This action cannot be undone. Your refund will be processed within
              5-7 business days.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancel(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground"
              >
                Keep Order
              </button>

              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium"
              >
                Cancel Order
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Return Modal */}
      {showReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-xl border border-border p-6 max-w-sm w-full mx-4"
          >
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              Request Return
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              Please tell us why you'd like to return this order.
            </p>

            <select
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm mb-4"
            >
              <option value="">Select a reason</option>
              <option value="Wrong size">Wrong size</option>
              <option value="Defective product">Defective product</option>
              <option value="Not as described">Not as described</option>
              <option value="Changed my mind">Changed my mind</option>
              <option value="Other">Other</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReturn(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground"
              >
                Cancel
              </button>

              <button
                onClick={handleReturn}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                Submit Request
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrderDetail;
