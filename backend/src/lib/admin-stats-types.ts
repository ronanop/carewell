export type EnvCheck = {
  key: string;
  label: string;
  status: "ok" | "warn" | "missing";
  hint?: string;
};

export type RecentDoc = {
  title: string;
  slug: string;
  updatedAt: string;
};

export type SeoIssue = {
  type: "service" | "blog";
  title: string;
  slug: string;
  issue: string;
};
