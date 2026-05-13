"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

const items = [
  {
    img: "/assets/customer-1.jpg",
    handle: "@marcus.j",
    product: "Classic Navy Oxford",
  },
  {
    img: "/assets/customer-2.jpg",
    handle: "@elenastyle",
    product: "Elegance Stiletto",
  },
  {
    img: "/assets/customer-3.jpg",
    handle: "@urban.kai",
    product: "Cloud Runner Pro",
  },
  {
    img: "/assets/customer-4.jpg",
    handle: "@autumnwalks",
    product: "Heritage Chelsea Boot",
  },
];

const CustomerGallery = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-xs uppercase tracking-[0.3em] mb-3 font-body">
            #WornByYou
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            As Worn By Our Customers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real stories, real style. Tag{" "}
            <span className="text-primary font-semibold">
              @omegacollections
            </span>{" "}
            for a chance to be featured.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {items.map((item, i) => (
            <motion.a
              key={item.handle}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-secondary"
            >
              <img
                src={item.img}
                alt={`Customer wearing ${item.product}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2 text-primary-foreground text-sm font-semibold mb-1">
                  <User size={14} />
                  {item.handle}
                </div>
                <p className="text-steel-light text-xs uppercase tracking-wider">
                  Wearing · {item.product}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerGallery;
