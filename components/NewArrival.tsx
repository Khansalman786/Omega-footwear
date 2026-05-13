"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductCarousel from "./ProductCarousel";
import { products } from "@/data/products";

const newArrivals = [...products]
  .sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
  .slice(0, 8);

const NewArrival = () => {
  return (
    <section className="py-20 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3 font-body">
            Just Dropped
          </p>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            New Arrivals
          </h2>

          <p className="text-muted-foreground">
            The latest additions to our collection
          </p>
        </div>

        <Link
          href="/shop"
          className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider hover:underline"
        >
          Shop All
          <ArrowRight size={14} />
        </Link>
      </div>

      <ProductCarousel products={newArrivals} />

      <div className="flex justify-center mt-10 md:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider hover:underline"
        >
          Shop All
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default NewArrival;
