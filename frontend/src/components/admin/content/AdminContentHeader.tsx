import Link from "next/link";

export function AdminContentHeader({
  title,
  description,
  backHref,
  actions,
}: {
  title: string;
  description?: string;
  backHref?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      {backHref ? (
        <Link href={backHref} className="mb-2 inline-block text-sm text-primary hover:underline">
          ← Back
        </Link>
      ) : null}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">{title}</h1>
          {description ? <p className="mt-1 text-sm text-navy/70">{description}</p> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
    </div>
  );
}
