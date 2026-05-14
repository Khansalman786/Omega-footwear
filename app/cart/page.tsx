"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  Bookmark,
  Tag,
  Truck,
} from "lucide-react";

import { useStore, SHIPPING_RATES } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const {
    cart,
    savedForLater,
    removeFromCart,
    updateQuantity,
    cartTotal,
    saveForLater,
    moveToCart,
    removeSaved,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    taxAmount,
    orderTotal,
  } = useStore();

  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = () => {
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput("");
    }
  };

  const discountAmount = (cartTotal * couponDiscount) / 100;

  return (
    <div className="min-h-screen bg-background">
      <NavbarWrapper />

      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </button>

        <h1 className="font-display text-4xl font-bold text-foreground mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 && savedForLater.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>

            <Link href="/shop" className="btn-hero inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id + item.size}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4 bg-card rounded-lg p-4 border border-border"
                  >
                    <Link href={`/product/${item.product.id}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-contain bg-secondary rounded-md p-2"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground">
                        Size: {item.size} · {item.product.brand}
                      </p>

                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-2 text-muted-foreground hover:text-foreground"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="px-3 text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-2 text-muted-foreground hover:text-foreground"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Save For Later */}
                        <button
                          onClick={() =>
                            saveForLater(item.product.id, item.size)
                          }
                          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                        >
                          <Bookmark size={14} />
                          Save for later
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>

                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Saved For Later */}
              {savedForLater.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Bookmark size={18} />
                    Saved for Later ({savedForLater.length})
                  </h2>

                  <div className="space-y-3">
                    {savedForLater.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 bg-card/50 rounded-lg p-4 border border-border/50"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-contain bg-secondary rounded-md p-1"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-sm">
                            {item.product.name}
                          </h3>

                          <p className="text-xs text-muted-foreground">
                            Size: {item.size} ·{" "}
                            {formatPrice(item.product.price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              moveToCart(item.product.id, item.size)
                            }
                            className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            Move to Cart
                          </button>

                          <button
                            onClick={() => removeSaved(item.product.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            {cart.length > 0 && (
              <div className="space-y-4">
                <div className="bg-card rounded-lg p-6 border border-border sticky top-24">
                  <h3 className="font-display text-lg font-bold text-foreground mb-4">
                    Order Summary
                  </h3>

                  {/* Coupon */}
                  <div className="mb-4">
                    {couponCode ? (
                      <div className="flex items-center justify-between bg-primary/5 rounded-md px-3 py-2 border border-primary/20">
                        <div className="flex items-center gap-2">
                          <Tag size={14} className="text-primary" />

                          <span className="text-sm font-medium text-primary">
                            {couponCode} (-{couponDiscount}%)
                          </span>
                        </div>

                        <button
                          onClick={removeCoupon}
                          className="text-xs text-destructive hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Coupon code"
                          className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                        />

                        <button
                          onClick={handleApplyCoupon}
                          className="px-3 py-2 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Shipping */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
                      <Truck size={14} />
                      Shipping
                    </p>

                    <div className="space-y-2">
                      {Object.entries(SHIPPING_RATES).map(([key, rate]) => (
                        <label
                          key={key}
                          className={`flex items-center justify-between p-2 rounded-md border cursor-pointer transition-all ${
                            shippingMethod === key
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={shippingMethod === key}
                              onChange={() => setShippingMethod(key)}
                            />

                            <div>
                              <span className="text-sm text-foreground">
                                {rate.label}
                              </span>

                              <p className="text-[10px] text-muted-foreground">
                                {rate.days}
                              </p>
                            </div>
                          </div>

                          <span className="text-sm font-medium text-foreground">
                            {rate.cost === 0 ? "Free" : formatPrice(rate.cost)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 text-sm border-t border-border pt-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>
                        Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)}{" "}
                        items)
                      </span>

                      <span>{formatPrice(cartTotal)}</span>
                    </div>

                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-primary">
                        <span>Discount ({couponDiscount}%)</span>

                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>

                      <span>
                        {shippingCost === 0
                          ? "Free"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (8%)</span>

                      <span>{formatPrice(taxAmount)}</span>
                    </div>

                    <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-lg">
                      <span>Total</span>

                      <span>{formatPrice(orderTotal)}</span>
                    </div>
                  </div>

                  {/* Checkout */}
                  <Link
                    href="/checkout"
                    className="btn-hero w-full mt-6 block text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
