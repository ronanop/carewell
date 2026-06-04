import type { ReactNode } from "react";
import clsx from "clsx";

export function AdminStatCard({
  label,
  value,
  hint,
  trend,
  icon,
  accent = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  trend?: { label: string; positive?: boolean };
  icon?: ReactNode;
  accent?: "default" | "teal" | "primary" | "warn";
}) {
  const accentBorder = {
    default: "border-border",
    teal: "border-teal/30",
    primary: "border-primary/25",
    warn: "border-alert/30",
  }[accent];

  const accentBg = {
    default: "bg-white",
    teal: "bg-gradient-to-br from-teal-light/80 to-white",
    primary: "bg-gradient-to-br from-primary-50/90 to-white",
    warn: "bg-gradient-to-br from-alert-light/60 to-white",
  }[accent];

  return (
    <div
      className={clsx(
        "rounded-card border p-5 shadow-card transition hover:shadow-card-hover",
        accentBorder,
        accentBg,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">{label}</p>
        {icon ? <span className="text-teal">{icon}</span> : null}
      </div>
      <p className="mt-2 font-heading text-3xl font-bold tabular-nums text-navy">{value}</p>
      {hint ? <p className="mt-1.5 text-sm text-text-secondary">{hint}</p> : null}
      {trend ? (
        <p
          className={clsx(
            "mt-2 text-xs font-semibold",
            trend.positive ? "text-success" : "text-text-tertiary",
          )}
        >
          {trend.label}
        </p>
      ) : null}
    </div>
  );
}
