import * as Q from "@/lib/cms/queries";
import * as sanityQueries from "@/lib/cms/groq-queries";

function normalizeQuery(q: string): string {
  return q.replace(/\s+/g, " ").trim();
}

const CATEGORY_SLUGS_Q = normalizeQuery(
  `*[_type == "serviceCategory" && defined(slug.current)]{"slug":slug.current}`,
);
const BLOG_SLUGS_Q = normalizeQuery(
  `*[_type=="blogPost" && defined(slug.current)]{"slug":slug.current}`,
);

const adminStatsQuery = normalizeQuery(`{
  "servicesTotal": count(*[_type == "service"]),
  "servicesEn": count(*[_type == "service" && locale == "en"]),
  "servicesHi": count(*[_type == "service" && locale == "hi"]),
  "servicesMissingSeo": count(*[_type == "service" && (!defined(seo.title) || seo.title == "" || !defined(seo.description) || seo.description == "")]),
  "servicesMissingFaq": count(*[_type == "service" && count(faq) < 8]),
  "blogTotal": count(*[_type == "blogPost"]),
  "blogMissingSeo": count(*[_type == "blogPost" && (!defined(seo.title) || seo.title == "" || !defined(seo.description) || seo.description == "")]),
  "blogFeatured": count(*[_type == "blogPost" && featured == true]),
  "categories": count(*[_type == "serviceCategory"]),
  "gallery": count(*[_type == "galleryItem"]),
  "testimonials": count(*[_type == "testimonial"]),
  "hyperlocal": count(*[_type == "hyperlocalPage"]),
  "redirectsSanity": count(*[_type == "redirect"]),
  "recentServices": *[_type == "service"]|order(_updatedAt desc)[0...6]{
    title,
    "slug": slug.current,
    "_updatedAt": _updatedAt
  },
  "recentBlog": *[_type == "blogPost"]|order(_updatedAt desc)[0...5]{
    title,
    "slug": slug.current,
    "_updatedAt": _updatedAt
  },
  "byCategory": *[_type == "serviceCategory"]|order(title asc){
    title,
    "count": count(*[_type == "service" && references(^._id) && locale != "hi"])
  }
}`);

const seoIssuesQuery = normalizeQuery(`{
  "services": *[_type == "service" && locale != "hi" && (
    !defined(seo.title) || seo.title == "" ||
    !defined(seo.description) || seo.description == "" ||
    count(faq) < 8
  )]|order(title asc)[0...40]{
    title,
    "slug": slug.current,
    "hasSeoTitle": defined(seo.title) && seo.title != "",
    "hasSeoDesc": defined(seo.description) && seo.description != "",
    "faqCount": count(faq)
  },
  "blogs": *[_type == "blogPost" && (
    !defined(seo.title) || seo.title == "" ||
    !defined(seo.description) || seo.description == ""
  )]|order(title asc)[0...20]{
    title,
    "slug": slug.current,
    "hasSeoTitle": defined(seo.title) && seo.title != "",
    "hasSeoDesc": defined(seo.description) && seo.description != ""
  }
}`);

type Handler = (
  params?: Record<string, string | number | boolean>,
) => Promise<unknown>;

const QUERY_HANDLERS: Record<string, Handler> = {
  [normalizeQuery(sanityQueries.siteSettingsQuery)]: () => Q.getSiteSettings(),
  [normalizeQuery(sanityQueries.navigationQuery)]: () => Q.getNavigation(),
  [normalizeQuery(sanityQueries.redirectsQuery)]: async () => {
    const rows = await Q.getRedirects();
    return rows.map((r) => ({ from: r.fromPath, to: r.toPath, status: r.statusCode }));
  },
  [normalizeQuery(sanityQueries.servicesSlugsQuery)]: () => Q.getServiceSlugs(),
  [normalizeQuery(sanityQueries.serviceBySlugQuery)]: (params) =>
    Q.getServiceBySlug(String(params?.slug ?? "")),
  [normalizeQuery(sanityQueries.categoriesWithServicesQuery)]: () => Q.getCategoriesWithServices(),
  [normalizeQuery(sanityQueries.categoryBySlugQuery)]: (params) =>
    Q.getCategoryBySlug(String(params?.slug ?? "")),
  [normalizeQuery(sanityQueries.blogPostsListQuery)]: () => Q.getBlogPostsList(),
  [normalizeQuery(sanityQueries.blogPostBySlugQuery)]: (params) =>
    Q.getBlogPostBySlug(String(params?.slug ?? "")),
  [normalizeQuery(sanityQueries.galleryItemsQuery)]: () => Q.getGalleryItems(),
  [normalizeQuery(sanityQueries.testimonialsQuery)]: () => Q.getTestimonials(),
  [normalizeQuery(sanityQueries.hyperlocalSlugsQuery)]: () => Q.getHyperlocalSlugs(),
  [normalizeQuery(sanityQueries.hyperlocalBySlugQuery)]: (params) =>
    Q.getHyperlocalBySlug(String(params?.slug ?? "")),
  [CATEGORY_SLUGS_Q]: () => Q.getCategorySlugs(),
  [BLOG_SLUGS_Q]: () => Q.getBlogSlugs(),
  [adminStatsQuery]: () => Q.getAdminStats(),
  [seoIssuesQuery]: () => Q.getSeoIssues(),
};

export async function cmsFetch<T>(
  query: string,
  params?: Record<string, string | number | boolean>,
): Promise<T | null> {
  const handler = QUERY_HANDLERS[normalizeQuery(query)];
  if (!handler) return null;
  return (await handler(params)) as T;
}
