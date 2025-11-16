"use client";

import { useState, useEffect } from "react";

export default function DocumentationPage() {
  const sections = [
    { id: "getting-started", label: "Getting Started" },
    { id: "key-features", label: "Key Features" },
    { id: "api-usage", label: "API Usage" },
    { id: "faq", label: "FAQ" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">Cribr Documentation</h1>

        <section id="getting-started" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
          <p>
            Cribr allows you to transcribe YouTube videos quickly using AI-powered services. Simply paste a YouTube URL, and our app extracts the transcript for you.
            You can sign in with Google to save transcripts and manage your content in your dashboard.
          </p>
        </section>

        <section id="key-features" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Automatic YouTube video transcript extraction</li>
            <li>Integration with YouTube Transcript and Dumpling AI APIs</li>
            <li>User authentication via Supabase with Google OAuth</li>
            <li>Transcript storage and search using Postgres database</li>
            <li>Fast, serverless deployment via Vercel</li>
          </ul>
        </section>

        <section id="api-usage" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">API Usage</h2>
          <p>
            Currently, Cribr’s API endpoints are private but future versions will offer public access for developers wanting to integrate transcription services into their own apps.
            Stay tuned!
          </p>
        </section>

        <section id="faq" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">FAQ</h2>
          <p><strong>Q: How accurate are the transcripts?</strong><br />
            A: Transcript accuracy depends on the source video's audio clarity and the AI services used (YouTube Transcript API and Dumpling AI). We are continuously working to improve this.
          </p>
          <p><strong>Q: Can I transcribe videos from platforms other than YouTube?</strong><br />
            A: Currently, Cribr supports YouTube only, but future updates may include other platforms.
          </p>
        </section>
      </main>
    </div>
  );
}
