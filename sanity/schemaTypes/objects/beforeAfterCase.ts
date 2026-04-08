import { defineField, defineType } from "sanity";

export const beforeAfterCase = defineType({
  name: "beforeAfterCase",
  title: "Before / After case",
  type: "object",
  fields: [
    defineField({
      name: "beforeImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "afterImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({ name: "patientInitials", type: "string" }),
    defineField({ name: "age", type: "number" }),
    defineField({
      name: "gender",
      type: "string",
      options: {
        list: [
          { title: "Female", value: "female" },
          { title: "Male", value: "male" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({ name: "monthsPostProcedure", type: "number" }),
    defineField({ name: "subtype", type: "string", title: "Filter tab label" }),
  ],
});
