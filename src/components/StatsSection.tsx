// src/components/StatsSection.tsx

export default function StatsSection() {
  return (
    <section className="py-3 bg-red-500 text-white">
      <div className="container mx-auto px-3">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">2000+</div>
            <div className="text-red-100">Videos Transcribed</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-red-100">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">6</div>
            <div className="text-red-100">Export Formats</div>
          </div>
        </div>
      </div>
    </section>
  );
}
