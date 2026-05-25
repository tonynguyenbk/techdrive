"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import OneSignal from "react-onesignal";

export function NotificationBell() {
  const [subscribed, setSubscribed] = useState(false);
  const [supported, setSupported] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) return;
    if (typeof Notification === "undefined") return;

    setSupported(true);

    OneSignal.User.PushSubscription.addEventListener("change", (event) => {
      setSubscribed(!!event.current.optedIn);
    });

    // Check current state
    const check = async () => {
      const optedIn = OneSignal.User.PushSubscription.optedIn;
      setSubscribed(!!optedIn);
    };
    // Small delay to let OneSignal finish initializing
    const t = setTimeout(check, 1000);
    return () => clearTimeout(t);
  }, []);

  if (!supported) return null;

  async function toggle() {
    if (loading) return;
    setLoading(true);
    try {
      if (subscribed) {
        await OneSignal.User.PushSubscription.optOut();
        setSubscribed(false);
      } else {
        await OneSignal.Notifications.requestPermission();
        const optedIn = OneSignal.User.PushSubscription.optedIn;
        setSubscribed(!!optedIn);
      }
    } catch {
      // User dismissed permission dialog — no action needed
    } finally {
      setLoading(false);
    }
  }

  const label = subscribed ? "Tắt thông báo" : "Bật thông báo bài mới";

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
      style={{
        color: subscribed ? "var(--color-primary)" : "var(--color-text-muted)",
      }}
      onMouseEnter={(e) => {
        if (!subscribed) (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-primary)";
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-surface-card)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = subscribed ? "var(--color-primary)" : "var(--color-text-muted)";
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
      }}
      aria-label={label}
      title={label}
    >
      {subscribed ? (
        <Bell size={17} className="fill-current" />
      ) : (
        <BellOff size={17} />
      )}
    </button>
  );
}
