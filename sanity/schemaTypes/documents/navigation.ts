import { defineArrayMember, defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Main navigation",
      readOnly: true,
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "string" },
            { name: "isMega", type: "boolean", title: "Opens mega menu" },
          ],
        }),
      ],
    }),
    defineField({
      name: "footerColumns",
      type: "array",
      title: "Footer quick links columns",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "heading", type: "string" },
            {
              name: "links",
              type: "array",
              of: [{ type: "object", fields: [{ name: "label", type: "string" }, { name: "href", type: "string" }] }],
            },
          ],
        }),
      ],
    }),
  ],
});
