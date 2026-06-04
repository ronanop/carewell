import type { PortableTextBlock } from "@portabletext/types";
import { PortableBody } from "@/components/content/PortableBody";
import { resolveEmbedSectionContext } from "@carewell/backend/lib/cms/embed-sections";

export async function RichContentBody({
  value,
}: {
  value: PortableTextBlock[] | null | undefined;
}) {
  if (!value?.length) return null;
  const embedContext = await resolveEmbedSectionContext(value);
  return <PortableBody value={value} embedContext={embedContext} />;
}
