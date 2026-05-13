import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Camera } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";
import type { Review } from "@/context/StoreContext";

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { getProductReviews, addReview, voteReview, user, isLoggedIn } =
    useStore();
  const reviews = getProductReviews(productId);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "helpful">("helpful");

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;
  const ratingDistribution = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: reviews.filter((rev) => Math.round(rev.rating) === r).length,
  }));

  const sorted = [...reviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleSubmit = () => {
    if (!title.trim() || !comment.trim()) return;
    addReview({
      productId,
      userName: user?.name || "Anonymous",
      rating,
      title,
      comment,
      images: [],
    });
    setShowForm(false);
    setTitle("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="mt-20">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        Reviews & Ratings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Rating summary */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-foreground">
              {avgRating.toFixed(1)}
            </p>
            <div className="flex items-center justify-center gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.round(avgRating)
                      ? "fill-copper text-copper"
                      : "text-border"
                  }
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="space-y-2">
            {ratingDistribution.map((r) => (
              <div key={r.stars} className="flex items-center gap-2 text-sm">
                <span className="w-3 text-muted-foreground">{r.stars}</span>
                <Star size={12} className="fill-copper text-copper" />
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-copper rounded-full transition-all"
                    style={{
                      width: `${reviews.length > 0 ? (r.count / reviews.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-6 text-right text-muted-foreground">
                  {r.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write review + sort */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-hero text-sm"
            >
              Write a Review
            </button>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "newest" | "helpful")
              }
              className="px-3 py-2 rounded-md border border-border bg-card text-foreground text-sm"
            >
              <option value="helpful">Most Helpful</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* Review form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-card rounded-lg border border-border p-6">
                  {!isLoggedIn && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Reviewing as guest. Sign in for your name to appear.
                    </p>
                  )}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Rating
                    </p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(s)}
                        >
                          <Star
                            size={24}
                            className={`transition-colors ${
                              s <= (hoverRating || rating)
                                ? "fill-copper text-copper"
                                : "text-border"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Title
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Summarize your experience"
                      className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Review
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with this product..."
                      rows={4}
                      className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="text-sm text-muted-foreground flex items-center gap-1 hover:text-foreground">
                      <Camera size={14} /> Add Photos
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="btn-hero text-sm"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews list */}
          {sorted.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No reviews yet. Be the first!
            </p>
          ) : (
            <div className="space-y-4">
              {sorted.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onVote={voteReview}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({
  review,
  onVote,
}: {
  review: Review;
  onVote: (id: string, helpful: boolean) => void;
}) => (
  <div className="bg-card rounded-lg border border-border p-5">
    <div className="flex items-start justify-between mb-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < review.rating ? "fill-copper text-copper" : "text-border"
                }
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            {review.title}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {review.userName} · {new Date(review.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
      {review.comment}
    </p>
    {review.images.length > 0 && (
      <div className="flex gap-2 mb-3">
        {review.images.map((img, i) => (
          <div
            key={i}
            className="w-16 h-16 rounded-md bg-secondary overflow-hidden"
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    )}
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <span>Was this helpful?</span>
      <button
        onClick={() => onVote(review.id, true)}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <ThumbsUp size={12} /> {review.helpful}
      </button>
      <button
        onClick={() => onVote(review.id, false)}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <ThumbsDown size={12} /> {review.notHelpful}
      </button>
    </div>
  </div>
);

export default ProductReviews;
