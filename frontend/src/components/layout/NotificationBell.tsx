"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOS = () => (window as any).OneSignal;

export function NotificationBell() {
  const [mounted, setMounted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [justSubscribed, setJustSubscribed] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) return;
    if (typeof Notification === "undefined") return;
    setMounted(true);

    const check = () => {
      const OS = getOS();
      if (OS?.User?.PushSubscription) {
        setSubscribed(!!OS.User.PushSubscription.optedIn);
        OS.User.PushSubscription.addEventListener("change", (e: any) => {
          setSubscribed(!!e.current.optedIn);
        });
      }
    };

    const t = setTimeout(check, 2000);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return <div className="w-8 h-8" />;

  async function toggle() {
    const OS = getOS();
    if (!OS) return;
    try {
      if (subscribed) {
        OS.User.PushSubscription.optOut();
        setSubscribed(false);
      } else {
        await OS.Notifications.requestPermission();
        await OS.User.PushSubscription.optIn();
        const opted = !!OS.User.PushSubscription.optedIn;
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
      {subscribed && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-surface-card" />
      )}
    </button>
  );
}
