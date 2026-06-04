import { isErrorResponse } from "@/lib/http";
import { hash } from "bcryptjs";
import { requireAdminApi } from "@/lib/require-admin-api";
import { createAdminUser, updateAdminUser } from "@/lib/cms/admin-write";
import { prisma } from "@/lib/db";

export async function GET() {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      active: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });
  return Response.json({ ok: true, users });
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;

  const { email, name, password, role } = await req.json();
  if (!email?.trim() || !name?.trim() || !password?.trim()) {
    return Response.json({ ok: false, error: "email, name, password required" }, { status: 400 });
  }

  const passwordHash = await hash(password, 12);
  try {
    const user = await createAdminUser({
      email,
      name,
      passwordHash,
      role: role === "admin" ? "admin" : "editor",
    });
    return Response.json({ ok: true, id: user.id });
  } catch {
    return Response.json({ ok: false, error: "Email already exists" }, { status: 409 });
  }
}

export async function PATCH(req: Request) {
  const auth = await requireAdminApi();
  if (isErrorResponse(auth)) return auth;

  const { id, name, role, active, password } = await req.json();
  if (!id) return Response.json({ ok: false, error: "id required" }, { status: 400 });

  const data: Parameters<typeof updateAdminUser>[1] = {};
  if (name) data.name = name;
  if (role) data.role = role;
  if (typeof active === "boolean") data.active = active;
  if (password?.trim()) data.passwordHash = await hash(password, 12);

  await updateAdminUser(id, data);
  return Response.json({ ok: true });
}
