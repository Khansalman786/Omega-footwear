"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Star, Minus, Plus, Tag } from "lucide-react";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import ProductCard from "@/components/ProductCard";
import ProductReviews from "@/components/ProductReviews";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useCurrency } from "@/context/CurrencyContext";
import { slugify } from "@/lib/slug";
import { motion } from "framer-motion";

const SITE_URL = "https://product-palace-pack.lovable.app";

const ProductDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const product = products.find((p) => p.id === id);

  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { formatPrice } = useCurrency();
  const { recentIds, addRecentlyViewed } = useRecentlyViewed();

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setSelectedColor(product.colors[0] || null);
      setSelectedSize(null);
      setQty(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <NavbarWrapper />

        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
          Product not found.
        </div>

        <Footer />
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) return;

    for (let i = 0; i < qty; i++) {
      addToCart(product, selectedSize);
    }
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const recentlyViewed = recentIds
    .filter((rid) => rid !== product.id)
    .map((rid) => products.find((p) => p.id === rid))
    .filter(Boolean)
    .slice(0, 4) as typeof products;

  const colorMap: Record<string, string> = {
    Navy: "bg-[hsl(220,50%,30%)]",
    Black: "bg-[hsl(0,0%,10%)]",
    Brown: "bg-[hsl(25,50%,35%)]",
    White: "bg-[hsl(0,0%,95%)]",
    Grey: "bg-[hsl(0,0%,55%)]",
    Red: "bg-[hsl(0,70%,45%)]",
    Nude: "bg-[hsl(20,30%,75%)]",
    Tan: "bg-[hsl(30,40%,55%)]",
    Beige: "bg-[hsl(40,30%,75%)]",
    Olive: "bg-[hsl(80,30%,35%)]",
  };

  const productUrl = `${SITE_URL}/product/${product.id}`;

  const categoryHref = `/shop/${slugify(product.category)}`;

  const subcategoryHref = `/shop/${slugify(
    product.category,
  )}/${slugify(product.subcategory)}`;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={product.name}
        description={product.description.slice(0, 155)}
        canonical={productUrl}
        ogType="product"
        ogImage={
          product.images[0]?.startsWith("http")
            ? product.images[0]
            : `${SITE_URL}${product.images[0] || ""}`
        }
      />

      <NavbarWrapper />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: product.category, href: categoryHref },
            { label: product.subcategory, href: subcategoryHref },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <ImageGallery images={product.images} alt={product.name} />

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </p>

              <span className="text-border">·</span>

              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                {product.subcategory}
              </p>
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-copper text-copper"
                        : "text-border"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-semibold rounded-full">
                    -
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Color:{" "}
                <span className="font-normal text-muted-foreground">
                  {selectedColor}
                </span>
              </p>

              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      colorMap[color] || "bg-secondary"
                    } ${
                      selectedColor === color
                        ? "border-primary ring-2 ring-primary/20 scale-110"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">
                Select Size
              </p>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground"
                >
                  <Minus size={16} />
                </button>

                <span className="px-4 font-medium text-foreground">{qty}</span>

                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="btn-hero flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                {selectedSize ? "Add to Cart" : "Select a Size"}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-14 h-14 border border-border rounded-md flex items-center justify-center hover:border-primary transition-colors"
              >
                <Heart
                  size={20}
                  className={
                    wishlisted
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground"
                  }
                />
              </button>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-muted-foreground" />

                {product.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/shop?search=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Related Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold text-foreground mb-8">
              Recently Viewed
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <ProductReviews productId={product.id} />
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
