"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

import { Product } from "@/data/products";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}

interface SavedItem {
  product: Product;
  size: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  size: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  couponCode?: string;
  status:
    | "processing"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "return-requested"
    | "refunded";
  trackingNumber?: string;
  createdAt: string;
  estimatedDelivery: string;
  statusHistory: { status: string; date: string; note: string }[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  helpful: number;
  notHelpful: number;
  votedBy: string[];
  createdAt: string;
}

export interface AppNotification {
  id: string;
  type: "order" | "promo" | "system";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

interface NotificationPrefs {
  email: boolean;
  sms: boolean;
  push: boolean;
  orderUpdates: boolean;
  promotions: boolean;
}

interface StoreContextType {
  cart: CartItem[];
  savedForLater: SavedItem[];
  wishlist: string[];

  addToCart: (product: Product, size: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;

  saveForLater: (productId: string, size: number) => void;
  moveToCart: (productId: string, size: number) => void;
  removeSaved: (productId: string) => void;

  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (product: Product) => void;

  cartTotal: number;
  cartCount: number;

  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  shippingMethod: string;
  setShippingMethod: (method: string) => void;
  shippingCost: number;
  taxAmount: number;
  orderTotal: number;

  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;

  orders: Order[];
  placeOrder: (paymentMethod: string) => Order;
  cancelOrder: (orderId: string) => void;
  requestReturn: (orderId: string, reason: string) => void;

  reviews: Review[];
  addReview: (
    review: Omit<
      Review,
      "id" | "helpful" | "notHelpful" | "votedBy" | "createdAt"
    >,
  ) => void;

  voteReview: (reviewId: string, helpful: boolean) => void;
  getProductReviews: (productId: string) => Review[];

  notifications: AppNotification[];
  notificationPrefs: NotificationPrefs;
  setNotificationPrefs: (prefs: NotificationPrefs) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  unreadCount: number;

  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  authLoading: boolean;

  login: (email: string, password: string) => Promise<{ error?: string }>;

  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ error?: string }>;

  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const COUPONS: Record<string, number> = {
  OMEGA10: 10,
  OMEGA20: 20,
  WELCOME15: 15,
  FLAT50: 50,
};

const SHIPPING_RATES: Record<
  string,
  { label: string; cost: number; days: string }
> = {
  standard: {
    label: "Standard Shipping",
    cost: 0,
    days: "5-7 business days",
  },

  express: {
    label: "Express Shipping",
    cost: 9.99,
    days: "2-3 business days",
  },

  overnight: {
    label: "Overnight Shipping",
    cost: 19.99,
    days: "Next business day",
  },
};

const TAX_RATE = 0.08;

export { SHIPPING_RATES };

const generateId = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

const addDays = (date: Date, days: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const SEED_REVIEWS: Review[] = [];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedForLater, setSavedForLater] = useState<SavedItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const [authLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [shippingMethod, setShippingMethod] = useState("standard");

  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);

  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);

  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>(
    {
      email: true,
      sms: false,
      push: true,
      orderUpdates: true,
      promotions: true,
    },
  );

  const addNotification = useCallback(
    (n: Omit<AppNotification, "id" | "read" | "createdAt">) => {
      const notif: AppNotification = {
        ...n,
        id: generateId(),
        read: false,
        createdAt: new Date().toISOString(),
      };

      setNotifications((prev) => [notif, ...prev]);
    },
    [],
  );

  const addToCart = useCallback((product: Product, size: number) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size,
      );

      if (existing) {
        toast.success("Updated quantity in cart");

        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }

      toast.success(`${product.name} added to cart`);

      return [...prev, { product, quantity: 1, size }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));

    toast.info("Removed from cart");
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId));

      return;
    }

    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }, []);

  const saveForLater = useCallback((productId: string, size: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);

      if (item) {
        setSavedForLater((s) => {
          if (s.find((si) => si.product.id === productId)) return s;

          return [...s, { product: item.product, size }];
        });

        toast.info("Saved for later");
      }

      return prev.filter((i) => i.product.id !== productId);
    });
  }, []);

  const moveToCart = useCallback(
    (productId: string, size: number) => {
      setSavedForLater((prev) => {
        const item = prev.find((i) => i.product.id === productId);

        if (item) addToCart(item.product, size);

        return prev.filter((i) => i.product.id !== productId);
      });
    },
    [addToCart],
  );

  const removeSaved = useCallback((productId: string) => {
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== productId));

    toast.info("Removed from saved items");
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const isOn = prev.includes(productId);

      const next = isOn
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      if (isOn) toast.info("Removed from wishlist");
      else toast.success("Added to wishlist");

      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const moveWishlistToCart = useCallback(
    (product: Product) => {
      addToCart(product, product.sizes[0]);

      setWishlist((prev) => prev.filter((id) => id !== product.id));

      toast.success(`${product.name} moved to cart`);
    },
    [addToCart],
  );

  const cartTotal = cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const shippingCostVal = SHIPPING_RATES[shippingMethod]?.cost || 0;

  const discountAmount = (cartTotal * couponDiscount) / 100;

  const subtotalAfterDiscount = cartTotal - discountAmount;

  const taxAmount = subtotalAfterDiscount * TAX_RATE;

  const orderTotalVal = subtotalAfterDiscount + shippingCostVal + taxAmount;

  const applyCoupon = useCallback((code: string) => {
    const upper = code.toUpperCase().trim();

    if (COUPONS[upper]) {
      setCouponCode(upper);

      setCouponDiscount(COUPONS[upper]);

      toast.success(`Coupon applied! ${COUPONS[upper]}% off`);

      return true;
    }

    toast.error("Invalid coupon code");

    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCouponCode("");
    setCouponDiscount(0);

    toast.info("Coupon removed");
  }, []);

  const placeOrder = useCallback(
    (paymentMethod: string): Order => {
      const now = new Date();

      const shippingDays =
        shippingMethod === "overnight"
          ? 1
          : shippingMethod === "express"
            ? 3
            : 7;

      const order: Order = {
        id: `ORD-${generateId()}`,

        items: cart.map((i) => ({
          product: i.product,
          quantity: i.quantity,
          size: i.size,
          price: i.product.price,
        })),

        shippingAddress: shippingAddress!,

        shippingMethod,

        paymentMethod,

        subtotal: cartTotal,

        discount: discountAmount,

        shippingCost: shippingCostVal,

        tax: taxAmount,

        total: orderTotalVal,

        couponCode: couponCode || undefined,

        status: "confirmed",

        trackingNumber: `TRK${generateId()}${generateId()}`,

        createdAt: now.toISOString(),

        estimatedDelivery: addDays(now, shippingDays),

        statusHistory: [
          {
            status: "processing",
            date: now.toISOString(),
            note: "Order received",
          },

          {
            status: "confirmed",
            date: now.toISOString(),
            note: "Payment confirmed",
          },
        ],
      };

      setOrders((prev) => [order, ...prev]);

      setCart([]);

      setCouponCode("");

      setCouponDiscount(0);

      addNotification({
        type: "order",
        title: "Order Confirmed!",
        message: `Your order ${order.id} has been confirmed.`,
      });

      toast.success("Order placed successfully!");

      return order;
    },
    [
      cart,
      shippingAddress,
      shippingMethod,
      cartTotal,
      discountAmount,
      shippingCostVal,
      taxAmount,
      orderTotalVal,
      couponCode,
      addNotification,
    ],
  );

  const cancelOrder = useCallback((orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;

        return {
          ...o,
          status: "cancelled",
        };
      }),
    );

    toast.info("Order cancelled");
  }, []);

  const requestReturn = useCallback((orderId: string, reason: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;

        return {
          ...o,
          status: "return-requested",
        };
      }),
    );

    toast.info(reason);
  }, []);

  const addReview = useCallback(
    (
      review: Omit<
        Review,
        "id" | "helpful" | "notHelpful" | "votedBy" | "createdAt"
      >,
    ) => {
      const newReview: Review = {
        ...review,
        id: `r-${generateId()}`,
        helpful: 0,
        notHelpful: 0,
        votedBy: [],
        createdAt: new Date().toISOString(),
      };

      setReviews((prev) => [newReview, ...prev]);

      toast.success("Review submitted!");
    },
    [],
  );

  const voteReview = useCallback(
    (reviewId: string, helpful: boolean) => {
      const voterId = user?.email || "anonymous";

      setReviews((prev) =>
        prev.map((r) => {
          if (r.id !== reviewId || r.votedBy.includes(voterId)) return r;

          return {
            ...r,
            helpful: helpful ? r.helpful + 1 : r.helpful,
            notHelpful: helpful ? r.notHelpful : r.notHelpful + 1,
            votedBy: [...r.votedBy, voterId],
          };
        }),
      );
    },
    [user],
  );

  const getProductReviews = useCallback(
    (productId: string) => reviews.filter((r) => r.productId === productId),
    [reviews],
  );

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const login = useCallback(async (email: string) => {
    setIsLoggedIn(true);

    setUser({
      name: email.split("@")[0],
      email,
    });

    toast.success("Welcome back!");

    return {};
  }, []);

  const register = useCallback(async (name: string, email: string) => {
    setIsLoggedIn(true);

    setUser({
      name,
      email,
    });

    toast.success("Account created!");

    return {};
  }, []);

  const loginWithGoogle = useCallback(async () => {
    toast.success("Google sign-in not implemented");
  }, []);

  const logout = useCallback(async () => {
    setIsLoggedIn(false);

    setUser(null);

    setWishlist([]);

    toast.info("Logged out");
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cart,
        savedForLater,
        wishlist,

        addToCart,
        removeFromCart,
        updateQuantity,

        saveForLater,
        moveToCart,
        removeSaved,

        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,

        cartTotal,
        cartCount,

        couponCode,
        couponDiscount,
        applyCoupon,
        removeCoupon,

        shippingMethod,
        setShippingMethod,

        shippingCost: shippingCostVal,

        taxAmount,

        orderTotal: orderTotalVal,

        shippingAddress,
        setShippingAddress,

        orders,
        placeOrder,
        cancelOrder,
        requestReturn,

        reviews,
        addReview,
        voteReview,
        getProductReviews,

        notifications,
        notificationPrefs,
        setNotificationPrefs,

        markNotificationRead,
        markAllNotificationsRead,

        unreadCount,

        isLoggedIn,
        user,
        authLoading,

        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);

  if (!ctx) {
    throw new Error("useStore must be inside StoreProvider");
  }

  return ctx;
};
