import {
  ADMIN_PAGES_HUB,
  ADMIN_POSTS,
  ADMIN_SERVICE_PAGES,
  ADMIN_SITE_PAGES,
} from "@/config/admin-content-routes";
import type { AdminNavSection } from "@/config/admin-nav-types";

export type { AdminNavItem, AdminNavSection } from "@/config/admin-nav-types";

/** Single source for admin sidebar labels (avoids SSR/client drift). */
export const ADMIN_GALLERY_NAV_LABEL = "Media and gallery";

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
    title: "Forms & team",
    items: [
      { href: "/admin/content/forms", label: "Form inbox", exact: true },
      { href: "/admin/content/integrations", label: "Email & WhatsApp", exact: true },
      { href: "/admin/content/team", label: "Team login", exact: true },
      { href: "/admin/leads", label: "Lead pipeline", exact: true },
    ],
  },
  {
    title: "Pages",
    items: [
      { href: ADMIN_PAGES_HUB, label: "All pages" },
      { href: ADMIN_SERVICE_PAGES, label: "Service pages" },
      { href: ADMIN_SITE_PAGES, label: "Site pages" },
    ],
  },
  {
    title: "Posts",
    items: [{ href: ADMIN_POSTS, label: "All posts" }],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/content/categories", label: "Categories", exact: true },
      { href: "/admin/content/gallery", label: ADMIN_GALLERY_NAV_LABEL, exact: true },
      { href: "/admin/content/testimonials", label: "Testimonials", exact: true },
      { href: "/admin/content/locations", label: "Locations", exact: true },
      { href: "/admin/content/navigation", label: "Navigation", exact: true },
      { href: "/admin/content/redirects", label: "Redirects", exact: true },
    ],
  },
  {
    title: "Site config",
    items: [
      { href: "/admin/content/settings", label: "Site settings", exact: true },
      { href: "/admin/content/seo", label: "Global SEO", exact: true },
    ],
  },
  {
    title: "Operations",
    items: [{ href: "/admin/scraper", label: "Scraper", exact: true }],
  },
];
