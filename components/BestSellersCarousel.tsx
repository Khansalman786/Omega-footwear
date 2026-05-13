"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Award,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  products: Product[];
}

const BestSellerCard = ({
  product,
  rank,
  index,
}: {
  product: Product;
  rank: number;
  index: number;
}) => {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const { formatPrice } = useCurrency();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card-product group relative"
    >
      {/* Rank badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-navy text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full">
        <Award size={11} className="text-copper" />#{rank}
      </div>

      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-card shadow-md hover:scale-110"
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

      <div className="relative overflow-hidden bg-secondary/50 aspect-square">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product, product.sizes[0])}
            className="w-full btn-hero flex items-center justify-center gap-2 text-xs"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category} · {product.subcategory}
        </p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating bar */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.round(product.rating)
                    ? "fill-copper text-copper"
                    : "fill-border text-border"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-[10px] font-bold text-copper bg-copper/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100,
              )}
              %
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BestSellersCarousel = ({ products }: Props) => {
  const autoplay = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
      loop: true,
    },
    [autoplay.current],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation when carousel region is focused
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi?.scrollNext();
      }
    },
    [emblaApi],
  );

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Best sellers"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        ref={emblaRef}
      >
        <div className="flex gap-4 md:gap-6">
          {products?.map((product, i) => (
            <div
              key={product.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${products.length}: ${product.name}`}
              className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0"
            >
              <BestSellerCard product={product} rank={i + 1} index={i} />
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Previous best sellers"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-background border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next best sellers"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-background border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default BestSellersCarousel;
