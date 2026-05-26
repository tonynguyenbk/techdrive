"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import OneSignal from "react-onesignal";

export function NotificationBell() {
  const [mounted, setMounted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [justSubscribed, setJustSubscribed] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) return;
    if (typeof Notification === "undefined") return;
    setMounted(true);

    const t = setTimeout(() => {
      setSubscribed(!!OneSignal.User.PushSubscription.optedIn);
    }, 1500);

    OneSignal.User.PushSubscription.addEventListener("change", (event) => {
      setSubscribed(!!event.current.optedIn);
    });

    return () => clearTimeout(t);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  async function toggle() {
    try {
      if (subscribed) {
        OneSignal.User.PushSubscription.optOut();
        setSubscribed(false);
      } else {
        await OneSignal.Notifications.requestPermission();
        const opted = !!OneSignal.User.PushSubscription.optedIn;
        setSubscribed(opted);
        if (opted) {
          setJustSubscribed(true);
          setTimeout(() => setJustSubscribed(false), 1000);
        }
      }
    } catch {
      // dismissed
    }
  }

  const label = subscribed ? "Đang bật thông báo — click để tắt" : "Bật thông báo bài mới";

  return (
    <button
      onClick={toggle}
      className={[
        "relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer",
        subscribed
          ? "text-primary hover:bg-surface-card"
          : "text-text-muted hover:text-text-primary hover:bg-surface-card",
        justSubscribed ? "animate-bell-ring" : "",
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      <Bell size={18} className={subscribed ? "fill-current" : ""} />

      {/* Red dot when subscribed */}
      {subscribed && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-surface-card" />
      )}
    </button>
  );
}
