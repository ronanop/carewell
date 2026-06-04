"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackEvent } from "@carewell/backend/lib/analytics";
import { pageAwareWhatsappMessage, whatsappHref } from "@carewell/backend/lib/whatsapp";

// Pages that render their own bottom action bar — hide the floating bubble on mobile for these
const SERVICE_PATTERNS = [/^\/services\//, /^\/treatments\//, /^\/hi\/services\//];

export function WhatsAppBubble({ number }: { number?: string | null }) {
  const pathname = usePathname() || "/";
  const digits = number?.replace(/\D/g, "") ?? "";
  if (!digits) return null;

  const href = whatsappHref(number!, pageAwareWhatsappMessage(pathname));

  // On mobile these pages have a dedicated 3-button bar; float bubble would overlap it
  const hasOwnBar = SERVICE_PATTERNS.some((p) => p.test(pathname));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-[95] inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-lg transition-transform duration-hover hover:scale-105 md:bottom-8 md:right-8 ${
        hasOwnBar ? "hidden md:inline-flex" : "bottom-4 right-4"
      }`}
      aria-label="WhatsApp"
      style={hasOwnBar ? undefined : { bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      onClick={() => trackEvent("whatsapp_click", { source: "floating-bubble", pathname })}
    >
      <Image
        src="/whatsapp-icon-custom.png"
        alt=""
        width={48}
        height={48}
        sizes="48px"
        className="h-12 w-12 object-cover"
        priority
      />
    </a>
  );
}
