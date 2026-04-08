import { defineField, defineType } from "sanity";

export const hyperlocalPage = defineType({
  name: "hyperlocalPage",
  title: "Hyperlocal area page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "areaName", type: "string" }),
    defineField({ name: "serviceFocus", type: "string" }),
    defineField({ name: "distanceFromClinic", type: "string" }),
    defineField({ name: "directions", type: "blockContent" }),
    defineField({ name: "body", type: "blockContent" }),
    defineField({ name: "linkedService", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
