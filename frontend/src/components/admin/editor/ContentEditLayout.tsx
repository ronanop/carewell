"use client";

import type { ReactNode } from "react";

/** Two-column CMS layout: main editor + settings sidebar. */
export function ContentEditLayout({
  main,
  sidebar,
  actions,
}: {
  main: ReactNode;
  sidebar: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="space-y-6">
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">{main}</div>
        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">{sidebar}</aside>
      </div>
    </div>
  );
}

export function SidebarPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-3 rounded-card border border-border bg-white p-4 shadow-sm">
      <legend className="px-1 text-sm font-semibold text-navy">{title}</legend>
      {children}
    </fieldset>
  );
}
