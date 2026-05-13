"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  Heart,
  Zap,
  Globe,
} from "lucide-react";

const perks = [
  {
    icon: Heart,
    title: "Health & Wellness",
    desc: "Comprehensive health, dental, and vision coverage for you and your family.",
  },
  {
    icon: Zap,
    title: "Growth Budget",
    desc: "$2,000/year for courses, conferences, and books to fuel your development.",
  },
  {
    icon: Globe,
    title: "Remote Flexible",
    desc: "Work from anywhere with flexible hours. We trust you to deliver great work.",
  },
];

const openings = [
  {
    title: "Senior Frontend Developer",
    dept: "Engineering",
    location: "New York / Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    dept: "Design",
    location: "New York",
    type: "Full-time",
  },
  {
    title: "Supply Chain Manager",
    dept: "Operations",
    location: "New York",
    type: "Full-time",
  },
  {
    title: "Content Marketing Specialist",
    dept: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Customer Experience Lead",
    dept: "Support",
    location: "New York / Remote",
    type: "Full-time",
  },
  {
    title: "Data Analyst",
    dept: "Analytics",
    location: "Remote",
    type: "Full-time",
  },
];

const Careers = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="relative gradient-navy py-24 md:py-32">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-copper text-sm uppercase tracking-[0.3em] mb-4">
            Join Our Team
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Build the Future
            <br />
            of Footwear
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto text-lg">
            We're looking for passionate people to help us craft the world's
            most innovative shoes.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Perks */}
    <section className="py-20 container mx-auto px-4">
      <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
        Why Omega?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {perks.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl p-8 border border-border text-center"
          >
            <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center mx-auto mb-4">
              <p.icon size={24} className="text-copper" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">
              {p.title}
            </h3>
            <p className="text-sm text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Openings */}
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
          Open Positions
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          {openings.length} roles available
        </p>
        <div className="max-w-3xl mx-auto space-y-3">
          {openings.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-lg border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} /> {job.dept}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {job.type}
                  </span>
                </div>
              </div>
              <ArrowRight
                size={16}
                className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Careers;
