import type { PortableTextBlock } from "@portabletext/types";

function blockPlainText(block: PortableTextBlock): string {
  const children = block.children as { text?: string }[] | undefined;
  return children?.map((c) => c.text ?? "").join("") ?? "";
}

/** H2/H3 entries for blog table of contents (matches WordPress section headings). */
export function extractH2Sections(body: unknown): { id: string; text: string; level: 2 | 3 }[] {
  if (!Array.isArray(body)) return [];
  const out: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const block of body) {
    const b = block as PortableTextBlock;
    if (b._type === "block" && (b.style === "h2" || b.style === "h3") && b._key) {
      const text = blockPlainText(b).trim();
      if (text) {
        out.push({
          id: `section-${b._key}`,
          text,
          level: b.style === "h3" ? 3 : 2,
        });
      }
    }
  }
  return out;
}
