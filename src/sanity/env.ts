export const apiVersion = "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export function assertSanityConfig(): void {
  if (!projectId) {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is not set. CMS content will be empty.");
  }
}
