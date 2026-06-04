/** Trigger Next.js on-demand revalidation (runs on the frontend app). */
export async function revalidatePaths(
  paths: string[],
  options?: { layout?: boolean },
): Promise<void> {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();
  if (!secret || paths.length === 0) return;

  const base =
    process.env.FRONTEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "http://localhost:3000";

  try {
    await fetch(new URL("/api/revalidate", base), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": secret,
      },
      body: JSON.stringify({ paths, layout: options?.layout }),
    });
  } catch {
    // Non-fatal when frontend is offline during local API-only work
  }
}
