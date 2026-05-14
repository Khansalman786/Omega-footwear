"use client";

import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight shipping are also available at checkout.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to over 30 countries worldwide. International shipping typically takes 7-14 business days depending on the destination.",
      },
      {
        q: "Can I track my order?",
        a: "Absolutely. Once your order ships, you'll receive a tracking number via email. You can also track your order from the Orders page in your account.",
      },
      {
        q: "What are the shipping costs?",
        a: "Standard shipping is free on orders over $200. Express shipping is $9.99 and overnight is $19.99.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer free returns within 30 days of delivery. Items must be unworn and in original packaging.",
      },
      {
        q: "How do I start a return?",
        a: "Go to your Order History, select the order, and click 'Request Return.' You'll receive a prepaid return label via email.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 5-7 business days after we receive your return. The amount will be credited to your original payment method.",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes! Start a return request and select 'Exchange' as the reason. We'll ship the new size as soon as we receive your return.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      {
        q: "How do I find my size?",
        a: "Our shoes run true to size for most styles. We recommend measuring your foot length and consulting our size chart. If you're between sizes, we suggest going half a size up.",
      },
      {
        q: "Are your shoes made with real leather?",
        a: "Yes, we use premium full-grain leather sourced from ethical tanneries in Italy and Portugal. Each pair is handcrafted by skilled artisans.",
      },
      {
        q: "How should I care for my shoes?",
        a: "Use a soft brush to remove dirt, apply leather conditioner monthly, and store with cedar shoe trees. Avoid prolonged exposure to water and direct sunlight.",
      },
    ],
  },
  {
    category: "Account & Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, Amex, PayPal, Apple Pay, Google Pay, UPI, net banking, and cash on delivery.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, all payments are processed through Stripe's secure payment infrastructure with 256-bit SSL encryption.",
      },
      {
        q: "Do you offer gift cards?",
        a: "Yes! Digital gift cards are available in denominations of $50, $100, $200, and $500. They never expire.",
      },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="pb-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
};

const FAQ = () => (
  <div className="min-h-screen bg-background">
    <NavbarWrapper />
    <section className="relative gradient-navy py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-copper text-sm uppercase tracking-[0.3em] mb-4">
            Help Center
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            Everything you need to know about shopping with Omega.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16 max-w-3xl">
      {faqs.map((section) => (
        <div key={section.category} className="mb-10">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            {section.category}
          </h2>
          <div className="bg-card rounded-xl border border-border px-6">
            {section.items.map((item) => (
              <FAQItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>

    <Footer />
  </div>
);

export default FAQ;
