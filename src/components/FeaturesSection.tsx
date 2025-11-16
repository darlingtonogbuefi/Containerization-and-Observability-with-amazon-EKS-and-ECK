// src/components/FeaturesSection.tsx

import {
  NotebookPen,
  Brain,
  Lightbulb,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features" className="pt-20 pb-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Harness the power of AI to transcribe YouTube videos quickly and
            accurately, helping you learn faster, create smarter, and build
            better AI models.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Learning Support */}
          <div className="p-8 bg-white rounded-xl shadow-2xl border-2 border-purple-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
              <NotebookPen className="text-red-600" size={24} />
            </div>
            <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
              Learning Support
            </p>
            <h3 className="text-xl font-bold mb-4">
              Your Ultimate AI Study Companion on YouTube
            </h3>
            <p className="mb-6 text-gray-700">
              Master any subject faster with instant access to text transcripts from
              thousands of hours of educational videos on youtube.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>
                🧠 <strong>Accelerate knowledge:</strong> Turn entire
                educational channels into your personal AI tutor for faster
                comprehension.
              </li>
              <li>
                📚 <strong>Interactive studying:</strong> Transform
                semester-long lectures into engaging Q&A sessions tailored to
                your needs.
              </li>
              <li>
                🎯 <strong>Precise references:</strong> Get exact video
                timestamps and sources for answers—no more endless scrubbing.
              </li>
            </ul>
          </div>

          {/* Content Creation */}
          <div className="p-8 bg-white rounded-xl shadow-2xl border-2 border-purple-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
              <Lightbulb className="text-red-600" size={24} />
            </div>
            <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
              Content Creation
            </p>
            <h3 className="text-xl font-bold mb-4">
              Your AI-Powered YouTube Growth Assistant
            </h3>
            <p className="mb-6 text-gray-700">
              Collaborate with insights from top creators in your niche.
              Generate fresh ideas and discover what drives viral success.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>
                🔥 <strong>Unlock virality:</strong> Analyze viral titles and
                formats from leading channels.
              </li>
              <li>
                💡 <strong>Idea generator:</strong> Produce endless video
                concepts based on proven trends.
              </li>
              <li>
                ✍️ <strong>Script insights:</strong> Study the writing and
                scripting styles of your favorite creators.
              </li>
              <li>
                🔍 <strong>Find content gaps:</strong> Uncover untapped topics
                your competitors haven’t covered.
              </li>
            </ul>
          </div>

          {/* Research */}
          <div className="p-8 bg-white rounded-xl shadow-2xl border-2 border-purple-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 mb-6">
              <Brain className="text-red-600" size={24} />
            </div>
            <p className="text-xs font-semibold uppercase text-gray-400 mb-2">
              Research
            </p>
            <h3 className="text-xl font-bold mb-4">
              Build Smarter AI with YouTube Knowledge
            </h3>
            <p className="mb-6 text-gray-700">
              Extract bulk YouTube transcripts effortlessly for AI and LLM
              training with a single click.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>
                ⚡ <strong>Fast processing:</strong> Handle thousands of video
                transcripts in minutes.
              </li>
              <li>
                📊 <strong>Flexible exports:</strong> Download data in
                Markdown, JSON, CSV, or custom formats for training.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
