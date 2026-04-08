"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MEGA_COLUMNS } from "@/lib/nav-fallback";
import { whatsappHref } from "@/lib/whatsapp";

export function HeaderClient({
  phone,
  whatsapp,
}: {
  phone?: string;
  whatsapp?: string;
}) {
  const pathname = usePathname() || "/";
  const transparent =
    pathname === "/" ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/treatments/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !transparent;

  return (
    <>
      <header
        className={clsx(
          "fixed left-0 right-0 z-50 transition-[background,box-shadow] duration-300",
          solid ? "bg-white shadow-md" : "bg-transparent",
        )}
        style={{ top: "var(--hello-bar-height, 0px)" }}
      >
        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-4 px-4 md:h-[70px] md:px-6">
          <Link
            href="/"
            className={clsx(
              "font-heading text-lg font-bold md:text-xl",
              solid ? "text-navy" : "text-white drop-shadow",
            )}
          >
            Care Well
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            <Link
              href="/"
              className={clsx(
                "text-sm font-medium hover:text-primary",
                solid ? "text-navy" : "text-white/95",
              )}
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
            >
              <button
                type="button"
                className={clsx(
                  "text-sm font-medium hover:text-primary",
                  solid ? "text-navy" : "text-white/95",
                )}
                aria-expanded={mega}
              >
                Services
              </button>
              {mega && (
                <div className="absolute left-1/2 top-full z-50 mt-2 w-[min(100vw-2rem,56rem)] -translate-x-1/2 rounded-xl border border-surface bg-white p-6 shadow-xl">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {MEGA_COLUMNS.map((col) => (
                      <div key={col.key}>
                        <p className="mb-3 font-heading text-sm font-bold text-navy">{col.title}</p>
                        <ul className="space-y-2">
                          {col.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                className="text-sm text-navy/80 hover:text-primary"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/blog"
              className={clsx("text-sm font-medium hover:text-primary", solid ? "text-navy" : "text-white/95")}
            >
              Blog
            </Link>
            <Link
              href="/gallery"
              className={clsx("text-sm font-medium hover:text-primary", solid ? "text-navy" : "text-white/95")}
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className={clsx("text-sm font-medium hover:text-primary", solid ? "text-navy" : "text-white/95")}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={clsx("text-sm font-medium hover:text-primary", solid ? "text-navy" : "text-white/95")}
            >
              Contact
            </Link>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            {whatsapp && (
              <a
                href={whatsappHref(whatsapp, "Hi, I want to book a consultation from the website.")}
                className={clsx(solid ? "text-teal hover:text-navy" : "text-white hover:text-teal")}
                aria-label="WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            )}
            <Button href="/book-consultation" variant="primary">
              Book Free Consultation
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy/15 lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[70] bg-navy lg:hidden">
          <div className="flex h-full flex-col bg-white">
            <div className="flex items-center justify-between border-b border-surface px-4 py-3">
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm font-semibold text-primary">
                  Call now
                </a>
              )}
              <button type="button" className="text-sm font-medium" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/blog" onClick={() => setOpen(false)}>
                Blog
              </Link>
              <Link href="/gallery" onClick={() => setOpen(false)}>
                Gallery
              </Link>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
              <Link href="/book-consultation" onClick={() => setOpen(false)}>
                Book consultation
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
