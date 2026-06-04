import type { ReactNode } from "react";

export function AdminPanel({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-card border border-border bg-white shadow-card">
      <div className="border-b border-border bg-surface/60 px-5 py-4">
        <h2 className="font-heading text-heading-sm text-navy">{title}</h2>
        {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
      </div>
      <div className="p-5">{children}</div>
      {footer ? <div className="border-t border-border bg-surface/40 px-5 py-3">{footer}</div> : null}
    </section>
  );
}
