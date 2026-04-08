import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "301 / 302 Redirect",
  type: "document",
  fields: [
    defineField({
      name: "fromPath",
      title: "From path",
      type: "string",
      description: "e.g. /old-service-page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "toPath",
      title: "To path or URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "statusCode",
      type: "number",
      initialValue: 301,
      options: { list: [301, 302] },
    }),
  ],
  preview: {
    select: { from: "fromPath", to: "toPath" },
    prepare({ from, to }) {
      return { title: `${from} → ${to}` };
    },
  },
});
