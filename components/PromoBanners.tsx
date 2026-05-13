"use client";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Link from "next/link";

const banners = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On orders over $150",
    to: "/shipping",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    desc: "Hassle-free exchanges",
    to: "/returns",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Craft Warranty",
    desc: "Built to last, guaranteed",
    to: "/about",
  },
];

const PromoBanners = () => {
  return (
    <section className="py-12 bg-secondary/40 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={b.to}
                  className="group flex items-center gap-4 p-5 rounded-lg bg-background border border-border hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground">
                      {b.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
