import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required() }],
    }),
    defineField({ name: "credentials", type: "text", rows: 4 }),
    defineField({ name: "bio", type: "blockContent" }),
  ],
});
