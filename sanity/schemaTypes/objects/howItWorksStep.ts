import { defineField, defineType } from "sanity";

export const howItWorksStep = defineType({
  name: "howItWorksStep",
  title: "How it works step",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});
