import { defineField, defineType } from "sanity";

export const serviceCategory = defineType({
  name: "serviceCategory",
  title: "Service category (hub)",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "megaMenuKey", type: "string", description: "hair | skinVitiligo | face | body | therapies" }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroSubtitle", type: "text", rows: 2 }),
    defineField({ name: "intro", type: "blockContent" }),
    defineField({
      name: "comparisonRows",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "treatment", type: "string" },
            { name: "bestFor", type: "text", rows: 2 },
            { name: "downtime", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "faq", type: "array", of: [{ type: "faqItem" }] }),
    defineField({
      name: "relatedBlogPosts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "blogPost" }] }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({ name: "beforeAfterCases", type: "array", of: [{ type: "beforeAfterCase" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title" } },
});
