//   src\app\pages\community\page.tsx

"use client";

import { useState, useEffect } from "react";

export default function CommunityPage() {
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "where-to-connect", label: "Where to Connect" },
    { id: "contributing", label: "Contributing" },
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
        <h1 className="text-3xl font-bold mb-6 text-center">Cribr Community</h1>

        <section id="intro" tabIndex={-1}>
          <p>
            Join the Cribr community to share ideas, request features, and collaborate with fellow users passionate about video transcription and AI.
          </p>
        </section>

        <section id="where-to-connect" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Where to Connect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a
                href="https://github.com/darlingtonogbuefi/containerize_and_deployto_k8s.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub Discussions
              </a>{" "}
              — Talk about bugs, features, and development.
            </li>
            <li>
              <a
                href="https://twitter.com/cribrapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>{" "}
              — Follow for updates and news.
            </li>
            <li>
              <a
                href="https://discord.gg/cribr-community"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Discord Server
              </a>{" "}
              — Real-time chat and support.
            </li>
          </ul>
        </section>

        <section id="contributing" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mb-3">Contributing</h2>
          <p>
            Interested in contributing code or ideas? Check out the{" "}
            <a
              href="https://github.com/darlingtonogbuefi/cribr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub repo
            </a>{" "}
            and submit pull requests or issues.
          </p>
        </section>
      </main>
    </div>
  );
}
