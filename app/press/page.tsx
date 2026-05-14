"use client";

import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const pressReleases = [
  {
    date: "Feb 2026",
    title: "Omega Collections Launches Spring/Summer 2026 Line",
    excerpt:
      "The latest collection features 12 new styles combining sustainable materials with cutting-edge design.",
  },
  {
    date: "Jan 2026",
    title: "Omega Reaches 500,000 Customer Milestone",
    excerpt:
      "In just eight years, Omega has grown from a small NYC studio to a global footwear brand serving half a million customers.",
  },
  {
    date: "Nov 2025",
    title: "Partnership with Italian Tannery Conceria Walpier",
    excerpt:
      "Omega announces an exclusive partnership with one of Italy's most prestigious leather tanneries for premium materials.",
  },
  {
    date: "Sep 2025",
    title: "Omega Achieves B Corp Certification",
    excerpt:
      "Recognizing our commitment to social and environmental performance, accountability, and transparency.",
  },
  {
    date: "Jun 2025",
    title: "New Flagship Store Opens in London",
    excerpt:
      "Omega expands to Europe with a stunning 3,000 sq ft flagship in Mayfair, featuring an in-store customization studio.",
  },
];

const mediaFeatures = [
  {
    outlet: "Vogue",
    quote:
      "Omega is redefining what premium footwear means for a new generation.",
  },
  {
    outlet: "GQ",
    quote: "The best-kept secret in men's shoes just went mainstream.",
  },
  {
    outlet: "Forbes",
    quote: "How one startup disrupted the $400B global footwear market.",
  },
  {
    outlet: "Hypebeast",
    quote: "Omega's blend of heritage craft and modern design hits different.",
  },
];

const Press = () => (
  <div className="min-h-screen bg-background">
    <NavbarWrapper />

    <section className="relative gradient-navy py-24 md:py-32">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-copper text-sm uppercase tracking-[0.3em] mb-4">
            Newsroom
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Press & Media
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto text-lg">
            The latest news and press releases from Omega Collections.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Media features */}
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground text-center mb-8">
          As Featured In
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mediaFeatures.map((f, i) => (
            <motion.div
              key={f.outlet}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border text-center"
            >
              <p className="font-display text-2xl font-bold text-foreground mb-3">
                {f.outlet}
              </p>
              <p className="text-xs text-muted-foreground italic">
                "{f.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Press releases */}
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-display text-3xl font-bold text-foreground mb-8">
        Press Releases
      </h2>
      <div className="space-y-4 max-w-3xl">
        {pressReleases.map((pr, i) => (
          <motion.div
            key={pr.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-colors group cursor-pointer"
          >
            <p className="text-xs text-copper font-semibold uppercase tracking-wider mb-2">
              {pr.date}
            </p>
            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
              {pr.title}
            </h3>
            <p className="text-sm text-muted-foreground">{pr.excerpt}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Media contact */}
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
          Media Inquiries
        </h2>
        <p className="text-muted-foreground mb-6">
          For press kits, interviews, or media requests please contact our
          communications team.
        </p>
        <a
          href="mailto:press@omegacollections.com"
          className="btn-hero inline-flex items-center gap-2"
        >
          <Mail size={16} /> press@omegacollections.com
        </a>
      </div>
    </section>

    <Footer />
  </div>
);

export default Press;
