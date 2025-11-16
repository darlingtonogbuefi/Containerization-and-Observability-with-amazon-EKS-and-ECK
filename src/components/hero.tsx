// works with main homepage/landing page
// src/components/hero.tsx

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, Check } from "lucide-react";

// Dynamically import the search bar (client component)
const TranscriptSearch = dynamic(() => import("./TranscriptSearch"), {
  ssr: false,
});

type HeroProps = {
  userId?: string | null;
};

export default function Hero({ userId = null }: HeroProps) {
  return (
    // Remove pt-16/24 here and add border-t to prevent margin collapsing
    <div className="relative overflow-hidden bg-white min-h-screen border-t border-transparent">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-70" />
      {/* Instead of padding on wrapper, add margin-top on content wrapper */}
      <div className="relative mb-12 sm:mb-16">
        <div className="container mx-auto px-4 mt-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2 tracking-tight">
              Transform{" "}
              <span
                className="inline-block bg-gradient-to-r from-gray-100 to-gray-200 rounded-full px-6 py-2
                           transition-transform duration-300 ease-in-out transform
                           hover:scale-[1.015] hover:shadow-[0_0_6px_2px_rgba(100,100,100,0.1)]"
              >
                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  YouTube Videos
                </Link>
              </span>{" "}
              into Accurate Transcripts
            </h1>

            {/* Smaller text and reduced margin below h1 */}
            <p className="text-sm text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Get precise transcriptions with speaker detection and timestamps.
            </p>

            <div className="mb-12">
              <TranscriptSearch userId={userId} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/#pricing"
                className="inline-flex min-w-[230px] justify-center items-center px-8 py-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
              >
                Bulk Transcribe
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex min-w-[230px] justify-center items-center px-8 py-4 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors text-lg font-medium"
              >
                See Features
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Speaker detection included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Multiple export formats</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Accurate timestamps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
