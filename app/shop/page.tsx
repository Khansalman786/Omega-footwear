"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ShopFilters, { Filters, defaultFilters } from "@/components/ShopFilters";

import Breadcrumbs, { Crumb } from "@/components/Breadcrumbs";

import { products, subcategories } from "@/data/products";
import { findCategoryBySlug, slugify } from "@/lib/slug";

import { Search } from "lucide-react";

const ALL_CATEGORIES = Object.keys(subcategories);

const ShopPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();

  const catSlug = params?.category as string | undefined;
  const subSlug = params?.subcategory as string | undefined;

  // Resolve from URL path first
  const resolvedCategory = catSlug
    ? findCategoryBySlug(catSlug, ALL_CATEGORIES) || "All"
    : searchParams.get("category") || "All";

  const resolvedSubcategory =
    subSlug && resolvedCategory !== "All"
      ? findCategoryBySlug(subSlug, subcategories[resolvedCategory] || []) ||
        "All"
      : searchParams.get("subcategory") || "All";

  const paramCategory = resolvedCategory;
  const paramSubcategory = resolvedSubcategory;
  const paramSearch = searchParams.get("search") || "";

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    category: paramCategory,
    subcategory: paramSubcategory,
    search: paramSearch,
  });

  const [sortBy, setSortBy] = useState("featured");

  // Sync params -> filters
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: paramCategory,
      subcategory: paramSubcategory,
      search: paramSearch,
    }));
  }, [paramCategory, paramSubcategory, paramSearch]);

  const activeCount = useMemo(() => {
    let count = 0;

    if (filters.category !== "All") count++;
    if (filters.subcategory !== "All") count++;
    if (filters.brands.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.sizes.length > 0) count++;

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) {
      count++;
    }

    if (filters.minRating > 0) count++;
    if (filters.search) count++;

    return count;
  }, [filters]);

  const filtered = useMemo(() => {
    let result = products;

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();

      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Category
    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    // Subcategory
    if (filters.subcategory !== "All") {
      result = result.filter((p) => p.subcategory === filters.subcategory);
    }

    // Brand
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c)),
      );
    }

    // Sizes
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s)),
      );
    }

    // Price
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    // Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;

      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;

      case "popularity":
        result = [...result].sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Breadcrumbs
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ];

  if (paramCategory !== "All") {
    crumbs.push({
      label: paramCategory,
      href: `/shop/${slugify(paramCategory)}`,
    });
  }

  if (paramSubcategory !== "All" && paramCategory !== "All") {
    crumbs.push({
      label: paramSubcategory,
      href: `/shop/${slugify(paramCategory)}/${slugify(paramSubcategory)}`,
    });
  }

  const seoTitle =
    paramCategory === "All"
      ? "Shop All Footwear"
      : paramSubcategory === "All"
        ? `${paramCategory}'s Shoes`
        : `${paramCategory} ${paramSubcategory}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <Breadcrumbs items={crumbs} className="mb-6" />

        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              {seoTitle}
            </h1>

            <p className="text-muted-foreground">
              {filtered.length} product
              {filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                search: e.target.value,
              }))
            }
            placeholder="Search products, brands, tags..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <ShopFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            activeCount={activeCount}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="lg:hidden" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-md border border-border bg-card text-foreground text-sm"
              >
                <option value="featured">Featured</option>

                <option value="price-low">Price: Low → High</option>

                <option value="price-high">Price: High → Low</option>

                <option value="newest">Newest</option>

                <option value="popularity">Popularity</option>

                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg mb-2">No products found</p>

                <p className="text-sm">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;
