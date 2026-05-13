"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import SearchOverlay from "./SearchOverlay";
import CurrencySelector from "./CurrencySelector";
import MegaMenu from "./MegaMenu";
import { subcategories } from "@/data/products";
import { slugify } from "@/lib/slug";

const mobileGroups = [
  { label: "Home", to: "/", subs: [] as string[] },
  { label: "Shop", to: "/shop", subs: [] },
  { label: "Men", to: "/shop/men", subs: subcategories.Men },
  { label: "Women", to: "/shop/women", subs: subcategories.Women },
  { label: "Boys", to: "/shop/boys", subs: subcategories.Boys },
  { label: "Girls", to: "/shop/girls", subs: subcategories.Girls },
];

const socials = [
  { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
];

const Navbar = () => {
  const { cartCount, isLoggedIn, unreadCount, wishlist } = useStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const wishlistCount = wishlist.length;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPath = `${pathname}${
    searchParams?.toString() ? `?${searchParams.toString()}` : ""
  }`;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [currentPath]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-navy text-primary-foreground py-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-body">
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4">
          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-primary-foreground/70 hover:text-copper transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Text */}
          <span className="flex-1 text-center truncate">
            Free shipping on orders over ₹1000 · Use code{" "}
            <span className="font-bold text-copper">OMEGA10</span> for 10% off
          </span>

          {/* Currency */}
          <div className="shrink-0 hidden sm:block">
            <CurrencySelector />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border"
            : "bg-card/80 backdrop-blur-xl border-b border-border/50"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="relative flex items-center justify-between h-16 lg:h-20">
            {/* Left */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-foreground"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop Menu */}
              <MegaMenu />
            </div>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-center"
            >
              <img
                src="/assets/omega-logo.png"
                alt="Omega Collections"
                className="w-24 sm:w-28 lg:w-48 h-auto object-contain"
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="text-muted-foreground hover:text-primary transition-colors p-1"
              >
                <Search size={19} />
              </button>

              {/* Notifications */}
              <Link
                href="/notifications"
                className="text-muted-foreground hover:text-primary transition-colors relative p-1 hidden sm:block"
              >
                <Bell size={19} />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold px-1">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="text-muted-foreground hover:text-primary transition-colors relative p-1 hidden sm:block"
              >
                <Heart size={19} />

                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold px-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="text-muted-foreground hover:text-primary transition-colors relative p-1"
              >
                <ShoppingBag size={19} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-semibold px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <Link
                href={isLoggedIn ? "/account" : "/login"}
                className="text-muted-foreground hover:text-primary transition-colors p-1"
              >
                <User size={19} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-[85%] max-w-[320px] h-screen bg-card z-50 shadow-2xl overflow-y-auto lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Menu</h2>

                <button onClick={() => setMobileOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Links */}
              <div className="p-4 flex flex-col gap-2">
                {mobileGroups.map((group) => {
                  const isOpen = openDropdown === group.label;

                  return (
                    <div
                      key={group.label}
                      className="border-b border-border pb-2"
                    >
                      {/* Main Category */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={group.to}
                          className="py-3 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors"
                        >
                          {group.label}
                        </Link>

                        {group.subs.length > 0 && (
                          <button
                            onClick={() =>
                              setOpenDropdown(isOpen ? null : group.label)
                            }
                            className="p-2"
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {isOpen && group.subs.length > 0 && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-3 flex flex-col gap-1 pb-2">
                              <Link
                                href={group.to}
                                className="text-sm text-primary font-medium py-1"
                              >
                                All {group.label}
                              </Link>

                              {group.subs.map((sub) => (
                                <Link
                                  key={sub}
                                  href={`/shop/${slugify(group.label)}/${slugify(sub)}`}
                                  className="text-sm text-muted-foreground hover:text-primary py-1 transition-colors"
                                >
                                  {sub}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Mobile Icons */}
                <div className="flex items-center gap-5 pt-5">
                  {/* Wishlist */}
                  <Link href="/wishlist" className="relative">
                    <Heart size={22} />

                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  {/* Cart */}
                  <Link href="/cart" className="relative">
                    <ShoppingBag size={22} />

                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* User */}
                  <Link href={isLoggedIn ? "/account" : "/login"}>
                    <User size={22} />
                  </Link>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4 pt-6">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
