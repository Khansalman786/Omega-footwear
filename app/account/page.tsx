"use client";

import { useNavigate, Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { User, Package, Heart, LogOut, Bell, Settings } from "lucide-react";

const Account = () => {
  const { user, isLoggedIn, logout, orders, unreadCount } = useStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User size={28} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">{user?.name}</h3>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>

          <Link
            to="/orders"
            className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
          >
            <Package size={28} className="text-primary mb-4" />
            <h3 className="font-semibold text-foreground">Orders</h3>
            <p className="text-sm text-muted-foreground">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
          </Link>

          <Link
            to="/wishlist"
            className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
          >
            <Heart size={28} className="text-primary mb-4" />
            <h3 className="font-semibold text-foreground">Wishlist</h3>
            <p className="text-sm text-muted-foreground">View saved items</p>
          </Link>

          <Link
            to="/notifications"
            className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors relative"
          >
            <Bell size={28} className="text-primary mb-4" />
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
            {unreadCount > 0 && (
              <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-destructive" />
            )}
          </Link>
        </div>

        <button
          onClick={async () => { await logout(); navigate("/"); }}
          className="mt-8 flex items-center gap-2 text-destructive hover:text-destructive/80 font-medium text-sm"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Account;
