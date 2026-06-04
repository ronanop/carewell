/**
 * Render (and similar hosts) run `next build` outside the private network.
 * Internal Postgres URLs (`@dpg-xxxx-a/`) only work at runtime on the same account.
 */
export function skipDatabaseAtBuildTime(): boolean {
  if (process.env.SKIP_DATABASE_BUILD === "1") return true;
  if (process.env.SKIP_DATABASE_BUILD === "0") return false;

  const lifecycle = process.env.npm_lifecycle_event;
  if (lifecycle !== "build") return false;

  const url = process.env.DATABASE_URL ?? "";
  if (!url) return false;

  // Internal Render hostname: user:pass@dpg-xxx-a/dbname (no .render.com)
  return /@dpg-[a-z0-9-]+([/:]|$)/i.test(url) && !/\.render\.com/i.test(url);
}
