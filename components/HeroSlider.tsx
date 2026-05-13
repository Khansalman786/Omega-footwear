"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    image: "/assets/hero-bg.jpg",
    eyebrow: "New Season Collection",
    title: "Step Into",
    accent: "Innovation",
    description:
      "Discover premium craftsmanship meets contemporary design in our latest collection.",
    cta: "Shop Now",
    link: "/shop",
    overlay: "bg-gradient-to-r from-navy/90 via-navy/60 to-transparent",
  },
  {
    image: "/assets/hero-bg-2.jpg",
    eyebrow: "Women's Edit",
    title: "Elegance",
    accent: "Redefined",
    description:
      "Sculpted heels and refined silhouettes for the modern woman who walks her own path.",
    cta: "Shop Women",
    link: "/shop?category=Women",
    overlay: "bg-gradient-to-r from-navy/85 via-navy/50 to-transparent",
  },
  {
    image: "/assets/hero-bg-3.jpg",
    eyebrow: "Performance Series",
    title: "Engineered",
    accent: "For Motion",
    description:
      "Lightweight performance sneakers built for the city, the run, and everything in between.",
    cta: "Explore Sneakers",
    link: "/shop?category=Men",
    overlay: "bg-gradient-to-r from-navy/85 via-navy/55 to-transparent",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Preload all slide images on mount so transitions are instant
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <section
      className="relative h-[85vh] flex items-center overflow-hidden bg-navy"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      aria-live={paused ? "polite" : "off"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* All slide images mounted at once — only opacity changes for instant swap */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt={s.title}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding={i === 0 ? "sync" : "async"}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${s.overlay}`} />
        </div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-steel-light text-sm uppercase tracking-[0.3em] mb-4 font-body">
              {slides[index].eyebrow}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              {slides[index].title}
              <br />
              <span className="text-steel-light">{slides[index].accent}</span>
            </h1>
            <p className="text-steel-light/80 text-lg mb-8 max-w-md font-body">
              {slides[index].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={slides[index].link}
                className="btn-hero flex items-center gap-2"
              >
                {slides[index].cta} <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="btn-outline-hero border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Explore Collections
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition flex items-center justify-center"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 transition flex items-center justify-center"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index
                ? "w-10 bg-primary-foreground"
                : "w-5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
