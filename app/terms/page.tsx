"use client";

import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Terms = () => (
  <div className="min-h-screen bg-background">
    <NavbarWrapper />
    <section className="relative gradient-navy py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-primary-foreground/60">
            Last updated: March 1, 2026
          </p>
        </motion.div>
      </div>
    </section>
    <section className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using the Omega Collections website, you agree to
            be bound by these Terms of Service. If you do not agree, please do
            not use our services.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            2. Products & Pricing
          </h2>
          <p>
            All prices are listed in USD and are subject to change without
            notice. We reserve the right to modify or discontinue products at
            any time. Errors in pricing will be corrected and orders may be
            cancelled if necessary.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            3. Orders & Payment
          </h2>
          <p>
            By placing an order, you represent that you are of legal age and
            that all information provided is accurate. We reserve the right to
            refuse or cancel orders at our discretion.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            4. Shipping & Delivery
          </h2>
          <p>
            Delivery times are estimates and not guaranteed. Omega Collections
            is not responsible for delays caused by carriers, customs, or
            weather conditions. Risk of loss passes to you upon delivery.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            5. Returns & Refunds
          </h2>
          <p>
            Items may be returned within 30 days of delivery in their original,
            unworn condition. Refunds will be issued to the original payment
            method within 5-7 business days of receiving the return.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            6. Intellectual Property
          </h2>
          <p>
            All content on this website including text, images, logos, and
            designs are the property of Omega Collections and are protected by
            copyright and trademark laws.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">
            7. Limitation of Liability
          </h2>
          <p>
            Omega Collections shall not be liable for any indirect, incidental,
            or consequential damages arising from the use of our products or
            services.
          </p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Terms;
