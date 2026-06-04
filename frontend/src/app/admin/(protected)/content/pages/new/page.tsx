import { redirect } from "next/navigation";

export default function AdminLegacyNewPageRedirect() {
  redirect("/admin/content/pages/site/new");
}
