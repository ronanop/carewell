"use client";

import Link from "next/link";
import { useAdminNavActive } from "@/components/admin/useAdminNavActive";

const items = [
  { href: "/admin", label: "Home", exact: true },
  { href: "/admin/website", label: "Stats", exact: true },
  { href: "/admin/seo", label: "SEO", exact: true },
  { href: "/admin/content/forms", label: "Forms", exact: true },
  { href: "/admin/scraper", label: "Scraper", exact: true },
] as const;

function NavIcon({ name }: { name: (typeof items)[number]["label"] }) {
  const cls = "h-[18px] w-[18px]";
  switch (name) {
    case "Home":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" />
        </svg>
      );
    case "Stats":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "SEO":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "Forms":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
  }
}

function MobileNavLink({ item }: { item: (typeof items)[number] }) {
  const active = useAdminNavActive(item.href, item.exact);

  return (
    <Link
      href={item.href}
      prefetch={false}
      className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-2 text-[10px] font-semibold ${
        active ? "text-primary" : "text-text-tertiary"
      }`}
    >
      <NavIcon name={item.label} />
      {item.label}
    </Link>
  );
}

export function AdminMobileNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-white px-1 py-1 shadow-[0_-4px_20px_rgba(10,46,82,0.08)] md:hidden"
      aria-label="Admin navigation"
    >
      {items.map((item) => (
        <MobileNavLink key={item.href} item={item} />
      ))}
    </nav>
  );
}
