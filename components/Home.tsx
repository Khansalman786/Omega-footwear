import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "./HeroSlider";
import PromoBanners from "./PromoBanners";
import Categories from "./Categories";
import { products } from "@/data/products";

// Lazy load components that appear below the fold
const AdvertiseBanners = dynamic(() => import("./AdvertiseBanners"), {
  loading: () => <div className="h-96 bg-secondary/30 animate-pulse" />,
});
const BestSellersSection = dynamic(() => import("./BestSellersSection"), {
  loading: () => <div className="h-96 bg-secondary/30 animate-pulse" />,
});
// const BestSellersCarousel = dynamic(() => import("./BestSellersCarousel"));
// const ProductCarousel = dynamic(() => import("./ProductCarousel"));
const CustomerGallery = dynamic(() => import("./CustomerGallery"), {
  loading: () => <div className="h-96 bg-secondary/30 animate-pulse" />,
});
const Testimonials = dynamic(() => import("./Testimonials"), {
  loading: () => <div className="h-96 bg-secondary/30 animate-pulse" />,
});
const FeaturedProducts = dynamic(() => import("./FeaturedProducts"), {
  loading: () => <div className="h-96 bg-secondary/30 animate-pulse" />,
});
const Newsletter = dynamic(() => import("./Newsletter"));
const NewArrival = dynamic(() => import("./NewArrival"), {
  loading: () => <div className="h-96 bg-secondary/30 animate-pulse" />,
});

// Server-side sorting - happens only once during build/revalidation
const getBestSellers = () => {
  return [...products]
    .sort((a, b) => b.popularity * b.rating - a.popularity * a.rating)
    .slice(0, 8);
};

export default function Home() {
  const bestSellers = getBestSellers();

  return (
    <>
      <Navbar />
      {/* <MegaMenu /> */}
      <main>
        <HeroSlider />
        <PromoBanners />
        <Categories />
        <FeaturedProducts />
        <AdvertiseBanners />
        <BestSellersSection products={bestSellers} />
        <NewArrival />
        <CustomerGallery />
        <Testimonials />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
