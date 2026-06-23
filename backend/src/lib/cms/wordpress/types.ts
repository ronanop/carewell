export type WpYoastHeadJson = {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_image?: { url?: string; width?: number; height?: number; type?: string }[];
  robots?: { index?: string; follow?: string };
  schema?: { "@graph"?: WpSchemaNode[] };
  twitter_misc?: Record<string, string>;
};

export type WpSchemaNode = {
  "@type"?: string | string[];
  name?: string;
  acceptedAnswer?: { text?: string };
};

export type WpRenderedField = {
  rendered?: string;
  protected?: boolean;
};

export type WpContentItem = {
  id: number;
  slug: string;
  link: string;
  date?: string;
  modified?: string;
  title: WpRenderedField;
  content: WpRenderedField;
  excerpt: WpRenderedField;
  featured_media?: number;
  yoast_head_json?: WpYoastHeadJson;
};

export type WpPage = WpContentItem & {
  type?: "page";
  parent?: number;
  status?: string;
};

export type WpPost = WpContentItem & {
  type?: "post";
  categories?: number[];
};

export type WpIndexEntry = {
  id: number;
  kind: "page" | "post";
  slug: string;
};

export type WpLinkIndex = {
  builtAt: number;
  byPath: Map<string, WpIndexEntry>;
  pagePaths: string[];
  postPaths: string[];
};
