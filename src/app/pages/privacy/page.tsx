"use client";

import { useState, useEffect } from "react";

export default function PrivacyPage() {
  const sections = [
    { id: "data-collection", label: "Data Collection" },
    { id: "use-of-data", label: "Use of Data" },
    { id: "security", label: "Security" },
    { id: "your-rights", label: "Your Rights" },
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
      {/* Sidebar */}
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
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p>
          At Cribr, we respect your privacy and are committed to protecting your personal information.
          This policy explains what data we collect, how we use it, and your rights.
        </p>

        <section id="data-collection" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Data Collection</h2>
          <p>
            We collect only the information necessary to provide our transcription services, including your email (for authentication) and transcript data you upload or generate.
          </p>
        </section>

        <section id="use-of-data" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Use of Data</h2>
          <p>
            Your data is used solely to provide and improve the Cribr service. We do not sell your information to third parties.
          </p>
        </section>

        <section id="security" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Security</h2>
          <p>
            We employ industry-standard security practices to safeguard your data, including encrypted connections and secure database storage.
          </p>
        </section>

        <section id="your-rights" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your data at any time by contacting <a href="mailto:privacy@cribr.co.uk" className="text-blue-600 hover:underline">privacy@cribr.co.uk</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
