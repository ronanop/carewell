import { Node, mergeAttributes } from "@tiptap/core";
import { PAGE_SECTION_TYPES, type PageSectionType, isPageSectionType } from "@/page-sections/registry";

export const EmbedSectionExtension = Node.create({
  name: "embedSection",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      sectionType: {
        default: "pricing" as PageSectionType,
        parseHTML: (el) => {
          const raw = el.getAttribute("data-embed-section") ?? "pricing";
          return isPageSectionType(raw) ? raw : "pricing";
        },
      },
      serviceSlug: {
        default: null as string | null,
        parseHTML: (el) => el.getAttribute("data-service-slug") || null,
        renderHTML: (attrs) => (attrs.serviceSlug ? { "data-service-slug": attrs.serviceSlug } : {}),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-embed-section]" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const sectionType = node.attrs.sectionType as PageSectionType;
    const label = PAGE_SECTION_TYPES[sectionType]?.label ?? sectionType;
    const serviceSlug = node.attrs.serviceSlug as string | null;
    const serviceNote = serviceSlug ? ` · ${serviceSlug}` : "";

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-embed-section": sectionType,
        "data-service-slug": serviceSlug ?? "",
        class: "embed-section-chip",
        contenteditable: "false",
      }),
      `Section: ${label}${serviceNote}`,
    ];
  },
});

export type EmbedSectionAttrs = {
  sectionType: PageSectionType;
  serviceSlug?: string | null;
};
