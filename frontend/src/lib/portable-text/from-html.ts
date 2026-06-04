import type { PortableTextBlock } from "@portabletext/types";
import { isPageSectionType } from "@/page-sections/registry";
import { ptKey } from "@/portable-text/keys";

type PtBlock = PortableTextBlock & {
  _key: string;
  _type: string;
  style?: string;
  listItem?: string;
  markDefs?: { _key: string; _type: string; href: string }[];
  children?: { _key: string; _type: string; text: string; marks: string[] }[];
};

type PtImage = {
  _key: string;
  _type: "image";
  url: string;
  alt: string;
};

type PtEmbedSection = {
  _key: string;
  _type: "embedSection";
  sectionType: string;
  serviceSlug?: string | null;
};

export function emptyPortableText(): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "empty-block",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "empty-span", text: "", marks: [] }],
    } as PortableTextBlock,
  ];
}

function parseInline(node: Node, markDefs: PtBlock["markDefs"]): PtBlock["children"] {
  const spans: NonNullable<PtBlock["children"]> = [];

  function walk(n: Node, marks: string[]) {
    if (n.nodeType === Node.TEXT_NODE) {
      const text = n.textContent ?? "";
      if (text) {
        spans.push({ _type: "span", _key: ptKey(), text, marks: [...marks] });
      }
      return;
    }
    if (n.nodeType !== Node.ELEMENT_NODE) return;
    const el = n as HTMLElement;
    const tag = el.tagName.toLowerCase();
    if (tag === "strong" || tag === "b") {
      el.childNodes.forEach((c) => walk(c, [...marks, "strong"]));
      return;
    }
    if (tag === "em" || tag === "i") {
      el.childNodes.forEach((c) => walk(c, [...marks, "em"]));
      return;
    }
    if (tag === "a") {
      const href = el.getAttribute("href") ?? "#";
      const linkKey = ptKey();
      markDefs!.push({ _key: linkKey, _type: "link", href });
      el.childNodes.forEach((c) => walk(c, [...marks, linkKey]));
      return;
    }
    el.childNodes.forEach((c) => walk(c, marks));
  }

  node.childNodes.forEach((c) => walk(c, []));
  if (!spans.length) {
    spans.push({ _type: "span", _key: ptKey(), text: "", marks: [] });
  }
  return spans;
}

function blockFromElement(el: HTMLElement, markDefs: PtBlock["markDefs"]): PtBlock | null {
  const tag = el.tagName.toLowerCase();
  let style = "normal";
  if (tag === "h2") style = "h2";
  else if (tag === "h3") style = "h3";
  else if (tag === "blockquote") style = "blockquote";
  else if (tag !== "p" && tag !== "div") return null;

  return {
    _type: "block",
    _key: ptKey(),
    style,
    markDefs: markDefs ?? [],
    children: parseInline(el, markDefs),
  };
}

/** Parse TipTap HTML output into Portable Text blocks for the database. */
export function htmlToPortableText(html: string): PortableTextBlock[] {
  if (typeof document === "undefined") return emptyPortableText();

  const doc = new DOMParser().parseFromString(html || "<p></p>", "text/html");
  const out: (PtBlock | PtImage | PtEmbedSection)[] = [];
  const sharedMarkDefs: PtBlock["markDefs"] = [];

  const bodyKids = Array.from(doc.body.childNodes);

  for (let i = 0; i < bodyKids.length; i++) {
    const node = bodyKids[i];
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (el.hasAttribute("data-embed-section")) {
      const sectionType = el.getAttribute("data-embed-section") ?? "pricing";
      const serviceSlug = el.getAttribute("data-service-slug") || null;
      if (isPageSectionType(sectionType)) {
        out.push({
          _type: "embedSection",
          _key: ptKey(),
          sectionType,
          serviceSlug,
        });
      }
      continue;
    }

    if (tag === "img") {
      out.push({
        _type: "image",
        _key: ptKey(),
        url: el.getAttribute("src") ?? "",
        alt: el.getAttribute("alt") ?? "Image",
      });
      continue;
    }

    if (tag === "figure" && el.querySelector("img")) {
      const img = el.querySelector("img")!;
      out.push({
        _type: "image",
        _key: ptKey(),
        url: img.getAttribute("src") ?? "",
        alt: img.getAttribute("alt") ?? "Image",
      });
      continue;
    }

    if (tag === "ul") {
      el.querySelectorAll(":scope > li").forEach((li) => {
        const block = blockFromElement(li as HTMLElement, sharedMarkDefs);
        if (block) {
          block.listItem = "bullet";
          block.markDefs = [...(sharedMarkDefs ?? [])];
          out.push(block);
        }
      });
      continue;
    }

    if (tag === "ol") {
      el.querySelectorAll(":scope > li").forEach((li) => {
        const block = blockFromElement(li as HTMLElement, sharedMarkDefs);
        if (block) {
          block.listItem = "number";
          block.markDefs = [...(sharedMarkDefs ?? [])];
          out.push(block);
        }
      });
      continue;
    }

    const block = blockFromElement(el, sharedMarkDefs);
    if (block) {
      block.markDefs = [...(sharedMarkDefs ?? [])];
      out.push(block);
    }
  }

  const cleaned = out.filter((b) => {
    if (b._type === "image") return Boolean((b as PtImage).url);
    if (b._type === "embedSection") return isPageSectionType((b as PtEmbedSection).sectionType);
    const children = (b as PtBlock).children ?? [];
    return children.some((c) => c.text.trim().length > 0);
  });

  return (cleaned.length ? cleaned : emptyPortableText()) as PortableTextBlock[];
}
