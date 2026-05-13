import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const suggestions =
    query.length >= 2
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.tags.some((t) =>
                t.toLowerCase().includes(query.toLowerCase()),
              ) ||
              p.category.toLowerCase().includes(query.toLowerCase()) ||
              p.brand.toLowerCase().includes(query.toLowerCase()) ||
              p.subcategory.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 6)
      : [];

  const popularSearches = ["Oxfords", "Sneakers", "Boots", "Heels", "Casual"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl"
        >
          <div className="container mx-auto px-4 pt-20">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 border-b-2 border-primary pb-4 mb-8">
                <Search size={24} className="text-muted-foreground" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 bg-transparent text-2xl font-display text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {suggestions.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                    Results
                  </p>
                  {suggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {product.brand} · {product.category} · $
                          {product.price}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="block text-center py-3 text-sm text-primary font-semibold hover:underline"
                  >
                    View all results →
                  </Link>
                </div>
              ) : query.length >= 2 ? (
                <p className="text-center text-muted-foreground py-8">
                  No products found for "{query}"
                </p>
              ) : (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
