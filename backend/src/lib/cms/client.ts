import { createClient, type SanityClient } from "@sanity/client";
import { cmsFetch } from "@/lib/cms/fetch";
import { isPrismaCmsEnabled } from "@/lib/cms/provider";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2024-01-01";

let _client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });
  }
  return _client;
}

async function sanityFetchNative<T>(
  query: string,
  params?: Record<string, string | number | boolean>,
): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;
  try {
    return params ? await client.fetch<T>(query, params) : await client.fetch<T>(query);
  } catch {
    return null;
  }
}

/** Unified CMS read — Prisma by default, Sanity when CMS_PROVIDER=sanity. */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, string | number | boolean>,
): Promise<T | null> {
  if (isPrismaCmsEnabled()) {
    try {
      const result = await cmsFetch<T>(query, params);
      if (result !== null) return result;
    } catch {
      return null;
    }
  }
  return sanityFetchNative<T>(query, params);
}
