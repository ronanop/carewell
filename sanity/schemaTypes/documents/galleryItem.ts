import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Hair", value: "hair" },
          { title: "Face", value: "face" },
          { title: "Body", value: "body" },
          { title: "Skin", value: "skin" },
          { title: "Vitiligo", value: "vitiligo" },
        ],
      },
    }),
    defineField({
      name: "beforeImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required() }],
    }),
    defineField({
      name: "afterImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required() }],
    }),
    defineField({ name: "treatmentDetail", type: "text", rows: 3 }),
    defineField({ name: "consentOnFile", type: "boolean", initialValue: true }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
