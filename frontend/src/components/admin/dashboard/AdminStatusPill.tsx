import clsx from "clsx";

export function AdminStatusPill({
  status,
  label,
}: {
  status: "ok" | "warn" | "missing" | "neutral";
  label: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
        status === "ok" && "bg-success/10 text-success",
        status === "warn" && "bg-alert-light text-alert",
        status === "missing" && "bg-surface text-text-tertiary",
        status === "neutral" && "bg-primary-50 text-primary",
      )}
    >
      {label}
    </span>
  );
}
