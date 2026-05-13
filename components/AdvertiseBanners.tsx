"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AdvertiseBanners = () => {
  return (
    <section className="py-12 md:py-20 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {/* Sale banner */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl group min-h-[260px] sm:min-h-[320px] md:min-h-[380px]"
        >
          <Image
            src="/assets/banner-sale.jpg"
            alt="Mid-season sale"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            fill
          />
          {/* Stronger gradient on mobile so text always reads */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40 sm:bg-gradient-to-r sm:from-navy/95 sm:via-navy/70 sm:to-navy/30" />

          <div className="relative z-10 h-full flex flex-col justify-end sm:justify-center p-6 sm:p-10 md:p-14 sm:max-w-[60%] md:max-w-md">
            <div className="flex items-center gap-2 text-copper text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3">
              <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" /> Limited Time
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-2 sm:mb-3 leading-tight">
              Up to <span className="text-copper">40% Off</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Mid-Season Sale
            </h3>
            <p className="text-primary-foreground/80 text-xs sm:text-sm mb-4 sm:mb-6 max-w-sm">
              Iconic styles at exceptional prices. Use code{" "}
              <span className="font-bold text-copper">OMEGA20</span> for an
              extra 20%.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 self-start px-5 sm:px-6 py-2.5 sm:py-3 bg-copper hover:bg-copper/90 text-primary-foreground rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all"
            >
              Shop Sale <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Sport banner */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl group min-h-[260px] sm:min-h-[320px] md:min-h-[380px]"
        >
          <Image
            src="/assets/banner-sport.jpg"
            alt="Performance collection"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/40 sm:bg-gradient-to-l sm:from-navy/95 sm:via-navy/70 sm:to-navy/30" />

          <div className="relative z-10 h-full flex flex-col justify-end sm:justify-center sm:items-end p-6 sm:p-10 md:p-14 sm:text-right sm:ml-auto sm:max-w-[60%] md:max-w-md">
            <div className="flex items-center gap-2 text-steel-light text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3">
              <Zap size={12} className="sm:w-3.5 sm:h-3.5" /> New Drop
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-2 sm:mb-3 leading-tight">
              Performance
              <br />
              <span className="text-steel-light">Reimagined</span>
            </h3>
            <p className="text-primary-foreground/80 text-xs sm:text-sm mb-4 sm:mb-6 max-w-sm">
              Engineered for speed, designed for the city. Discover the new
              performance series.
            </p>
            <Link
              href="/shop?category=Men&subcategory=Sneakers"
              className="inline-flex items-center gap-2 self-start sm:self-end px-5 sm:px-6 py-2.5 sm:py-3 bg-primary-foreground/10 backdrop-blur border border-primary-foreground/30 hover:bg-primary-foreground hover:text-navy text-primary-foreground rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all"
            >
              Explore <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvertiseBanners;
