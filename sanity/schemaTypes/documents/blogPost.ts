import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Hair", value: "hair" },
          { title: "Vitiligo", value: "vitiligo" },
          { title: "Face", value: "face" },
          { title: "Body", value: "body" },
          { title: "Therapies", value: "therapies" },
          { title: "Anti-Aging", value: "anti-aging" },
          { title: "Hindi", value: "hindi" },
        ],
      },
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required() }],
    }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "updatedAt", type: "datetime" }),
    defineField({ name: "readTimeMinutes", type: "number" }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "midArticleCtaTitle", type: "string" }),
    defineField({ name: "midArticleCtaHref", type: "string" }),
    defineField({
      name: "clusterRole",
      type: "string",
      options: {
        list: [
          { title: "Standalone", value: "standalone" },
          { title: "Pillar", value: "pillar" },
          { title: "Cluster", value: "cluster" },
        ],
      },
    }),
    defineField({ name: "pillarPost", type: "reference", to: [{ type: "blogPost" }] }),
    defineField({ name: "linkedService", type: "reference", to: [{ type: "service" }] }),
    defineField({
      name: "relatedPosts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", media: "coverImage" } },
});
