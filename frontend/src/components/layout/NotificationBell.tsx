"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import OneSignal from "react-onesignal";

export function NotificationBell() {
  const [mounted, setMounted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

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
        setSubscribed(!!OneSignal.User.PushSubscription.optedIn);
      }
    } catch {
      // dismissed
    }
  }

  const label = subscribed ? "Tắt thông báo" : "Bật thông báo bài mới";

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer text-text-muted hover:text-text-primary hover:bg-surface-card"
      aria-label={label}
      title={label}
    >
      {subscribed
        ? <Bell size={17} className="fill-current text-primary" />
        : <BellOff size={17} />}
    </button>
  );
}
