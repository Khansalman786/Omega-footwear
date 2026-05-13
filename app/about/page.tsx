"use client";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, Award, Globe, Leaf, Target } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Craftsmanship",
    desc: "Every shoe is handcrafted using time-honored techniques passed down through generations of master artisans.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We source eco-friendly materials and partner with ethical factories to minimize our environmental footprint.",
  },
  {
    icon: Heart,
    title: "Passion",
    desc: "We're obsessed with creating footwear that makes you feel extraordinary from the first step.",
  },
  {
    icon: Globe,
    title: "Global Vision",
    desc: "Our collections draw inspiration from cultures and design movements around the world.",
  },
];

const team = [
  {
    name: "Elena Moretti",
    role: "Founder & Creative Director",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
  },
  {
    name: "James Chen",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Sophia Andersson",
    role: "Head of Sustainability",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
];

const milestones = [
  {
    year: "2018",
    event: "Founded in New York with a vision to reimagine premium footwear",
  },
  { year: "2019", event: "Launched first collection — sold out in 48 hours" },
  { year: "2020", event: "Opened flagship store on Fifth Avenue" },
  { year: "2021", event: "Expanded to 15 countries with global shipping" },
  { year: "2023", event: "Achieved carbon-neutral certification" },
  { year: "2026", event: "Serving 500K+ customers across 30+ countries" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
    </Suspense>

    {/* Hero */}
    <section className="relative gradient-navy py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(215_45%_25%/0.5),transparent_70%)]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-copper text-sm uppercase tracking-[0.3em] mb-4">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Crafting Tomorrow's
            <br />
            Classics Today
          </h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto text-lg">
            Born from a passion for exceptional footwear, Omega Collections
            brings together heritage craftsmanship and forward-thinking design.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20 container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            At Omega Collections, we believe that exceptional shoes are more
            than accessories — they're an extension of who you are. We exist to
            craft footwear that marries timeless elegance with modern
            innovation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Every pair we create tells a story of meticulous attention to
            detail, from hand-selected premium leathers to precision-engineered
            soles. Our artisans bring decades of expertise to every stitch.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              { num: "500K+", label: "Happy Customers" },
              { num: "30+", label: "Countries" },
              { num: "50+", label: "Artisans" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-display font-bold text-primary">
                  {stat.num}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-2xl aspect-square flex items-center justify-center"
        >
          <div className="text-center p-8">
            <Target size={48} className="text-primary mx-auto mb-4" />
            <p className="font-display text-xl font-bold text-foreground">
              "Innovation in every step"
            </p>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <v.icon size={28} className="text-copper mb-4" />
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
        Our Journey
      </h2>
      <div className="max-w-2xl mx-auto space-y-0">
        {milestones.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-6 pb-8 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                {m.year}
              </div>
              {i < milestones.length - 1 && (
                <div className="w-0.5 flex-1 bg-border mt-2" />
              )}
            </div>
            <p className="text-muted-foreground pt-3 text-sm leading-relaxed">
              {m.event}
            </p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Team */}
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
          Leadership Team
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-card shadow-lg">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display font-bold text-foreground">
                {t.name}
              </h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
