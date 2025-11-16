//   src\app\pages\careers\page.tsx


"use client";

import { useState, useEffect } from "react";

export default function CareersPage() {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "closed-positions", label: "Closed Positions" },
    { id: "contact", label: "Contact" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">Careers at Cribr</h1>

        <section id="intro" tabIndex={-1}>
          <p className="mb-4">
            At Cribr, we’re passionate about making video content more accessible and searchable through innovative transcription technology. We’re a small, agile team focused on AI, machine learning, and user-centric design.
          </p>

          <p className="mb-4">
            We are not recruiting at the moment, but If you’re excited about building scalable AI-powered applications, love working with modern web technologies, and want to make a real impact on content accessibility, we want to hear from you!
          </p>
        </section>

        <section id="closed-positions" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Closed Positions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Frontend Engineer</strong> — Build user-friendly interfaces and improve the transcription workflow.
            </li>
            <li>
              <strong>Machine Learning Engineer</strong> — Optimize models and integrate new AI transcription APIs.
            </li>
            <li>
              <strong>Product Manager</strong> — Guide feature development and gather user feedback.
            </li>
          </ul>
        </section>

        <section id="contact" tabIndex={-1}>
          <p className="mt-6">
            Interested? Send your CV and portfolio to{" "}
            <a href="mailto:careers@cribr.co.uk" className="text-blue-600 hover:underline">
              careers@cribr.co.uk
            </a>.
          </p>
        </section>
      </main>
    </div>
  );
}
