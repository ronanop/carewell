import type { PortableTextBlock } from "@portabletext/types";

function blockPlainText(block: PortableTextBlock): string {
  const children = block.children as { text?: string }[] | undefined;
  return children?.map((c) => c.text ?? "").join("") ?? "";
}

/** H2 entries for table of contents / anchor links (uses Sanity block `_key` for stable ids). */
export function extractH2Sections(body: unknown): { id: string; text: string }[] {
  if (!Array.isArray(body)) return [];
  const out: { id: string; text: string }[] = [];
  for (const block of body) {
    const b = block as PortableTextBlock;
    if (b._type === "block" && b.style === "h2" && b._key) {
      out.push({ id: `section-${b._key}`, text: blockPlainText(b).trim() || "Section" });
    }
  }
  return out;
}
