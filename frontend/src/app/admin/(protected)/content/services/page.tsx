import { redirect } from "next/navigation";
import { ADMIN_SERVICE_PAGES } from "@/config/admin-content-routes";

export default function AdminLegacyServicesRedirect() {
  redirect(ADMIN_SERVICE_PAGES);
}
