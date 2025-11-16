"use client";

import { useState, useEffect } from "react";

export default function StatusPage() {
  const sections = [
    { id: "current-status", label: "Current Status" },
    { id: "recent-incidents", label: "Recent Incidents" },
    { id: "scheduled-maintenance", label: "Scheduled Maintenance" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">System Status</h1>

        <section id="current-status" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Current Status</h2>
          <p>
            All systems are operational. Cribr’s AI transcription services, authentication, and database are running smoothly.
          </p>
        </section>

        <section id="recent-incidents" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Recent Incidents</h2>
          <p>No incidents reported in the last 30 days.</p>
        </section>

        <section id="scheduled-maintenance" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Scheduled Maintenance</h2>
          <p>
            No maintenance scheduled at this time. We will notify users via email and Twitter if any downtime is expected.
          </p>
        </section>

        <section id="contact" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p>
            For status updates or inquiries, contact{" "}
            <a href="mailto:status@cribr.co.uk" className="text-blue-600 hover:underline">
              status@cribr.co.uk
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
