import { author } from "./documents/author";
import { blogPost } from "./documents/blogPost";
import { galleryItem } from "./documents/galleryItem";
import { hyperlocalPage } from "./documents/hyperlocalPage";
import { navigation } from "./documents/navigation";
import { redirect } from "./documents/redirect";
import { service } from "./documents/service";
import { serviceCategory } from "./documents/serviceCategory";
import { siteSettings } from "./documents/siteSettings";
import { testimonial } from "./documents/testimonial";
import { beforeAfterCase } from "./objects/beforeAfterCase";
import { blockContent } from "./objects/blockContent";
import { faqItem } from "./objects/faqItem";
import { howItWorksStep } from "./objects/howItWorksStep";
import { quickFact } from "./objects/quickFact";
import { seo } from "./objects/seo";

export const schemaTypes = [
  siteSettings,
  navigation,
  redirect,
  serviceCategory,
  service,
  blogPost,
  author,
  galleryItem,
  testimonial,
  hyperlocalPage,
  seo,
  quickFact,
  howItWorksStep,
  faqItem,
  beforeAfterCase,
  blockContent,
];
