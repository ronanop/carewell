import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "care-well-studio",
  title: "Care Well Medical Centre",
  // Required when Studio is embedded at /studio (Next.js route); otherwise the
  // router treats "studio" as a tool name → "Tool not found: studio".
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    // Scheduled publishing: @sanity/scheduled-publishing conflicts with React 18 — use Sanity Cloud scheduling or manual publish dates.
    presentationTool({
      previewUrl: {
        initial: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        previewMode: {
          enable: "/api/draft",
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
