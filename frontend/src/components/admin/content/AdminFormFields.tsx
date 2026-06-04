"use client";

export function AdminField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-navy">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full rounded-button border border-border bg-white px-3 py-2 text-sm text-navy";
export const textareaClass = `${inputClass} min-h-[88px]`;
export const selectClass = inputClass;
export const btnPrimary =
  "rounded-button bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60";
export const btnSecondary =
  "rounded-button border border-border bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-teal/40";
