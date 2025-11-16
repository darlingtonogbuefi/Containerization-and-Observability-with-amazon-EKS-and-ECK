export default function HowItWorksSection() {
  return (
    <section className="relative py-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-70 pointer-events-none" />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your YouTube transcripts in just three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-red-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Paste YouTube URL</h3>
            <p className="text-gray-600">
              Copy and paste any YouTube video URL into our input field
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-red-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Transcription</h3>
            <p className="text-gray-600">
              Our AI processes the video and generates accurate transcripts
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-red-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Download & Use</h3>
            <p className="text-gray-600">
              Choose your format and download the transcript instantly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
