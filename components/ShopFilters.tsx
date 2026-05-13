import { useState } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { Star } from "lucide-react";
import { brands, allColors, subcategories } from "@/data/products";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";

export interface Filters {
  category: string;
  subcategory: string;
  brands: string[];
  colors: string[];
  sizes: number[];
  priceRange: [number, number];
  minRating: number;
  search: string;
}

export const defaultFilters: Filters = {
  category: "All",
  subcategory: "All",
  brands: [],
  colors: [],
  sizes: [],
  priceRange: [0, 500],
  minRating: 0,
  search: "",
};

interface ShopFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  activeCount: number;
}

const allSizes = [5, 6, 7, 8, 9, 10, 11, 12, 13];

const FilterSection = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-semibold text-foreground mb-3">
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ShopFilters = ({ filters, onChange, onReset, activeCount }: ShopFiltersProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

  const toggleArray = <T,>(arr: T[], item: T) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];

  const availableSubcategories = filters.category !== "All" ? subcategories[filters.category] || [] : [];

  const content = (
    <div className="space-y-0">
      {/* Category */}
      <FilterSection title="Category">
        <div className="flex flex-wrap gap-2">
          {["All", "Men", "Women", "Boys", "Girls", "Unisex"].map((cat) => (
            <button
              key={cat}
              onClick={() => update({ category: cat, subcategory: "All" })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.category === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Subcategory */}
      {availableSubcategories.length > 0 && (
        <FilterSection title="Subcategory">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => update({ subcategory: "All" })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.subcategory === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              All
            </button>
            {availableSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => update({ subcategory: sub })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filters.subcategory === sub ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Price Range */}
      <FilterSection title={`Price: $${filters.priceRange[0]} – $${filters.priceRange[1]}`}>
        <div className="px-1">
          <Slider
            min={0}
            max={500}
            step={10}
            value={filters.priceRange}
            onValueChange={(v) => update({ priceRange: v as [number, number] })}
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>
      </FilterSection>

      {/* Brand */}
      <FilterSection title="Brand">
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => update({ brands: toggleArray(filters.brands, brand) })}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {allColors.map((color) => (
            <button
              key={color}
              onClick={() => update({ colors: toggleArray(filters.colors, color) })}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filters.colors.includes(color) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => update({ sizes: toggleArray(filters.sizes, size) })}
              className={`w-10 h-10 rounded-md text-xs font-medium transition-all ${
                filters.sizes.includes(size) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Minimum Rating" defaultOpen={false}>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() => update({ minRating: filters.minRating === r ? 0 : r })}
              className={`flex items-center gap-2 w-full p-2 rounded-md text-sm transition-all ${
                filters.minRating === r ? "bg-primary/10 text-primary" : "hover:bg-secondary/50 text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} className={i < r ? "fill-copper text-copper" : "text-border"} />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </FilterSection>

      {activeCount > 0 && (
        <button onClick={onReset} className="w-full py-2 text-sm text-destructive hover:text-destructive/80 font-medium flex items-center justify-center gap-1">
          <X size={14} /> Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium text-foreground"
      >
        <SlidersHorizontal size={16} />
        Filters {activeCount > 0 && `(${activeCount})`}
      </button>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">{content}</div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-card border-r border-border p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-foreground">Filters</h3>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShopFilters;
