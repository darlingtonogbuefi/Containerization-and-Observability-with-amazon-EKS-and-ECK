// middleware.ts


// Initialize Elastic APM before anything else
import "@/lib/apm"; // This starts APM on the server

import { updateSession } from './supabase/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to:
 * 1. Log all incoming requests in structured JSON format for observability.
 * 2. Check Supabase session and handle redirects for protected routes.
 */
export async function middleware(request: NextRequest) {
  try {
    // 🧠 Log all incoming requests
    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        method: request.method,
        path: request.nextUrl.pathname,
        ip: request.ip ?? 'unknown',
        userAgent: request.headers.get('user-agent') ?? 'unknown',
      })
    );

    // ✅ Check Supabase session and handle redirects if needed
    const { response } = await updateSession(request);
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    // Allow request to continue even if logging or session check fails
    return NextResponse.next();
  }
}

/**
 * ⚡ Temporary: run middleware on all routes for debugging
 * Once verified, narrow this down to protected routes like ['/dashboard/:path*']
 */
export const config = {
  matcher: ['/:path*'],
};
