// supabase\middleware.ts


// Initialize Elastic APM before anything else
import "@/lib/apm"; // This starts APM on the server 


import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll().map(({ name, value }) => ({
              name,
              value,
            }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (request.nextUrl.pathname.startsWith("/dashboard") && error) {
      return {
        response: NextResponse.redirect(new URL("/sign-in", request.url)),
        session: null,
      };
    }

    return { response, session: user ? { user } : null };
  } catch (e) {
    return {
      response: NextResponse.next({
        request: { headers: request.headers },
      }),
      session: null,
    };
  }
};
