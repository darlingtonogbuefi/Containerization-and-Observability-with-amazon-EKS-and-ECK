"use client";

import { useState, useEffect } from "react";

export default function TermsPage() {
  const sections = [
    { id: "acceptance-of-terms", label: "Acceptance of Terms" },
    { id: "use-of-service", label: "Use of Service" },
    { id: "user-responsibilities", label: "User Responsibilities" },
    { id: "limitation-of-liability", label: "Limitation of Liability" },
    { id: "modifications", label: "Modifications" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>

        <section id="acceptance-of-terms" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
          <p>
            By using Cribr, you agree to these Terms of Service and our Privacy Policy.
          </p>
        </section>

        <section id="use-of-service" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Use of Service</h2>
          <p>
            Cribr.co.uk is an independent pet project and is not affiliated with, endorsed by, or sponsored by YouTube, Google, or any other company. All product names, logos, and brands are the property of their respective owners. Cribr is provided for lawful use only. You agree not to use the service to transcribe content you do not have rights to.
          </p>
        </section>

        <section id="user-responsibilities" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">User Responsibilities</h2>
          <p>
            You are responsible for the content you upload and ensure it complies with copyright and applicable laws.
          </p>
        </section>

        <section id="limitation-of-liability" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Limitation of Liability</h2>
          <p>
            Cribr is provided “as is” without warranties. We are not liable for any damages arising from the use of the service.
          </p>
        </section>

        <section id="modifications" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Modifications</h2>
          <p>
            We may update these terms at any time. Continued use constitutes acceptance of changes.
          </p>
        </section>
      </main>
    </div>
  );
}
