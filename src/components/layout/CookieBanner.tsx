"use client";

import { useEffect, useState } from "react";

const KEY = "carewell-cookie-dismissed";

export function CookieBanner() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      setHidden(localStorage.getItem(KEY) === "1");
    } catch {
      setHidden(false);
    }
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] border-t border-surface bg-white/95 p-4 text-sm text-navy shadow-[0_-4px_20px_rgba(10,46,82,0.08)] backdrop-blur-sm md:left-auto md:right-4 md:bottom-4 md:max-w-md md:rounded-xl md:border"
      role="dialog"
      aria-label="Cookie notice"
    >
      <p className="text-navy/90">
        We use cookies and similar tools for analytics and site improvements. By continuing, you agree to their use where
        applicable.
      </p>
      <button
        type="button"
        className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
        onClick={() => {
          try {
            localStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
          setHidden(true);
        }}
      >
        Accept
      </button>
    </div>
  );
}
