"use client";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const posts = [
  {
    id: "1",
    title: "The Art of Leather: How We Source Our Materials",
    excerpt: "A deep dive into our partnership with Italian tanneries and why premium leather makes all the difference.",
    category: "Craftsmanship",
    date: "Mar 5, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Spring/Summer 2026: What's Trending",
    excerpt: "From minimalist loafers to statement sneakers — our style guide for the upcoming season.",
    category: "Style Guide",
    date: "Feb 28, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Sustainability Report 2025: Our Progress",
    excerpt: "How we reduced our carbon footprint by 40% and our roadmap to becoming fully circular by 2030.",
    category: "Sustainability",
    date: "Feb 15, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Behind the Design: The Cloud Runner Pro",
    excerpt: "Our lead designer James Chen shares the 18-month journey from concept sketch to bestselling shoe.",
    category: "Behind the Scenes",
    date: "Feb 2, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "How to Care for Your Leather Shoes",
    excerpt: "Expert tips to keep your Omega shoes looking fresh for years — from cleaning to storage.",
    category: "Care Guide",
    date: "Jan 20, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Meet the Artisans: A Day in Our Workshop",
    excerpt: "Step inside our atelier and meet the skilled craftspeople who bring each pair of Omega shoes to life.",
    category: "Craftsmanship",
    date: "Jan 8, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=600&h=400&fit=crop",
  },
];

const categories = ["All", "Craftsmanship", "Style Guide", "Sustainability", "Behind the Scenes", "Care Guide"];

const Blog = () => {
  const featured = posts[0];

  return (
    <div className="min-h-screen bg-background">
      <NavbarWrapper />

      <section className="relative gradient-navy py-24 md:py-32">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-copper text-sm uppercase tracking-[0.3em] mb-4">The Journal</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Stories & Insights</h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto text-lg">Behind the scenes, style guides, and stories from the world of Omega.</p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button key={cat} className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured post */}
      <section className="container mx-auto px-4 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl border border-border overflow-hidden grid md:grid-cols-2">
          <div className="aspect-video md:aspect-auto">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-copper/10 text-copper text-xs font-semibold rounded-full">{featured.category}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={10} /> {featured.readTime}</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{featured.title}</h2>
            <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
            <p className="text-xs text-muted-foreground">{featured.date}</p>
          </div>
        </motion.div>
      </section>

      {/* Post grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border overflow-hidden group cursor-pointer hover:border-primary/50 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] px-2 py-0.5 bg-secondary rounded-full text-muted-foreground font-medium">{post.category}</span>
                  <span className="text-[10px] text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mt-4">{post.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
