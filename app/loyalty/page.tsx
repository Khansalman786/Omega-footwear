"use client";

import { Crown, Star, Zap, Gift, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const TIERS = [
  { name: "Bronze", minPoints: 0, icon: Star, color: "text-copper", benefits: ["Earn 1 point per $1", "Birthday discount", "Early sale access"] },
  { name: "Silver", minPoints: 500, icon: Zap, color: "text-steel-dark", benefits: ["Earn 1.5x points", "Free standard shipping", "Exclusive member deals", "Priority support"] },
  { name: "Gold", minPoints: 1500, icon: Crown, color: "text-copper", benefits: ["Earn 2x points", "Free express shipping", "VIP events access", "Annual gift", "Personal stylist"] },
  { name: "Platinum", minPoints: 5000, icon: Award, color: "text-foreground", benefits: ["Earn 3x points", "Free overnight shipping", "Concierge service", "Custom orders", "Exclusive collections"] },
];

const REWARDS = [
  { name: "$10 Off", points: 200, icon: Gift },
  { name: "$25 Off", points: 450, icon: Gift },
  { name: "Free Shipping", points: 150, icon: TrendingUp },
  { name: "$50 Off", points: 800, icon: Gift },
];

const Loyalty = () => {
  const { orders, isLoggedIn } = useStore();
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const points = Math.floor(totalSpent);
  const currentTier = [...TIERS].reverse().find((t) => points >= t.minPoints) || TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const progress = nextTier ? ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Loyalty Program" description="Join Omega Rewards — earn points on every purchase and unlock exclusive tiers and benefits." />
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Crown className="mx-auto mb-4 text-copper" size={48} />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">Omega Rewards</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Earn points on every purchase and unlock exclusive perks as you climb tiers.</p>
        </motion.div>

        {/* Current status */}
        {isLoggedIn && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-xl mx-auto mb-12 p-6 bg-card border border-border rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <currentTier.icon size={24} className={currentTier.color} />
              <span className="font-display text-xl font-bold text-foreground">{currentTier.name} Member</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{points.toLocaleString()} pts</p>
            {nextTier && (
              <>
                <p className="text-sm text-muted-foreground mb-3">{nextTier.minPoints - points} points to {nextTier.name}</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl border ${currentTier.name === tier.name ? "border-primary bg-primary/5" : "border-border bg-card"}`}
            >
              <tier.icon size={28} className={`${tier.color} mb-3`} />
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{tier.minPoints.toLocaleString()}+ points</p>
              <ul className="space-y-2">
                {tier.benefits.map((b) => (
                  <li key={b} className="text-sm text-muted-foreground flex items-start gap-2">
                    <Star size={12} className="text-copper mt-0.5 shrink-0" /> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Redeem rewards */}
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Redeem Rewards</h2>
          <p className="text-muted-foreground">Use your points for discounts and perks</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {REWARDS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-card border border-border rounded-xl text-center"
            >
              <r.icon size={24} className="mx-auto mb-3 text-copper" />
              <h3 className="font-semibold text-foreground mb-1">{r.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{r.points} points</p>
              <button
                disabled={points < r.points}
                className="w-full py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Redeem
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Loyalty;
