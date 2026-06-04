import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { EmbedSectionRenderer } from "@/components/page-sections/EmbedSectionRenderer";
import { resolveImageUrl } from "@carewell/backend/lib/media-url";
import type { ResolvedEmbedSection } from "@carewell/backend/lib/cms/embed-sections";
import { isPageSectionType, pageSectionLabel, type PageSectionType } from "@/page-sections/registry";

function buildComponents(embedContext?: Record<string, ResolvedEmbedSection>): PortableTextComponents {
  return {
    block: {
      h2: ({ children, value }) => (
        <h2
          id={value?._key ? `section-${value._key}` : undefined}
          className="font-heading mt-10 scroll-mt-28 text-2xl font-bold text-navy"
        >
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-heading mt-8 text-xl font-bold text-navy">{children}</h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-teal bg-surface/80 py-2 pl-4 pr-2 text-navy/90">{children}</blockquote>
      ),
      normal: ({ children }) => <p className="mt-4 text-navy/90">{children}</p>,
    },
    list: {
      bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
      link: ({ value, children }) => (
        <a href={value?.href} className="text-primary underline underline-offset-2 hover:text-navy">
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        const src = resolveImageUrl(value);
        if (!src || !value?.alt) return null;
        return (
          <figure className="my-8">
            <Image
              src={src}
              alt={value.alt}
              width={800}
              height={500}
              className="h-auto w-full rounded-xl object-cover"
            />
          </figure>
        );
      },
      embedSection: ({ value }) => {
        const sectionType = value?.sectionType as string | undefined;
        if (!sectionType || !isPageSectionType(sectionType)) return null;
        const blockKey = value?._key as string | undefined;
        const resolved = blockKey ? embedContext?.[blockKey] : undefined;

        if (!embedContext) {
          return (
            <div className="my-8 rounded-xl border-2 border-dashed border-teal/35 bg-teal/5 px-4 py-8 text-center">
              <p className="text-sm font-semibold text-navy">{pageSectionLabel(sectionType)}</p>
              {value?.serviceSlug ? (
                <p className="mt-1 text-xs text-navy/60">Service data: {String(value.serviceSlug)}</p>
              ) : (
                <p className="mt-1 text-xs text-navy/60">Default section content on live site</p>
              )}
            </div>
          );
        }

        return (
          <EmbedSectionRenderer
            sectionType={sectionType as PageSectionType}
            resolved={resolved}
          />
        );
      },
    },
  };
}

export function PortableBody({
  value,
  embedContext,
}: {
  value: PortableTextBlock[] | null | undefined;
  embedContext?: Record<string, ResolvedEmbedSection>;
}) {
  if (!value?.length) return null;
  return (
    <div className="prose prose-lg max-w-none font-sans text-navy/90">
      <PortableText value={value} components={buildComponents(embedContext)} />
    </div>
  );
}
