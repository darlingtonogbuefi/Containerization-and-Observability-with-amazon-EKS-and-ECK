//   src\app\pages\about\page.tsx

"use client";

import { useState, useEffect } from "react";

export default function AboutPage() {
  const sections = [{ id: "about-cribr", label: "About Cribr" }];
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
      <main className="w-3/4 space-y-8">
        <h1 className="text-3xl font-bold mb-8 text-center">About Cribr</h1>

        <section id="about-cribr" tabIndex={-1}>
          <p className="mb-4 text-lg">
            Cribr is a web app I built as a fun pet project, and it barely cost me anything except for the £4.54 I spent at{" "}
            <a
              href="https://www.dynadot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Dynadot
            </a>{" "}
             for the domain name{" "}
            <a
              href="https://cribr.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              cribr.co.uk
            </a>
            . It actually started out as a personal app (Python based) that I had built to help me extract data for training ML models.
          </p>
          <p className="mb-4 text-lg">
            For Cribr, I decided to ditch most of the original Python code and instead use online AI services to handle the heavy stuff. I hooked it up with tools like{" "}
            <a
              href="https://www.youtube-transcript.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              YouTube Transcript
            </a>{" "}
            and{" "}
            <a
              href="https://app.dumplingai.com/api-home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Dumpling AI
            </a>{" "}
            to do the transcript extraction and processing. This way, I kept the app lightweight and avoided dealing with complex backend code, making the whole thing faster to build and easier to maintain.
          </p>
          <p className="mb-4 text-lg">
            The goal was to build a more robust and scalable application for transcribing YouTube videos efficiently—one that eliminates the constant frustration of dealing with YouTube’s frequent site and API updates that often break extraction tools. 
            This app aims to provide a reliable, seamless transcription experience without the typical maintenance headaches caused by platform changes. Cribr uses{" "}
            <a
              href="https://supabase.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Supabase
            </a>{" "}
            with Google One Tap for seamless user authentication, leverages a PostgreSQL database to securely store metadata and transcripts, and is deployed via{" "}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Vercel
            </a>
            .
          </p>
          <p className="mb-4 text-lg">
            For the transcription logic, Cribr integrates with{" "}
            <a
              href="https://www.youtube-transcript.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              youtube-transcript.io
            </a>{" "}
            and{" "}
            <a
              href="https://app.dumplingai.com/api-home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              dumplingai
            </a>{" "}
            APIs.
          </p>
          <p className="mb-4 text-lg">
            This project was a fun experience — feel free to clone, tweak, and re-create the app at{" "}
            <a
              href="https://github.com/darlingtonogbuefi/containerize_and_deployto_k8s.git"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://github.com/darlingtonogbuefi/containerize_and_deployto_k8s.git
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
