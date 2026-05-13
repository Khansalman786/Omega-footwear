export default function Newsletter() {
  return (
    <>
      {/* Newsletter */}
      <section className="py-20 container mx-auto px-4">
        <div className="gradient-navy rounded-2xl p-12 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Stay in the Loop
          </h2>
          <p className="text-steel-light/70 mb-8 max-w-md mx-auto">
            Subscribe for early access to new collections, exclusive offers, and
            style inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50"
            />
            <button className="btn-hero bg-primary-foreground text-navy hover:bg-primary-foreground/90">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
