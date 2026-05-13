"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

interface Props {
  products: Product[];
}

const ProductCarousel = ({ products }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    loop: false,
  });
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

  return (
    <div className="relative">
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 -ml-0">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0"
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Previous"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-background border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-foreground"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-background border border-border shadow-lg items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background disabled:hover:text-foreground"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ProductCarousel;
