import type { AdminNavSection } from "@/config/admin-nav-types";

export type { AdminNavItem, AdminNavSection } from "@/config/admin-nav-types";

export const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", exact: true }],
  },
  {
    title: "Insights",
    items: [
      { href: "/admin/website", label: "Website stats", exact: true },
      { href: "/admin/seo", label: "SEO health", exact: true },
      { href: "/admin/sitemap", label: "Sitemap", exact: true },
    ],
  },
  {
    title: "Operations",
    items: [
      { href: "/admin/content/forms", label: "Form inbox", exact: true },
      { href: "/admin/leads", label: "Lead pipeline", exact: true },
      { href: "/admin/content/integrations", label: "Email & WhatsApp", exact: true },
      { href: "/admin/content/team", label: "Team login", exact: true },
    ],
  },
];
