"use client";

import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="bg-red-50 border border-red-200 rounded-3xl p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-red-600 mb-3">
          Something went wrong
        </h3>
        <p className="text-[#393E46] mb-8">{error}</p>
        <button
          onClick={onRetry}
          className="btn-primary px-8 py-3 rounded-xl font-semibold"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
