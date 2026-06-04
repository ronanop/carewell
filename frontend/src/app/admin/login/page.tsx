import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

import { hasTeamUsers, isAdminLoginAvailable } from "@carewell/backend/lib/admin-auth";



export default async function AdminLoginPage() {

  const configured = await isAdminLoginAvailable();

  const teamUsers = await hasTeamUsers();

  const showEmailField = Boolean(process.env.ADMIN_EMAIL) || teamUsers;



  return (

    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy via-navy/95 to-teal/80 px-4 py-12">

      <div className="w-full max-w-md rounded-card border border-white/15 bg-white p-8 shadow-float">

        <p className="text-xs font-semibold uppercase tracking-widest text-teal">Care Well Medical Centre</p>

        <h1 className="mt-2 font-heading text-2xl font-bold text-navy">Admin sign in</h1>

        <p className="mt-2 text-sm text-text-secondary">

          Content management, form submissions, media library, SEO, and team access — all in one dashboard.

        </p>



        {!configured ? (

          <p className="mt-6 rounded-button border border-alert/30 bg-alert-light px-3 py-3 text-sm text-alert">

            Admin auth is not configured. Set <code className="text-xs">ADMIN_SESSION_SECRET</code> (16+ chars) and{" "}

            <code className="text-xs">ADMIN_PASSWORD</code> or add team users after first deploy. Use{" "}

            <code className="text-xs">.env.local</code> locally or Render env vars in production.

          </p>

        ) : (

          <div className="mt-6">

            <Suspense fallback={<p className="text-sm text-text-secondary">Loading…</p>}>

              <AdminLoginForm showEmailField={showEmailField} />

            </Suspense>

          </div>

        )}

      </div>

    </div>

  );

}

