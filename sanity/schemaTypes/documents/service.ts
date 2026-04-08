import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locale",
      type: "string",
      options: { list: [{ title: "English", value: "en" }, { title: "Hindi", value: "hi" }] },
      initialValue: "en",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
    }),
    defineField({
      name: "heroImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "quickFacts", type: "array", of: [{ type: "quickFact" }] }),
    defineField({ name: "whatIsBody", type: "blockContent", title: "What is [service] (350–450 words)" }),
    defineField({
      name: "whatIsIllustration",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required() }],
    }),
    defineField({
      name: "insightPoints",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(3).min(3),
    }),
    defineField({
      name: "howItWorksSteps",
      type: "array",
      of: [{ type: "howItWorksStep" }],
      validation: (Rule) => Rule.length(5),
    }),
    defineField({ name: "youtubeVideoId", type: "string", title: "YouTube video ID" }),
    defineField({ name: "beforeAfterCases", type: "array", of: [{ type: "beforeAfterCase" }] }),
    defineField({
      name: "candidateGood",
      type: "array",
      of: [{ type: "string" }],
      title: "Good candidate bullets",
    }),
    defineField({
      name: "candidatePoor",
      type: "array",
      of: [{ type: "string" }],
      title: "Not ideal candidate bullets",
    }),
    defineField({ name: "pricingFromInr", type: "number", title: "Starting from (INR)" }),
    defineField({ name: "pricingFactors", type: "array", of: [{ type: "string" }], validation: (Rule) => Rule.max(3) }),
    defineField({ name: "pricingEmiNote", type: "text", rows: 2 }),
    defineField({ name: "valueStack", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "faq",
      type: "array",
      of: [defineArrayMember({ type: "faqItem" })],
      validation: (Rule) => Rule.min(8),
    }),
    defineField({
      name: "relatedServices",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (Rule) => Rule.max(4).min(1),
    }),
    defineField({ name: "treatmentDropdownLabel", type: "string", description: "Pre-fill for lead forms" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", locale: "locale" }, prepare({ title, locale }) {
    return { title: `${title} (${locale || "en"})` };
  } },
});
