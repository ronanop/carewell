import { defineField, defineType } from "sanity";

export const quickFact = defineType({
  name: "quickFact",
  title: "Quick fact",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "value", type: "string", title: "Value" }),
  ],
});
