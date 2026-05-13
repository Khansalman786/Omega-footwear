"use client";

import Link from "next/link";
import {

  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";


import { useState } from "react";
import { toast } from "sonner";

const footerLinks = {
  shop: [
    { label: "Men's Collection", href: "/shop?category=Men" },
    { label: "Women's Collection", href: "/shop?category=Women" },
    { label: "New Arrivals", href: "/shop" },
    { label: "Bestsellers", href: "/shop" },
    { label: "Sale", href: "/shop" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Sustainability", href: "/about" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Size Guide", href: "/faq" },
  ],
  extras: [
    { label: "Gift Cards", href: "/gift-cards" },
    { label: "Loyalty Program", href: "/loyalty" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy" },
  ],
};

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      toast.success("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-navy text-primary-foreground">
      {/* Newsletter banner */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold mb-1">
                Join the Omega Family
              </h3>
              <p className="text-sm text-primary-foreground/60">
                Get 15% off your first order, plus early access to new drops and
                exclusive offers.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full lg:w-auto gap-0"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 px-5 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-lg text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-primary-foreground/40"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-copper hover:bg-copper/90 text-primary-foreground font-semibold text-sm rounded-r-lg transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <img
                src="/assets/omega-logo.png"
                alt="Omega Collections"
                className="w-28 lg:w-60 h-auto object-cover brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed mb-6 max-w-xs">
              Step into innovation. Premium footwear crafted for those who
              demand excellence in every stride.
            </p>
            <div className="flex gap-3 mb-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-copper hover:bg-copper/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-xs text-primary-foreground/40">
              <p className="flex items-center gap-2">
                <MapPin size={12} /> 123 Fifth Avenue, New York, NY 10001
              </p>
              <p className="flex items-center gap-2">
                <Phone size={12} /> +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <Mail size={12} /> hello@omegacollections.com
              </p>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.15em] mb-5 text-primary-foreground/90">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-copper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.15em] mb-5 text-primary-foreground/90">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-copper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.15em] mb-5 text-primary-foreground/90">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-copper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Extras links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.15em] mb-5 text-primary-foreground/90">
              Perks
            </h4>
            <ul className="space-y-3">
              {footerLinks.extras.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-copper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-display font-semibold text-sm uppercase tracking-[0.15em] mb-3 mt-6 text-primary-foreground/90">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-copper transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            © 2026 Omega Collections. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {["Visa", "Mastercard", "Amex", "PayPal"].map((card) => (
                <span
                  key={card}
                  className="px-2 py-1 bg-primary-foreground/10 rounded text-[10px] text-primary-foreground/50 font-medium"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
