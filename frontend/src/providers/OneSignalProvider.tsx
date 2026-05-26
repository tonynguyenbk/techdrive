"use client";

import { useEffect } from "react";

export function OneSignalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (!appId || typeof window === "undefined") return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/OneSignalSDKWorker.js", { scope: "/" })
        .catch(() => {});
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.OneSignalDeferred = w.OneSignalDeferred || [];
    w.OneSignalDeferred.push(async (OneSignal: any) => {
      await OneSignal.init({
        appId,
        serviceWorkerPath: "/OneSignalSDKWorker.js",
        serviceWorkerParam: { scope: "/" },
        notifyButton: { enable: false },
      });
    });
  }, []);

  return <>{children}</>;
}
