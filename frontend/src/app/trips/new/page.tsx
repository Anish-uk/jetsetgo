"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plane,
  Check,
} from "lucide-react";

const travelStyles = [
  { id: "adventure", name: "Adventure", emoji: "🏔️" },
  { id: "beach", name: "Beach & Relaxation", emoji: "🏖️" },
  { id: "city", name: "City Explorer", emoji: "🌆" },
  { id: "culture", name: "Culture & History", emoji: "🏛️" },
  { id: "food", name: "Food & Culinary", emoji: "🍜" },
  { id: "romantic", name: "Romantic Getaway", emoji: "💑" },
];

const popularDestinations = [
  { name: "Paris, France", image: "/paris.jpg", emoji: "🗼" },
  { name: "Tokyo, Japan", image: "/tokyo.jpeg", emoji: "🗾" },
  { name: "Bali, Indonesia", image: "/bali.jpeg", emoji: "🏝️" },
  { name: "Dubai, UAE", image: "/dubai.jpg", emoji: "🏙️" },
  { name: "Rome, Italy", image: "/rome.jpg", emoji: "🏛️" },
  { name: "Sydney, Australia", image: "/sydney.jpg", emoji: "🦘" },
];

export default function NewTripPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "1",
    travelStyle: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStyleSelect = (styleId: string) => {
    setFormData({ ...formData, travelStyle: styleId });
  };

  const handleDestinationSelect = (destination: string) => {
    setFormData({ ...formData, destination });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real app, this would save to a database
    // For now, we'll redirect to explore page with the prompt
    const prompt = `I want to visit ${formData.destination} from ${formData.startDate} to ${formData.endDate} with a budget of $${formData.budget}. ${formData.travelers} travelers. ${formData.travelStyle ? `Travel style: ${formData.travelStyle}.` : ""} ${formData.notes}`;

    router.push(
      `/explore?destination=${encodeURIComponent(formData.destination)}`,
    );
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.destination.trim() !== "";
      case 2:
        return formData.startDate && formData.endDate;
      case 3:
        return formData.budget && formData.travelers;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Banner */}
      <div className="relative py-32 pt-48 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hotariballoons.jpg"
            alt="Plan trip background"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#222831]/60" />
        </div>
        <div className="absolute top-10 right-20 animate-float-slow hidden lg:block z-10">
          <span className="text-6xl">✈️</span>
        </div>
        <div
          className="absolute bottom-10 left-20 animate-float hidden lg:block z-10"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-4xl">🗺️</span>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ADB5]/20 backdrop-blur-sm rounded-full text-[#00ADB5] text-sm font-medium mb-6">
            <Sparkles size={16} />
            AI-Powered Planning
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Plan Your Dream Trip
          </h1>
          <p className="text-xl text-[#EEEEEE]/90 max-w-2xl mx-auto">
            Let us help you create the perfect itinerary
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s
                      ? "bg-[#00ADB5] text-white"
                      : "bg-[#EEEEEE] text-[#393E46]"
                  }`}
                >
                  {step > s ? <Check size={20} /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-2 rounded-full transition-all ${
                      step > s ? "bg-[#00ADB5]" : "bg-[#EEEEEE]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-[#393E46]">
            <span>Destination</span>
            <span>Dates</span>
            <span>Budget</span>
            <span>Style</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="card p-8">
          {/* Step 1: Destination */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[#222831]">
                Where do you want to go?
              </h2>
              <div className="relative">
                <MapPin
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ADB5]"
                />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Enter destination (e.g., Paris, France)"
                  className="w-full pl-12 pr-4 py-4 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5] text-lg"
                />
              </div>

              <div>
                <p className="text-sm text-[#393E46] mb-4">
                  Or choose a popular destination:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {popularDestinations.map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => handleDestinationSelect(dest.name)}
                      className={`relative h-24 rounded-xl overflow-hidden group ${
                        formData.destination === dest.name
                          ? "ring-2 ring-[#00ADB5]"
                          : ""
                      }`}
                    >
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-[#222831]/50 group-hover:bg-[#222831]/30 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {dest.emoji} {dest.name.split(",")[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dates */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[#222831]">
                When are you traveling?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#393E46] mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ADB5]"
                    />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#393E46] mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ADB5]"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    />
                  </div>
                </div>
              </div>
              {formData.startDate && formData.endDate && (
                <div className="p-4 bg-[#00ADB5]/10 rounded-xl text-center">
                  <p className="text-[#00ADB5] font-medium">
                    {Math.ceil(
                      (new Date(formData.endDate).getTime() -
                        new Date(formData.startDate).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    nights trip
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Budget & Travelers */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[#222831]">
                Budget & Travelers
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#393E46] mb-2">
                    Total Budget (USD)
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ADB5]"
                    />
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="2000"
                      className="w-full pl-12 pr-4 py-4 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#393E46] mb-2">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <Users
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ADB5]"
                    />
                    <select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5] appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "Traveler" : "Travelers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Travel Style & Notes */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-[#222831]">
                Travel Style & Preferences
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {travelStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleStyleSelect(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.travelStyle === style.id
                        ? "border-[#00ADB5] bg-[#00ADB5]/10"
                        : "border-[#EEEEEE] hover:border-[#00ADB5]/50"
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{style.emoji}</span>
                    <span className="text-sm font-medium text-[#222831]">
                      {style.name}
                    </span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#393E46] mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or preferences..."
                  rows={4}
                  className="w-full px-4 py-4 bg-[#EEEEEE] rounded-xl text-[#222831] outline-none focus:ring-2 focus:ring-[#00ADB5] resize-none"
                />
              </div>

              {/* Summary */}
              <div className="p-6 bg-[#222831] rounded-xl text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Plane size={20} className="text-[#00ADB5]" />
                  Trip Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-[#EEEEEE]/70">Destination:</span>{" "}
                    {formData.destination || "Not set"}
                  </p>
                  <p>
                    <span className="text-[#EEEEEE]/70">Dates:</span>{" "}
                    {formData.startDate && formData.endDate
                      ? `${formData.startDate} to ${formData.endDate}`
                      : "Not set"}
                  </p>
                  <p>
                    <span className="text-[#EEEEEE]/70">Budget:</span>{" "}
                    {formData.budget ? `$${formData.budget}` : "Not set"}
                  </p>
                  <p>
                    <span className="text-[#EEEEEE]/70">Travelers:</span>{" "}
                    {formData.travelers}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                step === 1
                  ? "opacity-50 cursor-not-allowed text-[#393E46]"
                  : "text-[#222831] hover:bg-[#EEEEEE]"
              }`}
            >
              <ArrowLeft size={20} />
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  isStepValid()
                    ? "bg-[#00ADB5] text-white hover:bg-[#00ADB5]/90"
                    : "bg-[#EEEEEE] text-[#393E46] cursor-not-allowed"
                }`}
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 text-white hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Planning...
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    Generate Itinerary
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
