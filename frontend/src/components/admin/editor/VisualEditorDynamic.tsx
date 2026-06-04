"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const VisualEditorInner = dynamic(
  () => import("@/components/admin/editor/VisualEditor").then((m) => ({ default: m.VisualEditor })),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[320px] animate-pulse rounded-card border border-border bg-surface"
        aria-label="Loading editor"
      />
    ),
  },
);

export function VisualEditorDynamic(props: ComponentProps<typeof VisualEditorInner>) {
  return <VisualEditorInner {...props} />;
}
