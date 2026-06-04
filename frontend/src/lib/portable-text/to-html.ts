import { toHTML } from "@portabletext/to-html";
import type { PortableTextBlock } from "@portabletext/types";

const htmlComponents = {
  types: {
    embedSection: ({
      value,
    }: {
      value: { sectionType?: string; serviceSlug?: string | null };
    }) => {
      const type = value?.sectionType ?? "pricing";
      const slug = value?.serviceSlug ?? "";
      return `<div data-embed-section="${escapeAttr(type)}" data-service-slug="${escapeAttr(slug)}"></div>`;
    },
    image: ({
      value,
    }: {
      value: { url?: string; alt?: string; asset?: { url?: string } };
    }) => {
      const src = value?.url ?? value?.asset?.url ?? "";
      const alt = value?.alt ?? "";
      if (!src) return "";
      return `<figure data-pt-image="1"><img src="${escapeAttr(src)}" alt="${escapeAttr(alt)}" /></figure>`;
    },
  },
  marks: {
    link: ({ children, value }: { children: string; value?: { href?: string } }) => {
      const href = value?.href ?? "#";
      return `<a href="${escapeAttr(href)}">${children}</a>`;
    },
  },
};

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

/** Convert stored Portable Text JSON to HTML for the visual editor. */
export function portableTextToHtml(value: unknown): string {
  const blocks = (Array.isArray(value) ? value : []) as PortableTextBlock[];
  if (!blocks.length) return "<p></p>";
  try {
    const html = toHTML(blocks, { components: htmlComponents });
    return html.trim() || "<p></p>";
  } catch {
    return "<p></p>";
  }
}
