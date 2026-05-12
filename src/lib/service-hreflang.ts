/**
 * Builds en-IN / hi-IN alternate URLs for service pages.
 * Prefer linked `alternateLocaleService` in Sanity; otherwise use `-hi` suffix convention for Hindi fallback.
 */
export function serviceLanguageAlternates(
  baseUrl: string,
  currentLocale: string | undefined,
  currentSlug: string,
  alternate: { slug?: { current?: string } } | null | undefined,
): Record<string, string> {
  const loc = currentLocale === "hi" ? "hi" : "en";
  let enSlug: string;
  let hiSlug: string;
  if (loc === "en") {
    enSlug = currentSlug;
    hiSlug = alternate?.slug?.current ?? `${currentSlug}-hi`;
  } else {
    hiSlug = currentSlug;
    const fromAlt = alternate?.slug?.current;
    enSlug = fromAlt ?? (currentSlug.endsWith("-hi") ? currentSlug.replace(/-hi$/, "") : currentSlug);
  }
  return {
    "en-IN": `${baseUrl}/services/${enSlug}`,
    "hi-IN": `${baseUrl}/hi/services/${hiSlug}`,
  };
}
