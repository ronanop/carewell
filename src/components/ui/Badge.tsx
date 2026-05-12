import clsx from "clsx";

const variants = {
  default: "bg-primary-light text-primary",
  success: "bg-[var(--color-success-light)] text-[var(--color-success)]",
  alert: "bg-alert-light text-alert",
  teal: "bg-teal-light text-teal",
} as const;

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-overline uppercase",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
