"use client";

import { useState, useEffect } from "react";

export default function APIInfoPage() {
  // Define all section IDs & labels for sidebar navigation
  const sections = [
    { id: "youtube-transcript-api", label: "youtube-transcript.io API" },
    { id: "channels-api", label: "Channels API" },
    { id: "dumplingai-api", label: "dumplingai API" },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Smooth scroll and update active section on sidebar click
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150; // offset to detect section earlier

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
    <div className="flex max-w-6xl mx-auto p-6 gap-8">
      {/* Sticky Sidebar */}
      <aside className="w-1/4 sticky top-24 self-start bg-gray-50 p-4 rounded-md border border-gray-200">
        <h2 className="font-semibold text-lg mb-4">API Sections</h2>
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

      {/* Main content area */}
      <main className="w-3/4 space-y-20">
        {/* Main Page Title */}
        <h1 className="text-3xl font-bold mb-8 text-center">API information</h1>

        {/* youtube-transcript.io API */}
        <section id="youtube-transcript-api" tabIndex={-1}>
          <h1 className="text-3xl font-bold mb-8">youtube-transcript.io API information</h1>

          <p className="text-sm mb-4 text-gray-600">
            Link to{" "}
            <a
              href="https://www.youtube-transcript.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              youtube-transcript.io Transcripts
            </a>
          </p>

          <h2 className="text-2xl font-semibold mb-4">youtube-transcript.io Transcripts</h2>

          <p className="mb-4">
            This API allows you to fetch the transcripts of a set of YouTube video IDs.
          </p>

          <h3 className="font-semibold text-lg mt-6 mb-2">POST /api/transcripts</h3>

          <h4 className="font-semibold">Headers</h4>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Authorization*</strong>: Basic API token generated in your profile. Check the pricing page for cost.
            </li>
            <li>
              <strong>Content-Type</strong>: application/json
            </li>
          </ul>

          <h4 className="font-semibold">Parameters</h4>
          <p className="mb-4">
            <code>ids</code> (required): Array of strings containing the YouTube video IDs to fetch transcripts for (max 50 at a time).
          </p>

          <h4 className="font-semibold">Rate Limit</h4>
          <p className="mb-4">
            Limited to 5 requests per 10 seconds. Exceeding this returns a 429 Too Many Requests response with a Retry-After header indicating wait time.
          </p>

          <h4 className="font-semibold">Example Request (fetch)</h4>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto mb-6">
            {`fetch("https://www.youtube-transcript.io/api/transcripts", {
  method: "POST",
  headers: {
    "Authorization": "Basic <your-api-token>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    ids: ["jNQXAC9IVRw"], 
  })
})`}
          </pre>
        </section>

        {/* Channels API */}
        <section id="channels-api" tabIndex={-1}>
          <h2 className="text-2xl font-semibold mt-12 mb-4">Channels API (Plus users only)</h2>

          <p className="mb-4">
            Fetch channels info for a set of YouTube channel external IDs. Available only for Plus or Pro users.
          </p>

          <h3 className="font-semibold mb-2">POST /api/channels</h3>

          <h4 className="font-semibold">Headers</h4>
          <ul className="list-disc list-inside mb-4">
            <li>
              <strong>Authorization*</strong>: Basic API token generated in your profile.
            </li>
            <li>
              <strong>Content-Type</strong>: application/json
            </li>
          </ul>

          <h4 className="font-semibold">Parameters</h4>
          <p className="mb-4">
            <code>ids</code> (required): Array of channel IDs (without the @). E.g., for https://www.youtube.com/@jawed, ID is <code>jawed</code>. Limits: 5 channels per request on Plus plans, 50 on Pro or higher.
          </p>

          <h4 className="font-semibold">Rate Limit</h4>
          <p className="mb-4">
            Same as transcripts API: 5 requests per 10 seconds, 429 response with Retry-After header if exceeded.
          </p>

          <h4 className="font-semibold">Example Request (fetch)</h4>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto mb-6">
            {`fetch("https://www.youtube-transcript.io/api/channels", {
  method: "POST",
  headers: {
    "Authorization": "Basic <your-api-token>",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ 
    ids: ["jawed"], 
  })
})`}
          </pre>

          <p className="mt-6 text-sm text-gray-600">
            By using this Service, you acknowledge that you have read, understood, and agreed to these Terms of Service.
          </p>
        </section>

        {/* dumplingai API */}
        <section id="dumplingai-api" tabIndex={-1}>
          <h1 className="text-3xl font-bold mb-6">dumplingai API information</h1>

          <p className="text-sm mb-4 text-gray-600">
            Link to{" "}
            <a
              href="https://app.dumplingai.com/api-home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              https://app.dumplingai.com/api-home
            </a>
          </p>

          <h2 className="text-2xl font-semibold mb-4">https://app.dumplingai.com/api-home</h2>

          <h3 className="font-semibold mb-2">Data APIs - Get YouTube Transcript</h3>

          <p className="mb-4">
            This endpoint extracts the transcript from a specified YouTube video URL, formats it, and optionally includes timestamps.
          </p>

          <h4 className="font-semibold">Endpoint</h4>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto mb-4">
            POST https://app.dumplingai.com/api/v1/get-youtube-transcript
          </pre>

          <h4 className="font-semibold">Headers</h4>
          <ul className="list-disc list-inside mb-4">
            <li>Content-Type: application/json</li>
            <li>Authorization: Bearer &lt;API_KEY&gt; (required)</li>
          </ul>

          <h4 className="font-semibold">Request Body</h4>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto mb-4">
            {`{
  "videoUrl": "string", // Required. The URL of the YouTube video.
  "includeTimestamps": "boolean", // Optional. Default: true.
  "timestampsToCombine": "number", // Optional. Default: 5.
  "preferredLanguage": "string" // Optional. Default: "en".
}`}
          </pre>

          <h4 className="font-semibold">Accepted Values for preferredLanguage</h4>
          <p className="mb-4 max-h-48 overflow-y-auto border border-gray-300 rounded p-2 text-sm bg-gray-50">
            Afrikaans (af), Akan (ak), Albanian (sq), Amharic (am), Arabic (ar), Armenian (hy), Assamese (as), Aymara (ay), Azerbaijani (az), Bangla (bn), Basque (eu), Belarusian (be), Bhojpuri (bho), Bosnian (bs), Bulgarian (bg), Burmese (my), Catalan (ca), Cebuano (ceb), Chinese (zh, zh-HK, zh-CN, zh-SG, zh-TW, zh-Hans, zh-Hant), Hakka Chinese (hak-TW), Min Nan Chinese (nan-TW), Corsican (co), Croatian (hr), Czech (cs), Danish (da), Divehi (dv), Dutch (nl), English (en, en-US), Esperanto (eo), Estonian (et), Ewe (ee), Filipino (fil), Finnish (fi), French (fr), Galician (gl), Ganda (lg), Georgian (ka), German (de), Greek (el), Guarani (gn), Gujarati (gu), Haitian Creole (ht), Hausa (ha), Hawaiian (haw), Hebrew (iw), Hindi (hi), Hmong (hmn), Hungarian (hu), Icelandic (is), Igbo (ig), Indonesian (id), Irish (ga), Italian (it), Japanese (ja), Javanese (jv), Kannada (kn), Kazakh (kk), Khmer (km), Kinyarwanda (rw), Korean (ko), Krio (kri), Kurdish (ku), Kyrgyz (ky), Lao (lo), Latin (la), Latvian (lv), Lingala (ln), Lithuanian (lt), Luxembourgish (lb), Macedonian (mk), Malagasy (mg), Malay (ms), Malayalam (ml), Maltese (mt), Māori (mi), Marathi (mr), Mongolian (mn), Nepali (ne), Northern Sotho (nso), Norwegian (no), Nyanja (ny), Odia (or), Oromo (om), Pashto (ps), Persian (fa), Polish (pl), Portuguese (pt), Punjabi (pa), Quechua (qu), Romanian (ro), Russian (ru), Samoan (sm), Sango (sg), Sanskrit (sa), Scottish Gaelic (gd), Serbian (sr), Sesotho (st), Shona (sn), Sindhi (sd), Sinhala (si), Slovak (sk), Slovenian (sl), Somali (so), Spanish (es), Sundanese (su), Swahili (sw), Swedish (sv), Tagalog (tl), Tajik (tg), Tamil (ta), Tatar (tt), Telugu (te), Thai (th), Tigrinya (ti), Tonga (to), Turkish (tr), Turkmen (tk), Ukrainian (uk), Urdu (ur), Uzbek (uz), Vietnamese (vi), Welsh (cy), Wolof (wo), Xhosa (xh), Yiddish (yi), Yoruba (yo), Zulu (zu)
          </p>

          <h4 className="font-semibold">Response</h4>
          <p className="mb-4">Returns an array of transcript segments with text and timestamps.</p>

          <h4 className="font-semibold">Example Request (curl)</h4>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto mb-6">
            {`curl -X POST "https://app.dumplingai.com/api/v1/get-youtube-transcript" \\
  -H "Authorization: Bearer <API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{"videoUrl":"https://www.youtube.com/watch?v=abcd1234","includeTimestamps":true}'`}
          </pre>
        </section>
      </main>
    </div>
  );
}
