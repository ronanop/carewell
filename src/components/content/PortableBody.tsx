import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage } from "@/lib/sanity-image";

const components: PortableTextComponents = {
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
      const src = urlForImage(value);
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
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] | null | undefined }) {
  if (!value?.length) return null;
  return (
    <div className="prose prose-lg max-w-none font-sans text-navy/90">
      <PortableText value={value} components={components} />
    </div>
  );
}
