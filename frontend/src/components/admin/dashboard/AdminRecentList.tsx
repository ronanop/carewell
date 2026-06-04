import Link from "next/link";
import type { RecentDoc } from "@carewell/backend/lib/admin-stats-types";

export function AdminRecentList({
  items,
  hrefPrefix,
}: {
  items: RecentDoc[];
  hrefPrefix: "/services" | "/blog";
}) {
  if (items.length === 0) {
    return <p className="text-sm text-text-secondary">No recent updates in the database.</p>;
  }

  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={item.slug}>
          <Link
            href={`${hrefPrefix}/${item.slug}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-1 py-3 transition hover:text-primary first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm font-medium text-navy line-clamp-1">{item.title}</span>
            <span className="shrink-0 text-xs text-text-tertiary">
              {item.updatedAt
                ? new Date(item.updatedAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "—"}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
