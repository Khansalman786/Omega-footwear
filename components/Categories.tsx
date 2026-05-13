"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    label: "Men",
    image: "/assets/category-men.jpg",
    desc: "Refined elegance",
    count: "120+ styles",
  },
  {
    label: "Women",
    image: "/assets/category-women.jpg",
    desc: "Sophisticated style",
    count: "150+ styles",
  },
  {
    label: "Boys",
    image: "/assets/category-boys.jpg",
    desc: "Active & playful",
    count: "60+ styles",
  },
  {
    label: "Girls",
    image: "/assets/category-girls.jpg",
    desc: "Sweet & charming",
    count: "55+ styles",
  },
];

export default function Categories() {
  return (
    <section className="py-20 container mx-auto px-4">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-copper text-xs uppercase tracking-[0.3em] mb-3 font-body">
          For Every Step
        </p>

        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          Shop by Category
        </h2>

        <p className="text-muted-foreground">
          Curated collections for every member of the family
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((item, i) => (
          <Link
            key={item.label}
            href={`/shop?category=${item.label}`}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg block"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="absolute inset-0"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={`${item.label} collection`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={i === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10">
                <p className="text-copper text-[10px] uppercase tracking-[0.25em] mb-1.5 font-body">
                  {item.count}
                </p>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-1">
                  {item.label}
                </h3>

                <p className="text-primary-foreground/70 text-xs md:text-sm mb-3">
                  {item.desc}
                </p>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-foreground uppercase tracking-wider group-hover:gap-2.5 transition-all">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
