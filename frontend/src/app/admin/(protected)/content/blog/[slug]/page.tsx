import { redirect } from "next/navigation";
import { ADMIN_POSTS } from "@/config/admin-content-routes";

export default function AdminLegacyBlogEditRedirect({ params }: { params: { slug: string } }) {
  redirect(`${ADMIN_POSTS}/${encodeURIComponent(params.slug)}`);
}
