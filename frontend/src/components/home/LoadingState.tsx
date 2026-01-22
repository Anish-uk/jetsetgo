"use client";

import { Plane } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="card rounded-3xl p-16 text-center animate-pulse-glow">
        <div className="w-24 h-24 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-[#00ADB5]/20 rounded-full animate-ping" />
          <div
            className="absolute inset-3 bg-[#00ADB5]/40 rounded-full animate-ping"
            style={{ animationDelay: "0.2s" }}
          />
          <div className="absolute inset-6 bg-gradient-to-r from-[#00ADB5] to-[#009ca3] rounded-full flex items-center justify-center">
            <Plane size={28} className="text-white animate-float" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-[#222831] mb-3">
          Planning your perfect trip...
        </h3>
        <p className="text-[#393E46] mb-8">
          Our AI is searching for the best flights, hotels, and experiences for
          you
        </p>
        <div className="flex justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={`dot-${i}`}
              className="w-3 h-3 bg-[#00ADB5] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
