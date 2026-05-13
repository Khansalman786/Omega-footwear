"use client";

import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const { formatPrice } = useCurrency();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-product group"
    >
      <div className="relative overflow-hidden bg-secondary/50 aspect-square">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 4}
          />
        </Link>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-card shadow-sm"
        >
          <Heart
            size={16}
            className={
              wishlisted
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product, product.sizes[0])}
            className="w-full btn-hero flex items-center justify-center gap-2 text-xs"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-base font-semibold text-foreground hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="fill-copper text-copper" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
