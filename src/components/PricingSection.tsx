
import React from "react";
import { plans } from "../data/plans";
import { PlanCard } from "./PlanCard";

export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Pay weekly or monthly.
          <br />
          <span className="text-gray-500">No hidden fees. Full access.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
