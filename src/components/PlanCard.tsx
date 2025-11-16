"use client";

import React, { useEffect, useState } from "react";
import { DiscountBadge } from "./DiscountBadge";
import { PriceDisplay } from "./PriceDisplay";
import { FeatureList } from "./FeatureList";
import { Plan } from "../data/plans";
import { stripePriceMap } from "../data/stripePriceMap";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const [price, setPrice] = useState(plan.price);

  useEffect(() => {
    // If this is the free plan, just show £0.00 (no /month, no placeholders)
    if (plan.name.toLowerCase() === "free") {
      setPrice("£0.00");
      return;
    }

    // Extract the STRIPE_ placeholder for other plans
    const match = plan.price.match(/STRIPE_[A-Z]+/);
    if (!match) return;
    const key = match[0];
    const priceId = stripePriceMap[key];
    if (!priceId) return;

    async function fetchPrice() {
      try {
        const res = await fetch(`/api/price-info?priceId=${priceId}`);
        if (!res.ok) throw new Error("Failed to fetch price");
        const data = await res.json();
        if (data?.amount) {
          const formattedPrice = (data.amount / 100).toFixed(2);
          const newPrice = plan.price.replace(key, formattedPrice);
          setPrice(newPrice);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPrice();
  }, [plan.price, plan.name]);

  const handleCheckout = async () => {
    if (plan.buttonText === "Current Plan") return;

    const match = plan.price.match(/STRIPE_[A-Z]+/);
    if (!match) return;
    const priceId = stripePriceMap[match[0]];
    if (!priceId) return;

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      if (!res.ok) throw new Error("Failed to create checkout session");
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
  };

  const normalizedPlanName = plan.name.trim().toLowerCase();
  const hasPurpleBorder =
    normalizedPlanName.includes("free") ||
    normalizedPlanName.includes("basic") ||
    normalizedPlanName.includes("pro");

  return (
    <div
      className={`relative flex flex-col p-8 rounded-2xl shadow-2xl border-2 justify-between ${
        plan.isFeatured ? "bg-purple-50" : "bg-white"
      } ${hasPurpleBorder ? "border-purple-500" : "border-gray-300"}`}
    >
      {plan.discount && <DiscountBadge />}

      <div className="flex flex-col justify-start gap-2">
        <h3
          className={`text-2xl font-semibold ${
            plan.highlight ? "text-purple-600" : "text-black"
          }`}
        >
          {plan.name}
        </h3>

        <PriceDisplay price={price} highlight={plan.highlight} />

        {plan.description && <p className="text-gray-600">{plan.description}</p>}
        {plan.enhancedDescription && (
          <p className="text-sm text-gray-500 mb-4">{plan.enhancedDescription}</p>
        )}
      </div>

      <FeatureList features={plan.features} />

      <button
        onClick={handleCheckout}
        className={`mt-auto w-full py-3 rounded-xl text-sm font-medium ${plan.buttonStyle} ${
          plan.buttonText === "Current Plan" ? "cursor-not-allowed opacity-60" : ""
        }`}
        disabled={plan.buttonText === "Current Plan"}
        aria-disabled={plan.buttonText === "Current Plan"}
      >
        {plan.buttonText}
      </button>
    </div>
  );
}
