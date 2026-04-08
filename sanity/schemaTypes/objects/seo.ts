import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title tag",
      type: "string",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(155).warning("Keep under ~155 characters"),
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL override",
      type: "url",
    }),
    defineField({
      name: "ogTitle",
      title: "OG title",
      type: "string",
    }),
    defineField({
      name: "ogDescription",
      title: "OG description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ogImage",
      title: "OG image (1200×630)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "alternateDoc",
      title: "Alternate language page (hreflang)",
      type: "reference",
      to: [{ type: "service" }, { type: "blogPost" }, { type: "hyperlocalPage" }],
    }),
  ],
});
