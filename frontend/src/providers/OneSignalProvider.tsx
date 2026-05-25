"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";

export function OneSignalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const appId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
    if (!appId) return;

    OneSignal.init({
      appId,
      serviceWorkerPath: "/OneSignalSDKWorker.js",
      notifyButton: { enable: false } as never,
      allowLocalhostAsSecureOrigin: process.env.NODE_ENV === "development",
    }).catch(() => {});
  }, []);

  return <>{children}</>;
}
