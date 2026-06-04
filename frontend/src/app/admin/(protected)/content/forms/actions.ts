"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@carewell/backend/lib/db";

export async function updateSubmissionStatus(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "read", "archived"].includes(status)) return;

  await prisma.formSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/content/forms");
}
