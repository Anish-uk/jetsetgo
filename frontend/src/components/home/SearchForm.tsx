"use client";

import { Sparkles, Send } from "lucide-react";

interface SearchFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  hasTripPlan: boolean;
}

export default function SearchForm({
  prompt,
  setPrompt,
  loading,
  onSubmit,
  hasTripPlan,
}: SearchFormProps) {
  const suggestions = [
    "Paris for 5 days with $2000",
    "Bali beach vacation",
    "Tokyo anime tour",
    "Swiss Alps adventure",
  ];

  return (
    <section
      className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${
        hasTripPlan ? "py-8" : "-mt-8 pb-16"
      }`}
    >
      <form onSubmit={onSubmit}>
        <div className="card rounded-3xl p-8 lg:p-10 shadow-2xl shadow-[#222831]/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00ADB5] to-[#009ca3] rounded-xl flex items-center justify-center">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#222831]">
                Where would you like to go?
              </h2>
              <p className="text-sm text-[#393E46]">
                Describe your dream trip in your own words
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I want to explore Tokyo for 7 days with a budget of $3000. I love anime, authentic ramen, ancient temples, and cherry blossoms..."
              className="w-full p-5 bg-[#EEEEEE] text-[#222831] placeholder-[#393E46]/50 rounded-2xl border-2 border-transparent focus:border-[#00ADB5] focus:ring-4 focus:ring-[#00ADB5]/10 transition-all outline-none resize-none"
              rows={4}
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Planning...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Plan My Trip
                </>
              )}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="text-sm text-[#393E46] font-medium">Popular:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setPrompt(`I want to visit ${suggestion}`)}
                className="text-sm px-4 py-1.5 bg-[#222831] text-white rounded-full hover:bg-[#00ADB5] transition-all duration-300 hover:scale-105"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </form>
    </section>
  );
}
