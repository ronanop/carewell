"use client";

import type { ReactNode } from "react";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AdminSidebarNav } from "@/components/admin/AdminSidebarNav";
import type { AdminSession } from "@/types/admin-session";

export function AdminShell({
  session,
  children,
}: {
  session: AdminSession;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-navy text-white md:flex">
          <div className="border-b border-white/10 px-5 py-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-light/90">Operations</p>
            <h1 className="mt-1 font-heading text-lg font-bold">Care Well Admin</h1>
            <p className="mt-1 truncate text-xs text-white/70">{session.sub}</p>
          </div>
          <AdminSidebarNav />
          <div className="border-t border-white/10 p-3">
            <AdminLogoutButton className="w-full justify-center" />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border bg-white px-4 py-3 shadow-navbar md:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">Care Well Medical Centre</p>
              <p className="font-heading text-base font-semibold text-navy md:text-lg">Admin dashboard</p>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <AdminLogoutButton />
            </div>
          </header>
          <main className="flex-1 px-4 py-6 pb-24 md:px-8 md:py-8 md:pb-8">{children}</main>
        </div>
      </div>
      <AdminMobileNav />
    </div>
  );
}
