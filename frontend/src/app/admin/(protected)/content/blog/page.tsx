import { redirect } from "next/navigation";
import { ADMIN_POSTS } from "@/config/admin-content-routes";

export default function AdminLegacyBlogRedirect() {
  redirect(ADMIN_POSTS);
}
