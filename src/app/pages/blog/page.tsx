//  src\app\pages\blog\page.tsx

"use client";

import { useState, useEffect } from "react";

export default function BlogPage() {
  const sections = [
    { id: "ai-transcription", label: "AI Transcription" },
    { id: "content-strategy", label: "Content Strategy" },
    { id: "building-cribr", label: "Building Cribr" },
  ];
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      let current = activeSection;
      for (const section of sections) {
        const elem = document.getElementById(section.id);
        if (elem && scrollPos >= elem.offsetTop) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, sections]);

  return (
    <div className="flex max-w-4xl mx-auto p-6 gap-8">
      {/* Sticky Sidebar */}
      <aside className="w-1/4 sticky top-24 self-start bg-gray-50 p-4 rounded-md border border-gray-200">
        <h2 className="font-semibold text-lg mb-4">Sections</h2>
        <ul className="space-y-3">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`w-full text-left transition-colors duration-200 ${
                  activeSection === id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="w-3/4 space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Cribr Blog</h1>

        <article id="ai-transcription" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-2">How AI is Changing Video Transcription</h2>
          <p className="mb-4">
            Video transcription has come a long way, especially with the rise of AI-powered tools. At Cribr, we harness advanced APIs to extract and process YouTube video content faster and more accurately than traditional methods.
            This makes video content searchable, accessible, and easier to analyze.
          </p>
          <p>
            In this blog, we'll explore the latest trends in AI transcription, challenges with video metadata extraction, and how Cribr’s lightweight approach benefits content creators and researchers alike.
          </p>
        </article>

        <article id="content-strategy" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-2">Using Transcripts to Boost Your Content Strategy</h2>
          <p className="mb-4">
            Transcripts aren’t just for accessibility—they can supercharge your SEO and content repurposing. By converting your videos into text, you can create blogs, summaries, and social media posts effortlessly.
            Cribr makes it simple by automating the transcript generation process directly from YouTube videos.
          </p>
        </article>

        <article id="building-cribr" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-2">Behind the Scenes: Building Cribr</h2>
          <p>
            Discover the tech stack and design choices behind Cribr. From ditching traditional Python backends to leveraging online AI services, our approach prioritizes speed, scalability, and maintainability.
            We’ll also share lessons learned and future plans to keep improving transcription accuracy and usability.
          </p>
        </article>
      </main>
    </div>
  );
}
