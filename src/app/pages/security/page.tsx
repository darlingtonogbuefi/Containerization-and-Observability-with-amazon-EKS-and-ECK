"use client";

import { useState, useEffect } from "react";

export default function SecurityPage() {
  const sections = [
    { id: "data-protection", label: "Data Protection" },
    { id: "authentication", label: "Authentication" },
    { id: "incident-response", label: "Incident Response" },
    { id: "reporting-vulnerabilities", label: "Reporting Vulnerabilities" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">Security</h1>

        <p>
          Cribr takes security seriously to protect your data and privacy.
        </p>

        <section id="data-protection" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Data Protection</h2>
          <p>
            We use encryption in transit (HTTPS) and at rest to secure your transcripts and personal data.
          </p>
        </section>

        <section id="authentication" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Authentication</h2>
          <p>
            User authentication is managed via Google OAuth, ensuring that we don&apos;t require your PII or credentials to provide you with a secure login and session management.
          </p>
        </section>

        <section id="incident-response" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Incident Response</h2>
          <p>
            In case of a security incident, we have protocols to identify, contain, and notify affected users promptly.
          </p>
        </section>

        <section id="reporting-vulnerabilities" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Reporting Vulnerabilities</h2>
          <p>
            If you discover any security issues, please report them to <a href="mailto:security@cribr.co.uk" className="text-blue-600 hover:underline">security@cribr.co.uk</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
