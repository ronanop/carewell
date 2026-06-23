/**
 * Convert WordPress entry HTML to Portable Text blocks (server-side, cheerio).
 */
import * as cheerio from "cheerio";

let keyCounter = 0;

export function resetPortableKeys() {
  keyCounter = 0;
}

function ptKey(prefix = "k") {
  keyCounter += 1;
  return `${prefix}-${keyCounter}-${Math.random().toString(36).slice(2, 9)}`;
}

function textBlock(text, style = "normal", listItem) {
  const block = {
    _type: "block",
    _key: ptKey("b"),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: ptKey("s"), text, marks: [] }],
  };
  if (listItem) block.listItem = listItem;
  return block;
}

function parseInline($, el, markDefs) {
  const spans = [];

  function walk(node, marks) {
    if (node.type === "text") {
      const text = node.data ?? "";
      if (text) spans.push({ _type: "span", _key: ptKey("s"), text, marks: [...marks] });
      return;
    }
    if (node.type !== "tag") return;

    const tag = node.name?.toLowerCase();
    if (tag === "strong" || tag === "b") {
      $(node)
        .contents()
        .each((_, child) => walk(child, [...marks, "strong"]));
      return;
    }
    if (tag === "em" || tag === "i") {
      $(node)
        .contents()
        .each((_, child) => walk(child, [...marks, "em"]));
      return;
    }
    if (tag === "a") {
      const href = $(node).attr("href") ?? "#";
      const linkKey = ptKey("l");
      markDefs.push({ _key: linkKey, _type: "link", href });
      $(node)
        .contents()
        .each((_, child) => walk(child, [...marks, linkKey]));
      return;
    }
    $(node)
      .contents()
      .each((_, child) => walk(child, marks));
  }

  el.contents().each((_, child) => walk(child, []));
  if (!spans.length) spans.push({ _type: "span", _key: ptKey("s"), text: "", marks: [] });
  return spans;
}

function blockFromElement($, el, markDefs) {
  const tag = el.prop("tagName")?.toLowerCase();
  let style = "normal";
  if (tag === "h1" || tag === "h2") style = "h2";
  else if (tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6") style = "h3";
  else if (tag === "blockquote") style = "blockquote";
  else if (tag !== "p" && tag !== "div") return null;

  const text = el.text().replace(/\s+/g, " ").trim();
  if (!text) return null;

  return {
    _type: "block",
    _key: ptKey("b"),
    style,
    markDefs: [...markDefs],
    children: parseInline($, el, markDefs),
  };
}

function resolveImgSrc($, img) {
  const srcset = img.attr("srcset");
  if (srcset) {
    const parts = srcset.split(",").map((p) => p.trim().split(/\s+/)[0]).filter(Boolean);
    if (parts.length) return normalizeImageUrl(parts[parts.length - 1]);
  }
  const candidates = [
    img.attr("data-src"),
    img.attr("data-lazy-src"),
    img.attr("data-original"),
    img.attr("src"),
  ];
  for (const raw of candidates) {
    if (!raw || raw.startsWith("data:")) continue;
    const normalized = normalizeImageUrl(raw);
    if (normalized) return normalized;
  }
  return null;
}

function normalizeImageUrl(url) {
  if (!url?.trim()) return null;
  let u = url.trim();
  if (u.startsWith("//")) u = `https:${u}`;
  if (u.startsWith("/")) {
    const base =
      process.env.WORDPRESS_API_URL?.trim() ||
      process.env.SCRAPER_BASE_URL?.trim() ||
      "https://www.carewellmedicalcentre.com";
    return `${base.replace(/\/$/, "")}${u}`;
  }
  try {
    const parsed = new URL(u);
    if (parsed.hostname === "test.carewellmedicalcentre.com") {
      parsed.hostname = "www.carewellmedicalcentre.com";
      parsed.protocol = "https:";
      return parsed.toString();
    }
  } catch {
    return null;
  }
  return u;
}

function tableToBlock($, table) {
  const rows = [];
  table.find("tr").each((_, tr) => {
    const cells = $(tr)
      .find("th, td")
      .map((__, cell) => $(cell).text().replace(/\s+/g, " ").trim())
      .get()
      .filter(Boolean);
    if (cells.length) rows.push(cells.join(" | "));
  });
  if (!rows.length) return null;
  return textBlock(rows.join("\n"), "normal");
}

/**
 * @param {string | null | undefined} html
 * @param {{ resolveImage?: (url: string, alt: string) => Promise<{ url: string } | null> }} opts
 */
export async function htmlToPortableText(html, opts = {}) {
  const { resolveImage } = opts;
  if (!html?.trim()) return [];

  const $ = cheerio.load(`<div id="scrape-root">${html}</div>`, { decodeEntities: false });
  const out = [];
  const sharedMarkDefs = [];

  async function processNode(el) {
    const tag = el.prop("tagName")?.toLowerCase();
    if (!tag) return;

    if (tag === "img") {
      const src = resolveImgSrc($, el);
      const alt = el.attr("alt")?.trim() || "Image";
      if (src && resolveImage) {
        const resolved = await resolveImage(src, alt);
        if (resolved?.assetRef) {
          out.push({ _type: "image", _key: ptKey("img"), assetRef: resolved.assetRef, alt });
        } else if (resolved?.url) {
          out.push({ _type: "image", _key: ptKey("img"), url: resolved.url, alt });
        }
      } else if (src) {
        out.push({ _type: "image", _key: ptKey("img"), url: src, alt });
      }
      return;
    }

    if (tag === "figure") {
      const imgs = el.find("img");
      if (imgs.length > 0) {
        for (const img of imgs.toArray()) {
          await processNode($(img));
        }
        return;
      }
    }

    if (tag === "picture") {
      const img = el.find("img").first();
      if (img.length) {
        await processNode(img);
        return;
      }
    }

    if (tag === "ul") {
      for (const li of el.find(":scope > li").toArray()) {
        const block = blockFromElement($, $(li), sharedMarkDefs);
        if (block) {
          block.listItem = "bullet";
          out.push(block);
        }
      }
      return;
    }

    if (tag === "ol") {
      for (const li of el.find(":scope > li").toArray()) {
        const block = blockFromElement($, $(li), sharedMarkDefs);
        if (block) {
          block.listItem = "number";
          out.push(block);
        }
      }
      return;
    }

    if (tag === "table") {
      const block = tableToBlock($, el);
      if (block) out.push(block);
      return;
    }

    if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "h4" || tag === "h5" || tag === "h6" || tag === "blockquote") {
      const block = blockFromElement($, el, sharedMarkDefs);
      if (block) {
        if (tag === "h1") block.style = "h2";
        out.push(block);
      }
      return;
    }

    if (tag === "p") {
      if (el.find("img").length > 0) {
        for (const child of el.children().toArray()) {
          await processNode($(child));
        }
        const text = el
          .clone()
          .children("img")
          .remove()
          .end()
          .text()
          .replace(/\s+/g, " ")
          .trim();
        if (text) {
          out.push(textBlock(text, "normal"));
        }
        return;
      }
      const block = blockFromElement($, el, sharedMarkDefs);
      if (block) out.push(block);
      return;
    }

    if (tag === "div" || tag === "section" || tag === "article" || tag === "aside" || tag === "main" || tag === "header" || tag === "footer") {
      const children = el.children().toArray();
      if (children.length === 0) {
        const block = blockFromElement($, el, sharedMarkDefs);
        if (block) out.push(block);
        return;
      }
      for (const child of children) {
        await processNode($(child));
      }
      return;
    }

    if (el.children().length > 0) {
      for (const child of el.children().toArray()) {
        await processNode($(child));
      }
      return;
    }

    const leafText = el.text().replace(/\s+/g, " ").trim();
    if (leafText && ["span", "a", "strong", "em", "b", "i", "label", "dt", "dd", "summary", "figcaption"].includes(tag)) {
      out.push(textBlock(leafText, tag === "dt" ? "h3" : "normal"));
    }
  }

  const root = $("#scrape-root");
  const topChildren = root.children().toArray();
  if (topChildren.length === 0) {
    await processNode(root);
  } else {
    for (const child of topChildren) {
      await processNode($(child));
    }
  }

  return out.filter((b) => {
    if (b._type === "image") return Boolean(b.url || b.assetRef);
    const children = b.children ?? [];
    return children.some((c) => c.text?.trim().length > 0);
  });
}
