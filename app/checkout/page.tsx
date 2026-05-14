"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useStore, SHIPPING_RATES } from "@/context/StoreContext";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

import {
  CreditCard,
  Truck,
  MapPin,
  ChevronRight,
  Tag,
  Shield,
  ArrowLeft,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Step = "address" | "shipping" | "payment" | "review";

const steps: { key: Step; label: string; icon: React.ElementType }[] = [
  { key: "address", label: "Address", icon: MapPin },
  { key: "shipping", label: "Shipping", icon: Truck },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: Shield },
];

const PAYMENT_METHODS = [
  { id: "credit-card", label: "Credit Card", desc: "Visa, Mastercard, Amex" },
  { id: "debit-card", label: "Debit Card", desc: "All major debit cards" },
  { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
  { id: "net-banking", label: "Net Banking", desc: "All major banks" },
  { id: "wallet", label: "Digital Wallet", desc: "PayPal, Apple Pay" },
  { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive" },
];

const Checkout = () => {
  const router = useRouter();

  const {
    cart,
    cartTotal,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    taxAmount,
    orderTotal,
    shippingAddress,
    setShippingAddress,
    isLoggedIn,
    placeOrder,
  } = useStore();

  const [step, setStep] = useState<Step>("address");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [couponInput, setCouponInput] = useState("");

  const [form, setForm] = useState({
    fullName: shippingAddress?.fullName || "",
    email: shippingAddress?.email || "",
    phone: shippingAddress?.phone || "",
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    state: shippingAddress?.state || "",
    zipCode: shippingAddress?.zipCode || "",
    country: shippingAddress?.country || "United States",
  });

  const discountAmount = (cartTotal * couponDiscount) / 100;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarWrapper />

        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>

          <Link href="/shop" className="btn-hero inline-block">
            Browse Products
          </Link>
        </div>

        <Footer />
      </div>
    );
  }

  const stepIndex = steps.findIndex((s) => s.key === step);

  const updateForm = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validateAddress = () => {
    const required = [
      "fullName",
      "email",
      "address",
      "city",
      "state",
      "zipCode",
    ];

    for (const field of required) {
      if (!form[field as keyof typeof form].trim()) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (step === "address") {
      if (!validateAddress()) return;

      setShippingAddress(form);
      setStep("shipping");
    } else if (step === "shipping") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("review");
    }
  };

  const handlePlaceOrder = () => {
    const order = placeOrder(paymentMethod);

    router.push(`/orders/${order.id}`);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm";

  return (
    <div className="min-h-screen bg-background">
      <NavbarWrapper />

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push("/cart")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Checkout
        </h1>

        {!isLoggedIn && (
          <div className="bg-secondary/50 rounded-lg p-4 mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Checking out as guest.{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign in
              </Link>{" "}
              for faster checkout.
            </p>
          </div>
        )}

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <button
                onClick={() => i <= stepIndex && setStep(s.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  i === stepIndex
                    ? "bg-primary text-primary-foreground"
                    : i < stepIndex
                      ? "bg-primary/10 text-primary cursor-pointer"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                <s.icon size={14} />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>

              {i < steps.length - 1 && (
                <ChevronRight size={14} className="text-border mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* ADDRESS */}
                {step === "address" && (
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="font-display text-xl font-bold text-foreground mb-6">
                      Shipping Address
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium mb-1 block">
                          Full Name *
                        </label>

                        <input
                          value={form.fullName}
                          onChange={(e) =>
                            updateForm("fullName", e.target.value)
                          }
                          className={inputClass}
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Email *
                        </label>

                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateForm("email", e.target.value)}
                          className={inputClass}
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Phone
                        </label>

                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateForm("phone", e.target.value)}
                          className={inputClass}
                          placeholder="+1 999999999"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium mb-1 block">
                          Address *
                        </label>

                        <input
                          value={form.address}
                          onChange={(e) =>
                            updateForm("address", e.target.value)
                          }
                          className={inputClass}
                          placeholder="Street address"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          City *
                        </label>

                        <input
                          value={form.city}
                          onChange={(e) => updateForm("city", e.target.value)}
                          className={inputClass}
                          placeholder="Mumbai"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          State *
                        </label>

                        <input
                          value={form.state}
                          onChange={(e) => updateForm("state", e.target.value)}
                          className={inputClass}
                          placeholder="Maharashtra"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          ZIP Code *
                        </label>

                        <input
                          value={form.zipCode}
                          onChange={(e) =>
                            updateForm("zipCode", e.target.value)
                          }
                          className={inputClass}
                          placeholder="400001"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Country
                        </label>

                        <select
                          value={form.country}
                          onChange={(e) =>
                            updateForm("country", e.target.value)
                          }
                          className={inputClass}
                        >
                          <option>India</option>
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* SHIPPING */}
                {step === "shipping" && (
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="font-display text-xl font-bold mb-6">
                      Shipping Method
                    </h2>

                    <div className="space-y-3">
                      {Object.entries(SHIPPING_RATES).map(([key, rate]) => (
                        <label
                          key={key}
                          className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            shippingMethod === key
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              checked={shippingMethod === key}
                              onChange={() => setShippingMethod(key)}
                            />

                            <div>
                              <p className="font-medium">{rate.label}</p>
                              <p className="text-sm text-muted-foreground">
                                {rate.days}
                              </p>
                            </div>
                          </div>

                          <span className="font-semibold">
                            {rate.cost === 0
                              ? "Free"
                              : `$${rate.cost.toFixed(2)}`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* PAYMENT */}
                {step === "payment" && (
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="font-display text-xl font-bold mb-6">
                      Payment Method
                    </h2>

                    <div className="space-y-3">
                      {PAYMENT_METHODS.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <input
                            type="radio"
                            checked={paymentMethod === method.id}
                            onChange={() => setPaymentMethod(method.id)}
                          />

                          <div>
                            <p className="font-medium">{method.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {method.desc}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* REVIEW */}
                {step === "review" && (
                  <div className="bg-card rounded-lg p-6 border border-border">
                    <h2 className="font-display text-xl font-bold mb-6">
                      Order Review
                    </h2>

                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id + item.size}
                          className="flex items-center gap-3"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 object-contain bg-secondary rounded"
                          />

                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>

                            <p className="text-sm text-muted-foreground">
                              Size {item.size} × {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BUTTONS */}
                <div className="flex justify-between mt-6">
                  {stepIndex > 0 ? (
                    <button
                      onClick={() => setStep(steps[stepIndex - 1].key)}
                      className="px-6 py-3 rounded-lg border border-border"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step === "review" ? (
                    <button
                      onClick={handlePlaceOrder}
                      className="btn-hero px-8"
                    >
                      Place Order · ${orderTotal.toFixed(2)}
                    </button>
                  ) : (
                    <button onClick={handleNext} className="btn-hero px-8">
                      Continue
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SIDEBAR */}
          <div className="bg-card rounded-lg p-6 border border-border h-fit sticky top-24">
            <h3 className="font-display text-lg font-bold mb-4">
              Order Summary
            </h3>

            {/* Coupon */}
            <div className="mb-4">
              {couponCode ? (
                <div className="flex items-center justify-between bg-primary/5 rounded-md px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Tag size={14} />
                    <span className="text-sm font-medium">
                      {couponCode} (-{couponDiscount}%)
                    </span>
                  </div>

                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500"
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
                    className="flex-1 px-3 py-2 rounded-md border"
                  />

                  <button
                    onClick={() =>
                      couponInput.trim() && applyCoupon(couponInput)
                    }
                    className="px-3 py-2 rounded-md bg-secondary"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
