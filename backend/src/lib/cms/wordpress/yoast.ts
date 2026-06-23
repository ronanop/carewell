import type { WpSchemaNode, WpYoastHeadJson } from "@/lib/cms/wordpress/types";

export function extractFaqsFromYoast(yoast?: WpYoastHeadJson): { question: string; answer: string }[] {
  const graph = yoast?.schema?.["@graph"];
  if (!Array.isArray(graph)) return [];

  return graph
    .filter((node): node is WpSchemaNode => {
      if (!node || typeof node !== "object") return false;
      const t = node["@type"];
      if (t === "Question") return true;
      return Array.isArray(t) && t.includes("Question");
    })
    .map((node) => ({
      question: String(node.name ?? "").trim(),
      answer: String(node.acceptedAnswer?.text ?? "").trim(),
    }))
    .filter((f) => f.question.length > 0);
}

export function mapYoastToSeo(yoast?: WpYoastHeadJson) {
  if (!yoast) return undefined;
  const title = yoast.title?.trim();
  const description = yoast.description?.trim();
  const ogImageUrl = yoast.og_image?.[0]?.url;
  if (!title && !description && !yoast.canonical && !ogImageUrl) return undefined;

  const noindex = yoast.robots?.index === "noindex";

  return {
    title: title || undefined,
    description: description || undefined,
    canonicalUrl: yoast.canonical || undefined,
    ogTitle: yoast.og_title || undefined,
    ogDescription: yoast.og_description || undefined,
    ogImageUrl: ogImageUrl || undefined,
    noindex,
  };
}

export function readTimeFromYoast(yoast?: WpYoastHeadJson): number | undefined {
  const raw = yoast?.twitter_misc?.["Est. reading time"];
  if (!raw) return undefined;
  const match = raw.match(/(\d+)/);
  return match ? Number(match[1]) : undefined;
}
