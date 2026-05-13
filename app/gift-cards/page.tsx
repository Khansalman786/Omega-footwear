"use client";

import { useState } from "react";
import { Gift, Send, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const AMOUNTS = [25, 50, 75, 100, 150, 200];

const GiftCards = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handlePurchase = () => {
    if (!recipientEmail || !recipientName || !senderName) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (finalAmount < 10 || finalAmount > 500) {
      toast.error("Amount must be between $10 and $500");
      return;
    }
    toast.success(
      `Gift card for $${finalAmount} sent to ${recipientEmail}! 🎁`,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Gift Cards"
        description="Give the gift of style with Omega Collections gift cards. Available from $25 to $500."
      />
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Gift className="mx-auto mb-4 text-copper" size={48} />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Gift Cards
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Give the gift of style. Omega gift cards never expire.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Amount selection */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-foreground mb-3 block">
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                  }}
                  className={`py-3 rounded-md border text-sm font-medium transition-all ${
                    !customAmount && selectedAmount === amt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:border-primary"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Or enter custom amount ($10 – $500)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {/* Recipient details */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Recipient's Name *
              </label>
              <input
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Recipient's Email *
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Your Name *
              </label>
              <input
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground mb-1 block">
                Personal Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:border-primary resize-none"
                placeholder="Add a personal touch..."
              />
            </div>
          </div>

          {/* Preview card */}
          <div className="gradient-navy rounded-2xl p-8 mb-8 text-center">
            <Gift className="mx-auto mb-3 text-steel-light" size={32} />
            <p className="text-steel-light/70 text-sm mb-1">
              Omega Collections Gift Card
            </p>
            <p className="font-display text-4xl font-bold text-primary-foreground mb-2">
              ${finalAmount}
            </p>
            {recipientName && (
              <p className="text-steel-light">For {recipientName}</p>
            )}
            {message && (
              <p className="text-steel-light/60 text-sm mt-2 italic">
                "{message}"
              </p>
            )}
            {senderName && (
              <p className="text-steel-light/50 text-xs mt-3">
                From {senderName}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePurchase}
              className="btn-hero flex-1 flex items-center justify-center gap-2"
            >
              <CreditCard size={18} /> Purchase Gift Card – ${finalAmount}
            </button>
            <button
              onClick={handlePurchase}
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-md text-foreground hover:border-primary transition-colors"
            >
              <Send size={18} /> Send via Email
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GiftCards;
