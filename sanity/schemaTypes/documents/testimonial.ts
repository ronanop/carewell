import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4 }),
    defineField({ name: "attribution", type: "string" }),
    defineField({ name: "rating", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
