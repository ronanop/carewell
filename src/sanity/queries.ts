export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const navigationQuery = `*[_type == "navigation"][0]`;

export const redirectsQuery = `*[_type == "redirect"]{ "from": fromPath, "to": toPath, "status": statusCode }`;

export const servicesSlugsQuery = `*[_type == "service" && defined(slug.current)]{ "slug": slug.current, "locale": locale }`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  ...,
  "slug": slug,
  category->{title, slug, megaMenuKey},
  relatedServices[]->{title, slug, treatmentDropdownLabel},
  "heroImageUrl": heroImage.asset->url,
  "whatIsIllustrationUrl": whatIsIllustration.asset->url,
  beforeAfterCases[]{
    ...,
    "beforeUrl": beforeImage.asset->url,
    "afterUrl": afterImage.asset->url
  },
  faq[]{question, answer},
  seo,
  "ogImageUrl": seo.ogImage.asset->url
}`;

export const categoriesWithServicesQuery = `*[_type == "serviceCategory"]|order(title asc){
  ...,
  "slug": slug.current,
  "services": *[_type == "service" && references(^._id)]|order(title asc){title, "slug": slug.current, treatmentDropdownLabel}
}`;

export const categoryBySlugQuery = `*[_type == "serviceCategory" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  "services": *[_type == "service" && references(^._id)]|order(title asc){title, "slug": slug.current, treatmentDropdownLabel},
  relatedBlogPosts[]->{
    title, "slug": slug.current, excerpt, publishedAt, readTimeMinutes,
    author->{name},
    "coverUrl": coverImage.asset->url
  },
  beforeAfterCases[]{
    ...,
    "beforeUrl": beforeImage.asset->url,
    "afterUrl": afterImage.asset->url
  },
  faq[]{question, answer},
  seo
}`;

export const blogPostsListQuery = `*[_type == "blogPost" && defined(slug.current)]|order(publishedAt desc){
  title, "slug": slug.current, category, excerpt, featured, publishedAt, readTimeMinutes,
  author->{name},
  "coverUrl": coverImage.asset->url
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  author->{name, credentials, image, "imageUrl": image.asset->url},
  relatedPosts[]->{title, "slug": slug.current, excerpt, "coverUrl": coverImage.asset->url},
  pillarPost->{title, "slug": slug.current},
  linkedService->{title, "slug": slug.current},
  "coverUrl": coverImage.asset->url,
  seo
}`;

export const galleryItemsQuery = `*[_type == "galleryItem"]|order(_createdAt desc){
  ...,
  "beforeUrl": beforeImage.asset->url,
  "afterUrl": afterImage.asset->url
}`;

export const testimonialsQuery = `*[_type == "testimonial"]|order(order asc){quote, attribution, rating}`;

export const hyperlocalSlugsQuery = `*[_type == "hyperlocalPage" && defined(slug.current)]{"slug": slug.current}`;

export const hyperlocalBySlugQuery = `*[_type == "hyperlocalPage" && slug.current == $slug][0]{
  ...,
  "slug": slug.current,
  linkedService->{title, "slug": slug.current},
  seo
}`;
