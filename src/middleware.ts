import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Carewell Studio", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export function middleware(request: NextRequest) {
  const username = process.env.STUDIO_BASIC_AUTH_USER;
  const password = process.env.STUDIO_BASIC_AUTH_PASS;

  if (!username || !password) {
    return new NextResponse("Studio protection is not configured. Set STUDIO_BASIC_AUTH_USER and STUDIO_BASIC_AUTH_PASS.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  try {
    const encodedCredentials = authHeader.slice(6).trim();
    const decodedCredentials = atob(encodedCredentials);
    const [providedUser, ...rest] = decodedCredentials.split(":");
    const providedPass = rest.join(":");

    if (providedUser === username && providedPass === password) {
      return NextResponse.next();
    }
  } catch {
    return unauthorizedResponse();
  }

  return unauthorizedResponse();
}

export const config = {
  matcher: ["/studio/:path*"],
};

