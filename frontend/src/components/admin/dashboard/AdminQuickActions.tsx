import Link from "next/link";
import { ExternalLink, FileSearch, Users } from "lucide-react";

const actions = [
  {
    href: "/admin/content/forms",
    label: "Form inbox",
    description: "View saved lead submissions",
    icon: Users,
    external: false,
  },
  {
    href: "/admin/leads",
    label: "Lead pipeline",
    description: "Notification channel status",
    icon: Users,
    external: false,
  },
  {
    href: "/admin/content/integrations",
    label: "Email & WhatsApp",
    description: "Notifications and webhooks",
    icon: FileSearch,
    external: false,
  },
  {
    href: "/admin/content/team",
    label: "Team",
    description: "Editor and admin accounts",
    icon: Users,
    external: false,
  },
  {
    href: "/admin/seo",
    label: "SEO health",
    description: "Meta gaps and deploy checks",
    icon: FileSearch,
    external: false,
  },
  {
    href: "/",
    label: "Live website",
    description: "Open homepage",
    icon: ExternalLink,
    external: true,
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
