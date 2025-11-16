//   src\app\pages\cookies\page.tsx

"use client";

import { useState, useEffect } from "react";

export default function CookiesPage() {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "what-cookies", label: "What Cookies We Use" },
    { id: "managing-cookies", label: "Managing Cookies" },
    { id: "more-info", label: "More Information" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">Cookies Policy</h1>

        <section id="intro" tabIndex={-1}>
          <p>
            Cribr does not use cookies and similar tracking technologies to enhance your experience, analyze usage, and provide personalized content.
          </p>
        </section>

        <section id="what-cookies" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">What Cookies We Use</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Essential Cookies:</strong> Required for core functions such as authentication and session management.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how you use Cribr so we can improve it (e.g., Google Analytics).</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
          </ul>
        </section>

        <section id="managing-cookies" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Managing Cookies</h2>
          <p>
            You can control or disable cookies via your browser settings. Note that disabling essential cookies may affect your ability to use some features.
          </p>
        </section>

        <section id="more-info" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">More Information</h2>
          <p>
            For questions about our cookies policy, contact{" "}
            <a href="mailto:privacy@cribr.co.uk" className="text-blue-600 hover:underline">
              privacy@cribr.co.uk
            </a>.
          </p>
        </section>
      </main>
    </div>
  );
}
