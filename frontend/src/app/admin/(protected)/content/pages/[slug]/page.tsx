import { redirect } from "next/navigation";

/** Legacy URL → site page editor */
export default function AdminLegacyPageSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/admin/content/pages/site/${encodeURIComponent(params.slug)}`);
}
