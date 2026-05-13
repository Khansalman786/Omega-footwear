import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);
  return (
    <>
      {/* Featured Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Featured Products
              </h2>

              <p className="text-muted-foreground">Handpicked for you</p>
            </div>

            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wider hover:underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
