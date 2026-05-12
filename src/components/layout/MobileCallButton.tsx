"use client";

import { trackEvent } from "@/lib/analytics";

export function MobileCallButton({ phone }: { phone?: string | null }) {
  if (!phone) return null;
  const tel = phone.replace(/\s/g, "");
  return (
    <a
      href={`tel:${tel}`}
      className="fixed bottom-4 left-4 z-40 flex h-12 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-white shadow-lg md:hidden"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      onClick={() => trackEvent("call_click", { source: "mobile-floating-call" })}
      aria-label="Call clinic"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.25 1.05z" />
      </svg>
      Call
    </a>
  );
}
