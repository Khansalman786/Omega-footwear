"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { subcategories } from "@/data/products";
import { slugify } from "@/lib/slug";

const menus: { label: string; category: string; to: string }[] = [
  { label: "Home", category: "", to: "/" },
  { label: "Shop", category: "", to: "/shop" },
  { label: "Men", category: "Men", to: "/shop/men" },
  { label: "Women", category: "Women", to: "/shop/women" },
  { label: "Boys", category: "Boys", to: "/shop/boys" },
  { label: "Girls", category: "Girls", to: "/shop/girls" },
];

const MegaMenu = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;

  return (
    <div className="hidden lg:flex items-center gap-7">
      {menus.map((m) => {
        const subs = m.category ? subcategories[m.category] : null;
        const isActive = currentPath === m.to;

        if (!subs || subs.length === 0) {
          return (
            <Link
              key={m.label}
              href={m.to}
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary group ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {m.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-copper transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          );
        }

        return (
          <div
            key={m.label}
            className="relative"
            onMouseEnter={() => setOpenMenu(m.label)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <Link
              href={m.to}
              className={`relative text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary group flex items-center gap-1 py-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {m.label}
              <ChevronDown
                size={12}
                className={`transition-transform ${openMenu === m.label ? "rotate-180" : ""}`}
              />
              <span
                className={`absolute -bottom-0 left-0 h-0.5 bg-copper transition-all duration-300 ${
                  openMenu === m.label || isActive
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            <AnimatePresence>
              {openMenu === m.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
                >
                  <div className="min-w-[220px] bg-card border border-border rounded-xl shadow-2xl p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper mb-3">
                      {m.label} Collection
                    </p>
                    <div className="flex flex-col gap-1">
                      <Link
                        href={m.to}
                        className="text-sm text-foreground hover:text-primary px-2 py-1.5 rounded-md hover:bg-secondary/60 transition-colors font-medium"
                      >
                        All {m.label}
                      </Link>
                      {subs.map((sub) => (
                        <Link
                          key={sub}
                          href={`/shop/${slugify(m.category)}/${slugify(sub)}`}
                          className="text-sm text-muted-foreground hover:text-primary px-2 py-1.5 rounded-md hover:bg-secondary/60 transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default MegaMenu;
