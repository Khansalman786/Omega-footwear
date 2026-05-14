"use client";

import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Truck, Clock, Globe, Package } from "lucide-react";

const shippingOptions = [
  {
    icon: Truck,
    title: "Standard Shipping",
    cost: "Free over $200",
    time: "5-7 business days",
    desc: "Our default shipping option. Free on orders over $200, otherwise $5.99.",
  },
  {
    icon: Clock,
    title: "Express Shipping",
    cost: "$9.99",
    time: "2-3 business days",
    desc: "Need them faster? Express shipping gets your order to you in 2-3 business days.",
  },
  {
    icon: Package,
    title: "Overnight Shipping",
    cost: "$19.99",
    time: "Next business day",
    desc: "Order by 2pm EST and receive your shoes the very next business day.",
  },
  {
    icon: Globe,
    title: "International Shipping",
    cost: "From $14.99",
    time: "7-14 business days",
    desc: "We ship to 30+ countries. Customs duties and taxes may apply at destination.",
  },
];

const Shipping = () => (
  <div className="min-h-screen bg-background">
    <NavbarWrapper />
    <section className="relative gradient-navy py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Shipping & Delivery
          </h1>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            Fast, reliable shipping with real-time tracking on every order.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {shippingOptions.map((opt, i) => (
          <motion.div
            key={opt.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-6"
          >
            <opt.icon size={24} className="text-copper mb-3" />
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-foreground">
                {opt.title}
              </h3>
              <span className="text-sm font-semibold text-primary">
                {opt.cost}
              </span>
            </div>
            <p className="text-xs text-copper mb-2">{opt.time}</p>
            <p className="text-sm text-muted-foreground">{opt.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <Footer />
  </div>
);

export default Shipping;
