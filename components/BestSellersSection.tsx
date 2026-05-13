"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp } from "lucide-react";

import type { Product } from "@/data/products";
import BestSellersCarousel from "./BestSellersCarousel";

interface Props {
  products: Product[];
}

const CATEGORY_OPTIONS = ["All", "Men", "Women", "Boys", "Girls"] as const;
const RATING_OPTIONS = [0, 4, 4.5] as const;

const BestSellersSection = ({ products }: Props) => {
  const [category, setCategory] =
    useState<(typeof CATEGORY_OPTIONS)[number]>("All");

  const [minRating, setMinRating] = useState<number>(0);

  const filtered = useMemo(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    return result;
  }, [products, category, minRating]);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-copper text-xs uppercase tracking-[0.3em] mb-3 font-body">
              <TrendingUp size={14} />
              Top Picks
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Best Sellers
            </h2>

            <p className="text-muted-foreground">
              Loved by thousands · ranked by you
            </p>
          </div>

          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider hover:underline"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {CATEGORY_OPTIONS.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === item
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Ratings */}
          <div className="flex flex-wrap gap-3">
            {RATING_OPTIONS.map((rating) => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  minRating === rating
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                <Star size={14} className="fill-current" />
                {rating === 0 ? "All Ratings" : `${rating}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <BestSellersCarousel products={filtered} />

        {/* Mobile Button */}
        <div className="flex justify-center mt-10 md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider hover:underline"
          >
            View All
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
