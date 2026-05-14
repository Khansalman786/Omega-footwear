"use client";

import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { RotateCcw, Package, Clock, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Start a Return",
    desc: "Go to your Order History and click 'Request Return' on the eligible order.",
  },
  {
    icon: RotateCcw,
    title: "Ship It Back",
    desc: "Print the prepaid return label and drop your package at any authorized carrier location.",
  },
  {
    icon: Clock,
    title: "Processing",
    desc: "Once received, we'll inspect the item and process your refund within 5-7 business days.",
  },
  {
    icon: CheckCircle,
    title: "Refund Issued",
    desc: "Your refund will be credited to your original payment method automatically.",
  },
];

const Returns = () => (
  <div className="min-h-screen bg-background">
    <NavbarWrapper />
    <section className="relative gradient-navy py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Returns & Exchanges
          </h1>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            Hassle-free returns within 30 days. Your satisfaction is our
            priority.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-copper/10 flex items-center justify-center mx-auto mb-4">
              <step.icon size={24} className="text-copper" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container mx-auto px-4 pb-16 max-w-3xl">
      <div className="bg-card rounded-xl border border-border p-8 space-y-6 text-sm text-muted-foreground">
        <h3 className="font-display text-lg font-bold text-foreground">
          Return Policy Details
        </h3>
        <ul className="space-y-3 list-disc list-inside">
          <li>Returns are accepted within 30 days of delivery</li>
          <li>Items must be unworn, undamaged, and in original packaging</li>
          <li>Sale items marked "Final Sale" are not eligible for returns</li>
          <li>Return shipping is free for all US orders</li>
          <li>
            International returns: customer is responsible for return shipping
            costs
          </li>
          <li>Exchanges are processed as a return + new order</li>
          <li>Gift card purchases are non-refundable</li>
        </ul>
      </div>
    </section>

    <Footer />
  </div>
);

export default Returns;
