"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophia Laurent",
    role: "Verified Buyer",
    text: "The Elegance Stiletto is the most comfortable heel I've ever owned. The craftsmanship is on another level — you can tell every stitch was placed with care.",
    rating: 5,
    initials: "SL",
  },
  {
    name: "Marcus Chen",
    role: "Verified Buyer",
    text: "I've worn my Classic Navy Oxfords almost daily for six months. They've molded perfectly and still look brand new. Worth every dollar.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Aisha Patel",
    role: "Verified Buyer",
    text: "Beautiful packaging, lightning-fast shipping, and the Cloud Runner Pro feels like walking on air. Omega has earned a customer for life.",
    rating: 5,
    initials: "AP",
  },
  {
    name: "James O'Connor",
    role: "Verified Buyer",
    text: "The Heritage Chelsea Boots are stunning. The leather has aged gracefully and the fit is impeccable. Easily my favorite pair.",
    rating: 5,
    initials: "JO",
  },
  {
    name: "Elena Rossi",
    role: "Verified Buyer",
    text: "Customer service was extraordinary when I needed a size exchange. The shoes themselves are works of art. Truly luxury.",
    rating: 5,
    initials: "ER",
  },
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })],
  );

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3 font-body">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Loved by Thousands
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real words from real customers who walk in Omega every day.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <div className="h-full bg-background border border-border rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                  <Quote className="text-primary/30 mb-4" size={32} />
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 flex-1 font-body">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-navy flex items-center justify-center text-primary-foreground font-display font-semibold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
