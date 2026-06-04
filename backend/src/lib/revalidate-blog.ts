import { legacyPathWithTrailingSlash } from "@/lib/legacy-path";
import { revalidatePaths } from "@/lib/revalidate";

export async function revalidateBlogPaths(
  legacyPath: string | null | undefined,
  slug: string,
): Promise<void> {
  const paths = ["/blog"];
  if (legacyPath) {
    paths.push(legacyPath, legacyPathWithTrailingSlash(legacyPath));
  }
  paths.push(`/blog/${slug}`);
  await revalidatePaths(paths);
}
