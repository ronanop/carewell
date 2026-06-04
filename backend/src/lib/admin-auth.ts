import { compare } from "bcryptjs";
import { timingSafeEqual } from "crypto";
import { prisma } from "@/lib/db";

export {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
  createSessionToken,
  isAdminAuthConfigured,
  sessionCookieOptions,
  verifySessionToken,
} from "@/lib/admin-session";
export type { AdminSession } from "@/lib/admin-session";

async function verifyEnvAdminPassword(password: string, email?: string): Promise<boolean> {
  const configuredEmail = process.env.ADMIN_EMAIL?.trim();
  if (configuredEmail && email?.trim().toLowerCase() !== configuredEmail.toLowerCase()) {
    return false;
  }

  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) {
    try {
      return await compare(password, hash);
    } catch {
      return false;
    }
  }

  const plain = process.env.ADMIN_PASSWORD;
  if (!plain) return false;

  const a = Buffer.from(password, "utf8");
  const b = Buffer.from(plain, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

async function verifyDbAdminPassword(password: string, email: string): Promise<boolean> {
  const user = await prisma.adminUser.findUnique({
    where: { email: email.trim().toLowerCase() },
  });
  if (!user?.active) return false;
  try {
    return await compare(password, user.passwordHash);
  } catch {
    return false;
  }
}

export async function verifyAdminPassword(password: string, email?: string): Promise<boolean> {
  if (await verifyEnvAdminPassword(password, email)) return true;
  if (email?.trim()) return verifyDbAdminPassword(password, email);
  return false;
}

export async function touchAdminUserLogin(email: string): Promise<void> {
  await prisma.adminUser
    .update({
      where: { email: email.trim().toLowerCase() },
      data: { lastLoginAt: new Date() },
    })
    .catch(() => null);
}

export async function hasTeamUsers(): Promise<boolean> {
  const count = await prisma.adminUser.count({ where: { active: true } });
  return count > 0;
}

export async function isAdminLoginAvailable(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret || secret.length < 16) return false;
  const hasEnvPassword = Boolean(process.env.ADMIN_PASSWORD?.length || process.env.ADMIN_PASSWORD_HASH?.length);
  if (hasEnvPassword) return true;
  return hasTeamUsers();
}

export function getLeadPipelineStatus(): Record<string, "configured" | "not_configured"> {
  return {
    database: "configured",
    googleSheets: process.env.GOOGLE_SHEETS_WEBHOOK_URL ? "configured" : "not_configured",
    webhook: process.env.LEAD_WEBHOOK_URL ? "configured" : "not_configured",
    sendgrid:
      process.env.SENDGRID_API_KEY && process.env.SENDGRID_TO_EMAIL ? "configured" : "not_configured",
    whatsapp: process.env.LEAD_WHATSAPP_WEBHOOK_URL ? "configured" : "not_configured",
  };
}

export async function getLeadPipelineStatusExtended(): Promise<
  Record<string, "configured" | "not_configured">
> {
  const base = getLeadPipelineStatus();
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    const integrations = (settings?.integrations ?? {}) as Record<string, string>;
    if (settings?.notificationEmail) base.sendgrid = "configured";
    if (integrations.sheetsWebhook) base.googleSheets = "configured";
    if (integrations.leadWebhook) base.webhook = "configured";
    if (integrations.whatsappWebhook) base.whatsapp = "configured";
  } catch {
    /* db unavailable */
  }
  return base;
}
