"use client";

import { useState, useEffect } from "react";

export default function HelpCenterPage() {
  const sections = [
    { id: "common-issues", label: "Common Issues" },
    { id: "account-authentication", label: "Account & Authentication" },
    { id: "contact-support", label: "Contact Support" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">Help Center</h1>

        <section id="common-issues" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Common Issues</h2>
          <p><strong>Unable to transcribe video:</strong> Check if the video is publicly accessible and that the URL is correct. Private or restricted videos cannot be transcribed.</p>
          <p><strong>Transcript is inaccurate:</strong> Poor audio quality or multiple speakers may reduce accuracy. Try different videos or wait for future improvements.</p>
        </section>

        <section id="account-authentication" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Account & Authentication</h2>
          <p>If you have trouble logging in or accessing your dashboard, try clearing your browser cache or re-authenticating with Google. For further assistance, contact <a href="mailto:support@cribr.co.uk" className="text-blue-600 hover:underline">support@cribr.co.uk</a>.</p>
        </section>

        <section id="contact-support" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Contact Support</h2>
          <p>Need more help? Reach out to our support team via email at <a href="mailto:support@cribr.co.uk" className="text-blue-600 hover:underline">support@cribr.co.uk</a>.</p>
        </section>
      </main>
    </div>
  );
}
