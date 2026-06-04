import Link from "next/link";
import {
  ExternalLink,
  FileSearch,
  LayoutGrid,
  Map,
  Newspaper,
  PenLine,
  Users,
} from "lucide-react";
import { ADMIN_PAGES_HUB, ADMIN_POSTS, ADMIN_SERVICE_PAGES } from "@/config/admin-content-routes";

const actions = [
  {
    href: "/admin/content/forms",
    label: "Form inbox",
    description: "View saved lead submissions",
    icon: Users,
    external: false,
  },
  {
    href: ADMIN_SERVICE_PAGES,
    label: "Service pages",
    description: "Treatments at /services/{slug}",
    icon: PenLine,
    external: false,
  },
  {
    href: ADMIN_POSTS,
    label: "Posts",
    description: "Blog articles at /blog/{slug}",
    icon: Newspaper,
    external: false,
  },
  {
    href: ADMIN_PAGES_HUB,
    label: "All pages",
    description: "Service pages and site pages",
    icon: PenLine,
    external: false,
  },
  {
    href: "/admin/content/media",
    label: "Media library",
    description: "Upload and manage images",
    icon: LayoutGrid,
    external: false,
  },
  {
    href: "/",
    label: "Live website",
    description: "Open homepage",
    icon: ExternalLink,
    external: true,
  },
  {
    href: "/admin/seo",
    label: "SEO health",
    description: "Meta gaps & deploy checks",
    icon: FileSearch,
    external: false,
  },
  {
    href: "/admin/content/integrations",
    label: "Email & WhatsApp",
    description: "Notifications and webhooks",
    icon: Map,
    external: false,
  },
  {
    href: "/admin/content/team",
    label: "Team",
    description: "Editor and admin accounts",
    icon: Users,
    external: false,
  },
] as const;

export function AdminQuickActions() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;
        const className =
          "group flex gap-4 rounded-card border border-border bg-white p-4 shadow-card transition hover:border-teal/40 hover:shadow-card-hover";

        const inner = (
          <>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-light text-teal group-hover:bg-teal group-hover:text-white">
              <Icon size={20} aria-hidden />
            </span>
            <span>
              <span className="font-heading text-sm font-semibold text-navy">{action.label}</span>
              <span className="mt-0.5 block text-xs text-text-secondary">{action.description}</span>
            </span>
          </>
        );

        if (action.external) {
          return (
            <a key={action.href} href={action.href} target="_blank" rel="noreferrer" className={className}>
              {inner}
            </a>
          );
        }

        return (
          <Link key={action.href} href={action.href} className={className}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
