import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string" }),
    defineField({ name: "answer", type: "text", rows: 4 }),
  ],
});
