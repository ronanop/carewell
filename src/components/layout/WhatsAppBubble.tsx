"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { pageAwareWhatsappMessage, whatsappHref } from "@/lib/whatsapp";

export function WhatsAppBubble({ number }: { number?: string | null }) {
  const pathname = usePathname() || "/";
  if (!number) return null;
  const href = whatsappHref(number, pageAwareWhatsappMessage(pathname));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-lg transition-transform duration-hover hover:scale-105 md:bottom-8 md:right-8"
      aria-label="WhatsApp"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      onClick={() => trackEvent("whatsapp_click", { source: "floating-bubble", pathname })}
    >
      <Image
        src="/whatsapp-icon-custom.png"
        alt="WhatsApp"
        fill
        sizes="48px"
        className="object-cover"
      />
    </a>
  );
}
