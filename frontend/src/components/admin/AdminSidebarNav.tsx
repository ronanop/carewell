"use client";

import Link from "next/link";
import { ADMIN_NAV_SECTIONS, type AdminNavItem } from "@/config/admin-nav";
import { useAdminNavActive } from "@/components/admin/useAdminNavActive";

function linkClass(active: boolean): string {
  return active
    ? "block rounded-button px-3 py-2 text-sm font-semibold text-white bg-white/15 transition"
    : "block rounded-button px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white";
}

function NavLink({ item }: { item: AdminNavItem }) {
  const active = useAdminNavActive(item.href, item.exact);

  return (
    <Link href={item.href} prefetch={false} className={linkClass(active)}>
      {item.label}
    </Link>
  );
}

export function AdminSidebarNav() {
  return (
    <nav className="flex flex-1 flex-col gap-5 overflow-y-auto p-3">
      {ADMIN_NAV_SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-white/45">
            {section.title}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-auto border-t border-white/10 pt-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className={linkClass(false)}
        >
          View website ↗
        </a>
      </div>
    </nav>
  );
}
