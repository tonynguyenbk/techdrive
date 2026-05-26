"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export function OneSignalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (!appId || typeof window === "undefined") return;

    // Register service worker explicitly before OneSignal init
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/OneSignalSDKWorker.js", { scope: "/" })
        .catch(() => {});
    }

    OneSignal.init({
      appId,
      serviceWorkerPath: "/OneSignalSDKWorker.js",
      serviceWorkerParam: { scope: "/" },
      notifyButton: { enable: false } as never,
      allowLocalhostAsSecureOrigin: process.env.NODE_ENV === "development",
    } as never).catch(() => {});
  }, []);

  return <>{children}</>;
}
