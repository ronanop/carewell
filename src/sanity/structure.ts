import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("SEO: Missing title or description")
        .child(
          S.documentList()
            .title("Documents")
            .filter(
              `_type in ["service", "blogPost", "hyperlocalPage", "serviceCategory"] && (!defined(seo) || !defined(seo.title) || seo.title == "" || !defined(seo.description) || seo.description == "")`,
            )
            .defaultOrdering([{ field: "_updatedAt", direction: "desc" }]),
        ),
      S.divider(),
      ...S.documentTypeListItems(),
    ]);
