import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

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

export async function sanityFetch<T>(
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
