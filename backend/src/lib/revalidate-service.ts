import { legacyPathWithTrailingSlash } from "@/lib/legacy-path";
import { revalidatePaths } from "@/lib/revalidate";

export async function revalidateServicePaths(
  legacyPath: string | null | undefined,
  slug: string,
): Promise<void> {
  const paths = ["/"];
  if (legacyPath) {
    paths.push(legacyPath, legacyPathWithTrailingSlash(legacyPath));
  }
  paths.push("/services", `/services/${slug}`);
  await revalidatePaths(paths);
}
