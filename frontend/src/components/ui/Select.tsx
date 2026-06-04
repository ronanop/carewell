import clsx from "clsx";

export function Select({
  label,
  error,
  children,
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-text-secondary">{label}</span>
      <select
        {...props}
        className={clsx(
          "h-12 w-full rounded-button border px-4 text-base outline-none transition",
          error
            ? "border-red-500"
            : "border-[var(--color-border)] focus:border-primary focus:ring-2 focus:ring-primary/20",
          className,
        )}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-sm text-red-600">{error}</span>}
    </label>
  );
}
