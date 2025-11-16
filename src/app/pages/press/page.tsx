"use client";

import { useState, useEffect } from "react";

export default function PressPage() {
  const sections = [
    { id: "press-kit", label: "Press Kit" },
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

      {/* Main Content */}
      <main className="w-3/4 space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Press & Media</h1>

        <p className="mb-4">
          Cribr is an innovative web app transforming how video content from YouTube is transcribed and made accessible. Since launching, Cribr has gained attention for its AI-driven transcription pipeline, ease of use, and cost-effective domain setup.
        </p>

        <section id="press-kit" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Press Kit</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href="/press/cribr-logo.png" target="_blank" className="text-blue-600 hover:underline">Cribr Logo</a>
            </li>
            <li>
              <a href="/press/cribr-screenshots.zip" target="_blank" className="text-blue-600 hover:underline">App Screenshots</a>
            </li>
            <li>
              <a href="/press/cribr-fact-sheet.pdf" target="_blank" className="text-blue-600 hover:underline">Fact Sheet</a>
            </li>
          </ul>
        </section>

        <section id="contact" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            For media inquiries, interviews, or partnerships, please reach out to <a href="mailto:press@cribr.co.uk" className="text-blue-600 hover:underline">press@cribr.co.uk</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
