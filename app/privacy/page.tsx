"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Privacy = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="relative gradient-navy py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">Privacy Policy</h1>
          <p className="text-primary-foreground/60">Last updated: March 1, 2026</p>
        </motion.div>
      </div>
    </section>
    <section className="container mx-auto px-4 py-16 max-w-3xl prose prose-sm">
      <div className="space-y-8 text-muted-foreground text-sm leading-relaxed">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">1. Information We Collect</h2>
          <p>We collect information you provide directly, including name, email, shipping address, and payment details when you place an order. We also collect usage data such as browsing patterns and device information to improve our services.</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">2. How We Use Your Information</h2>
          <p>Your information is used to process orders, communicate about your purchases, personalize your shopping experience, and send promotional content (with your consent). We never sell your personal data to third parties.</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">3. Data Security</h2>
          <p>We implement industry-standard security measures including SSL encryption, secure payment processing through Stripe, and regular security audits to protect your personal information.</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">4. Cookies</h2>
          <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can manage cookie preferences through your browser settings.</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. Contact us at privacy@omegacollections.com for any requests.</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">6. Contact Us</h2>
          <p>For privacy-related questions, contact our Data Protection Officer at privacy@omegacollections.com or write to: Omega Collections, 123 Fifth Avenue, New York, NY 10001.</p>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Privacy;
