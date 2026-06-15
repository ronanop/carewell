import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { LegacyBlogPage } from "@/components/blog/LegacyBlogPage";

import { LegacyServicePage } from "@/components/services/LegacyServicePage";

import {

  getBlogPostByLegacyPath,

  getServiceByLegacyPath,

  listLegacyBlogSitemapPaths,

  listLegacySitemapPaths,

} from "@carewell/backend/lib/cms/queries";

import {

  legacyPathWithTrailingSlash,

  normalizeLegacyPath,

} from "@carewell/backend/lib/legacy-path";

import { getSiteUrl } from "@carewell/backend/lib/site";
import { skipDatabaseAtBuildTime } from "@carewell/backend/lib/build-time-db";



export const revalidate = 60;



const RESERVED_PREFIXES = new Set([

  "admin",

  "api",

  "blog",

  "book-consultation",

  "cost-estimator",

  "gallery",

  "hi",

  "locations",

  "pages",

  "services",

  "skin-scan",

  "thank-you",

  "treatments",

  "_next",

]);



export async function generateStaticParams() {
  if (process.env.NODE_ENV === "development" || skipDatabaseAtBuildTime()) return [];

  try {
    const [services, blogs] = await Promise.all([
      listLegacySitemapPaths(),
      listLegacyBlogSitemapPaths(),
    ]);
    const paths = Array.from(new Set([...services, ...blogs])).filter((p) => p !== "/");
    return paths.map((legacyPath) => ({
      path: legacyPath.split("/").filter(Boolean),
    }));
  } catch {
    return [];
  }
}



export async function generateMetadata({

  params,

}: {

  params: Promise<{ path: string[] }>;

}): Promise<Metadata> {

  const segments = (await params).path ?? [];

  if (segments[0] && RESERVED_PREFIXES.has(segments[0])) return { title: "Care Well" };



  const legacyPath = normalizeLegacyPath(`/${segments.join("/")}`);
  const base = getSiteUrl();
  const canonical = `${base}${legacyPathWithTrailingSlash(legacyPath)}`;

  const post = await getBlogPostByLegacyPath(legacyPath);
  if (post) {
    const title = post.seo?.title ?? post.title ?? "Blog";
    return {
      title,
      description: post.seo?.description ?? post.excerpt ?? undefined,
      alternates: { canonical },
    };
  }

  const service = await getServiceByLegacyPath(legacyPath);
  if (service) {
    const title = service.seo?.title ?? `${service.title} in Delhi | Care Well`;
    return {
      title,
      description: service.seo?.description ?? undefined,
      alternates: { canonical },
    };
  }

  return { title: "Care Well Medical Centre" };
}



export default async function CatchAllLegacyPage({

  params,

}: {

  params: Promise<{ path: string[] }>;

}) {

  const segments = (await params).path ?? [];

  if (!segments.length) notFound();

  if (segments[0] && RESERVED_PREFIXES.has(segments[0])) notFound();



  const legacyPath = normalizeLegacyPath(`/${segments.join("/")}`);

  const post = await getBlogPostByLegacyPath(legacyPath);
  if (post) return <LegacyBlogPage legacyPath={legacyPath} />;

  const service = await getServiceByLegacyPath(legacyPath);
  if (service) return <LegacyServicePage legacyPath={legacyPath} />;

  return <LegacyBlogPage legacyPath={legacyPath} />;

}

