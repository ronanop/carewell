import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", type: "string", initialValue: "Care Well Medical Centre" }),
    defineField({
      name: "heroImage",
      title: "Homepage hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", validation: (Rule) => Rule.required() }],
      description: "Large WebP-friendly photo; shown behind gradient. Keep file size small for LCP.",
    }),
    defineField({ name: "phone", type: "string", title: "Clinic phone" }),
    defineField({ name: "whatsappNumber", type: "string", description: "E.164 without +" }),
    defineField({ name: "address", type: "text", rows: 3 }),
    defineField({
      name: "mapEmbedUrl",
      type: "url",
      title: "Map embed URL",
      description:
        "Google Maps → Share → Embed a map → copy only the iframe src URL (https://www.google.com/maps/embed?…). Leave empty to use site default / env.",
    }),
    defineField({ name: "mbbsRegNo", type: "string", title: "MBBS registration number" }),
    defineField({ name: "medicalDisclaimer", type: "text", rows: 4 }),
    defineField({
      name: "helloBarMessages",
      type: "array",
      of: [{ type: "string" }],
      title: "Hello bar rotating messages",
    }),
    defineField({
      name: "trustBadges",
      title: "Trust badges marquee",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "seoFooterCities",
      title: "SEO footer city links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "city", type: "string", validation: (Rule) => Rule.required() },
            { name: "path", type: "string", validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({ name: "patientCounterLabel", type: "string", title: "Patient counter headline" }),
    defineField({ name: "patientCounterValue", type: "number", title: "Patients treated this month" }),
    defineField({ name: "gtmId", type: "string", title: "Google Tag Manager ID" }),
    defineField({ name: "ga4MeasurementId", type: "string" }),
    defineField({ name: "clarityProjectId", type: "string", title: "Microsoft Clarity ID" }),
    defineField({
      name: "hours",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "siteName" } },
});
