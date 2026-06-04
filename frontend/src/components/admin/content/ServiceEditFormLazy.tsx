"use client";

import dynamic from "next/dynamic";
import type { ServiceFormInitial } from "@/components/admin/content/ServiceEditForm";

const ServiceEditForm = dynamic(
  () => import("@/components/admin/content/ServiceEditForm").then((m) => m.ServiceEditForm),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[480px] animate-pulse rounded-card border border-border bg-surface/60"
        aria-label="Loading service editor"
      />
    ),
  },
);

export function ServiceEditFormLazy({
  initial,
  categories,
}: {
  initial: ServiceFormInitial;
  categories: { id: string; title: string; slug: string }[];
}) {
  return <ServiceEditForm initial={initial} categories={categories} />;
}
