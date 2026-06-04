import Link from "next/link";
import { FileText, Layers } from "lucide-react";
import { AdminContentHeader } from "@/components/admin/content/AdminContentHeader";
import { ADMIN_SERVICE_PAGES, ADMIN_SITE_PAGES } from "@/config/admin-content-routes";
import { listServicesForAdmin } from "@carewell/backend/lib/cms/queries";
import { prisma } from "@carewell/backend/lib/db";

export default async function AdminPagesHubPage() {
  const [services, sitePageCount] = await Promise.all([
    listServicesForAdmin(),
    prisma.page.count(),
  ]);

  const cards = [
    {
      href: ADMIN_SERVICE_PAGES,
      title: "Service pages",
      description: "Legacy SEO paths (e.g. /hair-transplant-in-delhi/fue/) — no /services/ prefix.",
      count: services.length,
      icon: Layers,
    },
    {
      href: ADMIN_SITE_PAGES,
      title: "Site pages",
      description: "About, privacy, and other static pages at /pages/{slug}.",
      count: sitePageCount,
      icon: FileText,
    },
  ] as const;

  return (
    <div>
      <AdminContentHeader
        title="Pages"
        description="Manage service pages and static site pages. Blog content lives under Posts."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-card border border-border bg-white p-6 shadow-card transition hover:border-teal/40 hover:shadow-card-hover"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-light text-teal group-hover:bg-teal group-hover:text-white">
                <Icon size={22} aria-hidden />
              </span>
              <h2 className="mt-4 font-heading text-lg font-bold text-navy">{card.title}</h2>
              <p className="mt-1 text-sm text-navy/70">{card.description}</p>
              <p className="mt-3 text-sm font-semibold text-primary">
                {card.count} {card.count === 1 ? "page" : "pages"} →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
