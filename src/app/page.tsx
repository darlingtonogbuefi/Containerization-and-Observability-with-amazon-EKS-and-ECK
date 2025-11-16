// src/app/page.tsx

import Hero from "@/components/hero";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";

import { createClient } from "../../supabase/server";
import TryForFreeHandler from "@/components/TryForFreeHandler";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Client component to handle scrolling if ?tryForFree=1 */}
      <TryForFreeHandler />

      <Hero userId={user?.id ?? null} />

      <FeaturesSection />
      <HowItWorksSection />

      <StatsSection />

      <section id="pricing" className="pt-20 -mt-20">
        <PricingSection />
      </section>

      <section id="faq" className="pt-20 -mt-20 bg-gray-50">
        <FAQSection />
      </section>
    </div>
  );
}
