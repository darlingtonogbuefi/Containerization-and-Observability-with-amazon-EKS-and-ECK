
// src/app/api/price-info/route.ts


import "@/lib/apm"; // Elastic APM monitoring

import Stripe from "stripe";

export async function GET(request: Request) {
  // Extract priceId from query string
  const { searchParams } = new URL(request.url);
  const priceId = searchParams.get("priceId");

  // Validate input
  if (!priceId) {
    return new Response(
      JSON.stringify({ error: "Missing priceId" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Safe during Docker build (no Stripe key present)
  if (!process.env.STRIPE_SECRET_KEY) {
    // Return a dummy response so `next build` succeeds
    return new Response(
      JSON.stringify({ amount: 0 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Initialize Stripe only when the secret key is available
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-09-30.clover",
    });

    // Retrieve price from Stripe
    const price = await stripe.prices.retrieve(priceId);

    // Return formatted response
    return new Response(
      JSON.stringify({ amount: price.unit_amount ?? 0 }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Stripe API error:", error);

    return new Response(
      JSON.stringify({ error: "Stripe error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
