"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";

const heroImages = [
  { src: "/eiffel_tower.jpeg", position: "top-0 left-0 w-1/3 h-1/2" },
  { src: "/tokyo.jpeg", position: "top-0 left-1/3 w-1/3 h-2/3" },
  { src: "/bali.jpeg", position: "top-0 right-0 w-1/3 h-1/2" },
  { src: "/dubai.jpg", position: "bottom-0 left-0 w-1/3 h-1/2" },
  { src: "/sydney.jpg", position: "bottom-0 left-1/3 w-1/3 h-1/3" },
  { src: "/hotariballoons.jpg", position: "bottom-0 right-0 w-1/3 h-1/2" },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Grid Background Images */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((img, index) => (
          <div
            key={img.src}
            className={`absolute ${img.position} overflow-hidden transition-all duration-700`}
          >
            <Image
              src={img.src}
              alt="Travel destination"
              fill
              sizes="33vw"
              quality={90}
              priority={index < 3}
              className={`object-cover transition-all duration-1000 ${
                index === activeIndex ? "scale-110" : "scale-100"
              }`}
            />
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                index === activeIndex ? "bg-[#222831]/10" : "bg-[#222831]/40"
              }`}
            />
          </div>
        ))}

        {/* Center overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#222831]/50 via-[#222831]/30 to-[#EEEEEE]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#222831_70%)] opacity-60" />
      </div>

      {/* Content Container */}
      <div className="relative min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-20">
        <div className="max-w-3xl text-center">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full text-sm font-medium mb-6">
            <Sparkles size={14} className="text-[#00ADB5]" />
            AI-Powered Travel Planning
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-5">
            Your Next
            <span className="text-[#00ADB5]"> Adventure </span>
            Awaits
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Let AI craft your perfect journey. Personalized itineraries, curated
            experiences, and seamless bookings—all in seconds.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-8">
            <Link
              href="/explore"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00ADB5] text-white rounded-full font-semibold hover:bg-[#00c4cc] transition-all duration-300 shadow-lg shadow-[#00ADB5]/25"
            >
              <Sparkles size={18} />
              Plan Your Trip
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          {/* Destination Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-white/50 text-sm">Popular:</span>
            {["Paris", "Tokyo", "Bali", "Dubai"].map((city) => (
              <Link
                key={city}
                href={`/explore?destination=${city}`}
                className="flex items-center gap-1 px-3 py-1.5 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all"
              >
                <MapPin size={12} className="text-[#00ADB5]" />
                {city}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Active Image Indicator - Vertical on right side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-1 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? "h-8 bg-[#00ADB5]"
                : "h-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
