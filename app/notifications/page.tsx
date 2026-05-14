"use client";

import { useStore } from "@/context/StoreContext";
import NavbarWrapper from "@/components/NavbarWrapper";

import Footer from "@/components/Footer";
import {
  Bell,
  BellOff,
  Check,
  Mail,
  MessageSquare,
  Smartphone,
  Package,
  Tag,
  Settings,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const Notifications = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadCount,
    notificationPrefs,
    setNotificationPrefs,
  } = useStore();
  const [showSettings, setShowSettings] = useState(false);

  const typeIcons: Record<string, React.ElementType> = {
    order: Package,
    promo: Tag,
    system: Bell,
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarWrapper />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-foreground">
              Notifications
            </h1>
            <p className="text-muted-foreground mt-1">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-primary font-medium hover:bg-primary/5 transition-colors"
              >
                <Check size={14} /> Mark all read
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <Settings size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <h3 className="font-semibold text-foreground mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Receive order updates and offers via email
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      email: !notificationPrefs.email,
                    })
                  }
                  className={`w-10 h-6 rounded-full transition-colors ${notificationPrefs.email ? "bg-primary" : "bg-secondary"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-card shadow transition-transform ${notificationPrefs.email ? "translate-x-5" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      SMS Notifications
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Get text messages for important updates
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      sms: !notificationPrefs.sms,
                    })
                  }
                  className={`w-10 h-6 rounded-full transition-colors ${notificationPrefs.sms ? "bg-primary" : "bg-secondary"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-card shadow transition-transform ${notificationPrefs.sms ? "translate-x-5" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Push Notifications
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Browser push notifications
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      push: !notificationPrefs.push,
                    })
                  }
                  className={`w-10 h-6 rounded-full transition-colors ${notificationPrefs.push ? "bg-primary" : "bg-secondary"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-card shadow transition-transform ${notificationPrefs.push ? "translate-x-5" : "translate-x-1"}`}
                  />
                </button>
              </div>

              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">Order Updates</p>
                  <button
                    onClick={() =>
                      setNotificationPrefs({
                        ...notificationPrefs,
                        orderUpdates: !notificationPrefs.orderUpdates,
                      })
                    }
                    className={`w-10 h-6 rounded-full transition-colors ${notificationPrefs.orderUpdates ? "bg-primary" : "bg-secondary"}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-card shadow transition-transform ${notificationPrefs.orderUpdates ? "translate-x-5" : "translate-x-1"}`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">Promotions & Offers</p>
                  <button
                    onClick={() =>
                      setNotificationPrefs({
                        ...notificationPrefs,
                        promotions: !notificationPrefs.promotions,
                      })
                    }
                    className={`w-10 h-6 rounded-full transition-colors ${notificationPrefs.promotions ? "bg-primary" : "bg-secondary"}`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-card shadow transition-transform ${notificationPrefs.promotions ? "translate-x-5" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications list */}
        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <BellOff size={48} className="mx-auto text-border mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => {
              const Icon = typeIcons[n.type] || Bell;
              return (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`flex gap-4 p-4 rounded-lg border transition-all cursor-pointer ${
                    n.read
                      ? "bg-card border-border"
                      : "bg-primary/5 border-primary/20"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      n.read ? "bg-secondary" : "bg-primary/10"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={
                        n.read ? "text-muted-foreground" : "text-primary"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium ${n.read ? "text-muted-foreground" : "text-foreground"}`}
                      >
                        {n.title}
                      </p>
                      {!n.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                    {n.link && (
                      <Link
                        href={n.link}
                        className="text-xs text-primary hover:underline mt-1 inline-block"
                      >
                        View details →
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
