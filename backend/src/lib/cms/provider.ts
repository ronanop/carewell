export type CmsProvider = "prisma" | "sanity";

export function getCmsProvider(): CmsProvider {
  const v = (process.env.CMS_PROVIDER ?? "prisma").toLowerCase();
  return v === "sanity" ? "sanity" : "prisma";
}

export function isPrismaCmsEnabled(): boolean {
  return getCmsProvider() === "prisma" && Boolean(process.env.DATABASE_URL);
}

/** @deprecated Use isPrismaCmsEnabled */
export const usePrismaCms = isPrismaCmsEnabled;
