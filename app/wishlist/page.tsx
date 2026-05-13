"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Wishlist = () => {
  const { wishlist, toggleWishlist, moveWishlistToCart } = useStore();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          Wishlist
        </h1>
        <p className="text-muted-foreground mb-8">
          {wishlistProducts.length} saved item
          {wishlistProducts.length !== 1 ? "s" : ""}
        </p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-border mb-4" />
            <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
            <Link href="/shop" className="btn-hero inline-block">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {wishlistProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 bg-card rounded-lg p-4 border border-border group"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 bg-secondary rounded-lg flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {product.brand} · {product.category}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={12} className="fill-copper text-copper" />
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end justify-center">
                    <button
                      onClick={() => moveWishlistToCart(product)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <ShoppingBag size={14} /> Move to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="flex items-center gap-1.5 text-sm text-destructive hover:text-destructive/80 transition-colors"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
