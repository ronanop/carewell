import { redirect } from "next/navigation";
import { ADMIN_SERVICE_PAGES } from "@/config/admin-content-routes";

export default function AdminLegacyServiceEditRedirect({ params }: { params: { id: string } }) {
  redirect(`${ADMIN_SERVICE_PAGES}/${params.id}`);
}
