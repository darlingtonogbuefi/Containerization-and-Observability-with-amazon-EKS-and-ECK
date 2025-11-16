// src/components/FAQSection.tsx

"use client";

import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the transcript extraction process work?",
      answer:
        "Our tool automatically retrieves all available captions and transcripts from videos within a specified YouTube channel or playlist. We then process these files, converting them into easy-to-read formats that you can download and integrate seamlessly into your projects.",
    },
    {
      question: "What features are included in the Free plan?",
      answer:
        "The Free plan lets you extract transcripts from individual YouTube videos, one at a time. You can export these transcripts in multiple formats such as Markdown, JSON, and CSV. This plan is ideal for testing out the service or for users who only need occasional transcript access.",
    },
    {
      question: "What benefits does the Unlimited plan offer?",
      answer:
        "The Unlimited plan grants you unrestricted access to all our features: unlimited AI-driven chat and analysis across any YouTube channel, playlist, or video; bulk transcript extraction from entire channels and playlists; plus priority customer support. It’s perfect for professionals, content creators, and researchers who require extensive and seamless transcript extraction and analysis.",
    },
    {
      question: "How long does transcript extraction usually take?",
      answer:
        "For individual videos, the extraction typically completes within seconds. When processing channels or playlists, the time varies depending on the number of videos involved. For example, a channel with around 100 videos may take 30 to 60 seconds, while larger channels with over 1,000 videos may require a couple of minutes.",
    },
    {
      question: "How accurate are the generated transcripts?",
      answer:
        "Transcript accuracy depends primarily on the caption source. Captions manually added by creators are generally around 99% accurate. Auto-generated captions from YouTube vary based on factors like audio clarity, speaker accents, and background noise, so accuracy can fluctuate accordingly.",
    },
    {
      question: "Can I extract transcripts from private or unlisted videos?",
      answer:
        "Currently, our tool only supports extracting transcripts from publicly accessible videos. Private or unlisted videos require authentication by the video owner, which we do not support for privacy and security reasons.",
    },
    {
      question: "Do I need a YouTube API key to use this service?",
      answer:
        "No, you don’t need to provide your own API key. We handle all the technical connections on our end, allowing you to simply enter a video URL, channel, or playlist link to start extracting transcripts effortlessly.",
    },
    {
      question: "What if a video doesn’t have captions available?",
      answer:
        "If a video lacks captions—whether auto-generated or manually provided—it will be excluded from the final results. With the Unlimited plan, you can process as many videos as you want without worrying about individual video limitations or additional costs.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer:
        "Absolutely! You can cancel your subscription anytime without any hassle. Once canceled, you’ll maintain full access to Unlimited features until the end of your current billing cycle. After that, your account will revert to the Free plan, allowing you to continue using basic features at no cost.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-2 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-20">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl shadow-md bg-gray-50 transition-all"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left px-4 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-100 rounded-xl text-lg font-medium"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span>{question}</span>
                  <span className="text-xl font-bold text-gray-600">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="px-4 pb-4 text-gray-700 text-sm"
                  >
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
